import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import { AddPatientsRoute, EmployeeDepartmentRoute, HospitalAddDepartmentsRoute } from '../navigation/navTypes';
import IconButton from './Buttons/IconButton';
import OutlinedButton from './Buttons/OutlinedButton';
import DepartmentName from './DepartmentName';
import HospitalHeader from './HospitalHeader';
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
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
  },
  menuItem: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 27,
    paddingBottom: 28,
    borderBottom: '1px solid #DBDBDB',
  },
  itemTitle: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
    paddingRight: 8,
    cursor: 'pointer',
  },
  actionOutlined: {
    flex: '0 0 292px',
  },
  addDepartmentAction: {
    maxWidth: 292,
    marginTop: 32,
  },
});

type DepartmentType = {
  id: string;
  value: string;
}

type Props = {
  hospitalId: string;
}

const HospitalDepartmentsUi: React.FC<Props> = ({ hospitalId }) => {
  const {classes} = useStyles();
  const navigate = useNavigate();
  const [departments, _setDepartments] = React.useState<DepartmentType[]>([
    {id: '0', value: 'Admitting'},
    {id: '1', value: 'Billings'},
    {id: '2', value: 'Medical Records'},
    {id: '3', value: 'Accounting'},
    {id: '4', value: 'Some Department Name'},
  ]);

  const navigateToAddDepartments = () => {
    navigate(generatePath(HospitalAddDepartmentsRoute(), { hospitalId: hospitalId }));
  };

  const onDepartmentRemove = (_id: string) => {
    // make request to delete department
  };

  const redirectToAddEmployee = (id: string) => {
    navigate(generatePath(EmployeeDepartmentRoute(), { hospitalId: hospitalId, departmentId: id }));
  };

  const redirectToAddPatients = (id: string) => {//TODO: check if it's correct. Maybe you don't need to add a redirect here
    navigate(generatePath(AddPatientsRoute(), { hospitalId: hospitalId, departmentId: id }));
  };

  return (
    <div>
      <HospitalHeader buttonTitle="Add another hospital" />
      <div className={classes.content}>
        <div className={classes.pagesNameSpace}>
          <PageName title="Your hospitals" />
        </div>
        <div className={classes.departmentsNameSpace}>
          <DepartmentName title="Hospital Pediatric WA" onClick={() => {}} />
        </div>
        <div className={classes.divider} />
        {departments.length && departments.map(item => (
          <div className={classes.menuItem} key={item.id}>
            <div className={classes.itemTitle}>
              <h2 className={classes.title} onClick={() => redirectToAddPatients(item.id)}>{item.value}</h2>
              <IconButton onClick={() => onDepartmentRemove(item.id)} source={images.trashCan} />
            </div>
            <div className={classes.actionOutlined}>
              <OutlinedButton
                color="orange"
                bigger
                type="button"
                title="Add employee"
                lowerCase
                w100
                onClick={() => redirectToAddEmployee(item.id)}
              />
            </div>
          </div>
        ))}
        <div className={classes.addDepartmentAction}>
          <OutlinedButton
            color="gray"
            bigger
            type="button"
            title="Add department"
            lowerCase
            w100
            onClick={navigateToAddDepartments}
          />
        </div>
      </div>
    </div>
  );
};

export default HospitalDepartmentsUi;
