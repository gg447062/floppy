const { red, green } = require('chalk');
const Moralis = require('moralis/node');
const dotenv = require('dotenv').config();
const serverUrl = process.env.TEST_SERVER_URL;
const appId = process.env.TEST_APP_ID;
const masterKey = process.env.TEST_MASTER_KEY;

const seed = async () => {
  try {
    Moralis.start({ serverUrl, appId, masterKey });

    const samples = [
      {
        name: 'breakbeat',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'breakbeat1',
        bpm: 180,
        playType: 'loop',
        unlocked: true,
        floppy: 0,
      },
      {
        name: 'breakbeat2',
        bpm: 150,
        playType: 'loop',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'breakbeat3',
        bpm: 145,
        playType: 'loop',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'breakbeat4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'breakbeat5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'breakbeat6',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 0,
      },
      {
        name: 'breakbeat7',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 0,
      },
      {
        name: 'bass',
        bpm: 160,
        playType: 'one-shot',
        unlocked: false,
        floppy: 1,
      },
      {
        name: 'bass2',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 1,
      },
      {
        name: 'bass3',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 1,
      },
      {
        name: 'bass4',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 1,
      },
      {
        name: 'bass5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 1,
      },
      {
        name: 'vocal',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 2,
      },
      {
        name: 'vocal2',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 2,
      },
      {
        name: 'vocal3',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 2,
      },
      {
        name: 'vocal4',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 2,
      },
      {
        name: 'vocal5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
        floppy: 2,
      },
      {
        name: 'synth',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 3,
      },
      {
        name: 'synth2',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 3,
      },
      {
        name: 'synth3',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 3,
      },
      {
        name: 'synth4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 3,
      },
      {
        name: 'synth5',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 3,
      },
      {
        name: 'pad',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 4,
      },
      {
        name: 'pad2',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 4,
      },
      {
        name: 'pad3',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 4,
      },
      {
        name: 'pad4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 4,
      },
      {
        name: 'pad5',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
        floppy: 4,
      },
    ];

    for (let i = 0; i < samples.length; i++) {
      const current = samples[i];

      const file = new Moralis.Object('Sample');
      file.set('name', current.name);
      file.set('bpm', current.bpm);
      file.set('playType', current.playType);
      file.set('unlocked', current.unlocked);
      file.set('floppy', current.floppy);
      file.save();
    }

    console.log(green('seeded samples'));
  } catch (error) {
    console.log(red(error));
  }
};

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
    })
    .catch((err) => {
      console.error(red('Something went wrong!'));
      console.error(err);
    });
}
