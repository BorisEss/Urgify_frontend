import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'redux-views';

import { authActions, getUserInfoOnTokenUpdate, regByMail } from '../../actions/auth';
import { getAuthErrors, isAuthenticated } from '../../selectors/auth';
import { getAuthorizeIsFetching } from '../../selectors/network';
import Log from '../../services/logger';
import type { AppState } from '../../store';
import type { SignUpUiErrors, SignUpUiFields } from '../../types';
import SignUpUi from '../../ui/SignUpUi';
import { formObj, validate } from '../../utils/authValidation';


const initialErrors: SignUpUiErrors = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const SignUp: React.FC<ReduxProps> = ({
  registerbyMail,
  addTokens,
  // isAuth,
  // authErrors,
  // isFetching,
}) => {

  const [itemFields, setItemFields] = React.useState<SignUpUiFields>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = React.useState<SignUpUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'password':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'password': {
        updateErrors(field, !value ? 'Required field' + '! ' : '');
        break;
      }
    }

    setItemFields({
      ...itemFields,
      [field]: value,
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.name, e.target.value);

  const onSubmit = () => {
    const form: formObj[] = [
      {valueType: 'email', value: itemFields.email},
      {valueType: 'password', value: itemFields.password},
      {valueType: 'firstName', value: itemFields.firstName},
      {valueType: 'lastName', value: itemFields.lastName},
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: SignUpUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
      // TODO: Remove when connect real api
      registerbyMail(itemFields.firstName, itemFields.lastName, itemFields.email, itemFields.password)
        .finally(() => {
          addTokens({
            accessToken: 'dummyAccessToken',
            refreshToken: 'dummyRefreshToken',
          });
        });
    }
  };

  return <SignUpUi
    onInputChange={onInputChange}
    validateField={validateField}
    onSubmit={onSubmit}
    errors={errors}
   />;
};

const getData = createSelector(
  [isAuthenticated, getAuthErrors, getAuthorizeIsFetching],
  (isAuth, authErrors, isFetching) => {
    return {
      isAuth,
      authErrors,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  registerbyMail: regByMail,
  setErrors: authActions.setErrors,
  addTokens: getUserInfoOnTokenUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SignUp);
