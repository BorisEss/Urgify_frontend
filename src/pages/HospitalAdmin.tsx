import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addHospital, getHospitals } from '../actions/hospital';
import { HospitalAddDepartmentsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getHospitalsIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import HospitalAdminUi from '../ui/HospitalAdminUi';
import { maxLength, minLength } from '../utils/strings';

const HospitalAdmin: React.FC<ReduxProps> = ({
  hospitals,
  isFetching,
  fetchHospitals,
  createHospital,
}) => {
  const hospitalCount: number = hospitals.length;

  const [hospitalName, setHospitalName] = React.useState<string>('');
  const [hospitalNameError, setHospitalNameError] = React.useState<string>('');
  const [hospitalImageError, setHospitalImageError] = React.useState<string>('');
  const navigate = useNavigate();
  const [image, setImage] = React.useState<File | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHospitalNameError('');
    setHospitalName(e.target.value);
  };

  const onImageChange = (img: File | null) => {
    setHospitalImageError('');
    setImage(img);
  };

  const validate = () => {
    let nameError: string = '';
    let imageError: string = '';
    if (!hospitalName || minLength(hospitalName, 2) || maxLength(hospitalName, 50)) {
      nameError = 'Hospital name should have from 2 to 50 symbols';
    }
    if (!image || (image.type.split('/')[0] !== 'image') || !image.name) {
      imageError = 'The hospital logo must be a picture';
    }
    if (nameError || imageError) {
      setHospitalNameError(nameError);
      setHospitalImageError(imageError);
      return false;
    }
    return true;
  };

  const navigateToAddDepartments = (hospitalId: string) => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId: hospitalId }));
  };

  const onSubmit = () => {
    if (validate() && image) {
      createHospital(hospitalName, image)
        .then(hospital => {
          if (hospital && hospital.id) {
            navigateToAddDepartments(hospital.id);
          }
        })
        .catch((e: any) => {
          if (e && e.name) {
            setHospitalNameError(e.name);
          }
          if (e && e.logo) {
            setHospitalImageError(e.logo);
          }
        });
    }
  };

  // TODO: make logic if exist at least 1 hospital
  // need to redirect or to add department(if no departments(need to make another request))
  // or to departments list page
  // !Need to confirm with Boris

  React.useEffect(() => {
    fetchHospitals();
  }, [fetchHospitals]);

  return <HospitalAdminUi
    hospitalCount={hospitalCount}
    isFetching={isFetching}
    image={image}
    setImage={onImageChange}
    onSubmit={onSubmit}
    onInputChange={onInputChange}
    hospitalNameError={hospitalNameError}
    hospitalImageError={hospitalImageError}
  />;
};

const getData = createSelector(
  [getHospitalsArray, getHospitalsIsFetching],
  (hospitals, isFetching) => {
    return {
      hospitals,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospitals: getHospitals,
  createHospital: addHospital,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HospitalAdmin);
