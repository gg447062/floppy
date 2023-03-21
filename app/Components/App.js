import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './Game';
import ImageEditor from './ImageEditor';
import Upload from './Upload';
import Crates from './Crates';

const App = () => {
  return (
    <main style={{ height: '100vh' }}>
      <Router history={history}>
        <Routes>
          <Route path={'/'} element={<Game />} />
          <Route path={'/crates'} element={<Crates />} />
          <Route path={'/editor'} element={<ImageEditor />} />
          <Route path={'/upload'} element={<Upload />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
