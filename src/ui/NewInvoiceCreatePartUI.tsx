import React, { Fragment } from 'react';
import {makeStyles} from 'tss-react/mui';

import AddCustomerWrapper from '../components/AddCustomerWrapper';
import {ReactComponent as ShowIcon} from '../images/show.svg';
import type { InvoiceServiceType, NewInvoiceFormErrors, UserSelectOption} from '../types';
import Button from './Buttons/Button';
import CloseButton from './Buttons/CloseButton';
import OutlinedButton from './Buttons/OutlinedButton';
import DropzoneInput from './DropzoneInput';
import DatePicker from './Inputs/DatePicker';
import Input from './Inputs/Input';
import UserSelect from './UserSelect';

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
  selectCustomerWrap: {
    display: 'flex',
    alignItems: 'center',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    paddingRight: 14,
  },
  createNewBtnWrap: {
    flex: '0 0 102px',
  },
  customerNumberWrap: {
    display:'flex',
    alignItems: 'center',
  },
  customerNumber: {
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
    marginTop: 21,
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

type Props = {
  setStep: (step: number) => void;
  handleClose: () => void;
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

const NewInvoiceCreatePartUI: React.FC<Props> = ({
  setStep,
  handleClose,
  errors,
  activeDueDate,
  setActiveDueDate,
  customer,
  setActiveCustomer,
  onServicesChange,
  onSubmit,
  handleMoreServices,
  customers,
  services,
  dueDates,
}) => {
  const {classes, cx} = useStyles();

  return (
    <>
      <div className={classes.header}>
        <h2 className={classes.title}>New Invoice</h2>
        <CloseButton handleClose={handleClose} />
      </div>
      <div className={classes.invoiceForm}>
        <div
          className={classes.halfInput}
        >
          <div className={classes.selectCustomerWrap}>
            <UserSelect
              options={customers}
              activeOption={customer}
              setActiveOption={setActiveCustomer}
              noBorder
            />
            <div className={classes.createNewBtnWrap}>
              <AddCustomerWrapper />
            </div>
          </div>
        </div>
        <div
          className={cx(
            classes.customerNumberWrap,
            classes.halfInput
          )}>
          <div className={classes.customerNumber}>
            <p>Invoice ID</p>
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
        {services.map((service, i) => (
          <Fragment key={service.id}>
            <div className={classes.halfInput}>
              <Input
                type="text"
                label={`service description #${i + 1}`}
                onChange={e => onServicesChange(e.target.name, e.target.value, i)}
                name="description"
                error={!!errors.serviceDescription}
                // onBlur={() => validateField('serviceDescription')}
                value={service.description}
              />
            </div>
            <div className={classes.halfInput}>
              <Input
                type={service.chargesAmount !== 0 ? 'number' : 'string'}
                label={`charges amount #${i + 1}`}
                onChange={e => onServicesChange(e.target.name, e.target.value, i)}
                name="chargesAmount"
                error={!!errors.chargesAmount}
                // onBlur={() => validateField('chargesAmount')}
                onDelete={() => onServicesChange('chargesAmount', '0', i)}
                value={service.chargesAmount ? service.chargesAmount.toString() : ''}
                leftSymbol={service.chargesAmount ? '$' : ''}
              />
            </div>
          </Fragment>
        ))}
        <div className={classes.addMore}>
          <div className={classes.halfInput}>
            <OutlinedButton
              color="gray"
              type="button"
              title="+  Add one more"
              w100
              lowerCase
              bigger
              onClick={handleMoreServices}
            />
          </div>
          <div className={classes.halfInput}>
            <DropzoneInput />
          </div>
        </div>
        <div className={cx(classes.halfInput, classes.dueDatePaddingTop)}>
          <UserSelect
            options={dueDates}
            activeOption={activeDueDate}
            setActiveOption={setActiveDueDate}
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
              onClick={() => setStep(1)}
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
      </div>
    </>
  );
};

export default NewInvoiceCreatePartUI;
