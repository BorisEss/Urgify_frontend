import {emailIsValid, hasLowerCaseLetter, hasNumber, hasSpecialCharacter, hasUpperCaseLetter, maxLength, minLength} from './strings';

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
          if (minLength(value, 8)) {
            errorMessages.push({field: 'password', message:'Password must be more than 7 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'password', message:'Password must not be more than 50 characters'});
          } else if (!hasNumber(value)) {
            errorMessages.push({field: 'password', message:'Password must contain a number character'});
          } else if (!hasLowerCaseLetter(value)) {
            errorMessages.push({field: 'password', message:'Password must contain an lowercase character'});
          } else if (!hasUpperCaseLetter(value)) {
            errorMessages.push({field: 'password', message:'Password must contain an uppercase character'});
          } else if (!hasSpecialCharacter(value)) {
            errorMessages.push({field: 'password', message:'Password must contain a special character'});
          }
        }
        break;
      case 'phone':
        if (!value) {
          errorMessages.push({field: 'phone', message:'Please enter a phone number'});
        } else if (value.length !== 10) {
          errorMessages.push({field: 'phone', message:'The number must contain 10 digits'});
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
          if (minLength(value, 1)) {
            errorMessages.push({field: 'firstName', message:'Name must be more than 1 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'firstName', message:'Name must not exceed 50 characters'});
          }
        }
        break;
      case 'hospitalName':
        if (!value) {
          errorMessages.push({field: 'hospitalName', message:'Please enter a hospital name'});
        } else {
          if (minLength(value, 1)) {
            errorMessages.push({field: 'hospitalName', message:'Hospital name must be more than 1 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'hospitalName', message:'Hospital name must not exceed 50 characters'});
          }
        }
        break;
      case 'lastName':
        if (!value) {
          errorMessages.push({field: 'lastName', message:'Please enter your last name'});
        } else {
          if (minLength(value, 1)) {
            errorMessages.push({field: 'lastName', message:'Last name must be more than 1 characters'});
          } else if (maxLength(value, 50)) {
            errorMessages.push({field: 'lastName', message:'Last name must not be more than 50 characters'});
          }
        }
        break;
    }
  });
  return errorMessages;
};
