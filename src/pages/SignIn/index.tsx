import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'redux-views';

import { authActions, authByMail, getUserInfoOnTokenUpdate } from '../../actions/auth';
import { getAuthErrors, isAuthenticated } from '../../selectors/auth';
import { getAuthorizeIsFetching } from '../../selectors/network';
import Log from '../../services/logger';
import type { AppState } from '../../store';
import type { SignInUiErrors, SignInUiFields } from '../../types';
import SignInUi from '../../ui/SignInUi';
import { formObj, validate } from '../../utils/authValidation';


const initialErrors: SignInUiErrors = {
  email: '',
  password: '',
};

const SignIn: React.FC<ReduxProps> = ({
    loginByEmail,
    addTokens,
    // isAuth,
    // authErrors,
    // isFetching,
  }) => {

  const [itemFields, setItemFields] = React.useState<SignInUiFields>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = React.useState<SignInUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'email':
      case 'password':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
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
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: SignInUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
      // TODO: Remove when connect real api
      loginByEmail(itemFields.email, itemFields.password)
        .finally(() => {
          addTokens({
            accessToken: 'dummyAccessToken',
            refreshToken: 'dummyRefreshToken',
          });
        });
    }
  };

  return <SignInUi
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
  loginByEmail: authByMail,
  setErrors: authActions.setErrors,
  addTokens: getUserInfoOnTokenUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SignIn);
