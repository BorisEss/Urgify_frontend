import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import type { InvoiceServiceType, NewInvoiceFormErrors, UserSelectOption} from '../types';
import Button from './Buttons/Button';
import DownloadPdfButton from './Buttons/DownloadPdfButton';
import OutlinedButton from './Buttons/OutlinedButton';
import TableInvoicesInformationModal from './TableInvoicesInformationModal';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 32,
    position: 'relative',
    cursor: 'pointer',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
    paddingLeft: 24,
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
    flex: '0 0 30%',
    minWidth: 200,
  },
  widthCloser: {
    flex:'0 0 30%',
  },
  flexEnd: {
    alignItems: 'flex-end',
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
  tablesTitle: {
    fontFamily: 'Poppins-semibold',
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    paddingTop: 32,
    paddingBottom: 16,
  },
  bigDivider: {
    width: '100%',
    height: 8,
    background: '#2B364D',
  },
  tableWrap: {
    paddingTop: 16,
    paddingBottom: 8,
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginTop: 32,
  },
  buttonsWrap: {
    paddingTop: 32,
    width:'100%',
    display: 'flex',
    gap: 32,
    alignItems: 'center',
  },
  button: {
    width:'100%',
  },
  previewBtn: {
    width: '100%',
  },
}));

type Props = {
  setStep: (step: number) => void;
  errors: NewInvoiceFormErrors;
  activeDueDate: UserSelectOption;
  setActiveDueDate: (item: UserSelectOption) => void;
  customer: UserSelectOption;
  setActiveCustomer: (item: UserSelectOption) => void;
  onServicesChange: (fieldName: string, fieldValue: string, serviceIndex: number) => void;
  onSubmit: () => void;
  handleMoreServices: () => void;
  customers: UserSelectOption[];
  services: InvoiceServiceType[];
  dueDates: UserSelectOption[];
};

const NewInvoicePreviewPartUI: React.FC<Props> = ({
  setStep,
  // errors,
  // activeDueDate,
  // customer,
  onSubmit,
  // customers,
  // services,
  // dueDates,
}) => {
  const {classes, cx} = useStyles();

  return (
    <>
      <div className={classes.header} onClick={() => setStep(0)}>
        <img
          src={images.arrowLeft}
          alt="arrow back"
          width={32}
          height={32}
        />
        <h2 className={classes.title}>New Invoice</h2>
      </div>
      <div className={classes.infoWrap}>
        <div className={cx(classes.priceBlock,classes.flexEnd)}>
          <div>
            <h2 className={classes.personName}>Jacob Jones</h2>
            <p className={classes.personAddress}>1100 Bellevue Way NE Suite 900, Bellevue,<br/> WA 98004, United States</p>
            <p className={classes.personMail}>binhan628@gmail.com</p>
          </div>
          <div className={classes.widthCloser}>
            <p className={classes.subtitle}>Total Charges</p>
            <h2 className={classes.price}>$1,574.09</h2>
          </div>
        </div>
      </div>
      <DownloadPdfButton url={'Explanation of Benefits.pdf'} />
      <div className={classes.tablesTitle}>
        <p>Summary of customer service </p>
      </div>
      <div className={classes.bigDivider} />
      <div className={classes.tableWrap}>
        <TableInvoicesInformationModal withTotalChargesLine />
      </div>
      <div className={classes.divider} />
      <div className={classes.buttonsWrap}>
        <div className={classes.previewBtn}>
          <OutlinedButton
            color="gray"
            title="Continue editing"
            lowerCase
            w100
            type="button"
            bigger
            onClick={() => setStep(0)}
          />
        </div>
        <div className={classes.button}>
          <Button
            title="Send invoice"
            onClick={onSubmit}
            w100
          />
        </div>
      </div>
    </>
  );
};

export default NewInvoicePreviewPartUI;
