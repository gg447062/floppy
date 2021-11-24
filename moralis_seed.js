import { red, green } from 'chalk';
import Moralis from 'moralis';

export const saveVideo = async (videoSource) => {
  try {
    const video = new Moralis.File('floppy.mp4', videoSource, 'video/mp4');
    await video.saveIPFS();
    console.log(video.ipfs());
    console.log('saving');
  } catch (error) {
    console.log(red(error));
  }
};

export const saveSamples = async () => {
  try {
    const samples = [
      {
        description: 'a fast breakbeat',
        animation_url: '',
        name: 'breakbeat',
        attributes: { bpm: 160, playType: 'loop' },
      },
      {
        description: 'a faster breakbeat',
        animation_url: '',
        name: 'breakbeat1',
        attributes: { bpm: 180, playType: 'loop' },
      },
      {
        description: 'a slower breakbeat',
        animation_url: '',
        name: 'breakbeat2',
        attributes: { bpm: 150, playType: 'one-shot' },
      },
      {
        description: 'a slower breakbeat',
        animation_url: '',
        name: 'breakbeat3',
        attributes: { bpm: 145, playType: 'loop' },
      },
      {
        description: 'a fast breakbeat',
        animation_url: '',
        name: 'breakbeat4',
        attributes: { bpm: 160, playType: 'one-shot' },
      },
    ];

    const savedSamples = new Moralis.File('samples.json', {
      base64: btoa(JSON.stringify(samples)),
    });
    await savedSamples.saveIPFS();
    console.log(green(savedSamples.ipfs(), file.hash()));
  } catch (error) {
    console.log(red(error));
  }
};
