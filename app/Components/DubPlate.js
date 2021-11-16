import React from 'react';

const DubPlate = (props) => {
  return (
    <div className="modal container" id="dub">
      <button
        onClick={() => {
          props.showDub(false);
        }}
      >
        X
      </button>
      <h1>DUB PLATE</h1>
    </div>
  );
};

export default DubPlate;
