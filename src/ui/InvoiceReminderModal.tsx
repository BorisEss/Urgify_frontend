import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';


const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  buttonWrap: {
    position: 'absolute',
    right: 29,
    top: 39,
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
    textTransform: 'uppercase',
    paddingBottom: 8,
  },
  textareaWrap: {
    paddingBottom: 32,
  },
  textarea:{
    height: 272,
    width: '100%',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    paddingTop: 16,
    paddingLeft: 16,
    fontFamily: 'Poppins-semibold',
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',

    '&::placeholder' : {
      fontFamily: 'Poppins-semibold',
      fontSize: 16,
      lineHeight: '24px',
      color: '#B8B8B8',
    },
  },
  descriptionWrap: {
    paddingBottom: 32,
  },
  description: {
    fontFamily: 'Poppins-regular',
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
    marginBottom: 47,
  },

}));

type InvoiceReminderModalType = {
  handleClose: () => void;
};

const InvoiceReminderModal: React.FC<InvoiceReminderModalType> = ({handleClose}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.main}>
      <div className={classes.header}>
          <h2 className={classes.title}>Send reminder</h2>
          <div className={classes.buttonWrap}>
            <CloseButton handleClose={handleClose} />
          </div>
      </div>
      <div className={classes.textareaWrap}>
        <p className={classes.label}>optional message</p>
        <div>
          <textarea
            className={classes.textarea}
            placeholder="Leave it empty if additional message doesn’t required"
           />
        </div>
      </div>
      <div className={classes.descriptionWrap}>
        <p className={classes.description}>Explanation that you can send without additional message Morbi duis feugiat sit vitae faucibus ante posuere maecenas a. Cursus urna volutpat faucibus morbi posuere non. </p>
      </div>
      <div className={classes.divider} />
      <Button w100 title="Send reminder" />
    </div>
  );
};
export default InvoiceReminderModal;
