const { red, green } = require('chalk');
const { db, Floppy, Sample } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const floppys = [
      { color: 'yellow' },
      { color: 'green' },
      { color: 'purple' },
      { color: 'red' },
      { color: 'blue' },
    ];

    await Floppy.bulkCreate(floppys);
    console.log(green('seeded floppys'));

    const breakbeatSamples = [
      {
        name: 'breakbeat',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'breakbeat1',
        bpm: 180,
        playType: 'loop',
        unlocked: true,
      },
      {
        name: 'breakbeat2',
        bpm: 150,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'breakbeat3',
        bpm: 145,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'breakbeat4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: false,
      },
      {
        name: 'breakbeat5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'breakbeat6',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'breakbeat7',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
    ];

    const bassSamples = [
      {
        name: 'bass',
        bpm: 160,
        playType: 'one-shot',
        unlocked: false,
      },
      {
        name: 'bass2',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'bass3',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'bass4',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'bass5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
    ];

    const vocalSamples = [
      {
        name: 'vocal',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'vocal2',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'vocal3',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'vocal4',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'vocal5',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
    ];

    const synthSamples = [
      {
        name: 'synth',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'synth2',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'synth3',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'synth4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'synth5',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
    ];

    const padSamples = [
      {
        name: 'pad',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'pad2',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'pad3',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'pad4',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'pad5',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
    ];

    const seededBreaks = await Sample.bulkCreate(breakbeatSamples);
    seededBreaks.forEach(async (sample) => {
      await sample.setFloppy(1);
    });

    const seededBass = await Sample.bulkCreate(bassSamples);
    seededBass.forEach(async (sample) => {
      await sample.setFloppy(2);
    });

    const seededVocals = await Sample.bulkCreate(vocalSamples);
    seededVocals.forEach(async (sample) => {
      await sample.setFloppy(3);
    });

    const seededSynth = await Sample.bulkCreate(synthSamples);
    seededSynth.forEach(async (sample) => {
      await sample.setFloppy(4);
    });

    const seededPads = await Sample.bulkCreate(padSamples);
    seededPads.forEach(async (sample) => {
      await sample.setFloppy(5);
    });

    console.log(green('seeded samples'));
  } catch (error) {
    console.log(red(error));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      setTimeout(() => {
        db.close();
      }, 100);
    })
    .catch((err) => {
      console.error(red('Something went wrong!'));
      console.error(err);
      db.close();
    });
}
