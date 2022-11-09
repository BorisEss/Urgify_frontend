import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addHospital, getHospital } from '../actions/hospital';
import { getCurrentHospital } from '../selectors/hospital';
import { getHospitalIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import HospitalAdminUi from '../ui/HospitalAdminUi';
import LoaderBox from '../ui/LoaderBox';
import { isUrlFromAuth } from '../utils/loginRedirectFlow';
import { maxLength, minLength } from '../utils/strings';

const HospitalAdmin: React.FC<ReduxProps> = ({
  hospital,
  hospitalIsFetching,
  fetchHospital,
  createHospital,
}) => {
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [hospitalName, setHospitalName] = React.useState<string>('');
  const [hospitalNameError, setHospitalNameError] = React.useState<string>('');
  const [hospitalImageError, setHospitalImageError] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  let location = useLocation();

  const checkHospitalExistence = () => {
    console.log(hospital);
    if (isUrlFromAuth(location.state)) {

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
        .then(resp => {
          if (resp && resp.id) {
            // navigate to dashboard
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
    fetchHospital()
      .finally(() => {
        setIsFetching(false);
      });
  }, [fetchHospital]);

  if (!hospitalIsFetching) {
    checkHospitalExistence();
  }
  if (hospitalIsFetching || isFetching) return <LoaderBox />;
  if (!hospitalIsFetching && !isFetching) {
    return <HospitalAdminUi
      isFetching={hospitalIsFetching}
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
  [getCurrentHospital, getHospitalIsFetching],
  (hospital, hospitalIsFetching) => {
    return {
      hospital,
      hospitalIsFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospital: getHospital,
  createHospital: addHospital,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HospitalAdmin);
