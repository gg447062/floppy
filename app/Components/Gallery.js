import React, { useState, useEffect } from 'react';
import { useMoralisQuery } from 'react-moralis';
import { moralisGateway } from '../utils';

const SingleView = ({ dubplate, setViewSingle }) => {
  return (
    <div className="dubplate-grid-view__single-wrapper">
      <div className="dubplate-grid-view__single">
        <div
          onClick={() => {
            setViewSingle(false);
          }}
        >
          X
        </div>
        <img src={`${moralisGateway}/${dubplate.metadata.front}`} />
        <p>
          {dubplate.artist} - {dubplate.track}
        </p>
      </div>
    </div>
  );
};

const GridItem = ({ dubplate, openModal, index }) => {
  const [playing, setPlaying] = useState(false);
  const playAudio = (e) => {
    const value = e.target.id.split('_')[1];
    const audio = document.getElementById(`audio_${value}`);
    if (!playing) {
      setPlaying(true);
      audio.play();
    } else {
      setPlaying(false);
      audio.pause();
    }
  };
  return (
    <div className="dubplate-grid-view" id={index}>
      <p id={index}>
        {dubplate.artist} - {dubplate.track}
      </p>
      <img
        src={`${moralisGateway}/${dubplate.metadata.front}`}
        id={index}
        onClick={openModal}
      />
      <div className="dubplate-grid-audio-player">
        <img
          id={`playbutton_${index}`}
          src="assets/crates_ui_assets/cratesplaybutton_sizedforpopup.png"
          onClick={playAudio}
        ></img>
        <img src="assets/crates_ui_assets/audioplayerbar_sizedforpopup.png"></img>
        <audio
          id={`audio_${index}`}
          src={`${moralisGateway}/${dubplate.metadata.audio}`}
        ></audio>
      </div>
      <div className="dubplate-grid-view-buy">
        <p>0.1 ETH</p>
        <img src="assets/crates_ui_assets/buybutton_sizedforpopup.png"></img>
      </div>
    </div>
  );
};

const Gallery = () => {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [single, setSingle] = useState(null);
  const [viewSingle, setViewSingle] = useState(false);

  const openModal = (e) => {
    setSingle(dubplates[e.target.id]);
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
                // id={i}
                dubplate={dubplate}
                openModal={openModal}
                index={i}
                key={i}
              />
            );
          })}
        {viewSingle && (
          <SingleView dubplate={single} setViewSingle={setViewSingle} />
        )}
      </div>
    </div>
  );
};

export default Gallery;
