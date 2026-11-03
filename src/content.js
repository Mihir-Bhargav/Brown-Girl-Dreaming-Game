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
            'Her voice grows step by step: wanting a voice, an inner voice, imagining her story, writing privately, writing publicly, and finally deciding.',
            'Feminist lens: at the Kingdom Hall, women may not stand alone and tell God’s story, so she promises one day to “stand when I tell it.”',
            'Words become her hidden gift, like her brother’s singing.',
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
        'Greenville: it is inherited, and divided. Brooklyn: her voice grows step by step until she claims it.',
        'The book moves from the passive “I am born” to the active “You decide.”',
        'The memoir itself is her final step: “my past, my people, my memories, my story” (author’s note).',
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
          "Repetition: “Negro” three times in three lines, like a stamp on a form.",
          "Parallelism: “Negro here and Colored there.” The label changes with the place, not the person.",
        ],
        Identity: [
          "Her first identity is written by others, before she can even speak.",
          "“I am being named” is passive: she is the object of the sentence, not its subject.",
        ],
        Lens: [
          "Historical: in 1963, the year of the Birmingham campaign and the March on Washington, the law still sorted people by race. The labels on her certificate come from that system, not from her.",
        ],
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
          "Natural speech: her parents argue in their own words.",
          "Enjambment: “Jack.” sits alone on the last line, set apart like the father who later leaves.",
        ],
        Identity: [
          "Her name is a fight between her parents before it is hers.",
          "Foreshadowing: “she’ll make that name her own” predicts the whole book.",
        ],
        Lens: [
          "Gender: her father thinks a boy’s name will make a girl strong, and her mother adds letters to soften it. Even her name carries ideas about what girls should be.",
        ],
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
          "Repetition: “There I am” twice. She finds herself in other people.",
          "Imagery: a brow, a smile, a hand. Inheritance is shown through the body.",
        ],
        Identity: [
          "The inherited half of the definition: she exists in her family before she is born.",
          "“Beginning.” sits alone on its line. Inheritance is the start, not the end.",
        ],
        Lens: [
          "Historical: the Woodsons keep their long family history “in Bibles, in stories” (“the woodsons of ohio”). For a Black family in America, holding on to that history is a way of deciding who you are when others try to define you.",
        ],
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
          "Listing: four new names, each about who she belongs to.",
          "Word play: “HopeDellJackie” fuses three names into one word.",
        ],
        Identity: [
          "A new place gives her new names: in the South she belongs to the family first.",
          "Her grandmother merges the names and her grandfather says each one slowly: sameness versus distinctness.",
        ],
        Lens: [
          "Oral tradition: in the South, identity is passed on by speaking, through names, stories and songs. Her grandfather saying each name “as if he has all day long” shows that being named out loud is a way of being valued.",
        ],
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
          "Imagery of place: skin is compared to soil, linking her father’s body to the land.",
          "Connotation: “rich” means both fertile and valuable.",
        ],
        Identity: [
          "She inherits the South through her father, even though he rejected it (“You can keep your South”).",
          "Red dirt becomes her image of home. It returns in Brooklyn: “they were red dirt and pine trees.”",
        ],
        Lens: [
          "Historical: for many Black families, Southern land was tied to slavery and hard, unpaid labour. By calling it “rich,” Jackie sees value in a place her family had every reason to leave.",
        ],
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
          "Imagery: the weeping willow becomes a switch, and then the boy starts to cry.",
          "Personification: the South could “slip out or / into” a mouth, as if speech were a border.",
        ],
        Identity: [
          "Divided identity: the children are told they are Northern while living in the South.",
          "Her voice is shaped before she finds it: they are “afraid to open our mouths.”",
        ],
        Lens: [
          "Historical: “ma’am” is banned as a memory of “southern subservient days,” when Black people had to bow to white people. The strict rules protect the children’s dignity as much as they control them.",
        ],
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
          "Capitals: “COLOREDS TO THE BACK!” reads like a loud, official sign.",
          "Repetition: “As good as anybody” is whispered, then repeated on a line of its own.",
        ],
        Identity: [
          "Two identities clash: the label the South gives them and the worth their mother insists on.",
          "The first time in the book a quiet voice pushes back against a loud label.",
        ],
        Lens: [
          "Historical: this is 1963, only seven years after Rosa Parks refused to give up her seat. With three small children, Jackie’s mother can’t refuse safely, so she resists the only way she can: with words.",
        ],
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
          "Enjambment: “so I nod even though / I am lying” splits what she does from what is true.",
          "Word play: one letter, q, stands between her and her full name.",
        ],
        Identity: [
          "A school rule renames her “Jackie.”",
          "Step two of her voice: inside she thinks “No, my name is Jacqueline,” even though she can’t say it yet.",
        ],
        Lens: [
          "Literacy norms: the school decides what “correct” writing looks like, and a child pays for it with part of her name.",
        ],
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
          "Repetition: “someone who looked like me” twice.",
          "Conditional: “If someone had taken / that book…” shows how close she came to missing it.",
        ],
        Identity: [
          "Step three of her voice: seeing herself in a book lets her imagine her own story.",
          "The poem ends on “had a story.” Identity becomes something she can write.",
        ],
        Lens: [
          "Representation: Rudine Sims Bishop says books should be mirrors for children. Few books in the 1960s showed Black children, so Stevie shows Jackie that a life like hers is worth a story.",
        ],
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
          "White space: “I know” gets a line of its own.",
          "Gradation: letters, words, meaning, thoughts, sentences, each step bigger than the last.",
          "Structure: the poem ends like a book cover, “written by” and her full name.",
        ],
        Identity: [
          "Step four of her voice: the reverse of the birth certificate. This time she writes her own name.",
          "Her full name, not the school’s “Jackie.”",
        ],
        Lens: [
          "Literacy and power: at school, writing rules took part of her name; here, writing gives it back. As she says in another poem, “on paper, things can live forever.”",
        ],
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
          '',
          '— and, with Maria, in chalk (“fresh air”): —',
          '',
          'Maria & Jackie Best Friends Forever wherever',
          'there is smooth stone.',
          'Write it so many times that it’s hard to walk',
          'on our side',
          'of the street without looking down',
          'and seeing us there.',
        ],
        cite: '“graffiti” and “fresh air,” Part IV',
      },
      analysis: {
        Devices: [
          "Line break: “J-A-C- begin.” Her name is cut off mid-word when her uncle stops her.",
          "Contrast: alone with spray paint she is stopped; with Maria in chalk, their names cover the street (“seeing us there”).",
        ],
        Identity: [
          "Step five of her voice: she takes her name out into the world, wanting it to be “a part of the history.”",
          "Chosen family: Maria isn’t related to her, yet “us” becomes part of who she is.",
        ],
        Lens: [
          "Social: in 1970s Brooklyn, graffiti was how young people without power made their names visible. Jackie wants the same, but her uncle warns “people get arrested / for this,” so even writing her name in public is policed.",
        ],
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
          "Parallelism: six “this and that” pairs. She keeps both sides of every pair.",
          "Second person: “You,” with a capital letter, speaks to herself and to the reader.",
        ],
        Identity: [
          "Step six, full authorship: all her worlds “gather into one world / called You.”",
          "The definition in her own words: inherited worlds, turned into a story she writes herself.",
        ],
        Lens: [
          "Structural: the last poem answers the first. The book opens with “I am born,” where life happens to her, and ends with “You decide.” The shape of the whole book is her journey from being named to naming herself.",
        ],
      },
      audio: 'audio/19-eachworld.mp3',
    },
  },
};
