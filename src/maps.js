// Scene layouts: ground, scenery and interactable spots for each place.
// A spot with `id` opens CONTENT.items[id]; a spot with `travel` rides the bus to that scene.
// `solid: [dx, dy, w, h]` is a collision box relative to the spot's (x, y).

const MAPS = {
  greenville: {
    bg: '#1b2a1b',
    arrive: { x: 392, y: 262 },
    spots: [
      { id: 'swing', tex: 'swing', x: 140, y: 114 },
      { id: 'reddirt', tex: 'mound', x: 216, y: 160 },
      { id: 'bus', tex: 'busstop', x: 360, y: 258, ix: 360, iy: 250, solid: [-18, -20, 28, 14] },
      { travel: 'brooklyn', tex: 'greyhound', x: 448, y: 268, ix: 410, iy: 260, solid: [-30, -18, 60, 16] },
    ],
    build(s) {
      const dirt = new Set();
      const mark = (x0, y0, x1, y1) => { for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) dirt.add(x + ',' + y); };
      mark(7, 8, 8, 16);
      mark(7, 15, 29, 16);
      const r = rng(42);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let key;
          if (x >= 5 && x <= 9 && (y === 6 || y === 7)) key = 'plank';
          else if (dirt.has(x + ',' + y)) key = 'dirt' + ((r() * 2) | 0);
          else key = 'grass' + ((r() * 3) | 0);
          s.add.image(x * TILE, y * TILE, key).setOrigin(0).setDepth(0);
        }
      }
      const f = rng(9);
      for (let n = 0; n < 40; n++) {
        const x = (f() * (WORLD_W - 10)) | 0, y = (f() * (WORLD_H - 10)) | 0;
        const tx = (x / TILE) | 0, ty = (y / TILE) | 0;
        if (dirt.has(tx + ',' + ty) || (tx >= 4 && tx <= 10 && ty <= 7)) continue;
        s.add.image(x, y, 'flower').setOrigin(0.5, 1).setDepth(y);
      }
      s.add.image(64, 96, 'house').setOrigin(0, 1).setDepth(96);
      s.solid(66, 16, 108, 76);
      [[24, 50], [24, 130], [22, 214], [44, 300], [70, 306], [262, 46], [300, 70], [226, 40],
       [352, 96], [452, 44], [454, 150], [440, 214], [330, 300], [260, 308], [408, 312]].forEach(([x, y]) => {
        s.add.image(x, y, 'tree').setOrigin(0.5, 1).setDepth(y);
        s.solid(x - 4, y - 7, 8, 6);
      });
    },
  },

  brooklyn: {
    bg: '#2a2c30',
    arrive: { x: 100, y: 206 },
    spots: [
      { id: 'library', tex: null, x: 32, y: 108, ix: 32, iy: 106 },
      { id: 'notebook', tex: 'notebook', x: 322, y: 156, float: true },
      { id: 'pump', tex: 'hydrant', x: 150, y: 248, solid: [-4, -5, 8, 5] },
      { id: 'wall', tex: null, x: 412, y: 108, ix: 412, iy: 106 },
      { travel: 'greenville', tex: 'greyhound', x: 44, y: 214, ix: 84, iy: 204, solid: [-30, -18, 60, 16] },
    ],
    build(s) {
      const r = rng(77);
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          let key;
          if (y <= 8 || y === 15 || y === 16) key = 'walk' + ((r() * 2) | 0);
          else if (y === 9) key = 'curb_dn';
          else if (y === 11) key = 'road_line';
          else if (y <= 13) key = 'road' + ((r() * 2) | 0);
          else if (y === 14) key = 'curb_up';
          else key = 'grass' + ((r() * 3) | 0);
          s.add.image(x * TILE, y * TILE, key).setOrigin(0).setDepth(0);
        }
      }
      // Madison Street: one row of buildings along the top
      [['library', 0, 64], ['brownstone', 64, 64], ['pinkhouse', 128, 64], ['brownstone2', 192, 64],
       ['bodega', 256, 64], ['brownstone', 320, 64], ['factory', 384, 96]].forEach(([key, x, w]) => {
        s.add.image(x, 100, key).setOrigin(0, 1).setDepth(92);
        s.solid(x, 0, w, 92);
      });
      s.add.image(184, 118, 'saint').setOrigin(0.5, 1).setDepth(118);
      s.solid(178, 110, 12, 6);
      // the one tree on the block
      s.add.image(300, 152, 'treepit').setOrigin(0.5, 1).setDepth(1);
      s.add.image(300, 150, 'oak').setOrigin(0.5, 1).setDepth(150);
      s.solid(296, 143, 8, 6);
      [[64, 152], [232, 152], [372, 152], [56, 258], [300, 258], [440, 258]].forEach(([x, y]) => {
        s.add.image(x, y, 'lamp').setOrigin(0.5, 1).setDepth(y);
        s.solid(x - 2, y - 3, 4, 3);
      });
      s.add.image(236, 256, 'hopscotch').setOrigin(0.5, 1).setDepth(1);
      s.add.image(160, 232, 'puddle').setOrigin(0.5, 1).setDepth(1);
      // park fence along the bottom
      for (let x = 0; x < WORLD_W; x += 16) s.add.image(x, 290, 'fence').setOrigin(0, 1).setDepth(290);
      s.solid(0, 280, WORLD_W, 10);
      [[60, 324], [220, 326], [420, 324]].forEach(([x, y]) => s.add.image(x, y, 'tree').setOrigin(0.5, 1).setDepth(y));
      // johnny pump spray
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
};
