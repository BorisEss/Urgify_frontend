import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { HospitalType } from '../api/apiTypes';
import images from '../images';
import { checkDepartmentsLimit } from '../utils/loginRedirectFlow';
import IconButton from './Buttons/IconButton';
import OutlinedButton from './Buttons/OutlinedButton';
import HospitalName from './HospitalName';

const useStyles = makeStyles()({
  root: {
    paddingBottom: 24,
  },
  hospitalTitleBox: {
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

type Props = {
  hospital: HospitalType;
  navigateToAddDepartments: (hospitalId: string) => void;
  onDepartmentRemove: (hospitalId: string, departmentId: string) => void;
  redirectToAddEmployee: (hospitalId: string, departmentId: string) => void;
  redirectToAddPatients: (hospitalId: string, departmentId: string) => void;
  isOpenInitial?: boolean;
  onHospitalRemove: (hospitalId: string) => void;
}

const HospitalToggleItem: React.FC<Props> = ({
  hospital,
  navigateToAddDepartments,
  onDepartmentRemove,
  redirectToAddEmployee,
  redirectToAddPatients,
  isOpenInitial = false,
  onHospitalRemove,
}) => {
  const {classes} = useStyles();
  const [open, setOpen] = React.useState(isOpenInitial);

  const toggleHospital = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.root}>
      <div className={classes.hospitalTitleBox}>
        <HospitalName
          title={hospital.name}
          onClick={toggleHospital}
          open={open}
          onRemoveClick={() => onHospitalRemove(hospital.id)}
        />
      </div>
      <div className={classes.divider} />
      {open && hospital.departments && hospital.departments.length ? hospital.departments.map(department => (
        <div
          className={classes.menuItem}
          key={department.name}
        >
          <div className={classes.itemTitle}>
            <h2 className={classes.title} onClick={() => redirectToAddPatients(hospital.id, department.id)}>{department.name}</h2>
            <IconButton onClick={() => onDepartmentRemove(hospital.id, department.id)} source={images.trashCan} />
          </div>
          <div className={classes.actionOutlined}>
            <OutlinedButton
              color="orange"
              bigger
              type="button"
              title="Add employee"
              lowerCase
              w100
              onClick={() => redirectToAddEmployee(hospital.id, department.id)}
            />
          </div>
        </div>
      )) : null}
      {open && !checkDepartmentsLimit(hospital.departments.length) && <div className={classes.addDepartmentAction}>
        <OutlinedButton
          color="gray"
          bigger
          type="button"
          title="Add department"
          lowerCase
          w100
          onClick={() => navigateToAddDepartments(hospital.id)}
        />
      </div>}
    </div>
  );
};

export default HospitalToggleItem;
