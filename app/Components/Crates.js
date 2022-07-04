import React, { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import axios from 'axios';
import MainCanvas from './RecordViewer';

export default function Crates() {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [index, setIndex] = useState(0);
  const [frontURL, setFrontURL] = useState(null);
  const [backURL, setBackURL] = useState(null);

  useEffect(() => {
    if (data) {
      const _dubplates = data.map((el) => el.attributes);
      setDubplates(_dubplates);
    }
  }, [data]);

  useEffect(() => {
    const fetchImage = async (url, callback) => {
      const { data } = await axios.get(`/image/${url}`);
      callback(`data:image/jpeg;base64, ${data}`);
    };

    if (dubplates[index]) {
      fetchImage(dubplates[index].metadata.front, setFrontURL);
      fetchImage(dubplates[index].metadata.back, setBackURL);
    }
  }, [dubplates[index]]);

  const next = () => {
    const nextIndex = (index + 1) % dubplates.length;
    setIndex(nextIndex);
  };

  const previous = () => {
    const prevIndex = index - 1;
    if (prevIndex < 0) {
      setIndex(dubplates.length - 1);
    } else {
      setIndex(index - 1);
    }
  };

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
        onClick={next}
        style={{ position: 'absolute', right: '1em', top: '4em', zIndex: 1000 }}
      >
        Next
      </div>
      <div
        onClick={previous}
        style={{ position: 'absolute', left: '1em', top: '4em', zIndex: 1000 }}
      >
        Previous
      </div>
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[index] && (
        <div
          style={{ height: '80vh', width: '40vw', border: '1px solid green' }}
        >
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
          {backURL && <MainCanvas front={frontURL} back={backURL} />}
        </div>
      )}
    </div>
  );
}
