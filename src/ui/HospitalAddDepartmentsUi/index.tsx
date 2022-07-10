import React from 'react';
import { useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';
import { v4 as uuidv4 } from 'uuid';

import { navTypes } from '../../navigation/navTypes';
import type { DepartmentsFieldsType } from '../../types';
import AuthPageTitle from '../AuthPageTitle';
import Button from '../Button';
import DepartmentName from '../DepartmentName';
import HospitalHeader from '../HospitalHeader';
import Input from '../Input';
import OutlinedButton from '../OutlinedButton';
import PageName from '../PageName';

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
    flex: '0 0 50%',
  },
  actionsOutlined: {
    flex: '0 0 50%',
  },
});

const HospitalAddDepartmentsUi = () => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const [fields, setFields] = React.useState<DepartmentsFieldsType>({'0': ''});

  const navigateToHospitalDepartments = () => {
    navigate(navTypes.HospitalDepartments);
  };

  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement>, id: string) => {
    const { value } = e.target;
    const list = {...fields, [id]: value};

    setFields(list);
  };

  const handleAddMoreClick = () => {
    const newDepartmentKey: string = uuidv4();
    setFields({...fields, [newDepartmentKey]: ''});
  };

  const handleRemoveClick = (key: string) => {
    delete fields[key];
    setFields({ ...fields });
  };

  const fieldQnty: number = Object.keys(fields).length;
  return (
    <div>
      <HospitalHeader buttonTitle="Add another hospital" />
      <div className={classes.content}>
        <div className={classes.pagesNameSpace}>
          <PageName title="Your hospitals" />
        </div>
        <div className={classes.departmentsNameSpace}>
          <DepartmentName title="Hospital Pediatric WA" />
        </div>
        <div className={classes.divider} />
        <div className={classes.formWrap}>
          <div className={classes.titleSpacing}>
            <AuthPageTitle
              title="Let’s add your first department"
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
                  onDelete={fieldQnty > 1 ? () => handleRemoveClick(key) : undefined}
                />
              </div>
            ))}
            <div className={classes.actions}>
              <div className={classes.actionsButton}>
                <Button title="Save department" onClick={navigateToHospitalDepartments} />
              </div>
              <div className={classes.actionsOutlined}>
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
