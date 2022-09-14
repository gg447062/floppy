import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Game from './Game';
import EditAndUpload from './EditAndUpload';
import Crates from './Crates';
import Gallery from './Gallery';
import AudioTest from './AudioTest';

const App = () => {
  const [showEditor, setShowEditor] = useState(true);
  const [showUpload, setShowUpload] = useState(false);
  return (
    <main style={{ height: '100vh' }}>
      <Router history={history}>
        <Routes>
          <Route path={'/'} element={<Game />} />
          <Route path={'/crates'} element={<Gallery />} />
          {/* <Route path={'/crates'} element={<Crates />} /> */}
          <Route
            path={'/editor'}
            element={
              <EditAndUpload
                showEditor={showEditor}
                showUpload={showUpload}
                setShowEditor={setShowEditor}
                setShowUpload={setShowUpload}
              />
            }
          />
          <Route path={'/audio'} element={<AudioTest />} />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
