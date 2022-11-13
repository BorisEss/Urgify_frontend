import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { regByMail } from '../actions/auth';
// import { CodeConfirmationRoute } from '../navigation/navTypes';
import { getAuthErrors } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { PasswordSecureFields, SignUpUiErrors, SignUpUiFields } from '../types';
import SignUpUi from '../ui/SignUpUi';
import { formObj, validate } from '../utils/authValidation';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, maxLength } from '../utils/strings';

const initialErrors: SignUpUiErrors = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
};

const SignUp: React.FC<ReduxProps> = ({
  // registerbyMail,
  // authErrors,
  // isFetching,
}) => {
  // const navigate = useNavigate();
  const [itemFields, setItemFields] = React.useState<SignUpUiFields>({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });

  const [passwordSecure, setPasswordSecure] = React.useState<PasswordSecureFields>({
    minLength: false,
    hasLowerCaseLetter: false,
    hasUpperCaseLetter: false,
    hasSpecialCharacter: false,
    hasNumber: false,
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

  const validatePasswordSecure = (value: string) => {
    setPasswordSecure({
      minLength: maxLength(value, 7),
      hasLowerCaseLetter: hasLowerCaseLetter(value),
      hasUpperCaseLetter: hasUpperCaseLetter(value),
      hasSpecialCharacter: hasSpecialCharacter(value),
      hasNumber: hasNumber(value),
    });
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email': {
        updateErrors(field, !value ? 'Required field' + '! ' : '');
        break;
      }
      case 'password': {
        updateErrors(field, !value ? 'Required field' + '! ' : '');
        validatePasswordSecure(value);
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
      // registerbyMail(itemFields.firstName, itemFields.lastName, itemFields.email, itemFields.password)
      //   .then(() => {
      //     navigate(CodeConfirmationRoute());
      //   })
      //   .catch((e: any) => {
      //     if (e) {
      //       const newErrors: SignUpUiErrors = {...initialErrors};
      //       if (e.email) {
      //         newErrors.email = e.email[0];
      //       }
      //       if (e.first_name) {
      //         newErrors.firstFame = e.first_name[0];
      //       }
      //       if (e.last_name) {
      //         newErrors.lastName = e.last_name[0];
      //       }
      //       if (e.password) {
      //         newErrors.password = e.password[0];
      //       }
      //       setErrors(newErrors);
      //     }
      //   });
    }
  };

  return <SignUpUi
    onInputChange={onInputChange}
    validateField={validateField}
    onSubmit={onSubmit}
    errors={errors}
    passwordSecure={passwordSecure}
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
  registerbyMail: regByMail,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(SignUp);
