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

## Where to put your content

Every word shown in the game comes from `src/content.js`. Nothing is hard-coded elsewhere.

- `title`, `subtitle`, `byline`: the title screen.
- `zones`: the spots that N and B jump between (name plus pixel position).
- `items`: one entry per examinable object, each with a `title`, a `quote` (lines and citation), an `analysis` (bullet points under headings), and an optional `audio` file path.

Quotes must be copied from your own copy of the book, with page numbers. The current text is placeholder only.

To add audio, put a recording in an `audio/` folder and set the item's `audio` field, for example `'audio/notebook.mp3'`.

## Project layout

```
index.html        page, styling, title screen, panel markup
src/content.js    all text and audio paths (edit this)
src/main.js       world layout, player, interaction, zone hotkeys
src/sprites.js    pixel art, drawn in code
src/ui.js         title card, HUD, interaction panel
vendor/           Phaser engine (local copy)
```

## Adding a new object

1. Add an entry under `items` in `src/content.js`.
2. Add a matching line to the `SPOTS` list at the top of `src/main.js` with the same `id`, a sprite name, and a position.
3. If it needs new art, add a texture in `src/sprites.js`.

## Screenshot shortcut

Add `?go` to the URL to skip the title screen, and `?go&open=notebook` to open an item's panel directly.
