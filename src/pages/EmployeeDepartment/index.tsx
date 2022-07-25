import React from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { EmployeeListRoute } from '../../navigation/navTypes';
import Log from '../../services/logger';
import type { EmployeeDepartmentUiErrors, EmployeeDepartmentUiFields } from '../../types';
import EmployeeDepartmentUi from '../../ui/EmployeeDepartmentUi';
import { formObj, validate } from '../../utils/authValidation';

const initialErrors: EmployeeDepartmentUiErrors = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
};

const EmployeeDepartment = () => {
  const navigate = useNavigate();
  let { hospitalId, departmentId } = useParams();

  const [itemFields, setItemFields] = React.useState<EmployeeDepartmentUiFields>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = React.useState< EmployeeDepartmentUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'phone':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
      case 'phone': {
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

  const onPhoneNumberChange = (value: string) => {
    const unmaskedValue: string = value.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replaceAll('-', '');
    setValue('phone', unmaskedValue);
  };

  const onSubmit = () => {
    const form: formObj[] = [
      {valueType: 'email', value: itemFields.email},
      {valueType: 'phone', value: itemFields.phone},
      {valueType: 'firstName', value: itemFields.firstName},
      {valueType: 'lastName', value: itemFields.lastName},
    ];

    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: EmployeeDepartmentUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
      // this redirect need to be called after employee added on BE
      navigate(generatePath(EmployeeListRoute(), { hospitalId: hospitalId, departmentId: departmentId }));
    }
  };
  // TODO: Here need to add or loader, or empty text. Or simply redirect somewhere if NO hospitalId or departmentId
  if (hospitalId && departmentId) return (
    <EmployeeDepartmentUi
      onInputChange={onInputChange}
      onPhoneNumberChange={onPhoneNumberChange}
      itemFields={itemFields}
      validateField={validateField}
      onSubmit={onSubmit}
      errors={errors}
    />
  );
  return null;
};


export default EmployeeDepartment;
