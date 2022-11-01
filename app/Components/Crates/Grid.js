import React, { useState, useEffect } from 'react';
import { useMoralisQuery } from 'react-moralis';
import { moralisGateway } from '../../utils';

const AudioPlayer = ({ dubplate, index, modal = false }) => {
  const [src, setSrc] = useState(
    'assets/crates_ui_assets/cratesplaybutton_sizedforpopup.png'
  );
  const size = modal ? '-large' : '';

  const playAudio = (e) => {
    const id = e.target.id.split('_')[1];
    const audio = document.getElementById(`audio_${id}`);
    if (
      audio.paused ||
      audio.cureetTime == 0 ||
      audio.currentTime == audio.duration
    ) {
      audio.play();
      setSrc('assets/listener_3d_assets/Pause_button.png');
    } else {
      audio.pause();
      setSrc('assets/crates_ui_assets/cratesplaybutton_sizedforpopup.png');
    }
  };
  return (
    <div className={`dubplate-grid-audio-player${size}`}>
      <img
        className={`audio-player-play-button${size}`}
        id={`playbutton_${index}`}
        src={src}
        onClick={playAudio}
      ></img>
      <div className={`audio-player-timeline-wrapper${size}`}>
        <img
          className={`audio-player-timeline${size}`}
          src="assets/crates_ui_assets/audioplayerbar_sizedforpopup.png"
        ></img>
        <img
          className={`audio-player-timeline-dot${size}`}
          src="assets/crates_ui_assets/audioplayerindicator_sizedforpopup.png"
        ></img>
      </div>
      <audio
        id={`audio_${index}`}
        src={`${moralisGateway}/${dubplate.metadata.audio}`}
      ></audio>
    </div>
  );
};

const Modal = ({ dubplate, setViewSingle, index }) => {
  return (
    <div className="dubplate-grid-view__single-wrapper">
      <img
        className="absolute grid-view-modal-close"
        src="assets/crates_ui_assets/x_outofpopup.png"
        onClick={() => {
          setViewSingle(false);
        }}
      ></img>
      <img
        className="dubplate-grid-view__single-cover"
        src={`${moralisGateway}/${dubplate.metadata.front}`}
      />
      <div className="dubplate-grid-view__single-info cytone">
        <p>
          <span>Artist: </span> {dubplate.artist}
        </p>
        <p>
          <span>Track: </span> {dubplate.track}
        </p>
        <p>
          <span>Catalog#: </span> 001
        </p>
        <p>
          <span>Price: </span> 0.1 ETH
        </p>
        <AudioPlayer dubplate={dubplate} index={index} modal={true} />
      </div>
      <img
        className="grid-view-single-buy"
        src="assets/crates_ui_assets/buybutton_sizedforpopup.png"
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
        src={`${moralisGateway}/${dubplate.metadata.front}`}
        id={index}
        onClick={openModal}
      />
      <AudioPlayer dubplate={dubplate} index={index} />
      <div className="dubplate-grid-view-buy">
        <p>0.1 ETH</p>
        <img src="assets/crates_ui_assets/buybutton_sizedforpopup.png"></img>
      </div>
    </div>
  );
};

const Grid = () => {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
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
    if (data) {
      const _dubplates = data.map((el) => el.attributes);
      setDubplates(_dubplates);
    }
  }, [data]);

  return (
    <div className="grid-view-wrapper">
      <img
        src="assets/crates_ui_assets/floppycratesbanner.png"
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
