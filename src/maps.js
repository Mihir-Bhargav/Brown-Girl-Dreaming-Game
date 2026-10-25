// Scene layouts: ground, scenery and interactable spots for each place.
// A spot with `id` opens CONTENT.items[id]; a spot with `travel` moves to that scene.
// `solid: [dx, dy, w, h]` is a collision box relative to the spot's (x, y).
// Scene order here is the order of the journey (and the ride direction).

function fillGround(s, pick) {
  for (let y = 0; y < ROWS; y++) for (let x = 0; x < COLS; x++) s.add.image(x * TILE, y * TILE, pick(x, y)).setOrigin(0).setDepth(0);
}

function prop(s, key, x, y, solidW) {
  s.add.image(x, y, key).setOrigin(0.5, 1).setDepth(y);
  if (solidW) s.solid(x - solidW / 2, y - 7, solidW, 6);
}

const MAPS = {
  ohio: {
    bg: '#dfe8ef',
    spots: [
      { id: 'certificate', tex: null, x: 368, y: 114, ix: 368, iy: 116 },
      { id: 'jack', tex: 'pram', x: 424, y: 148, solid: [-8, -6, 16, 5] },
      { id: 'photos', tex: null, x: 96, y: 104, ix: 96, iy: 106 },
      { travel: 'greenville', tex: 'greyhound', x: 448, y: 222, ix: 410, iy: 214, solid: [-30, -18, 60, 16] },
    ],
    build(s) {
      const r = rng(61);
      fillGround(s, (x, y) => {
        if (y === 11) return 'bank_dn';
        if (y === 12) return 'road_line';
        if (y === 13) return 'road' + ((r() * 2) | 0);
        if (y === 14) return 'bank_up';
        if (y === 15) return 'iceedge';
        if (y >= 16) return 'water' + ((r() * 2) | 0);
        if ((x === 5 || x === 6) && y >= 6) return 'slush' + ((r() * 2) | 0);
        if ((x === 22 || x === 23) && y >= 7) return 'slush' + ((r() * 2) | 0);
        return 'snow' + ((r() * 3) | 0);
      });
      // the Nelsonville house, "big and white" on its hill, and University Hospital in Columbus
      s.add.image(40, 100, 'bighouse').setOrigin(0, 1).setDepth(92);
      s.solid(44, 20, 104, 72);
      s.add.image(304, 112, 'hospital').setOrigin(0, 1).setDepth(100);
      s.solid(304, 8, 128, 96);
      [[20, 60], [200, 80], [290, 64], [250, 140], [160, 172], [20, 172], [470, 104], [120, 150]].forEach(([x, y]) => prop(s, 'baretree', x, y, 6));
      s.solid(0, 246, WORLD_W, 74); // the river
      // the Hocking River glints, and snow keeps falling
      for (let n = 0; n < 14; n++) {
        const g = s.add.image(10 + Math.random() * 460, 262 + Math.random() * 54, 'drop').setDepth(2).setAlpha(0);
        s.tweens.add({ targets: g, alpha: 0.9, duration: 500, yoyo: true, repeat: -1, delay: Math.random() * 2500, repeatDelay: 1500 + Math.random() * 2000 });
      }
      s.time.addEvent({
        delay: 70, loop: true, callback: () => {
          const v = s.cameras.main.worldView;
          const x0 = v.x - 20 + Math.random() * (v.width + 40), y0 = v.y - 4, drift = (Math.random() - 0.5) * 30;
          const f = s.add.image(x0, y0, 'flake').setDepth(9000).setAlpha(0.6 + Math.random() * 0.4);
          s.tweens.addCounter({
            from: 0, to: 1, duration: 3200 + Math.random() * 1500,
            onUpdate: (tw) => { const t = tw.getValue(); f.setPosition(x0 + drift * t + Math.sin(t * 9) * 3, y0 + t * (v.height + 10)); },
            onComplete: () => f.destroy(),
          });
        },
      });
    },
  },

  greenville: {
    bg: '#1b2a1b',
    spots: [
      { id: 'swing', tex: 'swing', x: 140, y: 114 },
      { id: 'reddirt', tex: 'mound', x: 216, y: 160 },
      { id: 'switch', tex: 'willow', x: 64, y: 238, ix: 84, iy: 232, solid: [-4, -7, 8, 6] },
      { id: 'bus', tex: 'busstop', x: 360, y: 258, ix: 360, iy: 250, solid: [-18, -20, 28, 14] },
      { travel: 'brooklyn', tex: 'greyhound', x: 448, y: 268, ix: 410, iy: 260, solid: [-30, -18, 60, 16] },
    ],
    build(s) {
      const dirt = new Set();
      const mark = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) dirt.add(x + ',' + y); };
      mark(7, 8, 8, 16);
      mark(7, 15, 29, 16);
      const r = rng(42);
      fillGround(s, (x, y) => {
        if (x >= 5 && x <= 9 && (y === 6 || y === 7)) return 'plank';
        if (dirt.has(x + ',' + y)) return 'dirt' + ((r() * 2) | 0);
        return 'grass' + ((r() * 3) | 0);
      });
      const f = rng(9);
      for (let n = 0; n < 40; n++) {
        const x = (f() * (WORLD_W - 10)) | 0, y = (f() * (WORLD_H - 10)) | 0;
        const tx = (x / TILE) | 0, ty = (y / TILE) | 0;
        if (dirt.has(tx + ',' + ty) || (tx >= 4 && tx <= 10 && ty <= 7)) continue;
        s.add.image(x, y, 'flower').setOrigin(0.5, 1).setDepth(y);
      }
      s.add.image(64, 96, 'house').setOrigin(0, 1).setDepth(96);
      s.solid(66, 16, 108, 76);
      [[24, 50], [24, 130], [22, 196], [44, 300], [70, 306], [262, 46], [300, 70], [226, 40],
       [352, 96], [452, 44], [454, 150], [440, 214], [330, 300], [260, 308], [408, 312]].forEach(([x, y]) => prop(s, 'tree', x, y, 8));
    },
  },

  brooklyn: {
    bg: '#2a2c30',
    spots: [
      { id: 'library', tex: null, x: 32, y: 108, ix: 32, iy: 106 },
      { id: 'school', tex: null, x: 352, y: 108, ix: 352, iy: 106 },
      { id: 'notebook', tex: 'notebook', x: 322, y: 156, float: true },
      { id: 'wall', tex: null, x: 412, y: 108, ix: 412, iy: 106 },
      { travel: 'greenville', tex: 'greyhound', x: 44, y: 214, ix: 84, iy: 204, solid: [-30, -18, 60, 16] },
      { travel: 'ending', tex: null, x: 300, y: 160, ix: 278, iy: 160 },
    ],
    build(s) {
      const r = rng(77);
      fillGround(s, (x, y) => {
        if (y <= 8 || y === 15 || y === 16) return 'walk' + ((r() * 2) | 0);
        if (y === 9) return 'curb_dn';
        if (y === 11) return 'road_line';
        if (y <= 13) return 'road' + ((r() * 2) | 0);
        if (y === 14) return 'curb_up';
        return 'grass' + ((r() * 3) | 0);
      });
      // Madison Street: one row of buildings along the top
      [['library', 0, 64], ['brownstone', 64, 64], ['pinkhouse', 128, 64], ['brownstone2', 192, 64],
       ['bodega', 256, 64], ['school', 320, 64], ['factory', 384, 96]].forEach(([key, x, w]) => {
        s.add.image(x, 100, key).setOrigin(0, 1).setDepth(92);
        s.solid(x, 0, w, 92);
      });
      s.add.image(184, 118, 'saint').setOrigin(0.5, 1).setDepth(118);
      s.solid(178, 110, 12, 6);
      // the one tree on the block
      s.add.image(300, 152, 'treepit').setOrigin(0.5, 1).setDepth(1);
      prop(s, 'oak', 300, 150, 8);
      [[64, 152], [232, 152], [380, 152], [56, 258], [300, 258], [440, 258]].forEach(([x, y]) => {
        s.add.image(x, y, 'lamp').setOrigin(0.5, 1).setDepth(y);
        s.solid(x - 2, y - 3, 4, 3);
      });
      s.add.image(236, 256, 'hopscotch').setOrigin(0.5, 1).setDepth(1);
      s.add.image(160, 232, 'puddle').setOrigin(0.5, 1).setDepth(1);
      for (let x = 0; x < WORLD_W; x += 16) s.add.image(x, 290, 'fence').setOrigin(0, 1).setDepth(290);
      s.solid(0, 280, WORLD_W, 10);
      [[60, 324], [220, 326], [420, 324]].forEach(([x, y]) => s.add.image(x, y, 'tree').setOrigin(0.5, 1).setDepth(y));
      // the johnny pump, open on a hot day
      s.add.image(150, 248, 'hydrant').setOrigin(0.5, 1).setDepth(248);
      s.solid(146, 243, 8, 5);
      s.time.addEvent({
        delay: 50, loop: true, callback: () => {
          const d = s.add.image(152, 238, 'drop').setDepth(260);
          const vx = (Math.random() * 2 - 0.6) * 22, vy = -(30 + Math.random() * 26);
          s.tweens.addCounter({
            from: 0, to: 1, duration: 650,
            onUpdate: (tw) => { const t = tw.getValue(); d.setPosition(152 + vx * t, 238 + vy * t + (10 - vy) * t * t); },
            onComplete: () => d.destroy(),
          });
        },
      });
    },
  },

  // "When I sit beneath / the shade of my block's oak tree / the world disappears."
  ending: {
    bg: '#fbf7ec',
    dream: true,
    spots: [
      { id: 'eachworld', tex: 'desk', x: 240, y: 176, ix: 240, iy: 172, solid: [-20, -12, 40, 10] },
      { travel: 'brooklyn', tex: null, x: 240, y: 292, ix: 240, iy: 294 },
    ],
    build(s) {
      fillGround(s, (x) => (x === 2 ? 'paper_m' : 'paper'));
      // a piece of each world, gathered around the desk
      s.add.image(118, 160, 'snowpatch').setOrigin(0.5, 1).setDepth(1);
      prop(s, 'baretree', 118, 156, 6);
      s.add.image(240, 124, 'dirtpatch').setOrigin(0.5, 1).setDepth(1);
      prop(s, 'tree', 240, 120, 8);
      s.add.image(222, 124, 'mound').setOrigin(0.5, 1).setDepth(124);
      s.add.image(362, 160, 'walkpatch').setOrigin(0.5, 1).setDepth(1);
      s.add.image(362, 156, 'oak').setOrigin(0.5, 1).setDepth(156).setScale(0.8);
      s.solid(358, 150, 8, 6);
      s.add.image(384, 158, 'hydrant').setOrigin(0.5, 1).setDepth(158);
      s.add.image(96, 236, 'swing').setOrigin(0.5, 1).setDepth(236);
      s.add.image(384, 236, 'busstop').setOrigin(0.5, 1).setDepth(236).setScale(0.8);
      // words drifting up off the page
      s.time.addEvent({
        delay: 180, loop: true, callback: () => {
          const x0 = 20 + Math.random() * 440, y0 = 300 + Math.random() * 20;
          const ink = s.add.image(x0, y0, 'ink').setDepth(9000).setAlpha(0);
          s.tweens.add({ targets: ink, y: y0 - 140 - Math.random() * 120, x: x0 + (Math.random() - 0.5) * 30, alpha: { from: 0.7, to: 0 }, duration: 4000 + Math.random() * 2000, onComplete: () => ink.destroy() });
        },
      });
    },
  },
};
