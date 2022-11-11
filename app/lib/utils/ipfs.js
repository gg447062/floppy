import axios from 'axios';

export const saveAssetsToIPFS = async (front, back, audio) => {
  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY,
    },
    data: [
      {
        content: front.content,
        path: front.path,
      },
      {
        content: back.content,
        path: back.path,
      },
      {
        content: audio.content,
        path: audio.path,
      },
    ],
  };

  try {
    const { data } = await axios.request(options);
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveMetadataToIPFS = async (content, path) => {
  const options = {
    method: 'POST',
    url: 'https://deep-index.moralis.io/api/v2/ipfs/uploadFolder',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      'X-API-Key': process.env.MORALIS_API_KEY,
    },
    data: [
      {
        content,
        path,
      },
    ],
  };

  try {
    const { data } = await axios.request(options);
    return data[0].path;
  } catch (error) {
    console.error(error);
  }
};
