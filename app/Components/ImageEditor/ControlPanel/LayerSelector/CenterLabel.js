import React from 'react';
import { assetBaseURL } from '../../../../utils';
import {
  setStampColor,
  setStampSize,
  setCenterLabelColor,
  setArtistFont,
  setArtistFontColor,
  setArtistFontSize,
  setTrackFont,
  setTrackFontColor,
  setTrackFontSize,
} from '../../../../Redux/editor/centerLabel';
import { setArtist, setTrack } from '../../../../Redux/metadata';
import {
  ColorSelector,
  SizeSelector,
  TextInput,
  FontSelector,
} from './Controls';

const CenterLabel = ({ chooseStamp }) => {
  return (
    <div className="container stamps">
      <div>
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
      <div>
        <SizeSelector action={setStampSize} />
        <ColorSelector action={setStampColor} />
        <ColorSelector action={setCenterLabelColor} isCL={true} />
        <div>
          <TextInput
            action={setArtist}
            title={'Artist Name'}
            label={'artist'}
          />
          <FontSelector action={setArtistFont} destination="artist" />
          <SizeSelector action={setArtistFontSize} />
          <ColorSelector action={setArtistFontColor} isFont={true} />
        </div>
        <div>
          <TextInput action={setTrack} title={'Track Name'} label={'track'} />
          <FontSelector action={setTrackFont} destination="track" />
          <SizeSelector action={setTrackFontSize} />
          <ColorSelector action={setTrackFontColor} isFont={true} />
        </div>
      </div>
    </div>
  );
};

export default CenterLabel;
