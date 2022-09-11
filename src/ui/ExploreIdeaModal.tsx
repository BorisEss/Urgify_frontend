import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import CloseButton from './Buttons/CloseButton';
import JoinWaitingListForm from './JoinWaitingListForm';
import PreOrderForm from './PreOrderForm';

const useStyles = makeStyles()((_theme: Theme) => ({
  dialogPaper: {
    marginTop: 0,
    marginBottom: 0,
    borderRadius: 0,
    maxWidth: 1008,
  },
  headerContainer: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 32,
    paddingBottom: 32,
    position: 'relative',
  },
  header: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  closeButtonWrap: {
    position: 'absolute',
    right: 32,
    top: 40,
  },
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  buttonsWrap: {
    position: 'relative',
    lineHeight: 0,
  },
  buttons: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    width: 488,
    gap: 2,
    position: 'absolute',
    bottom: 27,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: 4,
    borderRadius: 24,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 24,
    paddingTop: 16,
    paddingBottom: 16,
    paddingLeft: 20.5,
    paddingRight: 20.5,
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    cursor: 'pointer',
    outline: 'none',
    border: 'unset',
    flex: 1,
    whiteSpace: 'nowrap',
  },
  buttonActive: {
    backgroundColor: '#0D99FF',
    color: '#fff',
  },
  listWrap: {
    padding: '48px 208px 0',
  },
  item: {
    display: 'flex',
    alignItems: 'baseline',
    paddingBottom: 48,
  },
  lastItem: {
    paddingBottom: 0,
  },
  ellipseImg: {
    width: 24,
    height: 24,
    marginRight: 32,
    position: 'relative',
    top: 6,
  },
  itemTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
  },
  itemSubtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  formWrap: {
    padding: '0 104px 104px',
  },
  formWrapPatients: {
    padding: '312px 208px 48px',
  },
  form: {
    backgroundColor: '#F1F1F1',
    borderRadius: 24,
    display: 'block',
    justifyContent: 'center',
    padding: 48,
  },
  formSmall: {
    paddingLeft: 80,
    paddingRight: 80,
  },
  formHeader: {
    textAlignLast: 'center',
  },
  formTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
    paddingBottom: 8,
  },
  formSubtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    paddingBottom: 32,
  },
}));

type ExploreIdeaModalType = {
  handleClose: () => void;
};

const ExploreIdeaModal: React.FC<ExploreIdeaModalType> = ({handleClose}) => {
  const {classes, cx} = useStyles();
  const [dialogType, setDialogType] = React.useState<number>(1);

  return (
    <>
      <div className={classes.headerContainer}>
        <h2 className={classes.header}>Explore the Idea</h2>
        <div className={classes.closeButtonWrap}>
          <CloseButton handleClose={handleClose} />
        </div>
      </div>
      <div className={classes.buttonsWrap}>
        <img className={classes.image} src={dialogType === 1 ? images.exploreBackground : images.exploreBackgroundPatients} />
        <div className={classes.buttons}>
          <button className={cx(classes.button, dialogType === 1 ? classes.buttonActive : '')} onClick={() => setDialogType(1)}>Healthcare Providers</button>
          <button className={cx(classes.button, dialogType === 2 ? classes.buttonActive : '')} onClick={() => setDialogType(2)}>Patients</button>
        </div>
      </div>
      {dialogType === 1 ? (
        <div className={classes.listWrap}>
        <div className={classes.item}>
          <img className={classes.ellipseImg} src={images.ellipse} />
          <div>
            <h5 className={classes.itemTitle}>Send a special invoice to patients</h5>
            <p className={classes.itemSubtitle}>when emergencies happen and they are struggling to pay the large medical bills associated with them. </p>
          </div>
        </div>
        <div className={classes.item}>
          <img className={classes.ellipseImg} src={images.ellipse} />
          <div>
            <h5 className={classes.itemTitle}>Increase Revenue Cycle & Access to aid</h5>
            <p className={classes.itemSubtitle}>when collecting payments from patients based on different financial sources instantly available to them through URGIFY. </p>
          </div>
        </div>
        <div className={classes.item}>
          <img className={classes.ellipseImg} src={images.ellipse} />
          <div>
            <h5 className={classes.itemTitle}>Avoid third party collectors </h5>
            <p className={classes.itemSubtitle}>when patients don’t pay and you have to eat those costs or shift them onto others.  </p>
          </div>
        </div>
      </div>
      ) : (
        <div className={classes.listWrap}>
          <div className={classes.item}>
            <img className={classes.ellipseImg} src={images.ellipse} />
            <div>
              <h5 className={classes.itemTitle}>Receive financial help</h5>
              <p className={classes.itemSubtitle}>when life get tough and you need instant support from family memebrs, friends, charity grants, and loans all in one single place.</p>
            </div>
          </div>
          <div className={classes.item}>
            <img className={classes.ellipseImg} src={images.ellipse} />
            <div>
              <h5 className={classes.itemTitle}>Avoid collection agencies </h5>
              <p className={classes.itemSubtitle}>when you are forced to pay on time full amount and you end up with credit reports.</p>
            </div>
          </div>
          <div className={cx(classes.item, classes.lastItem)}>
            <img className={classes.ellipseImg} src={images.ellipse} />
            <div>
              <h5 className={classes.itemTitle}>Build, improve credit score </h5>
              <p className={classes.itemSubtitle}>when chosing flexible payment plans available through URGIFY based on your revenu streams without compromising your normal life and habits.</p>
            </div>
          </div>
        </div>
      )}
      {dialogType === 1 ? (
        <div className={classes.formWrap}>
          <div className={classes.form}>
            <div className={classes.formHeader}>
              <h5 className={classes.formTitle}>Coming later this year</h5>
              <p className={classes.formSubtitle}>Pre-order now</p>
            </div>
           <PreOrderForm />
          </div>
        </div>
        ) : (
        <div className={classes.formWrapPatients}>
          <div className={cx(classes.form, classes.formSmall)}>
            <div className={classes.formHeader}>
              <h5 className={classes.formTitle}>Join our waiting list </h5>
              <p className={classes.formSubtitle}>We'll inform you about the launch</p>
            </div>
            <JoinWaitingListForm />
          </div>
        </div>
      )}
    </>
  );
};

export default ExploreIdeaModal;
