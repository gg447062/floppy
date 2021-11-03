const samples = {
  floppys: [
    {
      id: 1,
      color: 'green',
      samples: [
        { name: 'breakbeat', bpm: 160, playType: 'loop', unlocked: false },
        { name: 'breakbeat1', bpm: 180, playType: 'loop', unlocked: false },
        { name: 'breakbeat2', bpm: 150, playType: 'loop', unlocked: false },
        {
          name: 'breakbeat3',
          bpm: 1450,
          playType: 'loop',
          unlocked: false,
        },
      ],
    },
    {
      id: 2,
      color: 'yellow',
      samples: [
        { name: 'bass', bpm: 160, playType: 'one-shot', unlocked: false },
        { name: 'vocal', bpm: 160, playType: 'loop', unlocked: false },
        { name: 'synth', bpm: 160, playType: 'one-shot', unlocked: false },
        { name: 'bass2', bpm: 160, playType: 'loop', unlocked: false },
      ],
    },
  ],
};

module.exports = samples;
