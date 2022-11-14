import axios from 'axios';

export const saveAssetsToIPFS = async (front, back, audio) => {
  try {
    const response = await axios.post('/api/ipfs/assets', {
      front,
      back,
      audio,
    });

    return response;
  } catch (error) {
    console.error(error);
  }
};

export const saveMetadataToIPFS = async (content, path) => {
  try {
    const response = await axios.post('/api/ipfs/metadata', { content, path });
    return response;
  } catch (error) {
    console.error(error);
  }
};
