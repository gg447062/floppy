import React, { useEffect, useState, useRef } from 'react';
// import { useMoralisQuery } from 'react-moralis';
import axios from 'axios';
import MainCanvas from './RecordViewer';
import { moralisGateway } from '../../lib/utils';
import { fetchDubplates } from '../../lib/db';

function AudioPlayer({ dubplate, previous, next }) {
  const audioRef = useRef();
  const timelineRef = useRef();
  const [src, setSrc] = useState(
    'assets/crates_ui_assets/cratesplaybutton_sizedforpopup.png'
  );

  const play = (e) => {
    if (
      audioRef.current.paused ||
      audioRef.current.cureetTime == 0 ||
      audioRef.current.currentTime == audioRef.current.duration
    ) {
      audioRef.current.play();
      setSrc('assets/listener_3d_assets/Pause_button.png');
    } else {
      audioRef.current.pause();
      setSrc('assets/crates_ui_assets/cratesplaybutton_sizedforpopup.png');
    }
  };

  const scrub = (e) => {
    audioRef.current.currentTime =
      (e.target.value * audioRef.current.duration) / 100;
  };

  useEffect(() => {
    const update = () => {
      const percentagePosition = (
        (100 * audioRef.current.currentTime) /
        audioRef.current.duration
      ).toFixed(1);
      timelineRef.current.style.backgroundSize = `${percentagePosition}% 100%`;
      timelineRef.current.value = percentagePosition;
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = update;
    }
  });

  return (
    <div className="controls-wrapper ">
      <div className="controls-inner-wrapper">
        <div className="button-wrapper">
          <img
            src="assets/listener_3d_assets/previous_track_button.png"
            onClick={previous}
          />
          <img src={src} onClick={play} />
          <img
            src="assets/listener_3d_assets/next_track_button.png"
            onClick={next}
          />
        </div>
        <div className="player-3d-middle-row">
          <div className={`player-3d-timeline-wrapper`}>
            <input
              type="range"
              className={`timeline-3d`}
              max={100}
              step={0.1}
              defaultValue={0}
              onChange={scrub}
              ref={timelineRef}
            ></input>
            <img
              className={`player-3d-timeline-bg`}
              src="assets/listener_3d_assets/playlist_track_scoller_background.png"
            ></img>
            <img
              className={`player-3d-timeline-bg-upper`}
              src="assets/listener_3d_assets/track_scroll_black.png"
            ></img>
          </div>
          <img
            className="playlist-button-default"
            src="assets/listener_3d_assets/playlist_button_default.png"
          ></img>
        </div>
        <div className="track-info">
          <div>
            <p>{dubplate.artist}</p>
            <p>-</p>
            <p>{dubplate.track}</p>
          </div>
          <img src="assets/listener_3d_assets/buy_button_default.png" />
        </div>
      </div>
      <audio
        id="player"
        ref={audioRef}
        src={`${moralisGateway}/${dubplate.metadata.audio}`}
      ></audio>
    </div>
  );
}

function Playlist({ dubplates, current }) {
  return (
    <div className="playlist-outer-wrapper ">
      <div className="playlist-wrapper ">
        {dubplates.map((dubplate, i) => {
          return (
            <div
              className={`playlist-item${current === i ? '-selected' : ''}`}
              key={i}
            >
              <p>
                {dubplate.artist} ------ {dubplate.track}
              </p>
              <div>
                <p>2:03</p>
                <img src="assets/listener_3d_assets/buy_button_default.png" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Player3D() {
  // const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [index, setIndex] = useState(0);
  const [frontURL, setFrontURL] = useState(null);
  const [backURL, setBackURL] = useState(null);

  useEffect(() => {
    async function _fetchDubplates() {
      const _dubplates = await fetchDubplates();
      setDubplates(_dubplates);
    }
    _fetchDubplates();
    // if (data) {
    //   const _dubplates = data.map((el) => el.attributes);
    //   setDubplates(_dubplates);
    // }
  }, []);

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
    <div id="crates" className="">
      {/* {error && <div>error...</div>} */}
      {/* {isLoading && <div>loading...</div>} */}
      {dubplates[index] && (
        <div className="crates-content-wrapper">
          <div className="canvas-wrapper">
            {backURL && <MainCanvas front={frontURL} back={backURL} />}
          </div>
          <div className="crates-playlist-wrapper">
            <Playlist dubplates={dubplates} current={index} />
            <AudioPlayer
              dubplate={dubplates[index]}
              next={next}
              previous={previous}
            />
          </div>
        </div>
      )}
    </div>
  );
}
