import React from 'react';
import {makeStyles} from 'tss-react/mui';

import CreateNewInvoiceWrapper from '../components/CreateNewInvoiceWrapper';
import CloseButton from './Buttons/CloseButton';
import Chart from './Chart';
import TableCustomerInformationModal from './TableCustomerInformationModal';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  personInfo: {
    flex: 1,
  },
  personID: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  flex: {
    display: 'flex',
  },
  customerNumber: {
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
  },
  rightInfo: {
    flex: 1,
  },
  infoItem: {
    paddingBottom: 32,
  },
  topInfoItem: {
    flex: 1,
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
  const {classes, cx} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.buttonWrap}>
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={classes.infoWrap}>
        <div className={classes.personInfo}>
          <div className={classes.infoItem}>
            <div className={classes.personID}>
              <h2 className={classes.title}>Courtney Henryy</h2>
              <span className={classes.email}>binhan628@gmail.com</span>
            </div>
          </div>
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
        <div className={classes.rightInfo}>
          <div className={cx(classes.infoItem, classes.flex)}>
            <div className={classes.customerNumber}>
              <span>SD9212969</span>
            </div>
          </div>
          <div className={cx(classes.infoItem, classes.topInfoItem)}>
            <h6 className={classes.label}>social security number</h6>
            <p className={classes.data}>010-87-6341</p>
          </div>
          <div className={classes.infoItem}>
            <Chart />
          </div>
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.tableWrap}>
        <TableCustomerInformationModal />
      </div>
      <div className={classes.divider} />
      <div className={classes.bigButtonWrap}>
        <CreateNewInvoiceWrapper />
      </div>
    </div>
  );
};

export default CustomerInformationModal;
