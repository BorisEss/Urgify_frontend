import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AddPatientWrapper from '../components/AddPatientWrapper';
import HospitalDashboardWrapper from '../components/HospitalDashboardWrapper';
import HospitalHeader from './HospitalHeader';
import SearchInput from './Inputs/SearchInput';
import PaginationControls from './PagintationControls';
import TablePatients from './TablePatients';

const useStyles = makeStyles()({
  headerWrap: {
    marginLeft: 216,
  },
  content: {
    marginLeft: 216,
    marginRight: 216,
  },
  tableWrap: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  contentMargin: {
    marginTop: 23,
    width: '100%',
  },
});

const AddPatientsListUi = () => {
  const {classes} = useStyles();

  const onChangePage = (page: number) => {
    console.log(page);
    // setPage(page);
    // getRequest
  };
  return (
    <HospitalDashboardWrapper children={
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
            <AddPatientWrapper />
            <div className={classes.contentMargin} />
            <SearchInput />
            <div className={classes.tableWrap}>
              <TablePatients />
            </div>
            <PaginationControls
              totalProducts={800}
              currentPage={1}
              pageSize={10}
              onChangePage={onChangePage}
            />
          </div>
        </div>
      </>
    } />
  );
};

export default  AddPatientsListUi;
