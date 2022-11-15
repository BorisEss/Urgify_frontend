import { navTypes } from '../navigation/navTypes';

export function isUrlFromAuth(locationState: any): boolean {
  if (locationState && locationState.from) {
    return locationState.from.includes(navTypes.SignIn);
  }
  return false;
}
