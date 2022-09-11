import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import {ReactComponent as Show} from '../images/show.svg';
import CloseButton from './Buttons/CloseButton';
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
  personInfo: {
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
  status: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#fff',
    backgroundColor:'#2FC77B',
    borderRadius: 2,
    padding: '16px 24px',
    textAlign: 'center',
  },
  infoWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 65,
  },
  infoItem: {
    paddingBottom: 32,
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    paddingBottom: 4,
    textTransform: 'uppercase',
  },
  nameWrap: {
    display: 'flex',
    gap: 8,
  },
  showIcon: {
    width: 32,
    height: 32,

    '& path': {
      fill: ' #0D99FF',
    },
  },
  pacientName: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    textDecoration: 'underline',
  },
  leftWrap: {
    flex: 1,
  },
  dueWrap: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'relative',
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
    marginBottom: 31,
  },
  dueImg: {
    width: 79,
    height: 10,
    position: 'absolute',
    left: 188,
    bottom: 66,
  },
  documentWrap: {
    borderRadius: 4,
    flex: '0 0 44%',
    cursor: 'pointer',
    position:'relative',
  },
  docImg: {
    width: '100%',
    height: '100%',
    objectFit: 'contain',
  },
  docDarker: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  pdfIcon: {
    width: 48,
    height: 48,
  },
  pdfLink: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    color: '#FFFFFF',
    textDecoration: 'underline',
    cursor: 'pointer',
    textTransform: 'uppercase',
    textAlign:'center',
  },
  tableWrap: {
    paddingBottom: 32,
  },
}));

type InvoicesInformationModalType = {
  handleClose: () => void;
};

const InvoicesInformationModal: React.FC<InvoicesInformationModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.personInfo}>
          <span className={classes.status}>Paid</span>
          <h2 className={classes.title}>&#x23;123456</h2>
        </div>
        <div className={classes.buttonWrap}>
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
      <div className={classes.infoWrap}>
        <div className={classes.leftWrap}>
          <div className={classes.infoItem}>
          <div className={classes.divider} />
            <h6 className={classes.label}>Patient Name</h6>
            <div className={classes.nameWrap}>
              <Show className={classes.showIcon} />
              <p className={classes.pacientName}>Courtney Henry</p>
            </div>
          </div>
          <div className={classes.dueWrap}>
            <div className={classes.infoItem}>
              <h6 className={classes.label}>issued DATE</h6>
              <p className={classes.data}>9/23/2021</p>
            </div>
            <img className={classes.dueImg} src={images.dueArrow} />
            <div className={classes.infoItem}>
              <h6 className={classes.label}>due DATE</h6>
              <p className={classes.data}>11/23/2022</p>
            </div>
          </div>
          <div className={classes.infoItem}>
            <h6 className={classes.label}>INVOICE AMOUNT</h6>
            <p className={classes.data}>$567,890</p>
          </div>
        </div>
        <div className={classes.documentWrap}>
          <div className={classes.docDarker}>
            <img className={classes.pdfIcon} src={images.filePDF}/>
            <span className={classes.pdfLink}>explanation<br/> of benefits</span>
          </div>
          <img src={images.sample} className={classes.docImg} />
        </div>
      </div>
      <div className={classes.tableWrap}>
          <TableInvoicesInformationModal />
      </div>
    </div>
  );
};
export default InvoicesInformationModal;
