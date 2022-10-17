import React from 'react';

import Log from '../services/logger';
import type { NewPasswordsErrors, NewPasswordsFields } from '../types';
import type { PasswordSecureFields } from '../types';
import NewPasswordsUi from '../ui/NewPasswordsUi';
import { formObj, validate } from '../utils/authValidation';
import { hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, maxLength } from '../utils/strings';

const initialErrors: NewPasswordsErrors = {
  password: '',
  repeatPassword: '',
};

type NewPasswordsType = {
  fetchPasswrodsUpdate: (password:string, repeatPassword:string) => Promise<any>;
}

// Generic component, for 2 pages
const NewPasswordsWrapper: React.FC<NewPasswordsType> = ({
  fetchPasswrodsUpdate,
}) => {

  const [itemFields, setItemFields] = React.useState<NewPasswordsFields>({
    password: '',
    repeatPassword: '',
  });

  const [errors, setErrors] = React.useState<NewPasswordsErrors>(initialErrors);

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
      const newErrors: NewPasswordsErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      // but catch can be handled here, because need to set errors
      fetchPasswrodsUpdate(itemFields.password, itemFields.repeatPassword)
        .catch((e: any) => {
          Log.message(e);
          if (e) {
            // Here don't handled uid, and token errors. Don't know where to show
            const newErrors: NewPasswordsErrors = {...initialErrors};
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

  return <NewPasswordsUi
    onInputChange={onInputChange}
    validateField={validateField}
    onSubmit={onSubmit}
    errors={errors}
    passwordSecure={passwordSecure}
  />;
};

export default NewPasswordsWrapper;
