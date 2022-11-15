import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './Game';
import ImageEditor from './ImageEditor';
import Upload from './Upload';
import Crates from './Crates';
import AudioTest from './AudioTest';

const App = () => {
  return (
    <main style={{ height: '100vh' }}>
      <Router history={history}>
        <Routes>
          <Route path={'/'} element={<Game />} />
          <Route path={'/crates'} element={<Crates />} />
          <Route path={'/editor'} element={<ImageEditor />} />
          <Route path={'/upload'} element={<Upload />} />
          <Route path={'/audio'} element={<AudioTest />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
