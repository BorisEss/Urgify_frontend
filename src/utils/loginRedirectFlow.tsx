import type { HospitalsArray } from '../api/apiTypes';
import { navTypes } from '../navigation/navTypes';

export function isUrlFromAuth(locationState: any): boolean {
  if (locationState && locationState.from) {
    return locationState.from.includes(navTypes.SignIn);
  }
  return false;
}

// [false, false] - no Hospitals
// [true, false] - 1 hospital, but haven't departments
// [true, true] - 2 hospitals, or 1 hospital with at least 1 departament
export function checkExistenceHospitalsAndDepartments (hospitals: HospitalsArray): [boolean, boolean] {
  if (!hospitals.length) return [false, false];
  if (hospitals.length === 1 && !hospitals[0].departments.length) return [true, false];
  if (
    (hospitals.length > 1)
    || (hospitals.length === 1 && hospitals[0].departments.length)
  ) return [true, true];
  return [true, true];
}

export function checkHospitalsLimit (hospitalsCount: number): boolean {
  return hospitalsCount > 19;
}
