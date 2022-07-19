import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SplashPage from './SplashPage';
import Game from './Game';
import ImageEditor from './ImageEditor';
import Crates from './Crates';

const App = () => {
  return (
    <main style={{ height: '100vh' }}>
      <Router>
        <Routes>
          {/* <Route path={'/'} element={<SplashPage />} /> */}
          <Route path={'/'} element={<Game />} />
          <Route path={'/crates'} element={<Crates />} />
          <Route path={'/editor'} element={<ImageEditor />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
