# Brown Girl Dreaming: Interactive Analysis

A 2D pixel-art game that presents an analysis of Jacqueline Woodson's *Brown Girl Dreaming*. You walk around a world, examine objects tied to moments and symbols in the book, and each one opens a panel with a verse quote and analysis notes.

Built with [Phaser 3](https://phaser.io). All pixel art is drawn in code, so there are no image files.

## Run it

Open `index.html` in a browser. No install or server is needed.

The pixel fonts load from Google Fonts, so they need an internet connection. Offline, the game still works with a fallback font.

## Controls

| Key | Action |
| --- | --- |
| Arrows / WASD | Move |
| E / Space | Examine the nearby object (and close the panel) |
| Esc | Close the panel |
| R | Replay audio (when an item has audio) |
| N / B | Jump to the next / previous zone |
| Enter | Start from the title screen |

## Scenes

The world has two scenes so far: **Greenville** (the porch, red dirt, the bus stop) and **Brooklyn** (Madison Street, the library, the johnny pump, the oak tree with the composition notebook, the pink factory wall). Walk up to the Greyhound (blue marker) and press E to ride between them. The ride shows a title card, and E / Enter skips it.

## Where to put your content

Every word shown in the game comes from `src/content.js`. Nothing is hard-coded elsewhere.

- `title`, `subtitle`, `byline`: the title screen.
- `scenes`: each place's name, plus an optional `audio` recording that plays on arrival (for example, a theme intro).
- `rides`: each bus ride's prompt label, title card, one line of text, and optional `audio`. When audio is set, the ride lasts until the recording ends.
- `zones`: the spots that N and B jump between, in presentation order. Each zone names its scene, so N / B can jump across scenes by bus.
- `items`: one entry per examinable object, each with a `title`, a `quote` (lines and citation), an `analysis` (bullet points under headings), and an optional `audio` file path.

Cite quotes by poem title and Part (the ebook has no print page numbers). The current text is placeholder only.

To add audio, put a recording in an `audio/` folder and set the `audio` field, for example `'audio/notebook.mp3'`.

## Project layout

```
index.html        page, styling, title screen, panel and ride-card markup
src/content.js    all text and audio paths (edit this)
src/maps.js       each scene's ground, scenery and interactable spots
src/main.js       player, interaction, zone hotkeys, bus-ride scene
src/sprites.js    pixel art, drawn in code
src/ui.js         title card, HUD, interaction panel, ride card, audio
vendor/           Phaser engine (local copy)
```

## Adding a new object

1. Add an entry under `items` in `src/content.js`.
2. Add a spot to that scene's `spots` list in `src/maps.js` with the same `id`, a sprite name (or `null` to mark part of a building), and a position.
3. If it needs new art, add a texture in `src/sprites.js`.

## Adding a new scene

1. Add a layout to `MAPS` in `src/maps.js` with `bg`, `arrive` (where the bus drops you off), `spots`, and a `build` function.
2. Add its name under `scenes`, its zones under `zones`, and its rides under `rides` in `src/content.js`.
3. Give some scene a spot with `travel: '<new scene id>'` so you can ride there.

## Screenshot shortcuts

Add `?go` to the URL to skip the title screen, `?go&open=notebook` to open an item's panel directly, and `?scene=brooklyn` to start in another scene.
