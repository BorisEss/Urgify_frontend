import React from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import type { HospitalsArray, HospitalType } from '../api/apiTypes';
import { textNumbers } from '../constants/hospitals';
import { HospitalAdminRoute } from '../navigation/navTypes';
import type { DepartmentsFieldErrosType, DepartmentsFieldsType } from '../types';
import { checkHospitalsLimit } from '../utils/loginRedirectFlow';
import AuthPageTitle from './AuthPageTitle';
import Button from './Buttons/Button';
import OutlinedButton from './Buttons/OutlinedButton';
import Dropzone from './Dropzone';
import HospitalHeader from './HospitalHeader';
import HospitalName from './HospitalName';
import Input from './Inputs/Input';
import PageName from './PageName';

const useStyles = makeStyles()({
  content: {
    paddingTop: 32,
    paddingBottom: 90,
    marginLeft: 216,
    marginRight: 216,
  },
  pagesNameSpace: {
    paddingBottom: 48,
  },
  departmentsNameSpace: {
    paddingBottom: 16,
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
    marginBottom: 32,
  },
  formWrap: {
    maxWidth: 592,
  },
  authFormSpacing: {
    paddingTop: 32,
  },
  inputSpacing: {
    paddingBottom: 32,
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  actionsButton: {
    flex: 1,
  },
});

type Props = {
  fields: DepartmentsFieldsType;
  handleInputChange: (e:React.ChangeEvent<HTMLInputElement>, id: string) => void;
  handleRemoveClick: (id: string) => void;
  onSubmit: () => void;
  handleAddMoreClick: () => void;
  isFetching: boolean;
  createdDepartmentsCount: number;
  newDepartmentsCount: number;
  validateFieldslength: () => boolean;
  fieldErrors: DepartmentsFieldErrosType;
  hospitals: HospitalsArray;
  hospital: HospitalType;
}

const HospitalAddDepartmentsUi: React.FC<Props> = ({
  fields,
  handleInputChange,
  handleRemoveClick,
  onSubmit,
  handleAddMoreClick,
  // isFetching,
  createdDepartmentsCount,
  newDepartmentsCount,
  validateFieldslength,
  fieldErrors,
  hospitals,
  hospital,
}) => {
  const {classes} = useStyles();
  const navigate = useNavigate();

  const navigateToHospitalAdmin = () => {
    navigate(HospitalAdminRoute());
  };

  const showAddHospitalButton = !checkHospitalsLimit(hospitals.length);

  return (
    <div>
      <HospitalHeader
        buttonTitle={showAddHospitalButton ? 'Add another hospital' : ''}
        onClick={navigateToHospitalAdmin}
      />
      <div className={classes.content}>
        <div className={classes.pagesNameSpace}>
          <PageName title="Your hospitals" />
        </div>
        <div className={classes.departmentsNameSpace}>
          <HospitalName title={hospital.name} />
        </div>
        <div className={classes.divider} />
        {hospital.logo ? <Dropzone uploadedImage={hospital.logo} disableRemove /> : null}
        <div className={classes.formWrap}>
          <div className={classes.titleSpacing}>
            <AuthPageTitle
              title={`Let’s add your ${createdDepartmentsCount < 20 ? textNumbers[createdDepartmentsCount + 1] : createdDepartmentsCount + 1} department`}
              subtitle={
                <p className={classes.subtitle}>
                  Aliquam convallis nam luctus egestas amet quis ut ac. Aliquet vulputate non elit turpis pellentesque. A cras a elementum faucibus egestas.
                </p>
              }
            />
          </div>
          <div className={classes.authFormSpacing}>
            {Object.keys(fields).map(key => (
              <div className={classes.inputSpacing} key={key}>
                <Input
                  label="department name"
                  type="text"
                  value={fields[key]}
                  onChange={e => handleInputChange(e, key)}
                  onDelete={newDepartmentsCount > 1 ? () => handleRemoveClick(key) : undefined}
                  error={!!fieldErrors[key]}
                />
              </div>
            ))}
            <div className={classes.actions}>
              <div className={classes.actionsButton}>
                <Button
                  title={`Save department${newDepartmentsCount > 1 ? 's' : ''}`}
                  onClick={onSubmit}
                  disabled={!validateFieldslength()}
                  w100
                />
              </div>
              <div className={classes.actionsButton}>
                <OutlinedButton
                  color="gray"
                  bigger
                  type="button"
                  title="Add one more"
                  w100
                  lowerCase
                  onClick={handleAddMoreClick}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HospitalAddDepartmentsUi;
