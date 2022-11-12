import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addCompany, getCompany } from '../actions/company';
import { getCurrentCompany } from '../selectors/company';
import { getCompanyIsFetching } from '../selectors/network';
import type { AppState } from '../store';
import CompanyAdminUi from '../ui/CompanyAdminUi';
import LoaderBox from '../ui/LoaderBox';
import { isUrlFromAuth } from '../utils/loginRedirectFlow';
import { maxLength, minLength } from '../utils/strings';

const CompanyAdmin: React.FC<ReduxProps> = ({
  company,
  companyIsFetching,
  fetchCompany,
  createCompany,
}) => {
  const [isFetching, setIsFetching] = React.useState<boolean>(true);
  const [companyName, setCompanyName] = React.useState<string>('');
  const [companyNameError, setCompanyNameError] = React.useState<string>('');
  const [companyImageError, setCompanyImageError] = React.useState<string>('');
  const [image, setImage] = React.useState<File | null>(null);
  let location = useLocation();

  const checkCompanyExistence = () => {
    console.log(company);
    if (isUrlFromAuth(location.state)) {

    }
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompanyNameError('');
    setCompanyName(e.target.value);
  };

  const onImageChange = (img: File | null) => {
    setCompanyImageError('');
    setImage(img);
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
            // navigate to dashboard
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

  React.useEffect(() => {
    fetchCompany()
      .finally(() => {
        setIsFetching(false);
      });
  }, [fetchCompany]);

  if (!companyIsFetching) {
    checkCompanyExistence();
  }
  if (companyIsFetching || isFetching) return <LoaderBox />;
  if (!companyIsFetching && !isFetching) {
    return <CompanyAdminUi
      isFetching={companyIsFetching}
      image={image}
      setImage={onImageChange}
      onSubmit={onSubmit}
      onInputChange={onInputChange}
      companyNameError={companyNameError}
      companyImageError={companyImageError}
    />;
  }
  return null;
};

const getData = createSelector(
  [getCurrentCompany, getCompanyIsFetching],
  (company, companyIsFetching) => {
    return {
      company,
      companyIsFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchCompany: getCompany,
  createCompany: addCompany,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(CompanyAdmin);
