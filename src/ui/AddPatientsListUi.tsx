import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Modal from '../ui/Modal';
import OutlinedButton from './Buttons/OutlinedButton';
import Drawer from './Drawer';
import HospitalHeader from './HospitalHeader';
import SearchInput from './Inputs/SearchInput';
import NewPatientModal from './NewPatientModal';
import TablePatients from './TablePatients';

const useStyles = makeStyles()({
  headerWrap: {
    marginLeft: 216,
  },
  content: {
    marginLeft: 216,
    marginRight: 216,
  },
  departmentName: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 32,
    paddingBottom: 16,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  button: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
    padding: '8px 16px',
    border: '2px solid #F93822',
  },
  tableWrap: {
    paddingTop: 32,
    paddingBottom: 32,
  },
});

const AddPatientsListUi = () => {
  const {classes} = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Drawer children={
      <>
        <div className={classes.headerWrap}>
          <HospitalHeader
            title="Hospital Pediatric WA – Billings"
            buttonTitle="Import patients"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <div>
            <div className={classes.departmentName}>
              <h2 className={classes.title}>Patients</h2>
              <OutlinedButton
                type="button"
                title="Create new"
                color="orange"
                lowerCase
                extraClass={classes.button}
                onClick={handleClickOpen}

              />
            </div>
              <SearchInput />
            <div className={classes.tableWrap}>
              <TablePatients />
            </div>
          </div>
          <Modal
            open={open}
            handleClose={handleClose}
            borderRadius={4}
            children={
              <NewPatientModal handleClose={handleClose} />
            }
          />
        </div>
      </>
    } />
  );
};

export default  AddPatientsListUi;
