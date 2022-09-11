import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { authActions, forgotSendMail, getUserInfoOnTokenUpdate } from '../actions/auth';
// import { ForgotNewPasswordRoute } from '../navigation/navTypes';
import { getAuthErrors, isAuthenticated } from '../selectors/auth';
import { getAuthorizeIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { ForgotPasswordUiErrors, ForgotPasswordUiFields } from '../types';
import ForgotPasswordUi from '../ui/ForgotPasswordUi';
import { formObj, validate } from '../utils/authValidation';

const initialErrors: ForgotPasswordUiErrors = {
  email: '',
};

const ForgotPassword: React.FC<ReduxProps> = ({
  forgotPasswordSendEmail,
}) => {
  // const navigate = useNavigate();

  const [itemFields, setItemFields] = React.useState<ForgotPasswordUiFields>({
    email: '',
  });

  const [errors, setErrors] = React.useState<ForgotPasswordUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'email':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'email': {
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
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: ForgotPasswordUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
      forgotPasswordSendEmail(itemFields.email)
        // .then(() => {
        // })
        .catch((e: any) => {
          if (e) {
            const newErrors: ForgotPasswordUiErrors = {...initialErrors};
            if (e.email) {
              newErrors.email = e.email[0];
            }
            setErrors(newErrors);
          }
        });
    }
  };

  return <ForgotPasswordUi
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
  forgotPasswordSendEmail: forgotSendMail,
  setErrors: authActions.setErrors,
  addTokens: getUserInfoOnTokenUpdate,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(ForgotPassword);
