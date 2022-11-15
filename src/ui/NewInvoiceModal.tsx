import React from 'react';
import {makeStyles} from 'tss-react/mui';

import {ReactComponent as ShowIcon} from '../images/show.svg';
import Log from '../services/logger';
import type { NewInvoiceFormErrors, NewInvoiceFormFields} from '../types';
import { formObj, validate } from '../utils/authValidation';
import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';
import OutlinedButton from './Buttons/OutlinedButton';
import DropzoneInput from './DropzoneInput';
import DatePicker from './Inputs/DatePicker';
import Input from './Inputs/Input';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
    position: 'relative',
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  invoiceForm: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: '0 0 calc(50% - 16px)',
    paddingBottom: 11,
  },
  medicalNumberWrap: {
    display:'flex',
    alignItems: 'center',
    width:'47%',
  },
  medicalNumber: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: ' #FFFFFF',
    backgroundColor:'#0D99FF',
    borderRadius: 4,
    padding:'16px',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    width:'100%',
  },
  addMore: {
    display:'flex',
    width: '100%',
    justifyContent: 'space-between',
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
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
  dueDatePaddingTop: {
    paddingTop: 21,
  },
  datePickerPaddingBottom: {
    paddingBottom: 32,
  },
}));

type NewInvoiceModalType = {
  handleClose: () => void;
};

const NewInvoiceModal: React.FC<NewInvoiceModalType> = ({handleClose}) => {
  const {classes, cx} = useStyles();

  const [itemFields, setItemFields] = React.useState<NewInvoiceFormFields>({
    customerName: '',
    dateServiceStart: '',
    dateServiceEnd: '',
    serviceDescription: '',
    chargesAmount: '',
    dueDate: '',
  });

  const initialErrors: NewInvoiceFormErrors = {
    customerName: '',
    dateServiceStart: '',
    dateServiceEnd: '',
    serviceDescription: '',
    chargesAmount: '',
    dueDate: '',
  };

  const [errors, setErrors] = React.useState<NewInvoiceFormErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'customerName':
      case 'dateServiceStart':
      case 'dateServiceEnd':
      case 'serviceDescription':
      case 'chargesAmount':
      case 'dueDate':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'customerName':
      case 'dateServiceStart':
      case 'dateServiceEnd':
      case 'serviceDescription':
      case 'chargesAmount':
      case 'dueDate': {
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

  const onSubmit = () => {
    const form: formObj[] = [
      {valueType: 'customerName', value: itemFields.customerName},
      {valueType: 'dateServiceStart', value: itemFields.dateServiceStart},
      {valueType: 'dateServiceEnd', value: itemFields.dateServiceEnd},
      {valueType: 'serviceDescription', value: itemFields.serviceDescription},
      {valueType: 'chargesAmount', value: itemFields.chargesAmount},
      {valueType: 'dueDate', value: itemFields.dueDate},
    ];

    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: NewInvoiceFormErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <h2 className={classes.title}>New Invoice</h2>
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={classes.invoiceForm}>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Customer Name"
            onChange={onInputChange}
            name="customerName"
            error={!!errors.customerName}
            onBlur={() => validateField('customerName')}
          />
        </div>
        <div className={classes.medicalNumberWrap}>
          <div className={classes.medicalNumber}>
            <p>Medical record Number</p>
            <p>SD9212969</p>
          </div>
        </div>
        <div className={cx(classes.halfInput, classes.datePickerPaddingBottom)}>
          {/* onChange={onInputChange}
          name="dateServiceStart"
          error={!!errors.dateServiceStart}
          onBlur={() => validateField('dateServiceStart')} */}
          <DatePicker
            label="date of service start"
          />
        </div>
        <div className={cx(classes.halfInput, classes.datePickerPaddingBottom)}>
          {/* onChange={onInputChange}
          name="dateServiceEnd"
          error={!!errors.dateServiceEnd}
          onBlur={() => validateField('dateServiceEnd')} */}
          <DatePicker
            label="date of service end"
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="service description #1"
            onChange={onInputChange}
            name="serviceDescription"
            error={!!errors.serviceDescription}
            onBlur={() => validateField('serviceDescription')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="charges amount #1"
            onChange={onInputChange}
            name="chargesAmount"
            error={!!errors.chargesAmount}
            onBlur={() => validateField('chargesAmount')}
            onDelete={() => {}}
          />
        </div>
        <div className={classes.addMore}>
          <div className={classes.halfInput}>
            <OutlinedButton
              color="gray"
              type="button"
              title="+  Add one more"
              w100
              lowerCase
              bigger
            />
          </div>
          <div className={classes.halfInput}>
            <DropzoneInput />
          </div>
        </div>
        <div className={cx(classes.halfInput, classes.dueDatePaddingTop)}>
          <Input
            type="text"
            label="due date"
            onChange={onInputChange}
            name="dueDate"
            error={!!errors.dueDate}
            onBlur={() => validateField('dueDate')}
          />
        </div>
        <div className={classes.divider} />
        <div className={classes.buttonsWrap}>
          <div className={classes.previewBtn}>
            <OutlinedButton
              color="gray"
              icon={<ShowIcon/>}
              title="Preview Invoice"
              lowerCase
              w100
              type="button"
              bigger
            />
          </div>
          <div className={classes.button}>
            <Button
              title="Send Invoice"
              onClick={onSubmit}
              w100
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewInvoiceModal;
