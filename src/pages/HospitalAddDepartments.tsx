import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';
import { generatePath, useNavigate } from 'react-router-dom';
import { createSelector } from 'redux-views';
import { v4 as uuidv4 } from 'uuid';

import { addDepartments, getHospitalsAndDepartments } from '../actions/hospital';
import type { DepartmentsArray, HospitalType } from '../api/apiTypes';
import { HospitalsRoute } from '../navigation/navTypes';
import { getHospitalsArray } from '../selectors/hospital';
import { getHospitalsOrDepartmentsIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { DepartmentsFieldErrosType, DepartmentsFieldsType } from '../types';
import HospitalAddDepartmentsUi from '../ui/HospitalAddDepartmentsUi';
import { checkDepartmentsLimit } from '../utils/loginRedirectFlow';
import { checkTwoStringsWithNoCase, maxLength, minLength } from '../utils/strings';

const HospitalAddDepartments: React.FC<ReduxProps> = ({
  hospitals,
  isFetching,
  fetchHospitals,
  createDepartments,
}) => {
  let { hospitalId } = useParams();
  // TODO: Here need to loader when hospital loading and departments.
  // TODO: Add redirect to createHospital if NO hospitalId or hospitalDataRequest return error
  // But how understand if request finished?

  const navigate = useNavigate();
  const [fields, setFields] = React.useState<DepartmentsFieldsType>({'0': ''});
  const [fieldErrors, setFieldErrors] = React.useState<DepartmentsFieldErrosType>({'0': ''});
  const [resetErrors, setResetErrors] = React.useState<boolean>(false);
  const currentHospital: HospitalType | undefined = hospitals.length ? hospitals.find(item => item.id === hospitalId) : undefined;
  const departments: DepartmentsArray = currentHospital ? currentHospital.departments : [];

  const createdDepartmentsCount: number = departments.length;
  const newDepartmentsCount: number = Object.keys(fields).length;

  const navigateToHospitals = () => {
    navigate(generatePath(HospitalsRoute()));
  };

  const validateFieldslength = () => {
    let isValid: boolean = true;
    for ( const departmentName of Object.values(fields)) {
      if (!departmentName || minLength(departmentName, 2) || maxLength(departmentName, 50)) {
        isValid = false;
        break;
      }
    }
    return isValid;
  };

  const handleResetErrors = () => {
    setFieldErrors({});
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    const list = {...fields, [id]: value};

    setFields(list);

    if (resetErrors) {
      handleResetErrors();
      setResetErrors(false);
    }
  };

  const handleAddMoreClick = () => {
    const newDepartmentKey: string = uuidv4();
    setFields({...fields, [newDepartmentKey]: ''});
  };

  const handleRemoveClick = (id: string) => {
    delete fields[id];
    setFields({ ...fields });
    if (resetErrors) {
      handleResetErrors();
    }
  };

  const nameMatchingValidate = () => {
    setResetErrors(true);
    const errors: DepartmentsFieldErrosType = {};

    // Check newDepartments with Exists
    if (departments.length) {
      for (const createdDepartment of departments) {
        for (const [key, newDepartmentname] of Object.entries(fields)) {
          if (checkTwoStringsWithNoCase(newDepartmentname, createdDepartment.name)) {
            // need to create array of errors, before update State
            errors[key] = 'Department with that name still exists';
          }
        }
      }

      if (Object.values(errors).length) {
        setFieldErrors(errors);
        return false;
      }
    }

    // Check newDepartments with each other
    const departmentKeys: string[] = Object.keys(fields);
    const keysLength: number = departmentKeys.length;
    for (let i = 0; i < keysLength; i++) {
      const departmentKeyCurrent = departmentKeys[i];
      const departmentNameCurrent = fields[departmentKeyCurrent];

      for (let j = i + 1; j < keysLength; j++) {
        const departmentKeyNext = departmentKeys[j];
        const departmentNameNext = fields[departmentKeyNext];
        if ((departmentKeyCurrent !== departmentKeyNext)
          && (checkTwoStringsWithNoCase(departmentNameCurrent, departmentNameNext))) {
          errors[departmentKeyCurrent] = 'The name of the department is the same as another.';
          errors[departmentKeyNext] = 'The name of the department is the same as another.';
        }
      }
    }

    if (Object.values(errors).length) {
      setFieldErrors(errors);
      return false;
    }
    return true;
  };

  const onSubmit = () => {
    if (!newDepartmentsCount || !hospitalId) return;
    if (nameMatchingValidate()) {
      createDepartments(hospitalId, Object.values(fields))
        .then(() => {
          navigateToHospitals();
        })
        .catch((e: any) => {
          Log.message(e);
        });
    }
  };

  React.useEffect(() => {
    if (hospitalId) {
      fetchHospitals();
    }
  }, [fetchHospitals, hospitalId]);

  if (currentHospital?.departments && checkDepartmentsLimit(currentHospital.departments.length)) {
    navigateToHospitals();
  }
  if (hospitalId && currentHospital) return (
    <HospitalAddDepartmentsUi
      onSubmit={onSubmit}
      fields={fields}
      handleInputChange={handleInputChange}
      handleAddMoreClick={handleAddMoreClick}
      handleRemoveClick={handleRemoveClick}
      isFetching={isFetching}
      createdDepartmentsCount={createdDepartmentsCount}
      newDepartmentsCount={newDepartmentsCount}
      validateFieldslength={validateFieldslength}
      fieldErrors={fieldErrors}
      hospitals={hospitals}
      hospital={currentHospital}
    />
  );
  return null;
};

const getData = createSelector(
  [
    getHospitalsArray,
    getHospitalsOrDepartmentsIsFetching,
  ],
  (hospitals, isFetching) => {
    return {
      hospitals,
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  fetchHospitals: getHospitalsAndDepartments,
  createDepartments: addDepartments,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(HospitalAddDepartments);
