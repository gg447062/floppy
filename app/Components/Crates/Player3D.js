import React, { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import axios from 'axios';
import MainCanvas from './RecordViewer';
import { moralisGateway } from '../../utils';

function ControlsTop({ dubplate, previous, next }) {
  const player = document.getElementById('player');
  const play = () => {
    player.play();
  };
  const pause = () => {
    player.pause();
  };
  return (
    <div className="controls-wrapper ">
      <div className="controls-inner-wrapper">
        <div className="button-wrapper">
          <button className="" onClick={previous}>
            prev
          </button>
          <button className="" onClick={play}>
            play
          </button>
          <button className="" onClick={pause}>
            pause
          </button>
          <button className="" onClick={next}>
            next
          </button>
        </div>
        <div className="track-info ">
          <div>{dubplate.artist}</div>
          <div>-</div>
          <div>{dubplate.track}</div>
        </div>
      </div>
    </div>
  );
}

function Playlist({ dubplates }) {
  return (
    <div className="controls-bottom-wrapper ">
      <div className="playlist-wrapper ">
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

export default function Player3D() {
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
    <div id="crates" className="ff-3">
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[index] && (
        <div className="crates-content-wrapper">
          <div className="canvas-wrapper">
            {backURL && <MainCanvas front={frontURL} back={backURL} />}
          </div>
          <div className="crates-playlist-wrapper">
            <Playlist dubplates={dubplates} />
            <ControlsTop
              dubplate={dubplates[index]}
              next={next}
              previous={previous}
            />
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
