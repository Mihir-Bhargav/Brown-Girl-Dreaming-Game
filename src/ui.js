// DOM overlay: title card, HUD, interaction panel. Text comes from CONTENT.
const UI = (function () {
  const $ = (id) => document.getElementById(id);
  let scene = null, audio = null, openId = null, titleUp = true;

  function init(s) {
    scene = s;
    $('title-h').textContent = CONTENT.title;
    $('title-sub').textContent = CONTENT.subtitle;
    $('title-by').textContent = CONTENT.byline;
    // dev shortcut for screenshots: index.html?go skips the title; ?go&open=notebook opens a panel
    const q = new URLSearchParams(location.search);
    if (q.has('go')) {
      titleUp = false; $('title').style.display = 'none'; s.locked = false;
      if (q.get('open')) { s.locked = true; open(q.get('open')); }
    }
  }

  function hud(found, zoneName, total) {
    if (zoneName) $('hud-zone').textContent = zoneName;
    $('hud-found').textContent = 'Discovered ' + found + '/' + total;
  }

  function prompt(label) {
    const el = $('prompt');
    if (label) { el.textContent = 'E  ' + label; el.classList.add('on'); } else el.classList.remove('on');
  }

  function open(id) {
    const it = CONTENT.items[id];
    openId = id;
    prompt(null);
    $('p-title').textContent = it.title;
    $('p-quote').textContent = it.quote.lines.join('\n');
    $('p-cite').textContent = it.quote.cite ? '(' + it.quote.cite + ')' : '';
    const box = $('p-analysis');
    box.innerHTML = '';
    Object.entries(it.analysis).forEach(([label, pts]) => {
      const h = document.createElement('h4'); h.textContent = label; box.appendChild(h);
      const ul = document.createElement('ul');
      pts.forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
      box.appendChild(ul);
    });
    $('p-audio').style.display = it.audio ? 'block' : 'none';
    $('panel').classList.add('on');
    play();
  }

  function play() {
    const it = CONTENT.items[openId];
    stop();
    if (!it || !it.audio) return;
    audio = new Audio(it.audio);
    audio.play().catch(() => {});
  }
  function stop() { if (audio) { audio.pause(); audio = null; } }

  function close() {
    stop();
    $('panel').classList.remove('on');
    openId = null;
    scene.locked = false;
  }

  function handleKeys(sc, k) {
    const J = Phaser.Input.Keyboard.JustDown;
    if (titleUp) {
      if (J(k.enter) || J(k.space) || J(k.e)) { titleUp = false; $('title').classList.add('off'); sc.locked = false; }
      return;
    }
    if (openId) {
      if (J(k.esc) || J(k.e) || J(k.space)) close();
      else if (J(k.r)) play();
    }
  }

  return { init, hud, prompt, open, close, handleKeys };
})();
