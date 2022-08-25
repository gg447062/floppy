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
    <div className="controls-top-wrapper crates-border">
      <div className="h1-wrapper">
        <h1 className="crates-border">Current Track</h1>
      </div>
      <div className="controls-top-inner-wrapper">
        <div className="track-info crates-border-inner">
          <div>{dubplate.artist}</div>
          <div>--------</div>
          <div>{dubplate.track}</div>
        </div>
        <div className="button-wrapper">
          <button className="crates-border" onClick={previous}>
            prev
          </button>
          <button className="crates-border" onClick={play}>
            play
          </button>
          <button className="crates-border" onClick={pause}>
            pause
          </button>
          <button className="crates-border" onClick={next}>
            next
          </button>
        </div>
      </div>
    </div>
  );
}

function ControlsBottom({ dubplates }) {
  return (
    <div className="controls-bottom-wrapper crates-border">
      <div className="h1-wrapper">
        <h1 className="crates-border">Playlist</h1>
      </div>
      <div className="playlist-wrapper crates-border-inner">
        {dubplates.map((dubplate, i) => {
          return (
            <p key={i}>
              {dubplate.artist} ------ {dubplate.track}
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

  console.log(dubplates);

  return (
    <div id="crates" className="ff-3">
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[index] && (
        <div className="crates-content-wrapper">
          <div className="canvas-wrapper">
            {backURL && <MainCanvas front={frontURL} back={backURL} />}
          </div>
          <div className="crates-controls-wrapper">
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
