# Brown Girl Dreaming: Interactive Analysis

A 2D pixel-art game that presents an analysis of identity in Jacqueline Woodson's *Brown Girl Dreaming*. It is the presentation itself: you walk from Ohio to Greenville to Brooklyn, slide cards introduce each part of the argument, and each object opens a verse quote with analysis notes. Narration recordings can be attached to every card, object and trip.

Built with [Phaser 3](https://phaser.io). All pixel art is drawn in code, so there are no image files.

## Run it

Open `index.html` in a browser. No install or server is needed.

The pixel fonts load from Google Fonts, so they need an internet connection. Offline, the game still works with a fallback font.

## Controls

| Key | Action |
| --- | --- |
| Arrows / WASD | Move |
| E / Space | Examine the nearby object, travel, or advance a slide card |
| Esc | Close the panel, or skip the remaining slide cards |
| R | Replay the current recording |
| C | Show this place's slide cards again |
| N / B | Jump to the next / previous zone (crosses between places) |
| Enter | Start from the title screen, or skip a trip |

## The presentation

| Place | Slide cards | Objects |
| --- | --- | --- |
| **Ohio** (Columbus and Nelsonville, in snow) | Introduction · What is identity? | The Birth Certificate · A Girl Named Jack (the pram) · The Family Photographs (the Nelsonville house) |
| **Greenville** | Inherited, and divided | The Porch Swing · Red Dirt · The Willow Switch · The Bus Seat |
| **Brooklyn** (Madison Street) | Finding her voice | P.S. 106 · The Library · The Composition Notebook · The Pink Factory Wall |
| **The Page** (ending) | Conclusion · Works cited | Each World (the desk) |

To travel, walk to a Greyhound (blue marker) and press E. **Checkpoints:** the way forward out of each place (the bus out of Ohio and out of Greenville, and the oak tree in Brooklyn) stays locked until every yellow marker there has been examined. Going back to an earlier place is always allowed, and N won't skip ahead past an unfinished place either. The message lives under `gate` in `src/content.js`. In Brooklyn, sit beneath the oak tree to reach the ending. The cards show the first time you arrive in each place. After "Each World", the conclusion and works-cited cards play, then a "The End" screen (Enter returns to the page).

### Mini-game: The Fastest Girl on Madison Street

The green marker by the hopscotch in Brooklyn starts a three-lane runner down Madison Street, based on the poem "tomboy". Collect the letters of her full name, J-A-C-Q-U-E-L-I-N-E, in order. Use ← / → to change lanes and ↑ or Space to jump over broken bottles, jump ropes and hydrants, and dodge the parked cars. Five hits brings "Hope Dell Jackie—inside! / the game is over." Esc returns to the block at any time. Its text lives under `minigame` in `src/content.js`.

The analysis text is a **draft**. See `pdfs/analysis draft.md` for the overview behind it.

## Where to put your content

Every word shown in the game comes from `src/content.js`. Nothing is hard-coded elsewhere.

- `title`, `subtitle`, `byline`: the title screen.
- `scenes`: each place's name and its slide `cards`. Each card has a `kicker`, `heading`, optional `quote`, `points` and `audio`.
- `rides`: each trip's prompt label, title card, one line of text, and optional `audio`. When audio is set, the trip lasts until the recording ends.
- `zones`: the spots that N and B jump between, in presentation order.
- `items`: one entry per examinable object, each with a `title`, a `quote` (lines and citation), an `analysis` (bullet points under headings) and an optional `audio`.

Quotes are cited by poem title and Part, because the ebook has no print page numbers.

## Narration

The `audio/` folder holds a **draft narration**: a computer voice (Microsoft "Andrew", made with edge-tts) reading `pdfs/entire script.md`. It has 20 clips, about 16 minutes in total. Each clip plays automatically when its card, object or trip opens, and R replays it.

To use your own voice, record each segment of the script and save it over the draft file **with the same name** (for example `audio/03-certificate.mp3`). Nothing else needs to change. For a different file name or format, update the matching `audio` field in `src/content.js`.

## Project layout

```
index.html        page, styling, title screen, panel, slide-card and trip-card markup
src/content.js    all text and audio paths (edit this)
src/maps.js       each place's ground, scenery and interactable spots
src/main.js       player, interaction, slide cards, zone hotkeys, trip scene
src/sprites.js    pixel art, drawn in code
src/ui.js         title card, HUD, panels, slide cards, trip card, audio
vendor/           Phaser engine (local copy)
pdfs/             the book, class handouts, and analysis notes
```

## Adding a new object

1. Add an entry under `items` in `src/content.js`.
2. Add a spot to that place's `spots` list in `src/maps.js` with the same `id`, a sprite name (or `null` to mark part of a building), and a position.
3. If it needs new art, add a texture in `src/sprites.js`.

## Adding a new place

1. Add a layout to `MAPS` in `src/maps.js` with `bg`, `spots` and a `build` function. The order of `MAPS` is the journey order.
2. Add it under `scenes`, give it at least one zone in `zones` (you arrive at its first zone), and add its trips under `rides` in `src/content.js`.
3. Give some place a spot with `travel: '<new place id>'` so you can get there.

## Screenshot shortcuts

Add `?go` to the URL to skip the title screen, `?go&open=notebook` to open an item's panel directly, and `?scene=brooklyn` to start in another place.
