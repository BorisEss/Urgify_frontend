import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { EmployeeDepartmentUiErrors, EmployeeDepartmentUiFields } from '../types';
import AuthPageTitle from './AuthPageTitle';
import BackButton from './Buttons/BackButton';
import Button from './Buttons/Button';
import HospitalHeader from './HospitalHeader';
import Input from './Inputs/Input';
import PhoneInput from './Inputs/PhoneInput';

const useStyles = makeStyles()({
  content: {
    paddingTop: 32,
    paddingBottom: 90,
    marginLeft: 216,
    marginRight: 216,
  },
  titleSpacing: {
    paddingTop: 32,
  },
  subtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#666666',
    paddingTop: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginTop: 32,
  },
  formWrap: {
    maxWidth: 592,
  },
  authFormSpacing: {
    paddingTop: 32,
  },
  inputFlexBox: {
    display: 'flex',
    gap: 8,
  },
  halfInput: {
    flex: '50%',
  },
  inputSpacing: {
    paddingBottom: 32,
  },
  buttonWrap: {
    width: 292,
  },
});

type EmployeeDepartmentUiType = {
  errors: EmployeeDepartmentUiErrors;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPhoneNumberChange: (value: string) => void;
  itemFields: EmployeeDepartmentUiFields;
  validateField: (field: string) => void;
  onSubmit: () => void;
};

const EmployeeDepartmentUi: React.FC<EmployeeDepartmentUiType> = ({
  onInputChange,
  onPhoneNumberChange,
  onSubmit,
  errors,
  itemFields,
}) => {
  const {classes, cx} = useStyles();

  return (
    <div>
      <HospitalHeader title="Hospital Pediatric WA" />
      <div className={classes.content}>
        <BackButton title="Admitting" />
        <div className={classes.divider} />
        <div className={classes.formWrap}>
          <div className={classes.titleSpacing}>
            <AuthPageTitle
              title="Add employee"
              subtitle={
                <p className={classes.subtitle}>
                  Quis pulvinar aliquet amet, velit mauris elit vulputate. Cursus nunc, arcu metus integer rhoncus tempor adipiscing sed at. Ac semper velit.
                </p>
              }
            />
          </div>
          <div className={classes.authFormSpacing}>
            <div className={cx(classes.inputFlexBox, classes.inputSpacing)}>
              <div className={classes.halfInput}>
                <Input
                  label="First Name"
                  error={!!errors.firstName}
                  type="string"
                  name="firstName"
                  onChange={onInputChange}
                  />
              </div>
              <div className={classes.halfInput}>
                <Input
                  label="Last Name"
                  type="string"
                  name="lastName"
                  error={!!errors.lastName}
                  onChange={onInputChange}
                  />
              </div>
            </div>
            <div className={classes.inputSpacing}>
              <Input
                label="Email"
                type="email"
                name="email"
                error={!!errors.email}
                onChange={onInputChange}
                />
            </div>
            <div className={classes.inputSpacing}>
              <PhoneInput
                label="Phone"
                inputValue={itemFields.phone}
                onInputChange={onPhoneNumberChange}
                error={!!errors.phone}
              />
            </div>
          </div>
          <div className={classes.buttonWrap}>
            <Button
              title="Add employee"
              onClick={onSubmit}
              disabled={!!errors.email || !!errors.phone || !!errors.firstName || !!errors.lastName}
              w100
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default  EmployeeDepartmentUi;
