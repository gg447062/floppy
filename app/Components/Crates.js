import React, { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import axios from 'axios';
import MainCanvas from './RecordViewer';

export default function Crates() {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [index, setIndex] = useState(0);
  const [imgURL, setImgURL] = useState(null);

  useEffect(() => {
    if (data) {
      const _dubplates = data.map((el) => el.attributes);
      setDubplates(_dubplates);
    }
  }, [data]);

  useEffect(() => {
    const fetchImage = async () => {
      const url = dubplates[index].metadata.image;
      const { data } = await axios.get(`/image/${url}`);
      setImgURL(`data:image/jpeg;base64, ${data}`);
    };
    if (dubplates[index]) {
      fetchImage();
    }
  }, [dubplates[index]]);

  return (
    <div
      id="crates"
      style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        onClick={() => {
          setIndex(index + 1);
        }}
        style={{ position: 'absolute', right: '1em', top: '4em', zIndex: 1000 }}
      >
        Next
      </div>
      <div
        style={{ position: 'absolute', left: '1em', top: '4em', zIndex: 1000 }}
      >
        Previous
      </div>
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[index] && (
        <div style={{ height: '90vh', width: '100vw' }}>
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              gap: '2em',
              fontSize: '2em',
              position: 'absolute',
              top: '0',
              left: '0',
            }}
          >
            <div>{dubplates[index]?.artist}</div>
            <div>{dubplates[index]?.track}</div>
          </div>
          {imgURL && <MainCanvas image={imgURL} />}
        </div>
      )}
    </div>
  );
}
