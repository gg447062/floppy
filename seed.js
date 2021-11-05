const { red, green } = require('chalk');
const { db, Floppy, Sample } = require('./server/db');

const seed = async () => {
  try {
    await db.sync({ force: true });

    const samples = [
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
        name: 'bass',
        bpm: 160,
        playType: 'one-shot',
        unlocked: false,
      },
      {
        name: 'vocal',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
      {
        name: 'synth',
        bpm: 160,
        playType: 'one-shot',
        unlocked: true,
      },
      {
        name: 'bass2',
        bpm: 160,
        playType: 'loop',
        unlocked: false,
      },
    ];

    const seededsamples = await Sample.bulkCreate(samples);

    const generateRandomInt = () => {
      return Math.ceil(Math.random() * 5);
    };

    seededsamples.forEach(async (sample) => {
      await sample.setFloppy(generateRandomInt());
    });

    console.log(green('seeded samples'));

    const floppys = [
      { color: 'yellow' },
      { color: 'green' },
      { color: 'purple' },
      { color: 'red' },
      { color: 'blue' },
    ];

    await Floppy.bulkCreate(floppys);
    console.log(green('seeding floppys'));
  } catch (error) {
    console.log(red(error));
  }
};

module.exports = seed;

if (require.main === module) {
  seed()
    .then(() => {
      console.log(green('Seeding success!'));
      db.close();
    })
    .catch((err) => {
      console.error(red('Something went wrong!'));
      console.error(err);
      db.close();
    });
}
