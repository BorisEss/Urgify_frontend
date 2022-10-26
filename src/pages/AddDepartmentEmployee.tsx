import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { generatePath, useNavigate, useParams } from 'react-router-dom';
import { createSelector } from 'redux-views';

import { addEmployee, getHospital } from '../actions/hospital';
import type { DepartmentType } from '../api/apiTypes';
import { EmployeeListRoute } from '../navigation/navTypes';
import { getCurrentHospital } from '../selectors/hospital';
import { getHospitalsOrDepartmentsIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { AddDepartmentEmployeeUiErrors, AddDepartmentEmployeeUiFields } from '../types';
import AddDepartmentEmployeeUi from '../ui/AddDepartmentEmployeeUi';
import { formObj, validate } from '../utils/authValidation';

const initialErrors: AddDepartmentEmployeeUiErrors = {
  email: '',
  phone: '',
  firstName: '',
  lastName: '',
};

const AddDepartmentEmployee: React.FC<ReduxProps> = ({
  hospital,
  isFetching,
  fetchHospital,
  createDepartmentEmployee,
}) => {
  const navigate = useNavigate();
  let { hospitalId, departmentId } = useParams();
  const currentDepartment: DepartmentType | null = hospital?.departments?.length && departmentId
    ? hospital.departments.filter(item => item.id === departmentId)[0] : null;

  const [itemFields, setItemFields] = React.useState<AddDepartmentEmployeeUiFields>({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
  });

  const [errors, setErrors] = React.useState< AddDepartmentEmployeeUiErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email':
        updateErrors(field, !itemFields[field] ? 'Required field! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'email': {
        updateErrors(field, !value ? 'Required field! ' : '');
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
      {valueType: 'firstName', value: itemFields.firstName},
      {valueType: 'lastName', value: itemFields.lastName},
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    let phoneError: {field: string, message: string} = {field: 'phone', message: ''};
    if (itemFields.phone) { // phone not required, but if exist need to check
      phoneError = validate([
        {valueType: 'phone', value: itemFields.email},
      ])[0];
    }
    if (!hospitalId || !departmentId || errorMessages.length || phoneError.message) {
      const newErrors: AddDepartmentEmployeeUiErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      newErrors.phone = phoneError.message;
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      createDepartmentEmployee(
        itemFields.firstName,
        itemFields.lastName,
        itemFields.email,
        itemFields.phone,
        hospitalId,
        departmentId,
      )
        .then(employee => {
          Log.message(employee);
          if (hospital && hospital.id) {
            navigate(generatePath(EmployeeListRoute(), { hospitalId: hospitalId, departmentId: departmentId }));
          }
        })
        .catch((e: any) => {
          Log.message(e);
          if (e) {
            const newErrors: AddDepartmentEmployeeUiErrors = {...initialErrors};
            if (e.firstName) {
              newErrors.firstName = e.firstName[0];
            }
            if (e.lastName) {
              newErrors.lastName = e.lastName[0];
            }
            if (e.email) {
              newErrors.email = e.email[0];
            }
            if (e.phone) {
              newErrors.phone = e.phone[0];
            }
            setErrors(newErrors);
          }
        });
    }
  };

  React.useEffect(() => {
    if (hospitalId) {
      fetchHospital(hospitalId);
    }
  }, [fetchHospital, hospitalId]);
  if (hospitalId && departmentId && currentDepartment && hospital) return (
    <AddDepartmentEmployeeUi
      onInputChange={onInputChange}
      onPhoneNumberChange={onPhoneNumberChange}
      itemFields={itemFields}
      validateField={validateField}
      onSubmit={onSubmit}
      errors={errors}
      isFetching={isFetching}
      hospitalName={hospital.name}
      departmentName={currentDepartment.name}
    />
  );
  return null;
};

const getData = createSelector(
  [
    getCurrentHospital,
    getHospitalsOrDepartmentsIsFetching,
  ],
  (hospital, isFetching) => {
    return {
      hospital,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospital: getHospital,
  createDepartmentEmployee: addEmployee,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(AddDepartmentEmployee);
