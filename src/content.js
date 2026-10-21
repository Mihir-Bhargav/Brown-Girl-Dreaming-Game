// ALL words shown in the game live here. This is YOUR file.
// Everything below is PLACEHOLDER only: no analysis has been written.
// Quotes are cited by poem title + Part (the ebook has no print page numbers).
// Audio paths point to your own recordings, e.g. 'audio/notebook.mp3'.
window.CONTENT = {
  title: 'Brown Girl Dreaming',
  subtitle: 'An interactive analysis',
  byline: 'Mihir Prabhat',

  // One entry per place. `audio` plays when you arrive (e.g. your theme intro).
  scenes: {
    greenville: { name: 'Greenville, South Carolina', audio: null },
    brooklyn: { name: 'Brooklyn, New York', audio: null },
  },

  // The bus rides between places: prompt label, title card, one line, optional recording.
  rides: {
    'greenville>brooklyn': {
      label: 'Ride the Greyhound north',
      title: 'Greenville  →  New York City',
      line: '[PLACEHOLDER: a line for the ride north]',
      audio: null,
    },
    'brooklyn>greenville': {
      label: 'Ride the Greyhound south',
      title: 'New York City  →  Greenville',
      line: '[PLACEHOLDER: a line for the ride south]',
      audio: null,
    },
  },

  // Zones are the spots N / B jump between, in presentation order. (x, y) are pixel positions.
  zones: [
    { id: 'porch', scene: 'greenville', name: 'The Porch', x: 120, y: 118 },
    { id: 'dirt', scene: 'greenville', name: 'Red Dirt Yard', x: 200, y: 168 },
    { id: 'busstop', scene: 'greenville', name: 'The Bus Stop', x: 340, y: 262 },
    { id: 'madison', scene: 'brooklyn', name: 'Madison Street', x: 110, y: 140 },
    { id: 'pump', scene: 'brooklyn', name: 'The Johnny Pump', x: 180, y: 258 },
    { id: 'oak', scene: 'brooklyn', name: 'The Oak Tree', x: 286, y: 176 },
    { id: 'corner', scene: 'brooklyn', name: 'The Factory Corner', x: 420, y: 140 },
  ],

  items: {
    // ---- Greenville ----
    swing: {
      title: 'The Porch Swing',
      quote: { lines: ['[PLACEHOLDER: paste verse here,', ' keeping the book\'s line breaks]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
    reddirt: {
      title: 'Red Dirt',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
    bus: {
      title: 'The Bus Seat',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },

    // ---- Brooklyn ----
    library: {
      title: 'The Library',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
    pump: {
      title: 'The Johnny Pump',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
    notebook: {
      title: 'The Composition Notebook',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
    wall: {
      title: 'The Pink Factory Wall',
      quote: { lines: ['[PLACEHOLDER: paste verse here]'], cite: '"poem title," Part __' },
      analysis: {
        Structure: ['[...]'],
        Motif: ['[...]'],
        'Critical Lens': ['[...]'],
      },
      audio: null,
    },
  },
};
