import React, { useState, useEffect, useRef } from 'react';
import { moralisGateway, assetBaseURL } from '../../lib/utils';
import { fetchDubplates } from '../../lib/db';

const AudioPlayer = ({ dubplate, index, modal = false }) => {
  const audioRef = useRef();
  const timelineRef = useRef();
  const [src, setSrc] = useState(
    `${assetBaseURL}/crates_ui_assets/cratesplaybutton_sizedforpopup.png`
  );
  const size = modal ? '-large' : '';

  const playAudio = (e) => {
    if (
      audioRef.current.paused ||
      audioRef.current.currentTime == 0 ||
      audioRef.current.currentTime == audioRef.current.duration
    ) {
      audioRef.current.play();
      setSrc(`${assetBaseURL}/listener_3d_assets/Pause_button.png`);
    } else {
      audioRef.current.pause();
      setSrc(
        `${assetBaseURL}/crates_ui_assets/cratesplaybutton_sizedforpopup.png`
      );
    }
  };

  const scrub = (e) => {
    audioRef.current.currentTime =
      (e.target.value * audioRef.current.duration) / 100;
  };

  useEffect(() => {
    const update = () => {
      const percentagePosition =
        (100 * audioRef.current.currentTime) / audioRef.current.duration;
      timelineRef.current.style.backgroundSize = `${percentagePosition}% 100%`;
      timelineRef.current.value = percentagePosition;
    };

    if (audioRef.current) {
      audioRef.current.ontimeupdate = update;
    }
  });

  useEffect(() => {
    document.body.style.overflow = 'scroll';
  });

  return (
    <div className={`dubplate-grid-audio-player${size}`}>
      <img
        className={`audio-player-play-button${size}`}
        id={`playbutton_${index}`}
        src={src}
        onClick={playAudio}
      ></img>
      <div className={`audio-player-timeline-wrapper${size}`}>
        <input
          id={`timeline_${index}${size}`}
          type="range"
          className={`timeline${size}`}
          max={100}
          defaultValue={0}
          onChange={scrub}
          ref={timelineRef}
        ></input>
        <img
          className={`audio-player-timeline-bg${size}`}
          src={`${assetBaseURL}/crates_ui_assets/audioplayerbar_sizedforpopup.png`}
        ></img>
      </div>
      <audio
        id={`audio_${index}`}
        src={`${moralisGateway}/${dubplate.audio}`}
        ref={audioRef}
      ></audio>
    </div>
  );
};

const Modal = ({ dubplate, setViewSingle, index }) => {
  return (
    <div className="dubplate-grid-view__single-wrapper">
      <img
        className="absolute grid-view-modal-close"
        src={`${assetBaseURL}/crates_ui_assets/x_outofpopup.png`}
        onClick={() => {
          setViewSingle(false);
        }}
      ></img>
      <img
        className="dubplate-grid-view__single-cover"
        src={`${moralisGateway}/${dubplate.front}`}
      />
      <div className="dubplate-grid-view__single-info cytone">
        <p>
          <span>Artist: </span> {dubplate.artist}
        </p>
        <p>
          <span>Track: </span> {dubplate.track}
        </p>
        <p>
          <span>Catalog#: </span> 001 {/* dubplate.cat */}
        </p>
        <p>
          <span>Price: </span> 0.1 ETH {/* dubplate.price */}
        </p>
        <AudioPlayer dubplate={dubplate} index={index} modal={true} />
      </div>
      <img
        className="grid-view-single-buy"
        src={`${assetBaseURL}/crates_ui_assets/buybutton_sizedforpopup.png`}
      ></img>
    </div>
  );
};

const GridItem = ({ dubplate, openModal, index }) => {
  return (
    <div className="dubplate-grid-view">
      <p>
        {dubplate.artist} - {dubplate.track}
      </p>
      <img
        className="dubplate-grid-view-cover"
        src={`${moralisGateway}/${dubplate.front}`}
        id={index}
        onClick={openModal}
      />
      <AudioPlayer dubplate={dubplate} index={index} />
      <div className="dubplate-grid-view-buy">
        <p>0.1 ETH</p>
        <img
          src={`${assetBaseURL}/crates_ui_assets/buybutton_sizedforpopup.png`}
        ></img>
      </div>
    </div>
  );
};

const Grid = () => {
  const [dubplates, setDubplates] = useState([]);
  const [single, setSingle] = useState(null);
  const [singleIdx, setSingleIdx] = useState(null);
  const [viewSingle, setViewSingle] = useState(false);

  const openModal = (e) => {
    setSingle(dubplates[e.target.id]);
    setSingleIdx(e.target.id);
    setViewSingle(true);
  };

  useEffect(() => {
    async function _fetchDubplates() {
      const _dubplates = await fetchDubplates();
      setDubplates(_dubplates);
    }
    _fetchDubplates();
  }, []);

  return (
    <div className="grid-view-wrapper">
      <img
        src={`${assetBaseURL}/crates_ui_assets/floppycratesbanner.png`}
        height="150px"
        width="auto"
      ></img>

      <div className="grid-view ff-3">
        {dubplates &&
          dubplates.map((dubplate, i) => {
            return (
              <GridItem
                dubplate={dubplate}
                openModal={openModal}
                index={i}
                key={i}
              />
            );
          })}
        {viewSingle && (
          <Modal
            dubplate={single}
            setViewSingle={setViewSingle}
            index={singleIdx}
          />
        )}
      </div>
    </div>
  );
};

export default Grid;
