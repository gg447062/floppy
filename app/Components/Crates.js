import React, { useEffect, useState } from 'react';
import { useMoralisQuery } from 'react-moralis';
import { moralisGateway } from '../utils';

export default function Crates(props) {
  const { data, error, isLoading } = useMoralisQuery('Dubplate');
  const [dubplates, setDubplates] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (data) {
      const _dubplates = data.map((el) => el.attributes);
      setDubplates(_dubplates);
    }
  }, [data]);
  console.log(dubplates[current]?.metadata);
  return (
    <div id="crates" className="modal container">
      <button
        onClick={() => {
          props.showCrates(false);
        }}
      >
        X
      </button>
      <h1>Floppy Crates</h1>
      {error && <div>error...</div>}
      {isLoading && <div>loading...</div>}
      {dubplates[current] && (
        <div>
          <h1>{dubplates[current]?.artist}</h1>
          <img src={`${moralisGateway}/${dubplates[current].metadata.image}`} />
        </div>
      )}
    </div>
  );
}
