import React from 'react';

import Log from '../../services/logger';
import type { ForgotPasswordUiErrors, ForgotPasswordUiFields } from '../../types';
import ForgotPasswordUi from '../../ui/ForgotPasswordUi';
import { formObj, validate } from '../../utils/authValidation';

const initialErrors: ForgotPasswordUiErrors = {
  email: '',
};

const ForgotPassword = () => {

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
      // fetchSignInUser( email, password);//Request
    }
  };

  return <ForgotPasswordUi
    onInputChange={onInputChange}
    validateField={validateField}
    onSubmit={onSubmit}
    errors={errors}
  />;
};

export default ForgotPassword;
