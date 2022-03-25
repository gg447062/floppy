const { readdir } = require('fs/promises');
const { red, green } = require('chalk');
const Moralis = require('moralis/node');
const dotenv = require('dotenv').config();
const serverUrl = process.env.TEST_SERVER_URL;
const appId = process.env.TEST_APP_ID;
const masterKey = process.env.TEST_MASTER_KEY;

const seed = async () => {
  try {
    Moralis.start({ serverUrl, appId, masterKey });

    const basePath =
      '/Users/gabrielgutierrez/Pictures/floppy_assets/m27_samplepack';

    let total = 0;

    const folders = await readdir(basePath);
    for (const folder of folders) {
      if (folder == '.DS_Store') continue;
      const files = await readdir(`${basePath}/${folder}`);
      for (const file of files) {
        if (file == '.DS_Store') continue;
        const floppy = parseInt(folder.split('_')[0]);
        const parts = file.split('_');
        const id = parseInt(parts[0]);
        const name = parts[1].split('.')[0];
        const obj = new Moralis.Object('Samples');
        obj.set('name', name);
        obj.set('sampleID', id);
        obj.set('floppy', floppy);
        obj.set('unlocked', false);
        obj.save().then(
          () => {
            total++;
            console.log(`${total} of 999 samples saved`);
          },
          (error) => {
            console.log('an error occurred: ' + error.message);
          }
        );
      }
    }
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
