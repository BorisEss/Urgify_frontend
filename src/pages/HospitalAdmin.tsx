import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useLocation, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addHospital, getHospitalsAndDepartments } from '../actions/hospital';
import { HospitalAddDepartmentsRoute, HospitalsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getAddHospitalIsFetching, getHospitalsIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import HospitalAdminUi from '../ui/HospitalAdminUi';
import LoaderBox from '../ui/LoaderBox';
import { checkExistenceHospitalsAndDepartments, checkHospitalsLimit, isUrlFromAuth } from '../utils/loginRedirectFlow';
import { maxLength, minLength } from '../utils/strings';

const HospitalAdmin: React.FC<ReduxProps> = ({
  hospitals,
  hospitalsIsFetching,
  addHospitalIsFetching,
  fetchHospitals,
  createHospital,
}) => {
  const hospitalCount: number = hospitals.length;

  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [hospitalName, setHospitalName] = React.useState<string>('');
  const [hospitalNameError, setHospitalNameError] = React.useState<string>('');
  const [hospitalImageError, setHospitalImageError] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  const navigate = useNavigate();
  let location = useLocation();

  const navigateToHospitals = () => {
    navigate(generatePath(HospitalsRoute()));
  };

  const navigateToAddDepartments = (hospitalId: string) => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId: hospitalId }));
  };

  const checkHospitalsExistence = () => {
    if (checkHospitalsLimit(hospitals.length)) {
      navigateToHospitals();
      return;
    }

    if (isUrlFromAuth(location.state)) {
      const [hospitalExists, departmentExist] = checkExistenceHospitalsAndDepartments(hospitals);
      if (hospitalExists && departmentExist) {
        navigateToHospitals();
        return;
      }

      if (hospitalExists && !departmentExist) {
        navigateToAddDepartments(hospitals[0].id);
        return;
      }
    }
  };

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

  React.useEffect(() => {
    fetchHospitals()
      .finally(() => {
        setIsFetching(false);
      });
  }, [fetchHospitals]);

  if (!hospitalsIsFetching) {
    checkHospitalsExistence();
  }
  if (hospitalsIsFetching || isFetching) return <LoaderBox />;
  if (!hospitalsIsFetching && !isFetching) {
    return <HospitalAdminUi
      hospitalCount={hospitalCount}
      isFetching={addHospitalIsFetching}
      image={image}
      setImage={onImageChange}
      onSubmit={onSubmit}
      onInputChange={onInputChange}
      hospitalNameError={hospitalNameError}
      hospitalImageError={hospitalImageError}
    />;
  }
  return null;
};

const getData = createSelector(
  [getHospitalsArray, getHospitalsIsFetching, getAddHospitalIsFetching],
  (hospitals, hospitalsIsFetching, addHospitalIsFetching) => {
    return {
      hospitals,
      hospitalsIsFetching,
      addHospitalIsFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospitals: getHospitalsAndDepartments,
  createHospital: addHospital,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HospitalAdmin);
