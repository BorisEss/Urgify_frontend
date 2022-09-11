import React from 'react';
import {makeStyles} from 'tss-react/mui';

import OutlinedButton from './Buttons/OutlinedButton';
import Drawer from './Drawer';
import HospitalHeader from './HospitalHeader';
import SearchInput from './Inputs/SearchInput';
import InvoicesListTable from './InvoicesListTable';

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

const InvoicesListUi = () => {
  const {classes} = useStyles();

  return (
    <Drawer children={
      <>
        <div className={classes.headerWrap}>
          <HospitalHeader
            title="Hospital Pediatric WA – Billings"
            disablePaddingLeft
          />
        </div>
        <div className={classes.content}>
          <div>
            <div className={classes.departmentName}>
              <h2 className={classes.title}>Invoices</h2>
              <OutlinedButton
                type="button"
                title="Create new invoice"
                color="orange"
                lowerCase
                extraClass={classes.button}
              />
            </div>
              <SearchInput />
            <div className={classes.tableWrap}>
              <InvoicesListTable />
            </div>
          </div>
        </div>
      </>
    } />
  );
};

export default  InvoicesListUi;
