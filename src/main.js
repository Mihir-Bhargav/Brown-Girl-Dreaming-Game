// Brown Girl Dreaming: interactive world. Engine: Phaser 3.
// Gameplay + layout live here; ALL words come from content.js.

const TILE = 16;
const COLS = 30;
const ROWS = 20;
const WORLD_W = COLS * TILE;
const WORLD_H = ROWS * TILE;
const INTERACT_DIST = 30;

// Interactable spots: id matches an entry in CONTENT.items
const SPOTS = [
  { id: 'notebook', tex: 'notebook', x: 146, y: 108, float: true },
  { id: 'reddirt', tex: 'mound', x: 216, y: 160 },
  { id: 'bus', tex: 'busstop', x: 404, y: 258, ix: 404, iy: 250 },
];

class WorldScene extends Phaser.Scene {
  constructor() { super('world'); }

  create() {
    buildTextures(this);
    this.locked = true;          // true while title/overlay is up
    this.seen = new Set();
    this.solids = this.physics.add.staticGroup();

    this.buildGround();
    this.buildScenery();
    this.buildSpots();
    this.buildPlayer();

    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    this.keys = this.input.keyboard.addKeys({
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT',
      w: 'W', a: 'A', s: 'S', d: 'D', e: 'E', space: 'SPACE', esc: 'ESC',
      n: 'N', b: 'B', r: 'R', enter: 'ENTER',
    });

    this.zoneIndex = 0;
    UI.init(this);
    UI.hud(0, CONTENT.zones[0].name, SPOTS.length);
  }

  // ---------- world building ----------
  buildGround() {
    const dirt = new Set();
    const mark = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) dirt.add(x + ',' + y); };
    mark(7, 8, 8, 16);     // path down from the porch
    mark(7, 15, 26, 16);   // road toward the bus stop
    const r = rng(42);
    for (let y = 0; y < ROWS; y++) {
      for (let x = 0; x < COLS; x++) {
        let key;
        if (x >= 5 && x <= 9 && (y === 6 || y === 7)) key = 'plank';
        else if (dirt.has(x + ',' + y)) key = 'dirt' + ((r() * 2) | 0);
        else key = 'grass' + ((r() * 3) | 0);
        this.add.image(x * TILE, y * TILE, key).setOrigin(0).setDepth(0);
      }
    }
    const f = rng(9);
    for (let n = 0; n < 40; n++) {
      const x = (f() * (WORLD_W - 10)) | 0, y = (f() * (WORLD_H - 10)) | 0;
      const tx = (x / TILE) | 0, ty = (y / TILE) | 0;
      if (dirt.has(tx + ',' + ty) || (tx >= 4 && tx <= 10 && ty <= 7)) continue;
      this.add.image(x, y, 'flower').setOrigin(0.5, 1).setDepth(y);
    }
  }

  solid(x, y, w, h) {
    const z = this.add.zone(x + w / 2, y + h / 2, w, h);
    this.physics.add.existing(z, true);
    this.solids.add(z);
  }

  buildScenery() {
    // house: x 64..176, y 16..96
    this.add.image(64, 96, 'house').setOrigin(0, 1).setDepth(96);
    this.solid(66, 16, 108, 76);
    // trees
    [[24, 50], [24, 130], [22, 214], [44, 300], [70, 306], [262, 46], [300, 70], [226, 40],
     [352, 96], [452, 44], [454, 150], [440, 214], [330, 300], [260, 308], [430, 300]].forEach(([x, y]) => {
      this.add.image(x, y, 'tree').setOrigin(0.5, 1).setDepth(y);
      this.solid(x - 4, y - 7, 8, 6);
    });
  }

  buildSpots() {
    SPOTS.forEach((s) => {
      const img = this.add.image(s.x, s.y, s.tex).setOrigin(0.5, 1).setDepth(s.y);
      if (s.float) this.tweens.add({ targets: img, y: s.y - 2, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      if (s.id === 'bus') this.solid(s.x - 18, s.y - 20, 28, 14);
      s.ix = s.ix ?? s.x; s.iy = s.iy ?? s.y - 6;
      const m = this.add.image(s.ix, s.iy - 24, 'mark').setDepth(9999);
      this.tweens.add({ targets: m, y: m.y - 3, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      s.marker = m;
    });
  }

  buildPlayer() {
    const z = CONTENT.zones[0];
    this.shadow = this.add.image(z.x, z.y, 'shadow').setDepth(1);
    this.player = this.physics.add.sprite(z.x, z.y, 'girl_down').setOrigin(0.5, 1);
    this.player.body.setSize(8, 5).setOffset(4, 11);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.solids);
    this.facing = 'down';
  }

  // ---------- loop ----------
  update(time) {
    const k = this.keys;
    const p = this.player;

    if (this.locked) {
      p.setVelocity(0, 0);
      UI.handleKeys(this, k);
      return;
    }

    let vx = 0, vy = 0;
    if (k.left.isDown || k.a.isDown) vx -= 1;
    if (k.right.isDown || k.d.isDown) vx += 1;
    if (k.up.isDown || k.w.isDown) vy -= 1;
    if (k.down.isDown || k.s.isDown) vy += 1;
    const len = Math.hypot(vx, vy) || 1;
    p.setVelocity((vx / len) * 72, (vy / len) * 72);

    if (vy < 0) this.facing = 'up'; else if (vy > 0) this.facing = 'down';
    if (vx !== 0 && vy === 0) this.facing = vx > 0 ? 'right' : 'left';
    p.setTexture(this.facing === 'left' || this.facing === 'right' ? 'girl_right' : 'girl_' + this.facing);
    p.setFlipX(this.facing === 'left');
    const moving = vx !== 0 || vy !== 0;
    p.scaleY = moving ? 1 + Math.sin(time / 55) * 0.045 : 1;
    p.setDepth(p.y);
    this.shadow.setPosition(p.x, p.y - 1).setDepth(p.y - 1);

    // nearest interactable
    let near = null, best = INTERACT_DIST;
    SPOTS.forEach((s) => {
      const d = Phaser.Math.Distance.Between(p.x, p.y - 4, s.ix, s.iy);
      if (d < best) { best = d; near = s; }
    });
    this.near = near;
    UI.prompt(near ? CONTENT.items[near.id].title : null);
    if (near && (Phaser.Input.Keyboard.JustDown(k.e) || Phaser.Input.Keyboard.JustDown(k.space))) {
      this.locked = true;
      this.seen.add(near.id);
      near.marker.setAlpha(0.35);
      UI.open(near.id);
      UI.hud(this.seen.size, null, SPOTS.length);
    }

    // presentation hotkeys
    if (Phaser.Input.Keyboard.JustDown(k.n)) this.gotoZone(this.zoneIndex + 1);
    if (Phaser.Input.Keyboard.JustDown(k.b)) this.gotoZone(this.zoneIndex - 1);
  }

  gotoZone(i) {
    const n = CONTENT.zones.length;
    this.zoneIndex = ((i % n) + n) % n;
    const z = CONTENT.zones[this.zoneIndex];
    this.locked = true;
    this.cameras.main.fadeOut(180, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.player.setPosition(z.x, z.y);
      this.cameras.main.centerOn(z.x, z.y);
      this.cameras.main.fadeIn(180, 0, 0, 0);
      UI.hud(this.seen.size, z.name, SPOTS.length);
      this.locked = false;
    });
  }
}

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 400,
  height: 225,
  pixelArt: true,
  backgroundColor: '#1b2a1b',
  physics: { default: 'arcade', arcade: { debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [WorldScene],
});
