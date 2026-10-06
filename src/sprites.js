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
}
