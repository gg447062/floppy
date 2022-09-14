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

const Gallery = () => {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [single, setSingle] = useState(null);
  const [viewSingle, setViewSingle] = useState(false);

  const openModal = (e) => {
    console.log(e.target.id);
    setSingle(dubplates[e.target.id]);
    setViewSingle(true);
  };

  useEffect(() => {
    if (data) {
      const _dubplates = data.map((el) => el.attributes);
      setDubplates(_dubplates);
    }
  }, [data]);

  console.log(single, viewSingle);
  return (
    <div className="grid-view ff-3">
      {dubplates &&
        dubplates.map((dubplate, i) => {
          return (
            <div
              className="dubplate-grid-view"
              id={i}
              key={i}
              onClick={openModal}
            >
              <img
                src={`${moralisGateway}/${dubplate.metadata.front}`}
                id={i}
              />
              <p id={i}>
                {dubplate.artist} - {dubplate.track}
              </p>
            </div>
          );
        })}
      {viewSingle && (
        <SingleView dubplate={single} setViewSingle={setViewSingle} />
      )}
    </div>
  );
};

export default Gallery;
