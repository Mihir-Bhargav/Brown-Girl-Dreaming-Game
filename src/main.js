// Brown Girl Dreaming: interactive world. Engine: Phaser 3.
// Gameplay lives here, layouts in maps.js, ALL words in content.js.

const TILE = 16;
const COLS = 30;
const ROWS = 20;
const WORLD_W = COLS * TILE;
const WORLD_H = ROWS * TILE;
const INTERACT_DIST = 30;

const STATE = { seen: new Set(), cardsShown: new Set() };
const TOTAL = Object.values(MAPS).reduce((n, m) => n + m.spots.filter((s) => s.id).length, 0);
const START = (() => {
  const q = new URLSearchParams(location.search).get('scene');
  return MAPS[q] ? q : CONTENT.zones[0].scene;
})();

class WorldScene extends Phaser.Scene {
  constructor() { super('world'); }

  init(data) {
    this.mapId = data.map || START;
    this.spawn = data.spawn || null;
    this.zoneIndex = data.zone ?? CONTENT.zones.findIndex((z) => z.scene === this.mapId);
  }

  create() {
    buildTextures(this);
    this.map = MAPS[this.mapId];
    this.cameras.main.setBackgroundColor(this.map.bg);
    this.locked = true;
    this.solids = this.physics.add.staticGroup();

    this.map.build(this);
    this.buildSpots();
    const z = CONTENT.zones[this.zoneIndex];
    this.buildPlayer(this.spawn || z);

    this.physics.world.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.setBounds(0, 0, WORLD_W, WORLD_H);
    this.cameras.main.startFollow(this.player, true, 0.12, 0.12);
    this.cameras.main.setRoundPixels(true);

    this.keys = this.input.keyboard.addKeys({
      up: 'UP', down: 'DOWN', left: 'LEFT', right: 'RIGHT',
      w: 'W', a: 'A', s: 'S', d: 'D', e: 'E', space: 'SPACE', esc: 'ESC',
      n: 'N', b: 'B', r: 'R', c: 'C', enter: 'ENTER',
    });

    UI.hud(STATE.seen.size, z.name, TOTAL);
    UI.bind(this);
  }

  // called by UI once the title / fade-in is done: show this place's slide cards the first time
  arrived() {
    if (STATE.cardsShown.has(this.mapId)) { this.locked = false; return; }
    STATE.cardsShown.add(this.mapId);
    this.showCards();
  }

  showCards() {
    const cards = CONTENT.scenes[this.mapId].cards || [];
    if (!cards.length) { this.locked = false; return; }
    this.locked = true;
    UI.prompt(null);
    UI.cards(cards, () => { this.locked = false; });
  }

  solid(x, y, w, h) {
    const z = this.add.zone(x + w / 2, y + h / 2, w, h);
    this.physics.add.existing(z, true);
    this.solids.add(z);
  }

  buildSpots() {
    this.spots = this.map.spots.map((def) => {
      const s = { ...def, ix: def.ix ?? def.x, iy: def.iy ?? def.y - 6 };
      if (s.tex) {
        const img = this.add.image(s.x, s.y, s.tex).setOrigin(0.5, 1).setDepth(s.y);
        if (s.float) this.tweens.add({ targets: img, y: s.y - 2, duration: 700, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      }
      if (s.solid) { const [dx, dy, w, h] = s.solid; this.solid(s.x + dx, s.y + dy, w, h); }
      s.marker = this.add.image(s.ix, s.iy - 24, s.travel ? 'markgo' : s.game ? 'markplay' : 'mark').setDepth(9999);
      if (s.id && STATE.seen.has(s.id)) s.marker.setAlpha(0.35);
      this.tweens.add({ targets: s.marker, y: s.marker.y - 3, duration: 500, yoyo: true, repeat: -1, ease: 'Sine.inOut' });
      return s;
    });
    this.refreshGate();
  }

  // Checkpoints: the way forward opens only once every yellow marker in this place has been examined.
  gateLeft() {
    const ids = this.spots.filter((s) => s.id).map((s) => s.id);
    return { left: ids.filter((id) => !STATE.seen.has(id)).length, total: ids.length };
  }
  isForward(to) {
    const order = Object.keys(MAPS);
    return order.indexOf(to) > order.indexOf(this.mapId);
  }
  gateMessage() {
    const { left, total } = this.gateLeft();
    return CONTENT.gate.replace('{done}', total - left).replace('{total}', total);
  }
  refreshGate() {
    const open = this.gateLeft().left === 0;
    this.spots.forEach((s) => { if (s.travel && this.isForward(s.travel)) s.marker.setAlpha(open ? 1 : 0.3); });
  }

  buildPlayer(at) {
    this.shadow = this.add.image(at.x, at.y, 'shadow').setDepth(1);
    this.player = this.physics.add.sprite(at.x, at.y, 'girl_down').setOrigin(0.5, 1);
    this.player.body.setSize(8, 5).setOffset(4, 11);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.solids);
    this.facing = 'down';
  }

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

    let near = null, best = INTERACT_DIST;
    this.spots.forEach((s) => {
      const d = Phaser.Math.Distance.Between(p.x, p.y - 4, s.ix, s.iy);
      if (d < best) { best = d; near = s; }
    });
    const gated = near && near.travel && this.isForward(near.travel) && this.gateLeft().left > 0;
    UI.prompt(near ? (gated ? this.gateMessage() : near.travel ? rideOf(this.mapId, near.travel).label : near.game ? CONTENT.minigame.label : CONTENT.items[near.id].title) : null, gated);
    if (near && !gated && (Phaser.Input.Keyboard.JustDown(k.e) || Phaser.Input.Keyboard.JustDown(k.space))) {
      if (near.game) {
        this.startRun();
      } else if (near.travel) {
        this.travel(near.travel, null, CONTENT.zones.findIndex((z) => z.scene === near.travel));
      } else {
        this.locked = true;
        STATE.seen.add(near.id);
        near.marker.setAlpha(0.35);
        this.refreshGate();
        UI.open(near.id);
        UI.hud(STATE.seen.size, null, TOTAL);
      }
    }

    if (Phaser.Input.Keyboard.JustDown(k.c)) { this.showCards(); return; }
    if (Phaser.Input.Keyboard.JustDown(k.n)) this.gotoZone(this.zoneIndex + 1);
    if (Phaser.Input.Keyboard.JustDown(k.b)) this.gotoZone(this.zoneIndex - 1);
  }

  startRun() {
    this.locked = true;
    UI.prompt(null);
    UI.stopAudio();
    const back = { map: this.mapId, x: this.player.x, y: this.player.y, zone: this.zoneIndex };
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => this.scene.start('run', { back }));
  }

  travel(to, spawn, zone) {
    this.locked = true;
    UI.prompt(null);
    UI.stopAudio();
    const paper = MAPS[to].dream || this.map.dream;
    this.cameras.main.fadeOut(300, ...(paper ? [251, 247, 236] : [0, 0, 0]));
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.scene.start('ride', { from: this.mapId, to, spawn, zone });
    });
  }

  gotoZone(i) {
    const n = CONTENT.zones.length;
    const idx = ((i % n) + n) % n;
    const z = CONTENT.zones[idx];
    if (z.scene !== this.mapId) {
      if (this.isForward(z.scene) && this.gateLeft().left > 0) { UI.toast(this.gateMessage()); return; }
      this.travel(z.scene, { x: z.x, y: z.y }, idx);
      return;
    }
    this.zoneIndex = idx;
    this.locked = true;
    this.cameras.main.fadeOut(180, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      this.player.setPosition(z.x, z.y);
      this.cameras.main.centerOn(z.x, z.y);
      this.cameras.main.fadeIn(180, 0, 0, 0);
      UI.hud(STATE.seen.size, z.name, TOTAL);
      this.locked = false;
    });
  }
}

function rideOf(from, to) {
  return CONTENT.rides[from + '>' + to] || { label: 'Travel', title: CONTENT.scenes[from].name + '  →  ' + CONTENT.scenes[to].name, line: '', audio: null };
}

// The trip between scenes: a night road and a Greyhound, or (to and from the ending) a notebook page.
class RideScene extends Phaser.Scene {
  constructor() { super('ride'); }

  init(data) { this.d = data; }

  create() {
    buildTextures(this);
    const order = Object.keys(MAPS);
    this.dir = order.indexOf(this.d.to) > order.indexOf(this.d.from) ? 1 : -1;
    this.dream = !!(MAPS[this.d.to].dream || MAPS[this.d.from].dream);
    this.fade = this.dream ? [251, 247, 236] : [0, 0, 0];
    this.dashes = [];
    this.poles = [];
    if (this.dream) this.drawPage(); else this.drawRoad();

    const ride = rideOf(this.d.from, this.d.to);
    UI.ride(ride.title, ride.line, this.dream);
    this.cameras.main.fadeIn(300, ...this.fade);
    this.keys = this.input.keyboard.addKeys({ e: 'E', space: 'SPACE', enter: 'ENTER' });
    this.done = false;
    if (!UI.playClip(ride.audio, () => this.finish())) this.time.delayedCall(3200, () => this.finish());
  }

  // the world disappears into a notebook page, words drifting up
  drawPage() {
    const W = 400, H = 225;
    this.add.rectangle(0, 0, W, H, 0xfbf7ec).setOrigin(0);
    for (let y = 15; y < H; y += 16) this.add.rectangle(0, y, W, 1, 0xbcd3ea).setOrigin(0);
    this.add.rectangle(40, 0, 1, H, 0xe7a3a3).setOrigin(0);
    this.time.addEvent({
      delay: 90, loop: true, callback: () => {
        const x0 = Math.random() * W, y0 = H + 4;
        const ink = this.add.image(x0, y0, 'ink').setAlpha(0.8);
        this.tweens.add({ targets: ink, y: y0 - 120 - Math.random() * 110, alpha: 0, duration: 2600 + Math.random() * 1500, onComplete: () => ink.destroy() });
      },
    });
  }

  drawRoad() {
    const W = 400, H = 225;
    const g = this.add.graphics();
    const sky = ['#0b1026', '#111834', '#182042', '#1f2550', '#2a2a5c'];
    sky.forEach((col, i) => { g.fillStyle(Phaser.Display.Color.HexStringToColor(col).color); g.fillRect(0, i * 28, W, 28); });
    for (let n = 0; n < 70; n++) {
      const st = this.add.rectangle(Math.random() * W, Math.random() * 130, 1, 1, 0xffffff, 0.5 + Math.random() * 0.5).setOrigin(0);
      this.tweens.add({ targets: st, alpha: 0.15, duration: 600 + Math.random() * 1400, yoyo: true, repeat: -1, delay: Math.random() * 1000 });
    }
    g.fillStyle(0xf6ecd4); g.fillCircle(330, 34, 9);
    g.fillStyle(0x0b1026); g.fillCircle(334, 31, 8);
    g.fillStyle(0x141a2e);
    for (let x = 0; x < W; x += 4) g.fillRect(x, 120 + Math.sin(x / 37) * 10 + Math.sin(x / 13) * 3, 4, 40);
    g.fillStyle(0x2b2d33); g.fillRect(0, 150, W, 50);
    g.fillStyle(0x4a4c52); g.fillRect(0, 150, W, 2); g.fillRect(0, 198, W, 2);
    g.fillStyle(0x0d0f14); g.fillRect(0, 200, W, H - 200);

    for (let x = 0; x < W + 40; x += 40) this.dashes.push(this.add.rectangle(x, 174, 18, 2, 0xe8c547).setOrigin(0));
    for (let x = 0; x < W + 120; x += 120) this.poles.push(this.add.rectangle(x, 104, 2, 46, 0x3a3020).setOrigin(0));
    if (this.d.from === 'ohio' || this.d.to === 'ohio') {
      for (let n = 0; n < 40; n++) {
        const f = this.add.image(Math.random() * W, Math.random() * H, 'flake').setAlpha(0.7);
        this.tweens.add({ targets: f, y: H + 4, x: f.x - this.dir * 40, duration: 2000 + Math.random() * 2000, repeat: -1, delay: Math.random() * 1500 });
      }
    }

    const bus = this.add.image(W / 2, 190, 'greyhound').setOrigin(0.5, 1).setFlipX(this.dir < 0);
    this.tweens.add({ targets: bus, y: 189, duration: 140, yoyo: true, repeat: -1 });
    this.add.rectangle(W / 2 + this.dir * 44, 178, 34, 6, 0xffe066, 0.25).setBlendMode(Phaser.BlendModes.ADD);
  }

  finish() {
    if (this.done) return;
    this.done = true;
    UI.stopAudio();
    this.cameras.main.fadeOut(300, ...this.fade);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      UI.ride(null);
      this.scene.start('world', { map: this.d.to, spawn: this.d.spawn, zone: this.d.zone });
    });
  }

  update(time, dt) {
    const J = Phaser.Input.Keyboard.JustDown;
    if (J(this.keys.e) || J(this.keys.space) || J(this.keys.enter)) this.finish();
    const v = -this.dir * dt * 0.18;
    this.dashes.forEach((d) => { d.x += v; if (d.x < -40) d.x += 440; if (d.x > 400) d.x -= 440; });
    this.poles.forEach((p) => { p.x += v * 0.6; if (p.x < -120) p.x += 480; if (p.x > 400) p.x -= 480; });
  }
}

// "The fastest girl on Madison Street": a three-lane runner down the block.
// Collect the letters of her full name; jump bottles, ropes and hydrants; dodge parked cars.
const RUN = { HOR: 70, D: 130, CAMH: 2, P: 32, ZP: 2, FAR: 40, LANE: 1.0, ROAD: 1.6 };
const RUN_SIZE = { deco: 1, car: 1.0, letter: 1.3, bottles: 1.3, rope: 1.25, hydrant: 1.3 };
const LOW = ['bottles', 'rope', 'hydrant'];

class RunScene extends Phaser.Scene {
  constructor() { super('run'); }

  init(data) { this.back = data.back; }

  create() {
    buildTextures(this);
    const word = CONTENT.minigame.word;
    buildLetterTextures(this, word);
    Object.assign(this, { word, got: 0, lives: 5, lane: 0, px: 0, jumpH: 0, jumpV: 0, speed: 4.5, inv: 0,
      running: false, over: false, objs: [], scroll: 0, nextRow: 12, nextLetter: 3, nextDeco: 2 });

    this.drawBackdrop();
    this.road = this.add.graphics().setDepth(1);
    for (let z = RUN.FAR; z > 1; z -= 2) this.spawnDeco(z);
    this.shadow = this.add.image(0, 0, 'shadow').setDepth(5000);
    this.player = this.add.image(0, 0, 'girl_up').setOrigin(0.5, 1).setDepth(5001);

    this.keys = this.input.keyboard.addKeys({
      left: 'LEFT', right: 'RIGHT', a: 'A', d: 'D', up: 'UP', w: 'W', space: 'SPACE',
      e: 'E', enter: 'ENTER', esc: 'ESC', r: 'R',
    });
    UI.runHud(this);
    this.cameras.main.fadeIn(300, 0, 0, 0);
    UI.cards([CONTENT.minigame.intro], () => { this.running = true; });
  }

  // perspective helpers: z is distance from the camera, x is sideways in street units
  ppu(z) { return RUN.D / z; }
  sy(z) { return RUN.HOR + RUN.CAMH * this.ppu(z); }
  sx(x, z) { return 200 + x * this.ppu(z); }

  drawBackdrop() {
    const g = this.add.graphics().setDepth(0);
    ['#6f8fc9', '#8aa3cf', '#b6b3c6', '#e9b98f', '#f2c48e'].forEach((c, i) => {
      g.fillStyle(Phaser.Display.Color.HexStringToColor(c).color); g.fillRect(0, i * 14, 400, 14);
    });
    const r = rng(88);
    for (let x = 0; x < 400; x += 10 + ((r() * 10) | 0)) {
      const h = 10 + ((r() * 26) | 0), w = 10 + ((r() * 14) | 0);
      g.fillStyle(0x4a4a5e); g.fillRect(x, RUN.HOR - h, w, h);
      g.fillStyle(0xf2d38a);
      for (let wy = RUN.HOR - h + 3; wy < RUN.HOR - 2; wy += 4) for (let wx = x + 2; wx < x + w - 2; wx += 4) if (r() > 0.6) g.fillRect(wx, wy, 1, 1);
    }
    g.fillStyle(0x9a968c); g.fillRect(0, RUN.HOR, 400, 225 - RUN.HOR);
  }

  spawnDeco(z) {
    const keys = ['brownstone', 'pinkhouse', 'brownstone2', 'bodega', 'library', 'school'];
    [-1, 1].forEach((side) => {
      const key = keys[(Math.random() * keys.length) | 0];
      this.objs.push({ kind: 'deco', x: side * (RUN.ROAD + 1.3), z, img: this.add.image(0, 0, key).setOrigin(0.5, 1) });
    });
  }

  spawnRow() {
    const lanes = Phaser.Utils.Array.Shuffle([-1, 0, 1]);
    const n = Math.random() < 0.12 ? 2 : Math.random() < 0.85 ? 1 : 0;
    for (let i = 0; i < n; i++) {
      const type = Math.random() < 0.15 ? 'car' : LOW[(Math.random() * LOW.length) | 0];
      this.objs.push({ kind: type, lane: lanes[i], x: lanes[i] * RUN.LANE, z: RUN.FAR, img: this.add.image(0, 0, type).setOrigin(0.5, 1) });
    }
    return lanes.slice(n);
  }

  // letters on the street, nearest first
  lettersOut() { return this.objs.filter((o) => o.kind === 'letter' && !o.done).sort((a, b) => a.z - b.z); }

  // keep the tiles in order: the nearest always shows the next letter she needs
  relabel() { this.lettersOut().forEach((o, i) => o.img.setTexture('letter_' + this.word[this.got + i])); }

  spawnLetter() {
    const out = this.lettersOut().length;
    if (out >= 3 || this.got + out >= this.word.length) return;
    const blocked = this.objs.filter((o) => o.kind !== 'deco' && o.kind !== 'letter' && o.z > RUN.FAR - 3).map((o) => o.lane);
    const free = [-1, 0, 1].filter((l) => !blocked.includes(l));
    const lane = free.length ? free[(Math.random() * free.length) | 0] : 0;
    this.objs.push({ kind: 'letter', lane, x: lane * RUN.LANE, z: RUN.FAR, h: 0.35, img: this.add.image(0, 0, 'letter_' + this.word[this.got + out]).setOrigin(0.5, 1) });
  }

  update(time, delta) {
    const k = this.keys, J = Phaser.Input.Keyboard.JustDown, dt = Math.min(delta, 50) / 1000;
    if (!this.running) {
      UI.handleKeys(this, k);
      this.draw(time);
      return;
    }
    if (J(k.esc)) { this.exit(); return; }
    if (J(k.left) || J(k.a)) this.lane = Math.max(-1, this.lane - 1);
    if (J(k.right) || J(k.d)) this.lane = Math.min(1, this.lane + 1);
    if ((J(k.up) || J(k.w) || J(k.space)) && this.jumpH === 0) this.jumpV = 6;
    this.px += (this.lane * RUN.LANE - this.px) * Math.min(1, dt * 14);
    if (this.jumpV || this.jumpH) { this.jumpH = Math.max(0, this.jumpH + this.jumpV * dt); this.jumpV -= 18 * dt; if (this.jumpH === 0) this.jumpV = 0; }
    this.inv = Math.max(0, this.inv - dt);

    const step = this.speed * dt;
    this.scroll += step;
    this.objs.forEach((o) => { o.z -= step; });
    this.nextDeco -= step; this.nextRow -= step; this.nextLetter -= step;
    if (this.nextDeco <= 0) { this.spawnDeco(RUN.FAR); this.nextDeco += 2; }
    if (this.nextRow <= 0) { this.spawnRow(); this.nextRow = 8 + Math.random() * 3; }
    if (this.nextLetter <= 0) { this.spawnLetter(); this.nextLetter = 4 + Math.random() * 2; }

    const myLane = Math.round(this.px / RUN.LANE);
    this.objs.forEach((o) => {
      if (o.done || o.kind === 'deco' || Math.abs(o.z - RUN.ZP) > (o.kind === 'letter' ? 0.45 : 0.22) || o.lane !== myLane) return;
      if (o.kind === 'letter') {
        if (o.h > 0.6 && this.jumpH < 0.4) return;
        o.done = true; o.img.setVisible(false); this.got++;
        this.relabel();
        this.speed = 4.5 + this.got * 0.12;
        this.cameras.main.flash(120, 255, 236, 160);
        UI.runHud(this);
        if (this.got === this.word.length) this.finish(true);
        return;
      }
      if (LOW.includes(o.kind) && this.jumpH > 0.45) return;
      if (this.inv > 0) return;
      o.done = true; this.lives--; this.inv = 2;
      this.cameras.main.shake(160, 0.01);
      UI.runHud(this);
      if (this.lives === 0) this.finish(false);
    });
    let missed = false;
    this.objs = this.objs.filter((o) => {
      if (o.z > 0.8) return true;
      if (o.kind === 'letter' && !o.done) missed = true;
      o.img.destroy();
      return false;
    });
    if (missed) this.relabel();
    this.draw(time);
  }

  draw(time) {
    const g = this.road, near = 1.2, far = RUN.FAR;
    g.clear();
    g.fillStyle(0x3b3d43);
    g.fillPoints([{ x: this.sx(-RUN.ROAD, far), y: this.sy(far) }, { x: this.sx(RUN.ROAD, far), y: this.sy(far) },
      { x: this.sx(RUN.ROAD, near), y: this.sy(near) }, { x: this.sx(-RUN.ROAD, near), y: this.sy(near) }], true);
    const quad = (x0, x1, z0, z1, col) => {
      g.fillStyle(col);
      g.fillPoints([{ x: this.sx(x0, z1), y: this.sy(z1) }, { x: this.sx(x1, z1), y: this.sy(z1) },
        { x: this.sx(x1, z0), y: this.sy(z0) }, { x: this.sx(x0, z0), y: this.sy(z0) }], true);
    };
    [-RUN.ROAD, RUN.ROAD - 0.06].forEach((x) => quad(x, x + 0.06, near, far, 0xd2cec4));
    const off = this.scroll % 3;
    for (let z = near + 3 - off; z < far; z += 3) {
      [-RUN.LANE / 2, RUN.LANE / 2].forEach((x) => quad(x - 0.03, x + 0.03, z, z + 1.1, 0xe8c547));
    }
    const off2 = this.scroll % 1.5;
    for (let z = near + 1.5 - off2; z < far; z += 1.5) {
      [[-RUN.ROAD - 0.3, -RUN.ROAD], [RUN.ROAD, RUN.ROAD + 0.3]].forEach(([a, b]) => quad(a, b, z, z + 0.05, 0x86827a));
    }

    this.objs.forEach((o) => {
      const s = this.ppu(o.z) / RUN.P;
      const lift = o.kind === 'letter' ? (o.h + Math.sin(time / 180 + o.z) * 0.06) * this.ppu(o.z) : 0;
      o.img.setPosition(this.sx(o.x, o.z), this.sy(o.z) - lift).setScale(s * RUN_SIZE[o.kind]).setDepth(4000 - o.z * 50);
    });
    const s = this.ppu(RUN.ZP) / RUN.P;
    const bob = this.running && this.jumpH === 0 ? Math.abs(Math.sin(time / 70)) * 2 : 0;
    this.player.setPosition(this.sx(this.px, RUN.ZP), this.sy(RUN.ZP) - this.jumpH * this.ppu(RUN.ZP) - bob)
      .setScale(s * 1.3).setFlipX(this.running && Math.floor(time / 140) % 2 === 0)
      .setAlpha(this.inv > 0 && Math.floor(time / 80) % 2 ? 0.35 : 1);
    this.shadow.setPosition(this.sx(this.px, RUN.ZP), this.sy(RUN.ZP) - 1).setScale(s * 1.3 * (1 - this.jumpH * 0.35));
  }

  finish(won) {
    this.running = false;
    this.over = true;
    const card = won ? CONTENT.minigame.win : CONTENT.minigame.lose;
    UI.cards([card], () => (won ? this.exit() : this.scene.restart({ back: this.back })));
  }

  exit() {
    this.running = false;
    this.cameras.main.fadeOut(300, 0, 0, 0);
    this.cameras.main.once('camerafadeoutcomplete', () => {
      UI.runHud(null);
      this.scene.start('world', { map: this.back.map, spawn: { x: this.back.x, y: this.back.y }, zone: this.back.zone });
    });
  }
}

UI.init();

const game = new Phaser.Game({
  type: Phaser.AUTO,
  parent: 'game',
  width: 400,
  height: 225,
  pixelArt: true,
  backgroundColor: '#000000',
  physics: { default: 'arcade', arcade: { debug: false } },
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
  scene: [WorldScene, RideScene, RunScene],
});
