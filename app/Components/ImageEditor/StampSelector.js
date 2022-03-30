import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLayer, setStamp } from '../../Redux/editor';
import Templates from './Templates';
import Stamps from './Stamps';
import Stickers from './Stickers';
import CenterLabel from './CenterLabel';

const StampSelector = () => {
  const dispatch = useDispatch();
  const stamp = useSelector((state) => state.editor.stamp);
  const layer = useSelector((state) => state.editor.layer);

  const chooseStamp = (e) => {
    if (stamp) {
      stamp.classList.remove('selected');
    }
    dispatch(setStamp(e.target));
    e.target.classList.add('selected');
  };

  const chooseLayer = (e) => {
    dispatch(setLayer(e.target.id));
  };

  return (
    <div id="selector" className="container">
      <div id="template" onClick={chooseLayer}>
        Template
      </div>
      {layer == 'template' && <Templates chooseStamp={chooseStamp} />}
      <div id="center-label" onClick={chooseLayer}>
        Center Label
      </div>
      {layer == 'center-label' && <CenterLabel chooseStamp={chooseStamp} />}
      <div id="stamps" onClick={chooseLayer}>
        Stamps
      </div>
      {layer == 'stamps' && <Stamps chooseStamp={chooseStamp} />}
      <div id="stickers" onClick={chooseLayer}>
        Stickers
      </div>
      {layer == 'stickers' && <Stickers chooseStamp={chooseStamp} />}
    </div>
  );
};

export default StampSelector;
