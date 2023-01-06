import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addCompany } from '../actions/company';
import { AddCustomersRoute } from '../navigation/navTypes';
import { getUserCompanyId } from '../selectors/auth';
import type { AppState } from '../store';
import CompanyAdminUi from '../ui/CompanyAdminUi';
import { maxLength, minLength } from '../utils/strings';

const CompanyAdmin: React.FC<ReduxProps> = ({
  userCompanyId,
  createCompany,
}) => {
  const navigate = useNavigate();

  const [companyName, setCompanyName] = React.useState<string>('');
  const [companyNameError, setCompanyNameError] = React.useState<string>('');
  const [companyImageError, setCompanyImageError] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyNameError('');
    setCompanyName(e.target.value);
  };

  const onImageChange = (img: File | null) => {
    setCompanyImageError('');
    setImage(img);
  };

  const navigateToDashboard = (companyId: string) => {
    navigate(generatePath(AddCustomersRoute(), { companyId }));
  };

  const validate = () => {
    let nameError: string = '';
    let imageError: string = '';
    if (!companyName || minLength(companyName, 2) || maxLength(companyName, 50)) {
      nameError = 'Company name should have from 2 to 50 symbols';
    }
    if (!image || (image.type.split('/')[0] !== 'image') || !image.name) {
      imageError = 'The company logo must be a picture';
    }
    if (nameError || imageError) {
      setCompanyNameError(nameError);
      setCompanyImageError(imageError);
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (validate() && image) {
      createCompany(companyName, image)
        .then(resp => {
          if (resp && resp.id) {
            navigateToDashboard(resp.id);
          }
        })
        .catch((e: any) => {
          if (e && e.name) {
            setCompanyNameError(e.name);
          }
          if (e && e.logo) {
            setCompanyImageError(e.logo);
          }
        });
    }
  };

  // Here, we can check if companyId exist in localStorage, maybe, or need to fac getRequest to get userData
  // and then check if companyId exist
  // if no userData in localStorage then user is unlogged

  useEffect(() => {
    if (userCompanyId) {
      navigateToDashboard(userCompanyId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   if (!userCompanyId) {
  //     fetchUserData();
  //   }
  // }, [userCompanyId, fetchUserData]);

  // if (isFetching) return <LoaderBox />;

  return <CompanyAdminUi
    image={image}
    setImage={onImageChange}
    onSubmit={onSubmit}
    onInputChange={onInputChange}
    companyNameError={companyNameError}
    companyImageError={companyImageError}
  />;
};

const getData = createSelector(
  [getUserCompanyId],
  (userCompanyId) => {
    return {
      userCompanyId,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  createCompany: addCompany,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CompanyAdmin);
