import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Log from '../services/logger';
import type { NewPatientFormErrors, NewPatientFormFields } from '../types';
import { formObj, validate } from '../utils/authValidation';
import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';
import Input from './Inputs/Input';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
    position: 'relative',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  patientForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: '0 0 calc(50% - 16px)',
    paddingBottom: 11,
  },
  button: {
    paddingTop: 32,
  },
}));

type NewPatientModalType = {
  handleClose: () => void;
};

const NewPatientModal: React.FC<NewPatientModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  const [itemFields, setItemFields] = React.useState<NewPatientFormFields>({
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    socialSecurityNumber: '',
    phone: '',
    address: '',
  });

  const initialErrors: NewPatientFormErrors = {
    firstName: '',
    lastName: '',
    email: '',
    birthDate: '',
    socialSecurityNumber: '',
    phone: '',
    address: '',
  };

  const [errors, setErrors] = React.useState<NewPatientFormErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'birthDate':
      case 'socialSecurityNumber':
      case 'phone':
      case 'address':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'birthDate':
      case 'socialSecurityNumber':
      case 'phone':
      case 'address': {
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
      {valueType: 'firstName', value: itemFields.firstName},
      {valueType: 'lastName', value: itemFields.lastName},
      {valueType: 'email', value: itemFields.email},
      {valueType: 'birthDate', value: itemFields.birthDate},
      {valueType: 'socialSecurityNumber', value: itemFields.socialSecurityNumber},
      {valueType: 'phone', value: itemFields.phone},
      {valueType: 'address', value: itemFields.address},
    ];

    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: NewPatientFormErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h2 className={classes.title}>New Patient</h2>
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={classes.patientForm}>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="First Name"
            onChange={onInputChange}
            name="firstName"
            error={!!errors.firstName}
            errorText={errors.firstName}
            onBlur={() => validateField('firstName')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Last Name"
            onChange={onInputChange}
            name="lastName"
            error={!!errors.lastName}
            errorText={errors.lastName}
            onBlur={() => validateField('lastName')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="email"
            label="Email"
            onChange={onInputChange}
            name="email"
            error={!!errors.email}
            errorText={errors.email}
            onBlur={() => validateField('email')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Birth Date"
            onChange={onInputChange}
            name="birthDate"
            error={!!errors.birthDate}
            errorText={errors.birthDate}
            onBlur={() => validateField('birthDate')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Social Security Number"
            onChange={onInputChange}
            name="socialSecurityNumber"
            error={!!errors.socialSecurityNumber}
            errorText={errors.socialSecurityNumber}
            onBlur={() => validateField('socialSecurityNumber')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Phone"
            onChange={onInputChange}
            name="phone"
            error={!!errors.phone}
            errorText={errors.phone}
            onBlur={() => validateField('phone')}
          />
        </div>
          <Input
            type="text"
            label="Address"
            fullWidth
            onChange={onInputChange}
            name="address"
            error={!!errors.address}
            errorText={errors.address}
            onBlur={() => validateField('address')}
          />
         <div className={classes.button}>
          <Button
            title="Add new patient"
            onClick={onSubmit}
          />
         </div>
      </div>
    </div>
  );
};
export default NewPatientModal;
