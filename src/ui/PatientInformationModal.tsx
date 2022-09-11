import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';
import SocialCard from './SocialCard';
import TablePacientsInformationModal from './TablePacientsInformationModal';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  personInfo: {
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
    paddingBottom: 4,

  },
  email: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#0D99FF',
    textDecoration: 'underline',
  },
  infoWrap: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  info: {

  },
  infoItem: {
    paddingBottom: 32,
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  data: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
  },
  buttonWrap: {
    position: 'absolute',
    right: 29,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
  },
  tableWrap: {
    paddingTop: 32,
    paddingBottom: 16,
  },
  bigButtonWrap: {
    paddingTop: 31,
  },
}));

type PatientInformationModalType = {
  handleClose: () => void;
};

const PatientInformationModal: React.FC<PatientInformationModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.personInfo}>
          <h2 className={classes.title}>Courtney Henry</h2>
          <span className={classes.email}>binhan628@gmail.com</span>
        </div>
        <div className={classes.buttonWrap}>
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
      <div className={classes.infoWrap}>
        <div className={classes.info}>
            <div className={classes.infoItem}>
              <h6 className={classes.label}>address</h6>
              <p className={classes.data}>1100 Bellevue Way NE Suite 900,<br/> Bellevue, WA 98004, United States</p>
            </div>
            <div className={classes.infoItem}>
              <h6 className={classes.label}>birth date</h6>
              <p className={classes.data}>8/2/2019</p>
            </div>
            <div className={classes.infoItem}>
              <h6 className={classes.label}>phone</h6>
              <p className={classes.data}>(209) 555-0104</p>
            </div>
          </div>
          <SocialCard />
      </div>
      <div className={classes.divider} />
      <div className={classes.tableWrap}>
        <TablePacientsInformationModal />
      </div>
      <div className={classes.divider} />
      <div className={classes.bigButtonWrap}>
        <Button title="Create new invoice" />
      </div>
    </div>
  );
};
export default PatientInformationModal;
