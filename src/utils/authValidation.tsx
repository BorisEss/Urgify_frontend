import {emailIsValid, maxLength, minLength} from './strings';

export type formObj = {
  valueType: string;
  value: string;
};

export const validate = (form: formObj[]): {field: string, message: string}[] => {
  let errorMessages: {field: string, message: string}[] = [];
  form.map((obj) => {
    const value = obj.value;
    switch (obj.valueType) {
      case 'email':
        if (!value.length) {
          errorMessages.push({field: 'email', message:'Please, enter your Email'});
        } else if (!emailIsValid(value)) {
          errorMessages.push({field: 'email', message:'Please, enter correct Email'});
        }
        break;
      case 'password':
        if (!value) {
          errorMessages.push({field: 'password', message:'Please, enter password'});
        } else {
          if (minLength(value, 6)) {
            errorMessages.push({field: 'password', message:'Password must be more than 6 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'password', message:'Password must not be more than 50 characters'});
          }
        }
        break;
      case 'phone':
        if (!value) {
          errorMessages.push({field: 'phone', message:'Please enter a phone number'});
        } else if (value.length !== 11) {
          errorMessages.push({field: 'phone', message:'The number must contain 11 digits'});
        }
        break;
      case 'code':
        if (!value) {
          errorMessages.push({field: 'code', message:'Please enter code'});
        } else if (value.length !== 6) {
          errorMessages.push({field: 'code', message:'Code must be 6 digits'});
        }
        break;
      case 'firstName':
        if (!value) {
          errorMessages.push({field: 'firstName', message:'Please enter a name'});
        } else {
          if (minLength(value, 2)) {
            errorMessages.push({field: 'firstName', message:'Name must be more than 2 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'firstName', message:'Name must not exceed 50 characters'});
          }
        }
        break;
      case 'lastName':
        if (!value) {
          errorMessages.push({field: 'lastName', message:'Please enter your last name'});
        } else {
          if (minLength(value, 2)) {
            errorMessages.push({field: 'lastName', message:'Last name must be more than 2 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'lastName', message:'Last name must not be more than 50 characters'});
          }
        }
        break;
    }
  });
  return errorMessages;
};
