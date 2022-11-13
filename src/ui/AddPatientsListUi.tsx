import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';
import {makeStyles} from 'tss-react/mui';

import AddPatientWrapper from '../components/AddPatientWrapper';
import CompanyDashboardWrapper from '../components/CompanyDashboardWrapper';
import { AddPatientsRoute } from '../navigation/navTypes';
import CompanyHeader from './CompanyHeader';
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
    paddingBottom: 16,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginBottom: 23,
  },
  contentMargin: {
    marginTop: 23,
    width: '100%',
  },
});

type Props = {
  companyId: string,
}

const AddPatientsListUi: React.FC<Props> = ({
  companyId,
}) => {
  const {classes} = useStyles();
  const navigate = useNavigate();

  const navigateToImportPacients = () => {
    navigate(generatePath(AddPatientsRoute(), { companyId }));
  };

  const onChangePage = (page: number) => {
    console.log(page);
    // setPage(page);
    // getRequest
  };
  return (
    <CompanyDashboardWrapper children={
      <>
        <div className={classes.headerWrap}>
          <CompanyHeader
            title="Company Pediatric WA – Billings"
            buttonTitle="Import patients"
            disablePaddingLeft
            onClick={navigateToImportPacients}
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
            <div className={classes.divider} />
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
