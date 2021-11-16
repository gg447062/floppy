import React from 'react';

const songs = [
  { name: 'song1', length: 3 },
  { name: 'song2', length: 3 },
  { name: 'song3', length: 3 },
  { name: 'song4', length: 3 },
  { name: 'song5', length: 3 },
];

const Crates = (props) => {
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
      <table>
        <tbody>
          {songs.map((song, index) => {
            return (
              <tr key={index}>
                <td>{song.name}</td>
                <td>{song.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Crates;
