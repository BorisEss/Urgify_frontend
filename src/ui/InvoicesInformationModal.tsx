import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import {ReactComponent as ArrowDown} from '../images/arrow-down.svg';
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
    alignItems: 'center',
  },
  modalCursor: {
    cursor: 'pointer',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
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
  bigDivider: {
    width: '100%',
    height: 8,
    background: '#2B364D',
  },
  tableWrap: {
    paddingTop: 16,
    paddingBottom: 8,
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
    paddingBottom: 8,
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
  backArrow: {
    width:32,
    height:32,
  },
  widthCloser: {
    flex:'0 0 30%',
  },
  flexEnd: {
    alignItems: 'flex-end',
  },
  timelineDetails: {
    position: 'relative',
    marginBottom: 24,
  },
  centerLine: {
    position: 'absolute',
    backgroundColor: '#DBDBDB',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    height: '100%',
    width: 6,
    borderRadius: 99,
  },
  timelineItemBox: {
    display: 'flex',
    marginTop: 32,
  },
  noMarginItem: {
    marginTop: 0,
  },
  rightAligned: {
    justifyContent: 'end',
  },
  timelineItem: {
    display: 'flex',
    flex: '0 0 50%',
    position: 'relative',
  },
  timelineDot: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 99,
    top: 0,
  },
  dotGreen: {
    backgroundColor: '#2FC77B',
  },
  dotRed: {
    backgroundColor: '#F93822',
  },
  dotRight: {
    right: -12,
  },
  dotLeft: {
    left: -12,
  },
  textItem: {
    marginLeft: 41,
    marginRight: 0,
  },
  rightAlignedText: {
    textAlign: 'right',
    marginLeft: 0,
    marginRight: 41,
  },
  sortBox: {
    position: 'absolute',
    top: 0,
    right: 0,
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    display: 'flex',
    alignItems:'center',
  },
  sortArrow: {
    width: 16,
    height: 16,
    marginLeft: 8,

    '& path': {
      fill: ' #777777',
    },
  },
  sortArrowUp: {
    transform: 'rotate(180deg)',
  },
  textBold: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  textGray: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  date: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  red: {
    color: '#F93822',
  },
  informationBox: {
    backgroundColor: '#F8F8F8',
    borderRadius: 24,
    padding: 24,
    textAlign: 'left',
  },
  informationText: {
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
}));

type InvoicesInformationModalType = {
  handleClose: () => void;
};

const InvoicesInformationModal: React.FC<InvoicesInformationModalType> = ({handleClose}) => {
  const {cx,classes} = useStyles();
  const [viewDetailendInfo, setViewDetailedInfo] = React.useState(false);

  return (
    <div className={classes.main}>
      {
        !viewDetailendInfo ? (
          <>
            <div className={classes.header}>
              <div className={classes.invoice}>
                <h2 className={classes.title}>Invoice &#x23;123456</h2>
              </div>
              <div className={classes.buttonWrap}>
                <CloseButton handleClose={handleClose} />
              </div>
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
              <div className={classes.priceBlock}>
                <div>
                  <p className={classes.subtitle}>Already paid</p>
                  <h2 className={classes.price}>$943.65</h2>
                </div>
                <div className={classes.widthCloser}>
                  <p className={classes.subtitle}>Remain to pay</p>
                  <h2 className={cx(classes.price,classes.remain)}>$630.44</h2>
                </div>
              </div>
            </div>
            <DownloadPdfButton url={'Explanation of Benefits.pdf'} />
            <div className={classes.tablesTitle}>
              <p>Summary of customer service </p>
            </div>
            <div className={classes.bigDivider} />
            <div className={classes.tableWrap}>
              <TableInvoicesInformationModal />
            </div>
            <div className={classes.divider} />
            <div className={classes.recurringPayment}>
              <h6 className={classes.recurringHeader}>This customer has recurring payment</h6>
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
                onClick={() => setViewDetailedInfo(true)}
              />
            </div>
          </>
        ) : (
          <>
             <div className={classes.header}>
              <div className={cx(classes.invoice, classes.modalCursor)} onClick={() => setViewDetailedInfo(false)}>
                <img className={classes.backArrow} src={images.arrowLeft}/>
                <h2 className={classes.title}>Detailed info for invoice #ABH678</h2>
              </div>
              <div className={classes.buttonWrap}>
                <CloseButton handleClose={handleClose} />
              </div>
            </div>
            <div className={classes.timelineDetails}>
              <div className={classes.centerLine} />
              <div className={classes.sortBox}>
                <span>DATE</span>
                <ArrowDown className={cx(classes.sortArrow, classes.sortArrowUp)}/>
              </div>
              <div className={cx(classes.timelineItemBox, classes.noMarginItem)}>
                <div className={cx(classes.timelineItem, classes.rightAligned)}>
                  <div className={cx(classes.timelineDot, classes.dotRight, classes.dotGreen)} />
                  <div className={cx(classes.textItem, classes.rightAlignedText)}>
                    <p className={classes.textGray}>Partial payment was scheduled</p>
                    <p className={classes.textBold}>$50 every week for the next 1 month (4 weeks)</p>
                    <p className={classes.date}>July 14, 2022</p>
                    <p className={classes.date}>3:30:01 PM PDT</p>
                  </div>
                </div>
              </div>
              <div className={cx(classes.timelineItemBox, classes.rightAligned)}>
                <div className={cx(classes.timelineItem)}>
                  <div className={cx(classes.timelineDot, classes.dotLeft, classes.dotRed)} />
                  <div className={classes.textItem}>
                    <p className={cx(classes.textBold,classes.red)}>$50 every week for the next 1 month (4 weeks)</p>
                    <p className={classes.date}>July 14, 2022</p>
                    <p className={classes.date}>3:30:01 PM PDT</p>
                  </div>
                </div>
              </div>
              <div className={classes.timelineItemBox}>
                <div className={cx(classes.timelineItem)}>
                  <div className={cx(classes.textItem, classes.rightAlignedText)}>
                    <div className={classes.informationBox}>
                      <p className={classes.informationText}>The latest scheduled payment wasn’t processed, seems your card is expired or something irregular happen. Please update your card or add a new payment method. Remain amount could be paid anytime, even if a recurring payment is scheduled.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )
      }
    </div>
  );
};
export default InvoicesInformationModal;
