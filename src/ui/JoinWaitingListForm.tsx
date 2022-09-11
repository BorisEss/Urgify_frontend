import type {Theme} from '@mui/material';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'redux-views';
import {makeStyles} from 'tss-react/mui';

import { submitWaitingList } from '../actions/auth';
import { getExploreIdeaIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { JoinWaitingListFormErrors, JoinWaitingListFormFields } from '../types';
import Modal from '../ui/Modal';
import { formObj, validate } from '../utils/authValidation';
import Button from './Buttons/Button';
import ConfirmPatientsModal from './ConfirmPatientsModal';
import Input from './Inputs/Input';

const useStyles = makeStyles()((_theme: Theme) => ({
  buttonContainer: {
    paddingTop: 32,
  },
}));

const initialErrors: JoinWaitingListFormErrors = {
  email: '',
};

const JoinWaitingListForm: React.FC<ReduxProps> = ({
  sendEmailWaitingList,
}) => {
  const {classes} = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const [itemFields, setItemFields] = React.useState<JoinWaitingListFormFields>({
    email: '',
  });

  const [errors, setErrors] = React.useState<JoinWaitingListFormErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'email':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
      break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {

      case 'email': {
        updateErrors(field, !value ? 'Required field' + '! ' : '');
      break;
      }
    }

    setItemFields({
      ...itemFields,
      [field]: value,
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.name, e.target.value);

  const handleSubmitForm = () => {
    const form: formObj[] = [
      {valueType: 'email', value: itemFields.email},
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: JoinWaitingListFormErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      sendEmailWaitingList(itemFields.email)
        .then(() => {
          setOpen(true);
        })
        .catch((e: any) => {
          Log.message(e);
          if (e) {
            const newErrors: JoinWaitingListFormErrors = {...initialErrors};
            if (e.email) {
              newErrors.email = e.email[0];
            }
            setErrors(newErrors);
          }
        });
      }
  };

  return (
    <>
      <Input
        labelCenter
        type="email"
        label="e-mail address"
        placeholder="Enter your email"
        onChange={onInputChange}
        name="email"
        error={!!errors.email}
        onBlur={() => validateField('email')}
      />
      <div className={classes.buttonContainer}>
        <Button
          round
          w100
          title="Submit"
          onClick={handleSubmitForm}
          disabled={!!errors.email}
        />
      </div>
      <Modal
        open={open}
        handleClose={handleClose}
        maxWidth={592}
        borderRadius={24}
        backgroundColor="#F1F1F1"
        children={
          <ConfirmPatientsModal handleClose={handleClose} />
        }
      />
    </>
  );
};

const getData = createSelector(
  [getExploreIdeaIsFetching],
  (isFetching) => {
    return {
      isFetching,
    };
  },
);

const connector = connect((state: AppState) => getData(state), {
  sendEmailWaitingList: submitWaitingList,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(JoinWaitingListForm);
