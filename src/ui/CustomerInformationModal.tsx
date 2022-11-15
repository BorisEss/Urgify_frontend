import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';
import TableCustomerInformationModal from './TableCustomerInformationModal';

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
    justifyContent:'space-between',
    width:'80%',
  },
  personID: {
    display: 'flex',
    flexDirection: 'column',
  },
  medicalNumber: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: ' #FFFFFF',
    backgroundColor: '#0D99FF',
    borderRadius: 12,
    padding:'20px 16px',
    textAlign: 'center',
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
  addressSocialWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '121%',
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

type CustomerInformationModalType = {
  handleClose: () => void;
};

const CustomerInformationModal: React.FC<CustomerInformationModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.personInfo}>
          <div className={classes.personID}>
            <h2 className={classes.title}>Courtney Henry</h2>
            <span className={classes.email}>binhan628@gmail.com</span>
          </div>
          <div className={classes.medicalNumber}>
            <span>SD9212969</span>
          </div>
        </div>
        <div className={classes.buttonWrap}>
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
      <div className={classes.infoWrap}>
        <div>
          <div className={classes.addressSocialWrap}>
            <div className={classes.infoItem}>
                <h6 className={classes.label}>address</h6>
                <p className={classes.data}>1100 Bellevue Way NE Suite 900,<br/> Bellevue, WA 98004, United States</p>
              </div>
              <div className={classes.infoItem}>
                <h6 className={classes.label}>social security number</h6>
                <p className={classes.data}>010-87-6341</p>
              </div>
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
      </div>
      <div className={classes.divider} />
      <div className={classes.tableWrap}>
        <TableCustomerInformationModal />
      </div>
      <div className={classes.divider} />
      <div className={classes.bigButtonWrap}>
        <Button title="Create new invoice" />
      </div>
    </div>
  );
};
export default CustomerInformationModal;
