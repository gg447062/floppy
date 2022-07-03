import { Color, Solver } from './colorSolver';
import { fontNames, getFontName } from './fonts';

const cleanName = (name) => {
  if (/\s/g.test(name)) {
    const noWhiteSpace = name.split(' ').join('_');
    return noWhiteSpace;
  } else return name;
};

// export const assetBaseURL = 'https://dg3mov3znt8u.cloudfront.net/upload';
const assetBaseURL = 'assets';
const moralisGateway = 'https://gateway.moralisipfs.com/ipfs';

export {
  Color,
  Solver,
  fontNames,
  getFontName,
  cleanName,
  moralisGateway,
  assetBaseURL,
};
