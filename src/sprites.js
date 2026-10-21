// All pixel art is drawn in code at native resolution (no image files needed).
// Pixels are scaled up by the engine with smoothing off, so they stay crisp.

function rng(seed) {
  return function () {
    seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeTex(scene, key, w, h, draw) {
  if (scene.textures.exists(key)) return;
  const tex = scene.textures.createCanvas(key, w, h);
  const c = tex.context;
  c.imageSmoothingEnabled = false;
  draw(c);
  tex.refresh();
}

function rows(scene, key, art, pal) {
  const h = art.length;
  const w = Math.max(...art.map((r) => r.length));
  makeTex(scene, key, w, h, (c) => {
    art.forEach((row, y) => {
      for (let x = 0; x < row.length; x++) {
        const col = pal[row[x]];
        if (col) { c.fillStyle = col; c.fillRect(x, y, 1, 1); }
      }
    });
  });
}

function disc(c, cx, cy, r, color) {
  c.fillStyle = color;
  for (let y = -r; y <= r; y++)
    for (let x = -r; x <= r; x++)
      if (x * x + y * y <= r * r + r * 0.4) c.fillRect(cx + x, cy + y, 1, 1);
}

function box(c, x, y, w, h, color) { c.fillStyle = color; c.fillRect(x, y, w, h); }

function buildTextures(scene) {
  // ---- ground tiles (16x16) ----
  [0, 1, 2].forEach((i) => {
    makeTex(scene, 'grass' + i, 16, 16, (c) => {
      const r = rng(100 + i);
      box(c, 0, 0, 16, 16, '#5b9a3c');
      for (let n = 0; n < 26; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 1, 1, r() > 0.5 ? '#4d8a31' : '#6bab49');
      for (let n = 0; n < 3; n++) { const x = (r() * 15) | 0, y = (r() * 13) | 0; box(c, x, y, 1, 2, '#3f7a28'); }
    });
  });
  [0, 1].forEach((i) => {
    makeTex(scene, 'dirt' + i, 16, 16, (c) => {
      const r = rng(200 + i);
      box(c, 0, 0, 16, 16, '#b4502f');
      for (let n = 0; n < 34; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 1, 1, r() > 0.5 ? '#98401f' : '#c96a44');
      for (let n = 0; n < 3; n++) box(c, (r() * 14) | 0, (r() * 14) | 0, 2, 1, '#7d3219');
    });
  });
  makeTex(scene, 'plank', 16, 16, (c) => {
    const r = rng(300);
    box(c, 0, 0, 16, 16, '#aa7a4b');
    for (let y = 0; y < 16; y += 4) box(c, 0, y + 3, 16, 1, '#7c5533');
    for (let n = 0; n < 18; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 2, 1, '#9a6b3e');
    box(c, 5, 0, 1, 3, '#7c5533'); box(c, 11, 4, 1, 3, '#7c5533'); box(c, 3, 8, 1, 3, '#7c5533'); box(c, 9, 12, 1, 3, '#7c5533');
  });
  makeTex(scene, 'flower', 5, 5, (c) => {
    box(c, 2, 0, 1, 1, '#ffe066'); box(c, 1, 1, 1, 1, '#ffffff'); box(c, 3, 1, 1, 1, '#ffffff');
    box(c, 2, 1, 1, 1, '#ffe066'); box(c, 2, 2, 1, 3, '#3f7a28');
  });
  makeTex(scene, 'shadow', 14, 6, (c) => { disc(c, 7, 3, 3, 'rgba(0,0,0,0.28)'); box(c, 4, 1, 6, 4, 'rgba(0,0,0,0.28)'); });
  makeTex(scene, 'mark', 7, 9, (c) => {
    box(c, 3, 0, 1, 1, '#fff6b0'); box(c, 2, 1, 3, 1, '#ffe066'); box(c, 1, 2, 5, 1, '#ffd43b');
    box(c, 0, 3, 7, 1, '#ffd43b'); box(c, 1, 4, 5, 1, '#f0b429'); box(c, 2, 5, 3, 1, '#f0b429'); box(c, 3, 6, 1, 1, '#c98b12');
    c.fillStyle = '#1a1a1a'; c.fillRect(3, 2, 1, 2);
  });

  // ---- the girl (16x16), 3 facings; left = flipped right ----
  const pal = { k: '#2a1a14', h: '#1f1411', s: '#9a6236', S: '#7e4c28', d: '#e8a838', D: '#c98727', w: '#ffffff', n: '#5a3a22', e: '#1a1a1a' };
  const girlDown = [
    '................',
    '....kkkkkkkk....',
    '...khhhhhhhhk...',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '..khhsssssshhk..',
    '..khsseessees...',
    '..khssssssssk...',
    '...kksssssskk...',
    '....kdddddddk...',
    '...kdddddddddk..',
    '...ksdddwwdddsk.',
    '...kSdddddddDSk.',
    '....kddddddDk...',
    '....knnk.knnk...',
    '....kkk...kkk...',
  ];
  const girlUp = [
    '................',
    '....kkkkkkkk....',
    '...khhhhhhhhk...',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '..khhhhhhhhhhk..',
    '...kkhhhhhhkk...',
    '....kdddddddk...',
    '...kdddddddddk..',
    '...ksdddddddsk..',
    '...kSdddddddSk..',
    '....kdddddddk...',
    '....knnk.knnk...',
    '....kkk...kkk...',
  ];
  const girlRight = [
    '................',
    '.....kkkkkkk....',
    '....khhhhhhhk...',
    '...khhhhhhhhhk..',
    '...khhhhhhhhhk..',
    '...khhhhsssshk..',
    '...khhhhsseshk..',
    '...khhhhssssk...',
    '....kkhhsssk....',
    '.....kddddddk...',
    '....kdddddddsk..',
    '....kdddddddsk..',
    '....kdddddddDk..',
    '.....kdddddDk...',
    '.....knnk.knk...',
    '.....kkk..kkk...',
  ];
  rows(scene, 'girl_down', girlDown, pal);
  rows(scene, 'girl_up', girlUp, pal);
  rows(scene, 'girl_right', girlRight, pal);

  // ---- house (112x80) ----
  makeTex(scene, 'house', 112, 80, (c) => {
    const r = rng(7);
    // walls
    box(c, 6, 30, 100, 50, '#eadfc2');
    for (let y = 33; y < 80; y += 5) box(c, 6, y, 100, 1, '#cdbf9c');
    box(c, 6, 30, 100, 2, '#bfb08a'); box(c, 6, 30, 2, 50, '#cdbf9c'); box(c, 104, 30, 2, 50, '#bfb08a');
    // roof
    for (let y = 0; y < 30; y++) {
      const inset = Math.floor((30 - y) * 0.45);
      box(c, 2 + inset, y, 108 - inset * 2, 1, y % 5 === 4 ? '#6a2b1e' : '#8f3d2b');
      if (y % 5 !== 4) for (let x = 2 + inset; x < 110 - inset; x += 6) box(c, x + (Math.floor(y / 5) % 2) * 3, y, 1, 1, '#a94d37');
    }
    box(c, 0, 29, 112, 3, '#5d2418');
    // chimney
    box(c, 80, 2, 10, 14, '#8a5a44'); box(c, 79, 1, 12, 3, '#6b4331');
    for (let y = 5; y < 16; y += 4) box(c, 80, y, 10, 1, '#6b4331');
    // windows
    [[18, 40], [76, 40]].forEach(([x, y]) => {
      box(c, x - 2, y - 2, 22, 24, '#fff7e6'); box(c, x, y, 18, 20, '#7ab6d9');
      box(c, x + 8, y, 2, 20, '#fff7e6'); box(c, x, y + 9, 18, 2, '#fff7e6');
      box(c, x + 2, y + 2, 4, 3, '#b9dff2');
    });
    // door
    box(c, 46, 42, 20, 38, '#fff7e6'); box(c, 48, 44, 16, 36, '#6b4a2d');
    box(c, 50, 47, 5, 12, '#593b22'); box(c, 57, 47, 5, 12, '#593b22');
    box(c, 50, 63, 5, 12, '#593b22'); box(c, 57, 63, 5, 12, '#593b22');
    box(c, 60, 62, 2, 2, '#ffd43b');
    // porch overhang shadow + base
    box(c, 6, 76, 100, 4, '#9c8e6c');
  });

  // ---- tree (32x40) ----
  makeTex(scene, 'tree', 32, 40, (c) => {
    box(c, 13, 26, 6, 14, '#6b4423'); box(c, 13, 26, 2, 14, '#7d5530'); box(c, 18, 26, 1, 14, '#573719');
    box(c, 10, 38, 12, 2, '#573719');
    disc(c, 16, 14, 13, '#2f6b22');
    disc(c, 9, 18, 8, '#2f6b22'); disc(c, 23, 18, 8, '#2f6b22');
    disc(c, 15, 12, 11, '#3f7d2c');
    disc(c, 10, 15, 6, '#3f7d2c'); disc(c, 22, 15, 6, '#3f7d2c');
    const r = rng(11);
    for (let n = 0; n < 30; n++) box(c, 5 + ((r() * 22) | 0), 3 + ((r() * 20) | 0), 2, 1, r() > 0.5 ? '#58a03e' : '#2a5e1d');
  });

  // ---- composition notebook (14x16) ----
  rows(scene, 'notebook', [
    '..kkkkkkkkkkk.',
    '.kkddddddddkk.',
    '.kkkkkkkkkkkk.',
    '.kkkkkkkkkkkk.',
    '.kkkwwwwwwkkk.',
    '.kkkwkkkkwkkk.',
    '.kkkwwwwwwkkk.',
    '.kkkwkkkkwkkk.',
    '.kkkwwwwwwkkk.',
    '.kkkkkkkkkkkk.',
    '.kkkkkkkkkkkk.',
    '.kkddddddddkk.',
    '..kkkkkkkkkk..',
  ].map((r) => r.replace(/d/g, 'k')), { k: '#1f1f24', w: '#f4efe4' });
  // marbled speckles on the cover
  (function () {
    const t = scene.textures.get('notebook'); const c = t.getSourceImage().getContext('2d');
    const r = rng(5);
    for (let n = 0; n < 30; n++) { c.fillStyle = r() > 0.5 ? '#44444c' : '#e8e8ee'; const x = 1 + ((r() * 12) | 0), y = 1 + ((r() * 11) | 0); const px = c.getImageData(x, y, 1, 1).data; if (px[3] && px[0] < 60) c.fillRect(x, y, 1, 1); }
    t.refresh();
  })();

  // ---- red dirt mound w/ sprout (16x14) ----
  rows(scene, 'mound', [
    '.......gg.......',
    '......gGg.g.....',
    '.......g.gg.....',
    '.......g........',
    '.....rrrrrr.....',
    '...rrRRRRRRrr...',
    '..rrRRRrRRRRrr..',
    '.rrRRRRRRrRRRRr.',
    '.rRRrRRRRRRRRRr.',
    '..rrrrrrrrrrrr..',
  ], { g: '#4fa83a', G: '#7fd35a', r: '#98401f', R: '#b4502f' });

  // ---- bus stop: bench + sign (36x30) ----
  makeTex(scene, 'busstop', 36, 30, (c) => {
    // sign pole
    box(c, 29, 4, 2, 26, '#8a8f98'); box(c, 29, 4, 1, 26, '#b8bdc6');
    box(c, 22, 2, 16, 11, '#1f3a6b'); box(c, 23, 3, 14, 9, '#2a52a0');
    // little bus glyph
    box(c, 25, 5, 10, 5, '#ffd43b'); box(c, 26, 6, 2, 2, '#2a52a0'); box(c, 29, 6, 2, 2, '#2a52a0'); box(c, 32, 6, 2, 2, '#2a52a0');
    box(c, 26, 10, 2, 1, '#111'); box(c, 32, 10, 2, 1, '#111');
    // bench
    box(c, 1, 14, 22, 3, '#a5703c'); box(c, 1, 14, 22, 1, '#c28850');
    box(c, 1, 18, 22, 3, '#8c5c30'); box(c, 1, 18, 22, 1, '#a5703c');
    box(c, 2, 21, 2, 8, '#3a3f48'); box(c, 20, 21, 2, 8, '#3a3f48');
    box(c, 1, 9, 2, 7, '#3a3f48'); box(c, 21, 9, 2, 7, '#3a3f48');
    box(c, 1, 9, 22, 3, '#a5703c'); box(c, 1, 9, 22, 1, '#c28850');
  });

  // ---- fence post piece (16x16) ----
  rows(scene, 'fence', [
    '................',
    '..ww....ww......',
    '.wWWw..wWWw.....',
    '.wWWw..wWWw.....',
    'wwWWwwwwWWwwwwww',
    'wWWWWWWWWWWWWWWW',
    'wwWWwwwwWWwwwwww',
    '.wWWw..wWWw.....',
    'wwWWwwwwWWwwwwww',
    'wWWWWWWWWWWWWWWW',
    'wwWWwwwwWWwwwwww',
    '.wWWw..wWWw.....',
    '.wWWw..wWWw.....',
    '.kkkk..kkkk.....',
  ].map((r) => r.padEnd(16, '.')), { w: '#f0e9d6', W: '#d8cfb4', k: '#8b6f43' });

  // ---- porch swing (24x16) ----
  makeTex(scene, 'swing', 24, 16, (c) => {
    box(c, 3, 0, 1, 7, '#6b6b6b'); box(c, 20, 0, 1, 7, '#6b6b6b');
    box(c, 2, 5, 20, 2, '#a5703c'); box(c, 2, 5, 20, 1, '#c28850');
    for (let x = 3; x < 22; x += 3) box(c, x, 7, 1, 3, '#8c5c30');
    box(c, 1, 10, 22, 3, '#8c5c30'); box(c, 1, 10, 22, 1, '#a5703c');
    box(c, 2, 13, 2, 3, '#5d3c1f'); box(c, 20, 13, 2, 3, '#5d3c1f');
  });
  makeTex(scene, 'markgo', 7, 9, (c) => {
    box(c, 3, 0, 1, 1, '#d6f1ff'); box(c, 2, 1, 3, 1, '#a8e0ff'); box(c, 1, 2, 5, 1, '#7fd3ff');
    box(c, 0, 3, 7, 1, '#7fd3ff'); box(c, 1, 4, 5, 1, '#3fa9f5'); box(c, 2, 5, 3, 1, '#3fa9f5'); box(c, 3, 6, 1, 1, '#1f78c1');
  });

  // ---- Greyhound bus (64x28) ----
  makeTex(scene, 'greyhound', 64, 28, (c) => {
    box(c, 3, 2, 58, 3, '#e6e9ed');
    box(c, 2, 4, 60, 17, '#cfd3d9');
    box(c, 2, 20, 60, 3, '#8d939c');
    box(c, 2, 15, 60, 2, '#2a52a0'); box(c, 2, 17, 60, 1, '#c0392b');
    for (let x = 6; x < 44; x += 8) { box(c, x, 6, 7, 7, '#27313d'); box(c, x + 1, 7, 2, 2, '#5d7187'); }
    box(c, 45, 6, 5, 14, '#27313d'); box(c, 47, 7, 1, 12, '#3b4756');
    box(c, 52, 5, 9, 9, '#27313d'); box(c, 53, 6, 3, 3, '#5d7187');
    box(c, 52, 3, 8, 2, '#ffd43b');
    box(c, 61, 15, 2, 2, '#ffe066'); box(c, 60, 19, 3, 3, '#5b6168');
    disc(c, 14, 23, 4, '#16181c'); disc(c, 50, 23, 4, '#16181c');
    disc(c, 14, 23, 1, '#9aa0a8'); disc(c, 50, 23, 1, '#9aa0a8');
  });

  // ---- Brooklyn ground tiles (16x16) ----
  [0, 1].forEach((i) => {
    makeTex(scene, 'walk' + i, 16, 16, (c) => {
      const r = rng(400 + i);
      box(c, 0, 0, 16, 16, '#b8b4aa');
      for (let n = 0; n < 22; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 1, 1, r() > 0.5 ? '#aaa69c' : '#c6c2b8');
      box(c, 0, 15, 16, 1, '#9a968c'); box(c, 15, 0, 1, 16, '#9a968c');
      if (i) box(c, 3 + ((r() * 8) | 0), 4 + ((r() * 6) | 0), 3, 1, '#9a968c');
    });
    makeTex(scene, 'road' + i, 16, 16, (c) => {
      const r = rng(500 + i);
      box(c, 0, 0, 16, 16, '#3b3d43');
      for (let n = 0; n < 26; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 1, 1, r() > 0.5 ? '#45474e' : '#33343a');
    });
  });
  makeTex(scene, 'road_line', 16, 16, (c) => {
    const r = rng(510);
    box(c, 0, 0, 16, 16, '#3b3d43');
    for (let n = 0; n < 26; n++) box(c, (r() * 16) | 0, (r() * 16) | 0, 1, 1, r() > 0.5 ? '#45474e' : '#33343a');
    box(c, 2, 14, 10, 2, '#e8c547');
  });
  makeTex(scene, 'curb_dn', 16, 16, (c) => {
    box(c, 0, 0, 16, 12, '#b8b4aa'); box(c, 15, 0, 1, 12, '#9a968c');
    box(c, 0, 12, 16, 2, '#d2cec4'); box(c, 0, 14, 16, 2, '#6e6c66');
  });
  makeTex(scene, 'curb_up', 16, 16, (c) => {
    box(c, 0, 0, 16, 16, '#b8b4aa'); box(c, 15, 0, 1, 16, '#9a968c'); box(c, 0, 15, 16, 1, '#9a968c');
    box(c, 0, 0, 16, 2, '#d2cec4'); box(c, 0, 2, 16, 1, '#8c8a84');
  });

  // ---- Brooklyn buildings (64x100, factory 96x100) ----
  rowhouse(scene, 'brownstone', { wall: '#7a4a35', mortar: '#633a28', trim: '#cbb89a' }, 21);
  rowhouse(scene, 'brownstone2', { wall: '#8a5a3c', mortar: '#714630', trim: '#d8c8a8' }, 22);
  rowhouse(scene, 'pinkhouse', { wall: '#e59ab0', mortar: '#cf8299', trim: '#f6e6ea' }, 23);
  rowhouse(scene, 'bodega', { wall: '#6b5a4e', mortar: '#584a40', trim: '#c9bba4' }, 24, (c) => {
    box(c, 2, 54, 60, 32, '#2f3b44');
    for (let x = 2; x < 62; x += 8) { box(c, x, 54, 4, 8, '#c0392b'); box(c, x + 4, 54, 4, 8, '#f4efe4'); }
    box(c, 2, 62, 60, 1, '#7d2219');
    box(c, 5, 65, 30, 18, '#9fc3d6');
    const r = rng(25);
    for (let n = 0; n < 26; n++) box(c, 6 + ((r() * 27) | 0), 70 + ((r() * 12) | 0), 2, 2, ['#e74c3c', '#f1c40f', '#27ae60', '#e67e22', '#ffffff'][(r() * 5) | 0]);
    box(c, 40, 65, 16, 21, '#1e252b'); box(c, 42, 67, 12, 8, '#9fc3d6'); box(c, 51, 77, 1, 2, '#ffd43b');
    box(c, 2, 86, 60, 14, '#b8b4aa');
  });

  makeTex(scene, 'library', 64, 100, (c) => {
    box(c, 2, 6, 60, 94, '#cfc6b2');
    for (let y = 12; y < 86; y += 6) box(c, 2, y, 60, 1, '#b8ae98');
    box(c, 0, 0, 64, 7, '#a89c84'); box(c, 0, 6, 64, 1, '#6e6352');
    for (let x = 2; x < 62; x += 4) box(c, x, 2, 2, 2, '#c9bd9f');
    [[6, 14], [46, 14]].forEach(([x, y]) => { box(c, x, y, 12, 30, '#3d5468'); box(c, x + 1, y - 2, 10, 2, '#3d5468'); box(c, x + 1, y + 1, 2, 10, '#6f93ad'); box(c, x, y + 15, 12, 1, '#e8e0cc'); box(c, x + 6, y, 1, 30, '#e8e0cc'); });
    [20, 40].forEach((x) => { box(c, x, 10, 4, 76, '#e8e0cc'); box(c, x + 3, 10, 1, 76, '#b8ae98'); box(c, x - 1, 8, 6, 3, '#e8e0cc'); });
    box(c, 25, 18, 14, 12, '#2a4a7a'); box(c, 27, 20, 5, 8, '#f6ecd4'); box(c, 32, 20, 5, 8, '#f6ecd4'); box(c, 32, 20, 1, 8, '#2a4a7a');
    box(c, 25, 52, 14, 34, '#e8e0cc'); box(c, 27, 54, 10, 32, '#5a3a22'); box(c, 31, 54, 2, 32, '#3d2614');
    box(c, 6, 54, 12, 26, '#3d5468'); box(c, 46, 54, 12, 26, '#3d5468'); box(c, 7, 55, 2, 8, '#6f93ad'); box(c, 47, 55, 2, 8, '#6f93ad');
    for (let i = 0; i < 4; i++) { box(c, 14 - i * 2, 86 + i * 3, 36 + i * 4, 3, i % 2 ? '#a89f90' : '#bdb4a4'); }
  });

  makeTex(scene, 'factory', 96, 100, (c) => {
    box(c, 0, 4, 96, 96, '#8c3d2e');
    for (let y = 8; y < 48; y += 4) { box(c, 0, y, 96, 1, '#73301f'); for (let x = ((y / 4) % 2) * 4; x < 96; x += 8) box(c, x, y - 3, 1, 3, '#73301f'); }
    box(c, 0, 0, 96, 5, '#5e2418');
    for (let x = 6; x < 90; x += 18) { box(c, x, 12, 12, 22, '#9aa4ad'); box(c, x + 1, 13, 10, 20, '#556677'); box(c, x + 1, 22, 10, 1, '#9aa4ad'); box(c, x + 6, 13, 1, 20, '#9aa4ad'); box(c, x + 2, 14, 2, 3, '#8aa0b3'); }
    box(c, 0, 46, 96, 54, '#ff7eb6'); box(c, 0, 46, 96, 2, '#ffa8cf');
    box(c, 70, 58, 22, 42, '#8f8f96');
    for (let y = 60; y < 100; y += 3) box(c, 70, y, 22, 1, '#74747b');
    const tag = (x, y) => {
      box(c, x, y, 8, 2, '#111'); box(c, x, y, 2, 7, '#111'); box(c, x + 10, y + 1, 6, 6, '#c0392b'); box(c, x + 11, y + 2, 4, 4, '#ff7eb6');
      box(c, x + 12, y + 3, 2, 2, '#111'); box(c, x + 18, y + 1, 6, 6, '#c0392b'); box(c, x + 19, y + 2, 4, 4, '#ff7eb6'); box(c, x + 21, y + 3, 2, 2, '#111');
    };
    tag(6, 54); tag(38, 62);
    const glyphs = { J: ['.##', '..#', '..#', '#.#', '.#.'], A: ['.#.', '#.#', '###', '#.#', '#.#'], C: ['.##', '#..', '#..', '#..', '.##'] };
    ['J', 'A', 'C'].forEach((g, i) => glyphs[g].forEach((row, y) => [...row].forEach((p, x) => { if (p === '#') box(c, 10 + i * 8 + x * 2, 80 + y * 2, 2, 2, '#6a2c91'); })));
    box(c, 0, 98, 96, 2, '#5e2418');
  });

  // ---- Brooklyn props ----
  makeTex(scene, 'oak', 44, 52, (c) => {
    box(c, 19, 34, 7, 18, '#5b3a1e'); box(c, 19, 34, 2, 18, '#6f4a28'); box(c, 25, 34, 1, 18, '#47290f');
    disc(c, 22, 18, 17, '#2c6420'); disc(c, 11, 24, 10, '#2c6420'); disc(c, 33, 24, 10, '#2c6420');
    disc(c, 21, 15, 14, '#3a7a2a'); disc(c, 12, 20, 7, '#3a7a2a'); disc(c, 32, 20, 7, '#3a7a2a');
    const r = rng(31);
    for (let n = 0; n < 50; n++) box(c, 5 + ((r() * 34) | 0), 3 + ((r() * 30) | 0), 2, 1, r() > 0.5 ? '#56a03a' : '#24561a');
  });
  makeTex(scene, 'treepit', 18, 8, (c) => { box(c, 0, 0, 18, 8, '#7d7a72'); box(c, 1, 1, 16, 6, '#4a3424'); box(c, 3, 2, 2, 1, '#5e4430'); box(c, 11, 4, 3, 1, '#5e4430'); });
  rows(scene, 'hydrant', [
    '...kkkk...',
    '..kRRRRk..',
    '..kRrrRk..',
    '.kkkkkkkk.',
    '..kRRrrk..',
    'kkkRRrrkkk',
    'kGkRRrrkGk',
    'kkkRRrrkkk',
    '..kRRrrk..',
    '..kRRrrk..',
    '..kRRrrk..',
    '.kkkkkkkk.',
    '.kDDDDDDk.',
    '.kkkkkkkk.',
  ], { k: '#3a1410', R: '#e04a3a', r: '#b0302a', G: '#c9c9c9', D: '#8a2a22' });
  makeTex(scene, 'drop', 2, 2, (c) => { box(c, 0, 0, 2, 2, '#a8dcff'); box(c, 0, 0, 1, 1, '#e6f6ff'); });
  makeTex(scene, 'puddle', 24, 8, (c) => { c.fillStyle = 'rgba(140,200,255,0.35)'; c.beginPath(); c.ellipse(12, 4, 12, 4, 0, 0, Math.PI * 2); c.fill(); });
  makeTex(scene, 'lamp', 8, 42, (c) => {
    box(c, 3, 6, 2, 34, '#2f4a3a'); box(c, 1, 39, 6, 3, '#24382c');
    box(c, 0, 2, 8, 4, '#2f4a3a'); box(c, 1, 5, 6, 2, '#ffe9a0'); box(c, 3, 0, 2, 2, '#24382c');
  });
  makeTex(scene, 'hopscotch', 48, 17, (c) => {
    c.fillStyle = 'rgba(255,255,255,0.7)';
    const sq = (x, y) => { c.fillRect(x, y, 9, 1); c.fillRect(x, y + 8, 9, 1); c.fillRect(x, y, 1, 9); c.fillRect(x + 8, y, 1, 9); };
    sq(0, 4); sq(8, 0); sq(8, 8); sq(16, 4); sq(24, 0); sq(24, 8); sq(32, 4); sq(40, 4);
  });
  makeTex(scene, 'saint', 16, 22, (c) => {
    box(c, 1, 16, 14, 6, '#8f939a'); box(c, 2, 17, 12, 2, '#7fbfe0'); box(c, 1, 16, 14, 1, '#b4b8bf');
    box(c, 5, 6, 6, 10, '#a9adb4');
    [[3, '#5a7fc0'], [7, '#efe6d2'], [11, '#9a7b55']].forEach(([x, robe]) => { box(c, x, 4, 2, 2, '#efe6d2'); box(c, x - 1, 6, 4, 8, robe); });
    box(c, 7, 0, 2, 4, '#7fbfe0');
  });
}

function rowhouse(scene, key, col, seed, extra) {
  makeTex(scene, key, 64, 100, (c) => {
    box(c, 2, 6, 60, 94, col.wall);
    for (let y = 9; y < 86; y += 4) {
      box(c, 2, y, 60, 1, col.mortar);
      for (let x = 2 + ((y / 4) % 2) * 4; x < 62; x += 8) box(c, x, y - 3, 1, 3, col.mortar);
    }
    box(c, 0, 0, 64, 6, col.trim); box(c, 0, 5, 64, 1, '#2a1a12');
    for (let x = 2; x < 62; x += 4) box(c, x, 2, 2, 2, 'rgba(0,0,0,0.18)');
    const win = (x, y, w, h) => {
      box(c, x - 1, y - 2, w + 2, 2, col.trim); box(c, x, y, w, h, '#3d5468'); box(c, x + 1, y + 1, 2, 4, '#6f93ad');
      box(c, x, y + (h >> 1), w, 1, col.trim); box(c, x - 1, y + h, w + 2, 1, col.trim);
    };
    [[8, 14], [27, 14], [46, 14], [8, 38], [27, 38], [46, 38]].forEach(([x, y]) => win(x, y, 10, 15));
    win(6, 64, 12, 16); win(46, 64, 12, 16);
    box(c, 24, 58, 16, 28, col.trim); box(c, 26, 60, 12, 26, '#3a2418');
    box(c, 27, 61, 4, 10, '#2c1a10'); box(c, 33, 61, 4, 10, '#2c1a10'); box(c, 35, 74, 1, 2, '#ffd43b');
    for (let i = 0; i < 5; i++) { box(c, 22 - i, 86 + i * 3, 20 + i * 2, 3, i % 2 ? '#8a8274' : '#a89f90'); }
    box(c, 20, 84, 1, 16, '#222'); box(c, 43, 84, 1, 16, '#222');
    if (extra) extra(c);
  });
}
