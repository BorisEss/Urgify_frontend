import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import { formatApiDate } from '../utils/formatters';
import CloseButton from './Buttons/CloseButton';

const useStyles = makeStyles()((_theme) => ({
  main: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 48,
    position: 'relative',
  },
  closeButtonWrap: {
    position: 'absolute',
    right: 32,
    top: 32,
  },
  checkImg: {
    width: 36,
    height: 36,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    paddingTop: 8,
    paddingBottom: 32,
  },
  invoice: {
    width: '100%',
    padding: 32,
    backgroundColor:'rgba(184, 184, 184, 0.2)',
    borderRadius: 12,
    // TODO: remove next line when will be more info in modal
    textAlign: 'center',
  },
  payDate: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  price: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
    // TODO: remove next line when will be more info in modal
    paddingTop: 8,
  },
  // TODO: remove next block when will be more info in modal
  receiptSent: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#5a5f6b',
  },
  downloadWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
    gap: 32,
  },
  download: {
    display: 'flex',
    gap: 8,
    cursor: 'pointer',
    paddingTop: 24,
  },
  downloadImg: {
    width: 24,
    height: 24,
  },
  downloadLink: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    textDecoration: 'underline',
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
  },
  data: {
    paddingTop: 31,
    display: 'flex',
    gap: 52,
  },
  dataItem: {

  },
  label: {
    fontFamily: 'Poppins-regular',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    paddingBottom: 16,
    textTransform: 'uppercase',
  },
  info: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
}));

type ConfirmHospitalModalType = {
  handleClose: () => void;
  charges: number;
};

const ConfirmHospitalModal: React.FC<ConfirmHospitalModalType> = ({handleClose, charges}) => {
  const {classes} = useStyles();
  // @ts-ignore
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [date, setDate] = React.useState<number>(Date.now());

  return (
    <div className={classes.main}>
      <div className={classes.closeButtonWrap}>
        <CloseButton handleClose={handleClose} />
      </div>
      <img className={classes.checkImg} src={images.circleCheck}/>
      <h2 className={classes.title}>Payment is confirmed</h2>
      <div className={classes.invoice}>
        <p className={classes.payDate}>Paid on {formatApiDate(date, 'MMMM dd, yyyy')}</p>
        <span className={classes.price}>${charges}</span>
        {/* // TODO: remove next line, and uncomment next lines when will be more info in modal */}
        <p className={classes.receiptSent}>Receipt sent to your email</p>
        {/* <div className={classes.downloadWrap}>
          <div className={classes.download}>
            <img className={classes.downloadImg} src={images.cloudUp}/>
            <span className={classes.downloadLink}>Download Invoice</span>
          </div>
          <div className={classes.download}>
            <img className={classes.downloadImg} src={images.cloudUp}/>
            <span className={classes.downloadLink}>Download Receipt</span>
          </div>
        </div>
        <div className={classes.divider} />
        <div className={classes.data}>
          <div className={classes.dataItem}>
            <h3 className={classes.label}>Receipt number</h3>
            <p className={classes.info}>3437-9909</p>
          </div>
          <div className={classes.dataItem}>
            <h3 className={classes.label}>Invoice number</h3>
            <p className={classes.info}>DAD9F5BF-0002</p>
          </div>
          <div className={classes.dataItem}>
            <h3 className={classes.label}>Payment method</h3>
            <p className={classes.info}>Visa – 3648	 </p>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default ConfirmHospitalModal;
