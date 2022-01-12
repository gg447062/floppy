import React, { useRef, useState } from 'react';
import { useMoralis } from 'react-moralis';
import Moralis from 'moralis/';

const Minter = (props) => {
  const { user, isAuthenticated } = useMoralis();
  const [source, setSource] = useState(null);
  const audioInput = useRef(null);
  const imageInput = useRef(null);

  const mint = async (e) => {
    e.preventDefault();
    if (isAuthenticated) {
      const audio = audioInput.current.files[0];
      const image = imageInput.current.files[0];

      const audioFile = new Moralis.File(audio.name, audio);
      await audioFile.saveIPFS();
      const audioHash = audioFile.hash();

      const imageFile = new Moralis.File(image.name, image);
      await imageFile.saveIPFS();
      const imageHash = imageFile.hash();

      const metadata = {
        name: 'test',
        description: 'floppy dubplate',
        image: `/ipfs/${imageHash}`,
        animation_url: `/ipfs/${audioHash}`,
      };

      console.log(metadata);

      const jsonFile = new Moralis.File('metadata.json', {
        base64: btoa(JSON.stringify(metadata)),
      });

      await jsonFile.saveIPFS();
      const jsonHash = jsonFile.hash();

      console.log(jsonHash);

      const res = await Moralis.Plugins.rarible.lazyMint({
        chain: 'rinkeby',
        userAddress: user.get('ethAddress'),
        tokenType: 'ERC721',
        tokenUri: `ipfs://${jsonHash}`,
        royaltiesAmount: 5,
      });

      console.log(res);

      setSource(
        `https://rinkeby.rarible.com/token/${res.data.result.tokenAddress}:${res.data.result.tokenId}`
      );
    } else {
      alert('must be logged in!');
    }
  };

  return (
    <div className="modal container">
      <form id="mint-input" onSubmit={mint}>
        <label htmlFor="audio">audio</label>
        <input id="audio" name="audio" type="file" ref={audioInput}></input>
        <label htmlFor="image">image</label>
        <input id="image" name="image" type="file" ref={imageInput}></input>
        <button type="submit">MINT</button>
      </form>
      <button
        onClick={() => {
          props.showMinter(false);
        }}
      >
        X
      </button>
      <div>
        <a href={source}>{source ? 'view nft' : ''}</a>
      </div>
    </div>
  );
};

export default Minter;
