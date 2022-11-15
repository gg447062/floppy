import axios from 'axios';
const url1 = '/api/ipfs/assets';
const url2 = '/api/ipfs/metadata';

export const saveAssetsToIPFS = async (front, back, audio) => {
  try {
    const { data } = await axios.post(url1, {
      front,
      back,
      audio,
    });

    return data;
  } catch (error) {
    console.error(error);
  }
};

export const saveMetadataToIPFS = async (content, path) => {
  try {
    const { data } = await axios.post(url2, { content, path });
    return data;
  } catch (error) {
    console.error(error);
  }
};
