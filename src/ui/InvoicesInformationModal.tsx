import React from 'react';
import {makeStyles} from 'tss-react/mui';

import CloseButton from './Buttons/CloseButton';
import DownloadPdfButton from './Buttons/DownloadPdfButton';
import OutlinedButton from './Buttons/OutlinedButton';
import TableInvoicesInformationModal from './TableInvoicesInformationModal';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  invoice: {
    display: 'flex',
    gap: 24,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
    paddingBottom: 4,
  },
  infoWrap: {
    display: 'flex',
    flexDirection: 'column',
    gap: 65,
    paddingBottom: 32,
  },
  priceBlock: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 32,
  },
  personName: {
    fontFamily: 'Poppins-semibold',
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    textDecoration: 'underline',
    paddingBottom: 8,
  },
  personAddress: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    paddingBottom: 8,
  },
  personMail: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#0D99FF',
  },
  subtitle: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  price: {
    fontFamily: 'Poppins-semibold',
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  remain: {
    color: '#F93822',
  },
  tablesTitle: {
    fontFamily: 'Poppins-semibold',
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    paddingTop: 32,
    paddingBottom: 16,
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
    paddingBottom: 32,
  },
  recurringPayment: {
    paddingTop: 31,
    paddingBottom: 31,
    width: '100%',
  },
  recurringHeader: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  invoicePaid: {
    fontFamily: 'Poppins-semibold',
    fontSize: 24,
    lineHeight: '36px',
    color: '#777777',
  },
  paymentDate: {
    color: '#2B364D',
  },
  outlinedBtnWrap: {
    paddingTop: 32,
  },
  outlinedBtn: {
    border: '3px solid #777777',
  },
}));

type InvoicesInformationModalType = {
  handleClose: () => void;
};

const InvoicesInformationModal: React.FC<InvoicesInformationModalType> = ({handleClose}) => {
  const {cx,classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.invoice}>
          <h2 className={classes.title}>Invoice &#x23;123456</h2>
        </div>
        <div className={classes.buttonWrap}>
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
      <div className={classes.infoWrap}>
        <div className={classes.priceBlock}>
          <div>
              <h2 className={classes.personName}>Jacob Jones</h2>
              <p className={classes.personAddress}>1100 Bellevue Way NE Suite 900, Bellevue,<br/> WA 98004, United States</p>
              <p className={classes.personMail}>binhan628@gmail.com</p>
          </div>
          <div>
            <p className={classes.subtitle}>Total Charges</p>
            <h2 className={classes.price}>$1,574.09</h2>
          </div>
        </div>
        <div className={classes.priceBlock}>
        <div>
            <p className={classes.subtitle}>Already paid</p>
            <h2 className={classes.price}>$943.65</h2>
          </div>
          <div>
            <p className={classes.subtitle}>Remain to pay</p>
            <h2 className={cx(classes.price,classes.remain)}>$630.44</h2>
          </div>
        </div>
      </div>
      <DownloadPdfButton url={'Explanation of Benefits.pdf'} />
      <div className={classes.tablesTitle}>
        <p>Summary of inpatient service </p>
      </div>
      <div className={classes.tableWrap}>
        <TableInvoicesInformationModal />
      </div>
      <div className={classes.divider} />
      <div className={classes.recurringPayment}>
        <h6 className={classes.recurringHeader}>This patient has recurring payment</h6>
        <div>
          <h2 className={classes.invoicePaid}>The invoice should be fully paid on <span className={classes.paymentDate}>11/20/2022</span>(estimated)</h2>
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.outlinedBtnWrap}>
        <OutlinedButton
          color="gray"
          title="View detailed info"
          w100
          lowerCase
          extraClass={classes.outlinedBtn}
          type="button"
        />
      </div>
    </div>
  );
};
export default InvoicesInformationModal;
