import React from 'react';

const samples = [
  { image: '💾', name: 'sample1' },
  { image: '💾', name: 'sample2' },
  { image: '💾', name: 'sample3' },
  { image: '💾', name: 'sample4' },
  { image: '💾', name: 'sample5' },
  { image: '💾', name: 'sample6' },
];

const Gallery = (props) => {
  return (
    <div id="gallery" className="modal container">
      <button
        onClick={() => {
          props.showGallery(false);
        }}
      >
        X
      </button>
      <h1>Floppy Gallery</h1>
      <table>
        <tbody>
          {samples.map((sample, index) => {
            return (
              <tr key={index}>
                <td>{sample.image}</td>
                <td>{sample.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Gallery;
