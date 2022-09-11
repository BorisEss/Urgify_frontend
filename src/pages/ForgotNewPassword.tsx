import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { authActions, forgotSendPasswords, getUserInfoOnTokenUpdate } from '../actions/auth';
import { SignInRoute } from '../navigation/navTypes';
import { getAuthErrors, isAuthenticated } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { ForgotNewPasswordUiErrors, ForgotNewPasswordUiFields } from '../types';
import type { PasswordSecureFields } from '../types';
import ForgotNewPasswordUi from '../ui/ForgotNewPasswordUi';
import { formObj, validate } from '../utils/authValidation';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, maxLength } from '../utils/strings';

const initialErrors: ForgotNewPasswordUiErrors = {
  password: '',
  repeatPassword: '',
};

const ForgotNewPassword: React.FC<ReduxProps> = ({
  forgotPasswordSendPassword,
}) => {
  const navigate = useNavigate();
  let { uid, token } = useParams();

  const [itemFields, setItemFields] = React.useState<ForgotNewPasswordUiFields>({
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = React.useState<ForgotNewPasswordUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'password':
      case 'repeatPassword':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'password': {
        updateErrors(field, !value ? 'Required field' + '! ' : '');
        validatePasswordSecure(value);
        break;
      }
      case 'repeatPassword': {
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
      {valueType: 'password', value: itemFields.password},
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if ((itemFields.password !== itemFields.repeatPassword) || !itemFields.repeatPassword) {
      errorMessages.push({
        field: 'repeatPassword',
        message: 'Repeat new password need to be equal to password',
      });
    }
    if (errorMessages.length) {
      const newErrors: ForgotNewPasswordUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      if (uid && token) {
        forgotPasswordSendPassword(itemFields.password, itemFields.repeatPassword, uid, token)
          .then(() => {
            navigate(SignInRoute());
          })
          .catch((e: any) => {
            Log.message(e);
            if (e) {
              // Here don't handled uid, and token errors. Don't know where to show
              const newErrors: ForgotNewPasswordUiErrors = {...initialErrors};
              if (e.new_password1) {
                newErrors.password = e.new_password1;
              }
              if (e.new_password2) {
                newErrors.repeatPassword = e.new_password2;
              }
              setErrors(newErrors);
            }
          });
      }
    }
  };

  const [passwordSecure, setPasswordSecure] = React.useState<PasswordSecureFields>({
    minLength: false,
    hasLowerCaseLetter: false,
    hasUpperCaseLetter: false,
    hasSpecialCharacter: false,
    hasNumber: false,
  });

  const validatePasswordSecure = (value: string) => {
    setPasswordSecure({
      minLength: maxLength(value, 7),
      hasLowerCaseLetter: hasLowerCaseLetter(value),
      hasUpperCaseLetter: hasUpperCaseLetter(value),
      hasSpecialCharacter: hasSpecialCharacter(value),
      hasNumber: hasNumber(value),
    });
  };

  if (uid && token) return <ForgotNewPasswordUi
    onInputChange={onInputChange}
    validateField={validateField}
    onSubmit={onSubmit}
    errors={errors}
    passwordSecure={passwordSecure}
  />;

  return null;
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
  forgotPasswordSendPassword: forgotSendPasswords,
  setErrors: authActions.setErrors,
  addTokens: getUserInfoOnTokenUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotNewPassword);
