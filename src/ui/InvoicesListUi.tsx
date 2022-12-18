import React from 'react';
import {makeStyles} from 'tss-react/mui';

import type { CompanyType } from '../api/apiTypes';
import CompanyDashboardWrapper from '../components/CompanyDashboardWrapper';
import CreateNewInvoiceWrapper from '../components/CreateNewInvoiceWrapper';
import Button from './Buttons/Button';
import CompanyHeader from './CompanyHeader';
import CompanyTitleBox from './CompanyTitleBox';
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
  tableWrap: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  contentMargin: {
    marginTop: 23,
    width: '100%',
  },
  paymentWrap: {
    paddingTop: 17,
    display: 'flex',
    flexWrap: 'wrap',
    boxSizing: 'border-box',
    justifyContent: 'space-between',
    alignItems:'end',
  },
  lastBlock: {
    display: 'flex',
    alignItems: 'end',
  },
  paymentItem: {
    display: 'flex',
    flexDirection:'column',
    flex: 1,
    paddingBottom: 32,
  },
  paymentTitle: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  paymentPrice: {
    fontFamily: 'Poppins-semibold',
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  green: {
    color: '#2FC77B',
  },
  red: {
    color:'#F93822',
  },
  paymentSmall: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  hideButtonBox: {
    paddingBottom: 32,
    marginLeft: 21,
    width: 176,
  },
  hideBtn: {
    padding: '8px 16px',
    fontSize: 12,
    lineHeight: '18px',
    width: '100%',
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'rgba(184, 184, 184, 0.2)',
  },
  actionsWrap: {
    display: 'flex',
    gap: 32,
    width: '100%',
  },
  createBtnWrap: {
    width:'24%',
  },
  searchWrap: {
    width: '100%',
  },
});

type Props = {
  company: CompanyType;
};

const InvoicesListUi: React.FC<Props> = ({
  company,
}) => {
  const {cx,classes} = useStyles();

  return (
    <CompanyDashboardWrapper
      children={
        <>
          <div className={classes.headerWrap}>
            <CompanyHeader
              title={company.name}
              disablePaddingLeft
            />
          </div>
          <div className={classes.content}>
            <div>
              <CompanyTitleBox
                title="Invoices"
              />
              <div className={classes.paymentWrap}>
                <div>
                  <div className={classes.paymentItem}>
                    <p className={classes.paymentTitle}>Issued amount</p>
                    <span className={classes.paymentPrice}>$1,138,132.44</span>
                  </div>
                  <div className={classes.paymentItem}>
                    <p className={classes.paymentTitle}>Invoices created</p>
                    <span className={classes.paymentPrice}>4</span>
                  </div>
                </div>
                <div>
                  <div className={classes.paymentItem}>
                    <p className={classes.paymentTitle}>Already paid</p>
                    <span className={cx(classes.paymentPrice, classes.green)}>$816,723.65</span>
                  </div>
                  <div className={classes.paymentItem}>
                    <p className={classes.paymentTitle}>Fully paid invoices</p>
                    <span className={classes.paymentPrice}>1</span>
                  </div>
                </div>
                <div className={classes.lastBlock}>
                  <div>
                    <div className={classes.paymentItem}>
                      <p className={classes.paymentTitle}>Outstanding</p>
                      <span className={cx(classes.paymentPrice, classes.red)}>$321,408.79</span>
                    </div>
                    <div className={classes.paymentItem}>
                      <p className={classes.paymentTitle}>Latest payment</p>
                      <span className={classes.paymentSmall}>July 14, 2022<br/>1:54:12 PM PDT</span>
                    </div>
                  </div>
                  <div className={classes.hideButtonBox}>
                    <Button
                      title="Hide paid invoices"
                      extraClass={classes.hideBtn}
                    />
                  </div>
                </div>
              </div>
              <div className={classes.divider} />
              <div className={classes.contentMargin} />
              <div className={classes.actionsWrap}>
                <div className={classes.createBtnWrap}>
                  <CreateNewInvoiceWrapper />
                </div>
                <div className={classes.searchWrap}>
                  <SearchInput />
                </div>
              </div>
              <div className={classes.tableWrap}>
                <InvoicesListTable />
              </div>
            </div>
          </div>
        </>
      }
    />
  );
};

export default  InvoicesListUi;
