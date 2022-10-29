import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { authActions, authByMail } from '../actions/auth';
import { navTypes } from '../navigation/navTypes';
import { getAuthErrors } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { SignInUiErrors, SignInUiFields } from '../types';
import SignInUi from '../ui/SignInUi';
import { formObj, validate } from '../utils/authValidation';

const initialErrors: SignInUiErrors = {
  email: '',
  password: '',
};

const SignIn: React.FC<ReduxProps> = ({
    loginByEmail,
    // authErrors,
    // isFetching,
  }) => {
  let { hospitalId, departmentId } = useParams();

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
      loginByEmail(itemFields.email, itemFields.password,
        hospitalId && departmentId ? {
          to: navTypes.AddPatients,
          options: {
            hospitalId,
            departmentId,
          },
        }
        : {
          to: navTypes.HospitalAdmin,
          from: navTypes.SignIn,
        }
      )
        .catch((e: any) => {
          if (e) {
            const newErrors: SignInUiErrors = {...initialErrors};
            if (e.email) {
              newErrors.email = e.email[0];
            }
            if (e.password) {
              newErrors.password = e.password[0];
            }
            setErrors(newErrors);
          }
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
  [getAuthErrors, getAuthorizeIsFetching],
  (authErrors, isFetching) => {
    return {
      authErrors,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  loginByEmail: authByMail,
  setErrors: authActions.setErrors,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SignIn);
