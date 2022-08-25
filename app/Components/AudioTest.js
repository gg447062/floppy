import React, { useState, useEffect } from 'react';
import { useMoralisQuery } from 'react-moralis';

export default function AudioTest() {
  const { data, error, isLoading } = useMoralisQuery('Download');
  const [tracks, setTracks] = useState(null);
  const [src1, setSrc1] = useState('');
  const [src2, setSrc2] = useState('');

  useEffect(() => {
    if (data) {
      const _tracks = data.map((el) => el.attributes);
      setTracks(_tracks);
    }
  }, [data]);

  useEffect(() => {
    if (tracks && tracks.length) {
      const repairedOne = tracks[8].base64OG.split(' ').join('+');
      const repairedTwo = tracks[9].base64OG.split(' ').join('+');

      setSrc1(`data:audio/wav;base64,${repairedOne}`);
      setSrc2(`data:audio/wav;base64,${repairedTwo}`);
    }
  }, [tracks]);

  console.log(src1, src2);

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        rowGap: '2em',
      }}
    >
      <audio controls src={src1}></audio>
      <audio controls src={src2}></audio>
    </div>
  );
}
