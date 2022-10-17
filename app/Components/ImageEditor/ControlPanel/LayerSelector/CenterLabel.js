import React from 'react';
import { useSelector } from 'react-redux';
import { assetBaseURL } from '../../../../utils';
import {
  setStampSize,
  setStampFilter,
  setCenterLabelFilter,
  setArtistFont,
  setArtistFontColor,
  setArtistFontSize,
  setTrackFont,
  setTrackFontColor,
  setTrackFontSize,
  setCenterLabelColor,
  setStampColor,
} from '../../../../Redux/editor/centerLabel';
import { setArtist, setTrack } from '../../../../Redux/metadata';
import {
  ColorSelector,
  SizeSelector,
  TextInput,
  FontSelector,
} from './Controls';

const CenterLabel = ({ chooseStamp }) => {
  const clColor = useSelector((state) => state.editor.cl.clColor);
  const stampColor = useSelector((state) => state.editor.cl.stampColor);
  const artistColor = useSelector((state) => state.editor.cl.artistFontColor);
  const trackColor = useSelector((state) => state.editor.cl.trackFontColor);

  return (
    <div className="container controls-drawer">
      <div className="assets-container">
        {[...Array(13)].map((_, i) => {
          return (
            <img
              id={`cl_${i + 1}`}
              className="stamp cl"
              src={`${assetBaseURL}/CENTER_LABEL_ASSETS/CL_${i + 1}.png`}
              onClick={chooseStamp}
              key={i}
            />
          );
        })}
      </div>
      <div className="controls-container">
        <div>
          <div className="colorss">
            <ColorSelector
              action={setStampFilter}
              action2={setStampColor}
              value={stampColor}
            />
            <ColorSelector
              action={setCenterLabelFilter}
              action2={setCenterLabelColor}
              value={clColor}
              isCL={true}
            />
          </div>
          <SizeSelector action={setStampSize} />
        </div>
        <div className="track-info-input">
          <div className="">
            <TextInput
              action={setArtist}
              title={'Artist Name'}
              label={'artist-text'}
            />
            <div className="font-and-size">
              <FontSelector action={setArtistFont} destination="artist" />
              <SizeSelector action={setArtistFontSize} />
            </div>
          </div>
          <ColorSelector
            action={setArtistFontColor}
            value={artistColor}
            isFont={true}
          />
        </div>
        <div className="track-info-input">
          <div>
            <TextInput
              action={setTrack}
              title={'Track Name'}
              label={'track-text'}
            />
            <div className="font-and-size">
              <FontSelector action={setTrackFont} destination="track" />
              <SizeSelector action={setTrackFontSize} />
            </div>
          </div>
          <ColorSelector
            action={setTrackFontColor}
            value={trackColor}
            isFont={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CenterLabel;
