// DOM overlay: title card, HUD, interaction panel, ride card. Text comes from CONTENT.
const UI = (function () {
  const $ = (id) => document.getElementById(id);
  let scene = null, audio = null, openId = null, titleUp = true, pendingOpen = null;

  function init() {
    $('title-h').textContent = CONTENT.title;
    $('title-sub').textContent = CONTENT.subtitle;
    $('title-by').textContent = CONTENT.byline;
    // dev shortcut for screenshots: ?go skips the title, ?go&open=notebook opens a panel, ?scene=brooklyn picks the start
    const q = new URLSearchParams(location.search);
    if (q.has('go')) {
      titleUp = false; $('title').style.display = 'none';
      pendingOpen = q.get('open');
    }
  }

  // called every time a world scene is created
  function bind(s) {
    scene = s;
    if (titleUp) return;
    if (pendingOpen) { const id = pendingOpen; pendingOpen = null; open(id); return; }
    s.cameras.main.fadeIn(250, ...(s.map.dream ? [251, 247, 236] : [0, 0, 0]));
    s.time.delayedCall(250, () => s.arrived());
  }

  // slide cards: shown one after another; E / Space / Enter advances, Esc skips the rest
  let cardList = null, cardIdx = 0, cardDone = null;
  function cards(list, onDone) {
    cardList = list; cardIdx = 0; cardDone = onDone;
    showCard();
  }
  function showCard() {
    const c = cardList[cardIdx];
    $('c-kicker').textContent = c.kicker || '';
    $('c-head').textContent = c.heading || '';
    const q = $('c-quote');
    q.style.display = c.quote ? 'block' : 'none';
    q.textContent = c.quote ? c.quote.lines.join('\n') : '';
    $('c-cite').textContent = c.quote && c.quote.cite ? '(' + c.quote.cite + ')' : '';
    const ul = $('c-points');
    ul.innerHTML = '';
    (c.points || []).forEach((t) => { const li = document.createElement('li'); li.textContent = t; ul.appendChild(li); });
    $('c-step').textContent = cardList.length > 1 ? (cardIdx + 1) + ' / ' + cardList.length : '';
    $('c-audio').style.display = c.audio ? 'inline' : 'none';
    $('slide').classList.add('on');
    playClip(c.audio);
  }
  function endCards() {
    stopAudio();
    $('slide').classList.remove('on');
    const done = cardDone;
    cardList = null; cardDone = null;
    if (done) done();
  }

  function hud(found, zoneName, total) {
    if (zoneName) $('hud-zone').textContent = zoneName;
    $('hud-found').textContent = 'Discovered ' + found + '/' + total;
  }

  function next(text) {
    const el = $('hud-next');
    el.textContent = text;
    el.style.display = text ? '' : 'none';
  }

  function prompt(label, locked) {
    const el = $('prompt');
    if (label) { el.textContent = locked ? label : 'E  ' + label; el.classList.add('on'); } else el.classList.remove('on');
    el.classList.toggle('locked', !!locked);
  }

  // a short message near the top of the screen
  let toastTimer = null;
  function toast(msg) {
    const el = $('toast');
    el.textContent = msg;
    el.classList.add('on');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove('on'), 2400);
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
    playClip(it.audio);
  }

  // plays a recording; returns false (and does nothing) when there is no clip
  function playClip(src, onEnd) {
    stopAudio();
    if (!src) return false;
    audio = new Audio(src);
    if (onEnd) audio.onended = onEnd;
    audio.play().catch(() => { if (onEnd) onEnd(); });
    return true;
  }
  function stopAudio() { if (audio) { audio.onended = null; audio.pause(); audio = null; } }

  function close() {
    stopAudio();
    $('panel').classList.remove('on');
    const wasEnding = openId === 'eachworld';
    openId = null;
    if (wasEnding && CONTENT.finale) cards(CONTENT.finale, showOutro);
    else scene.locked = false;
  }

  // the end screen, styled like the title screen
  let outroUp = false;
  function showOutro() {
    const o = CONTENT.outro;
    if (!o) { scene.locked = false; return; }
    $('outro-h').textContent = o.title;
    $('outro-quote').textContent = (o.quote || '').replace(' / ', '\n');
    $('outro-by').textContent = o.byline || '';
    $('outro-go').textContent = o.prompt || 'PRESS ENTER';
    $('outro').classList.add('on');
    outroUp = true;
  }

  // mini-game overlay: the letters of her name collected so far, and lives left
  function runHud(run) {
    const el = $('runhud'), hint = $('hint');
    if (!hint.dataset.walk) hint.dataset.walk = hint.innerHTML;
    if (!run) { el.classList.remove('on'); hint.innerHTML = hint.dataset.walk; return; }
    hint.textContent = CONTENT.minigame.controls;
    const word = $('run-word');
    word.innerHTML = '';
    [...run.word].forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch;
      if (i < run.got) s.className = 'got';
      word.appendChild(s);
    });
    $('run-lives').textContent = '♥'.repeat(run.lives) + '♡'.repeat(5 - run.lives);
    el.classList.add('on');
  }

  function ride(title, line, dream) {
    const el = $('ride');
    if (!title) { el.classList.remove('on'); return; }
    $('ride-title').textContent = title;
    $('ride-line').textContent = line || '';
    el.classList.toggle('dream', !!dream);
    el.classList.add('on');
  }

  function handleKeys(sc, k) {
    const J = Phaser.Input.Keyboard.JustDown;
    if (titleUp) {
      if (J(k.enter) || J(k.space) || J(k.e)) { titleUp = false; $('title').classList.add('off'); sc.arrived(); }
      return;
    }
    if (outroUp) {
      if (J(k.enter) || J(k.e) || J(k.space)) { outroUp = false; $('outro').classList.remove('on'); scene.locked = false; }
      return;
    }
    if (cardList) {
      if (J(k.esc)) endCards();
      else if (J(k.r)) playClip(cardList[cardIdx].audio);
      else if (J(k.e) || J(k.space) || J(k.enter)) { if (++cardIdx < cardList.length) showCard(); else endCards(); }
      return;
    }
    if (openId) {
      if (J(k.esc) || J(k.e) || J(k.space)) close();
      else if (J(k.r)) playClip(CONTENT.items[openId].audio);
    }
  }

  return { init, bind, hud, next, prompt, toast, open, close, cards, ride, runHud, playClip, stopAudio, handleKeys };
})();
