// ALL words shown in the game live here. This is YOUR file.
// Quotes are copied from the book and cited by poem title + Part (the ebook has no print page numbers).
// Analysis bullets and slide cards are a DRAFT, to be replaced by Mihir's final analysis.
// Audio paths point to your own recordings, e.g. 'audio/ohio-intro.mp3'. Leave null for none.
window.CONTENT = {
  title: 'Brown Girl Dreaming',
  subtitle: 'Claiming an identity: an interactive analysis',
  byline: 'Mihir Prabhat',

  // Shown when you try to leave a place before examining every yellow marker in it.
  gate: 'Discover every yellow marker here first ({done} / {total})',

  // One entry per place, in journey order. `cards` are the slides shown on first arrival (C shows them again).
  scenes: {
    ohio: {
      name: 'Columbus, Ohio',
      cards: [
        {
          kicker: 'INTRODUCTION',
          heading: 'Brown Girl Dreaming',
          quote: { lines: ['I do not yet know who I’ll be', 'what I’ll say', 'how I’ll say it . . .'], cite: '“second daughter’s second day on earth,” Part I' },
          points: [
            'A memoir in verse by Jacqueline Woodson (2014): her childhood in Ohio, South Carolina and Brooklyn, from 1963 into the 1970s.',
            'This project traces one theme, identity, and how finding her voice completes it.',
            'Why a game: the book is a journey between places, so we walk it. Ohio, then Greenville, then Brooklyn.',
          ],
          audio: 'audio/01-intro.mp3',
        },
        {
          kicker: 'THEME · IDENTITY',
          heading: 'What is identity?',
          points: [
            'From the Latin idem, “the same”: identity means belonging and being distinct at the same time.',
            'Working definition: identity is what you inherit from others, made your own by the story you choose to tell about it.',
            'Why it matters: before Jackie can speak, the world has already labelled her. The book follows her from being named to naming herself.',
          ],
          audio: 'audio/02-identity.mp3',
        },
      ],
    },
    greenville: {
      name: 'Greenville, South Carolina',
      cards: [
        {
          kicker: 'PARTS II & IV · GREENVILLE',
          heading: 'Inherited, and divided',
          quote: { lines: ['Will we always have to choose', 'between home', '', 'and home?'], cite: '“halfway home #1,” Part II' },
          points: [
            'In the South she inherits a family, a land and a history. She becomes “Gunnar’s child.”',
            'She also learns she is split: Northern speech, a Southern home, a segregated bus.',
            'Du Bois called this “double consciousness”: seeing yourself through the eyes of others.',
          ],
          audio: 'audio/07-greenville.mp3',
        },
      ],
    },
    brooklyn: {
      name: 'Brooklyn, New York',
      cards: [
        {
          kicker: 'THEME · VOICE',
          heading: 'Finding her voice',
          quote: { lines: ['And I know now', 'words are my Tingalayo. Words are my brilliance.'], cite: '“the selfish giant,” Part IV' },
          points: [
            'School, family and faith keep correcting how she reads, writes and speaks.',
            'Feminist lens: at the Kingdom Hall, women may not stand alone and tell God’s story.',
            'Writing becomes the one place where no one else gets to name her.',
          ],
          audio: 'audio/13-brooklyn.mp3',
        },
      ],
    },
    // The ending has no arrival cards: its conclusion plays after you examine "Each World" (see items.eachworld.then).
    ending: { name: 'The Page', cards: [] },
  },

  // The end screen, shown after the works cited card. Enter returns to the page.
  outro: {
    title: 'The End',
    quote: '“My name is Jacqueline Woodson / and I am ready for the ride.”',
    byline: 'Brown Girl Dreaming: an interactive analysis by Mihir Prabhat',
    prompt: 'PRESS ENTER',
  },

  // Mini-game on Madison Street (the green marker by the hopscotch).
  minigame: {
    label: 'Race down Madison Street',
    word: 'JACQUELINE',
    controls: 'Lanes: ← / →  ·  Jump: ↑ or Space  ·  Back to the block: Esc',
    intro: {
      kicker: 'MINI-GAME · MADISON STREET',
      heading: 'The fastest girl on Madison Street',
      quote: { lines: ['Never learns to sprint', 'barefoot down the block', 'to become', 'the fastest girl', 'on Madison Street.'], cite: '“tomboy,” Part IV' },
      points: [
        'Collect the letters of her full name, in order: J-A-C-Q-U-E-L-I-N-E.',
        '← / → change lanes. ↑ or Space jumps over bottles, jump ropes and hydrants. Dodge the parked cars.',
        'Five hits and the game is over. Take your time: the street is slow. Esc goes back to the block.',
      ],
      audio: null,
    },
    win: {
      kicker: 'YOU WROTE HER NAME',
      heading: 'JACQUELINE',
      quote: { lines: ['But I do and because of this', 'Tomboy becomes my new name.'], cite: '“tomboy,” Part IV' },
      points: [
        'Even on the block, other people hand her a new name: “Tomboy.”',
        'But you just spelled the one she claims for herself.',
      ],
      audio: null,
    },
    lose: {
      kicker: 'GAME OVER',
      heading: 'Hope Dell Jackie—inside!',
      quote: { lines: ['When my mother calls,', 'Hope Dell Jackie—inside!', 'the game is over.'], cite: '“game over,” Part IV' },
      points: ['Press E to race again.'],
      audio: null,
    },
  },

  // Shown after closing the "Each World" panel: the conclusion and works cited.
  finale: [
    {
      kicker: 'CONCLUSION',
      heading: 'From being named to naming herself',
      quote: { lines: ['My name is Jacqueline Woodson', 'and I am ready for the ride.'], cite: '“the revolution,” Part V' },
      points: [
        'Ohio: identity is given (a certificate, a nickname, a face in old photographs).',
        'Greenville: it is inherited, and divided. Brooklyn: it is claimed, through her voice.',
        'The book moves from the passive “I am born” to the active “You decide.”',
      ],
      audio: 'audio/20-conclusion.mp3',
    },
    {
      kicker: 'THANK YOU',
      heading: 'Works cited',
      points: [
        'Woodson, Jacqueline. Brown Girl Dreaming. Nancy Paulsen Books, 2014.',
        'Donne, John. “Meditation XVII.” Devotions upon Emergent Occasions, 1624.',
        'Du Bois, W. E. B. The Souls of Black Folk. A. C. McClurg, 1903.',
        'Bishop, Rudine Sims. “Mirrors, Windows, and Sliding Glass Doors.” Perspectives, vol. 6, no. 3, 1990.',
        'Steptoe, John. Stevie. Harper & Row, 1969.',
      ],
      audio: null,
    },
  ],

  // Trips between places: prompt label, title card, one line, optional recording.
  rides: {
    'ohio>greenville': {
      label: 'Ride the Greyhound south',
      title: 'Columbus  →  Greenville',
      line: '“Each winter / just as the first of the snow begins to fall, / my mother goes home to South Carolina.”  (“each winter,” Part I)',
      audio: 'audio/06-ride-south.mp3',
    },
    'greenville>brooklyn': {
      label: 'Ride the Greyhound north',
      title: 'Greenville  →  New York City',
      line: '“Will there always be a road? / Will there always be a bus?”  (“halfway home #1,” Part II)',
      audio: 'audio/12-ride-north.mp3',
    },
    'brooklyn>greenville': {
      label: 'Ride the Greyhound south',
      title: 'New York City  →  Greenville',
      line: '“Our feet are beginning to belong / in two different worlds”  (“mrs. hughes’s house,” Part III)',
      audio: null,
    },
    'greenville>ohio': { label: 'Travel', title: 'Greenville  →  Columbus', line: '', audio: null },
    'brooklyn>ending': {
      label: 'Sit beneath the oak tree',
      title: 'Beneath the oak tree',
      line: '“When I sit beneath / the shade of my block’s oak tree / the world disappears.”  (“how to listen #6,” Part IV)',
      audio: 'audio/18-ride-oak.mp3',
    },
    'ending>brooklyn': { label: 'Stand up', title: 'Back to Madison Street', line: '', audio: null },
    'ending>ohio': { label: 'Begin again', title: 'Back to the beginning', line: '', audio: null },
  },

  // Zones are the spots N / B jump between, in presentation order. (x, y) are pixel positions.
  zones: [
    { id: 'hospital', scene: 'ohio', name: 'University Hospital', x: 368, y: 138 },
    { id: 'nelsonville', scene: 'ohio', name: 'The Nelsonville House', x: 96, y: 128 },
    { id: 'roadsouth', scene: 'ohio', name: 'The Road South', x: 380, y: 170 },
    { id: 'porch', scene: 'greenville', name: 'The Porch', x: 120, y: 118 },
    { id: 'dirt', scene: 'greenville', name: 'Red Dirt Yard', x: 200, y: 168 },
    { id: 'willow', scene: 'greenville', name: 'The Willow Tree', x: 110, y: 228 },
    { id: 'busstop', scene: 'greenville', name: 'The Bus Stop', x: 340, y: 262 },
    { id: 'madison', scene: 'brooklyn', name: 'Madison Street', x: 110, y: 140 },
    { id: 'ps106', scene: 'brooklyn', name: 'P.S. 106', x: 352, y: 132 },
    { id: 'oak', scene: 'brooklyn', name: 'The Oak Tree', x: 300, y: 178 },
    { id: 'corner', scene: 'brooklyn', name: 'The Factory Corner', x: 420, y: 140 },
    { id: 'page', scene: 'ending', name: 'The Page', x: 240, y: 230 },
  ],

  items: {
    // ---------------- Ohio: being named ----------------
    certificate: {
      title: 'The Birth Certificate',
      quote: {
        lines: [
          'My birth certificate says: Female Negro',
          'Mother: Mary Anne Irby, 22, Negro',
          'Father: Jack Austin Woodson, 25, Negro',
          '', '. . .', '',
          'I am born Negro here and Colored there',
          '', '. . .', '',
          'Another Buckeye!',
          'the nurse says to my mother.',
          'Already, I am being named for this place.',
        ],
        cite: '“second daughter’s second day on earth,” Part I',
      },
      analysis: {
        Devices: [
          'Repetition: “Negro” three times in three lines. The label is stamped again and again.',
          'Parallelism: “Negro here and Colored there.” The name changes with the place, not the person.',
        ],
        Identity: [
          'Her first identity is written by others: race and gender on a form, then a state nickname.',
          '“I am being named” is passive. She is named before she can speak.',
        ],
        Lens: ['Historical: 1963, the year of Birmingham and the March on Washington. Official papers still sort people by race.'],
      },
      audio: 'audio/03-certificate.mp3',
    },
    jack: {
      title: 'A Girl Named Jack',
      quote: {
        lines: [
          'Name a girl Jack, my father said,',
          'and she can’t help but',
          'grow up strong.',
          'Raise her right, my father said,',
          'and she’ll make that name her own.',
          '', '. . .', '',
          'Jacqueline, just in case',
          'I grew up and wanted something a little bit longer',
          'and further away from',
          'Jack.',
        ],
        cite: '“a girl named jack,” Part I',
      },
      analysis: {
        Devices: [
          'Natural speech: the argument is told in her parents’ own voices.',
          'Line break: “Jack.” stands alone on the last line, set apart, like the father who later leaves.',
        ],
        Identity: [
          'Her name is a fight between her parents before it is hers.',
          '“She’ll make that name her own” previews the whole book: a given name, later claimed.',
        ],
        Lens: ['Gender: a “boy’s” name is supposed to make a girl strong; her mother adds letters to put distance from it.'],
      },
      audio: 'audio/04-jack.mp3',
    },
    photos: {
      title: 'The Family Photographs',
      quote: {
        lines: [
          'Look closely. There I am',
          'in the furrow of Jack’s brow,',
          'in the slyness of Alicia’s smile,',
          'in the bend of Grace’s hand . . .',
          '',
          'There I am . . .',
          'Beginning.',
        ],
        cite: '“the ghosts of the nelsonville house,” Part I',
      },
      analysis: {
        Devices: [
          'Repetition: “There I am” twice. She finds herself inside other people.',
          'Imagery: brow, smile, hand. Inheritance is shown through the body.',
        ],
        Identity: [
          'Identity as inheritance: she exists in her family before she is born (the Donne side of the argument).',
          '“Beginning.” sits alone on its line. Inheritance is where identity starts, not where it ends.',
        ],
        Lens: ['Historical: the Woodsons trace their line back to Thomas Woodson, and a great-great-grandfather fought in the Civil War. This family keeps its own records.'],
      },
      audio: 'audio/05-photos.mp3',
    },

    // ---------------- Greenville: inherited, and divided ----------------
    swing: {
      title: 'The Porch Swing',
      quote: {
        lines: [
          'In South Carolina, we become',
          'The Grandchildren',
          'Gunnar’s Three Little Ones',
          'Sister Irby’s Grands',
          'MaryAnn’s Babies',
          '',
          'And when we are called by our names',
          'my grandmother',
          'makes them all one',
          'HopeDellJackie',
          'but my grandfather',
          'takes his sweet time, saying each',
          'as if he has all day long',
          '',
          'or a whole lifetime.',
        ],
        cite: '“our names,” Part II',
      },
      analysis: {
        Devices: [
          'Listing: four new names, each defined by who they belong to.',
          'Word play: “HopeDellJackie” runs three names into one word.',
        ],
        Identity: [
          'A new place means new names: in the South she belongs to the family first.',
          'Two ways of naming: her grandmother merges them, her grandfather lets each child be distinct. Sameness versus distinctness.',
        ],
        Lens: ['Oral tradition: her grandfather gives each name “a whole lifetime.”'],
      },
      audio: 'audio/08-swing.mp3',
    },
    reddirt: {
      title: 'Red Dirt',
      quote: {
        lines: [
          'My father, whose reddish-brown skin',
          'would later remind me',
          'of the red dirt of the South',
          'and all that was rich about it, standing',
          'in the yard, one hand',
          'on the black metal railing, the other lifting',
          'into a weak wave good-bye.',
        ],
        cite: '“leaving columbus,” Part I',
      },
      analysis: {
        Devices: [
          'Imagery of place: skin is compared to soil, linking the body and the land.',
          'Connotation: “rich” means both fertile and valuable.',
        ],
        Identity: [
          'She inherits the South even through the father who rejected it (“You can keep your South”).',
          'Red dirt becomes her image of home. It returns in Brooklyn: “they were red dirt and pine trees.”',
        ],
        Lens: ['Historical: the land her great-grandparents worked unpaid becomes, for her, something rich.'],
      },
      audio: 'audio/09-reddirt.mp3',
    },
    switch: {
      title: 'The Willow Switch',
      quote: {
        lines: [
          'You will never, my mother says,',
          'say ain’t in this house.',
          '', '. . .', '',
          'You are from the North, our mother says.',
          'You know the right way to speak.',
          '',
          'As the switch raises dark welts on my brother’s legs',
          'Dell and I look on',
          'afraid to open our mouths. Fearing the South',
          'will slip out or',
          'into them.',
        ],
        cite: '“the right way to speak,” Part II',
      },
      analysis: {
        Devices: [
          'Personification: the South can “slip out or / into” a mouth, as if speech were a border.',
          'Natural speech: the banned words (ain’t, y’all, ma’am) are listed in the poem itself.',
        ],
        Identity: [
          'Divided identity: the children are told they are Northern while living in the South.',
          'Her voice is controlled before it is found. They are “afraid to open our mouths.”',
        ],
        Lens: ['Historical: “ma’am” is banned as a memory of “southern subservient days.” The rules protect as much as they control.'],
      },
      audio: 'audio/10-switch.mp3',
    },
    bus: {
      title: 'The Bus Seat',
      quote: {
        lines: [
          'This isn’t Ohio, my mother says,',
          'as though we understand.',
          '', '. . .', '',
          'COLOREDS TO THE BACK!',
          '', '. . .', '',
          'We’re as good as anybody,',
          'my mother whispers.',
          '',
          'As good as anybody.',
        ],
        cite: '“greenville, south carolina, 1963,” Part I',
      },
      analysis: {
        Devices: [
          'Capitals: “COLOREDS TO THE BACK!” is the sign’s voice, loud and official.',
          'Repetition: “As good as anybody” is whispered, then repeated as a line of its own.',
        ],
        Identity: [
          'Two identities collide: the label the South gives them and the worth their mother insists on.',
          'A whisper against a sign: the first time a quiet voice pushes back against a loud label.',
        ],
        Lens: ['Historical: Jim Crow buses in 1963, seven years after Rosa Parks, whom the first poem names.'],
      },
      audio: 'audio/11-bus.mp3',
    },

    // ---------------- Brooklyn: voice ----------------
    school: {
      title: 'P.S. 106',
      quote: {
        lines: [
          'But Ms. Moskowitz stops me, says,',
          'In cursive too, please. But the q in Jacqueline is too hard',
          'so I write Jackie Woodson for the first time.',
          '', '. . .', '',
          'Is that what you want us to call you?',
          '',
          'I want to say, No, my name is Jacqueline',
          'but I am scared of that cursive q, know',
          'I may never be able to connect it to c and u',
          'so I nod even though',
          'I am lying.',
        ],
        cite: '“late autumn,” Part IV',
      },
      analysis: {
        Devices: [
          'Enjambment: “so I nod even though / I am lying” splits what she does from what is true.',
          'Word play: one letter, q, stands between her and her full name.',
        ],
        Identity: [
          'A school rule renames her. She ends up as “Jackie” out of fear, not choice.',
          'Contrast with “on paper”: there, she writes her full name freely.',
        ],
        Lens: ['Literacy norms: school decides what counts as correct writing, and a child pays for it with her name.'],
      },
      audio: 'audio/14-school.mp3',
    },
    library: {
      title: 'The Library',
      quote: {
        lines: [
          'If someone had taken',
          'that book out of my hand',
          'said, You’re too old for this',
          'maybe',
          'I’d never have believed',
          'that someone who looked like me',
          'could be in the pages of the book',
          'that someone who looked like me',
          'had a story.',
        ],
        cite: '“stevie and me,” Part IV',
      },
      analysis: {
        Devices: [
          'Repetition: “someone who looked like me” twice. The discovery lands twice.',
          'Intertextuality: she quotes the picture book Stevie inside her own poem.',
        ],
        Identity: [
          'She can only imagine having a voice once she sees herself in a book.',
          '“had a story”: identity becomes something that can be written.',
        ],
        Lens: ['Literacy norms: “You’re too old for this.” Reading levels nearly took away the book that mattered most.'],
      },
      audio: 'audio/15-library.mp3',
    },
    notebook: {
      title: 'The Composition Notebook',
      quote: {
        lines: [
          'The first time I write my full name',
          '',
          'Jacqueline Amanda Woodson',
          '',
          'without anybody’s help',
          'on a clean white page in my composition notebook,',
          '',
          '   I know',
          '',
          'if I wanted to',
          '',
          'I could write anything.',
          '',
          'Letters becoming words, words gathering meaning, becoming',
          'thoughts outside my head',
          '',
          'becoming sentences',
          '',
          'written by',
          '',
          '                    Jacqueline Amanda Woodson',
        ],
        cite: '“on paper,” Part III',
      },
      analysis: {
        Devices: [
          'White space: “I know” gets a line of its own.',
          'Gradation: letters, words, meaning, thoughts, sentences. Each step is bigger than the last.',
          'Structure: the poem ends like a book cover, “written by” and her full name.',
        ],
        Identity: [
          'The opposite of the birth certificate: this time she writes her own name.',
          'Her full name, not “Jackie”: the identity she claims for herself.',
        ],
        Lens: ['Voice as agency: writing turns private thoughts into something that lasts. “On paper, things can live forever.”'],
      },
      audio: 'audio/16-notebook.mp3',
    },
    wall: {
      title: 'The Pink Factory Wall',
      quote: {
        lines: [
          'But me and Maria only know the ground, only know',
          'the factory on the corner with its newly painted',
          'bright pink wall. Only know the way my heart jumps',
          'as I press the button down, hear the hiss of paint, watch',
          'J-A-C- begin.',
          '', '. . .', '',
          'wish I knew how to say,',
          'Just let me write—everywhere!',
          '', '. . .', '',
          'They’re just words, I whisper.',
          'They’re not trying to hurt anybody!',
        ],
        cite: '“graffiti,” Part IV',
      },
      analysis: {
        Devices: [
          'Repetition: “only know” three times. She is small, but determined.',
          'Line break: “J-A-C- begin.” Her name is cut off mid-word when her uncle stops her.',
        ],
        Identity: [
          'She wants her name to be “a part of the history,” like the tags on the roofs and subway cars.',
          'Her voice is policed again, this time by family: writing in the wrong place is a crime.',
        ],
        Lens: ['She rejects the idea that words are weapons: “They’re just words … not trying to hurt anybody.”'],
      },
      audio: 'audio/17-wall.mp3',
    },

    // ---------------- The Page: conclusion ----------------
    eachworld: {
      title: 'Each World',
      quote: {
        lines: [
          'And all the worlds you are—',
          'Ohio and Greenville',
          'Woodson and Irby',
          'Gunnar’s child and Jack’s daughter',
          'Jehovah’s Witness and nonbeliever',
          'listener and writer',
          'Jackie and Jacqueline—',
          '',
          'gather into one world',
          'called You',
          '',
          'where You decide',
          '',
          'what each world',
          'and each story',
          'and each ending',
          '',
          'will finally be.',
        ],
        cite: '“each world,” Part V',
      },
      analysis: {
        Devices: [
          'Parallelism: six “X and Y” pairs. Every contradiction is kept, and none is chosen.',
          'Second person: “You” replaces “I,” inviting the reader to do the same.',
          'Structure: the last poem answers the first. “I do not yet know who I’ll be” becomes “where You decide.”',
        ],
        Identity: [
          'The working definition in her own words: inherited worlds (Woodson, Irby, Ohio, Greenville), gathered and authored by “You.”',
          'Others give her the pieces, and she writes the whole. Donne and agency are both true.',
        ],
        Lens: ['Voice completes identity: the deciding happens through “each story / and each ending.” The writer decides.'],
      },
      audio: 'audio/19-eachworld.mp3',
    },
  },
};
