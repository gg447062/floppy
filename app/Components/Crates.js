import React, { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import axios from 'axios';
import MainCanvas from './RecordViewer';
import { moralisGateway } from '../utils';

function ControlsTop({ dubplate, previous, next }) {
  const player = document.getElementById('player');
  const play = () => {
    player.play();
  };
  const pause = () => {
    player.pause();
  };
  return (
    <div
      style={{
        disply: 'flex',
        flexDirection: 'column',
        width: '100%',
        backgroundColor: 'pink',
        padding: '1em',
        border: '1px solid black',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: '1',
          columnGap: '1em',
        }}
      >
        <div
          style={{
            flexGrow: '1',
            height: '2em',
            backgroundColor: 'black',
          }}
        />
        <h1 style={{ color: 'black' }}>Floppy</h1>
        <div
          style={{
            flexGrow: '1',
            height: '2em',
            backgroundColor: 'black',
          }}
        />
      </div>
      <div
        style={{
          border: '1px solid blue',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            columnGap: '3em',
            padding: '1em',
            width: '100%',
            maxWidth: '100%',
          }}
        >
          <div style={{ backgroundColor: 'black', fontSize: '2em' }}>4:20</div>
          <div>
            <div
              style={{
                display: 'flex',
                columnGap: '1em',
                backgroundColor: 'black',
                fontSize: '2em',
              }}
            >
              <div>{dubplate.artist}</div>
              <div>{dubplate.track}</div>
            </div>
          </div>
        </div>

        <div
          style={{
            padding: '1em',
          }}
        >
          <button onClick={previous}>prev</button>
          <button onClick={play}>play</button>
          <button onClick={pause}>pause</button>
          <button onClick={next}>next</button>
        </div>
      </div>
    </div>
  );
}

function ControlsBottom({ dubplates }) {
  return (
    <div
      style={{
        backgroundColor: 'pink',
        flexGrow: '1',
        width: '100%',
        padding: '1em',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: '1',
          columnGap: '1em',
        }}
      >
        <div
          style={{
            flexGrow: '1',
            height: '2em',
            backgroundColor: 'black',
          }}
        />
        <h1 style={{ color: 'black' }}>Playlist</h1>
        <div
          style={{
            flexGrow: '1',
            height: '2em',
            backgroundColor: 'black',
          }}
        />
      </div>
      <div style={{ backgroundColor: 'black', flexGrow: '1', padding: '1em' }}>
        {dubplates.map((dubplate, i) => {
          return (
            <p key={i}>
              {dubplate.artist} - {dubplate.track}
            </p>
          );
        })}
      </div>
    </div>
  );
}

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

  console.log(dubplates[index]);

  return (
    <div
      id="crates"
      style={{
        height: '100vh',
        width: '100vw',
      }}
    >
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[index] && (
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
          }}
        >
          <div style={{ width: '50%' }}>
            {backURL && <MainCanvas front={frontURL} back={backURL} />}
          </div>
          <div
            style={{
              height: '100vh',
              width: '50%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              border: '1px solid green',
              backgroundColor: 'green',
              boxSizing: 'border-box',
            }}
          >
            <ControlsTop
              dubplate={dubplates[index]}
              next={next}
              previous={previous}
            />
            <ControlsBottom dubplates={dubplates} />
          </div>
          <audio
            id="player"
            src={`${moralisGateway}/${dubplates[index].metadata.audio}`}
          ></audio>
        </div>
      )}
    </div>
  );
}
