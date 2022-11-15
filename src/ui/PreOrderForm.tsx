import type {Theme} from '@mui/material';
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type * as stripeJs from '@stripe/stripe-js';
import React, { FormEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { createSelector } from 'redux-views';
import {makeStyles} from 'tss-react/mui';

import { createPaymentIntent } from '../actions/auth';
import { getExploreIdeaIsFetching } from '../selectors/network';
import Log from '../services/logger';
import type { AppState } from '../store';
import type { PaymentOption, PreOrderFormErrors, PreOrderFormFields } from '../types';
import Modal from '../ui/Modal';
import { formObj, validate } from '../utils/authValidation';
import Button from './Buttons/Button';
import ConfirmCompanyModal from './ConfirmCompanyModal';
import Input from './Inputs/Input';
import InvoicesDropdown from './PaymentDropdown';

const useStyles = makeStyles()((_theme: Theme) => ({
  dropdownFields: {
    display: 'flex',
    paddingBottom: 32,
    gap: 32,
  },
  piece: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  offers: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: 32,
  },
  offersTitle:{
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2FC77B',
  },
  offersSubtitle:{
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
  },
  descriptionContainer: {
    display: 'flex',
    flex: '0 0 47%',
  },
  offersDescription:{
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
  },
  divider: {
    width: '100%',
    height: 1,
    background: '#DBDBDB',
  },
  charges: {
    paddingTop: 32,
    paddingBottom: 32,
  },
  chargesTitle: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  priceContainer: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 6,
  },
  price: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  bonus: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#666666',
  },
  dataCompany: {
    display: 'flex',
    gap: 32,
    paddingBottom: 11,
  },
  halfInput: {
    flex: '50%',
  },
  numberInput: {
    flex: '0 0 48%',
  },
  expirationInput: {
    flex: '0 0 33%',
  },
  cvcInput: {
    flex: '0 0 72px',
  },
  payment: {
    display: 'flex',
    gap: 32,
    paddingTop: 31,
    paddingBottom: 32,
  },
  paymentField: {
    background: '#fff',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    paddingLeft: 16,
    width: '100%',
  },
  paymentLabel: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
    display: 'inline-block',
  },
}));

const invoices: PaymentOption[] = [
  {
    id: 10,
    title: '10 invoices',
    title2: 'month',
    checked: true,
  },
  {
    id: 25,
    title: '25 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 50,
    title: '50 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 75,
    title: '75 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 100,
    title: '100 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 250,
    title: '250 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 500,
    title: '500 invoices',
    title2: 'month',
    checked: false,
  },
  {
    id: 1000,
    title: '1000 invoices',
    title2: 'month',
    checked: false,
  },
];

const duration: PaymentOption[] = [
  {
    id: 1,
    title: '1 month',
    checked: true,
  },
  {
    id: 2,
    title: '2 months',
    checked: false,
  },
  {
    id: 3,
    title: '3 months',
    checked: false,
  },
  {
    id: 4,
    title: '4 months',
    checked: false,
  },
  {
    id: 5,
    title: '5 months',
    checked: false,
  },
  {
    id: 6,
    title: '6 months',
    checked: false,
  },
];

const initialErrors: PreOrderFormErrors = {
  email: '',
  companyName: '',
};

const PreOrderForm: React.FC<ReduxProps> = ({
  getPaymentIntent,
}) => {
  const {classes} = useStyles();

  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = React.useState(false);

  const [activeInvoice, setActiveInvoice] = React.useState<PaymentOption>(invoices[4]);
  const [activeDuration, setActiveDuration] = React.useState<PaymentOption>(duration[2]);
  const charges = activeInvoice.id * activeDuration.id;

  const handleClose = () => {
    setOpen(false);
  };

  const [itemFields, setItemFields] = React.useState<PreOrderFormFields>({
    email: '',
    companyName: '',
  });

  const [errors, setErrors] = React.useState<PreOrderFormErrors>(initialErrors);

  const updateErrors = (field: string, error: string) => {
    setErrors({...errors, [field]: error});
  };

  const validateField = (field: string) => {
    switch (field) {
      case 'email':
      case 'companyName':
        updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
        break;
    }
  };

  const setValue = (field: string, value: string) => {
    switch (field) {
      case 'email':
      case 'companyName': {
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

  const cardElementOptions: stripeJs.StripeCardElementOptions = {
    style: {
      base: {
        fontWeight: 600,
        fontSize: '16px',
        lineHeight: '52px',
        color: '#2B364D',
        '::placeholder' : {
          color: '#777777',
        },
      },
    },
    hidePostalCode: true,
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form: formObj[] = [
      {valueType: 'email', value: itemFields.email},
      {valueType: 'companyName', value: itemFields.companyName},
    ];
    const errorMessages: {field: string, message: string}[] = validate(form);
    if (errorMessages.length) {
      const newErrors: PreOrderFormErrors = {...initialErrors};
      for (const message of errorMessages) {
        newErrors[message.field] = message.message;
      }
      setErrors(newErrors);
    } else {
      setErrors(initialErrors);
      Log.message(form);
    }

    if (!stripe || !elements || !itemFields.email.length || !itemFields.companyName.length) {
      return;
    }
    const cardElement: stripeJs.StripeCardNumberElement | null = elements.getElement(CardNumberElement);
    if (cardElement !== null) {
      let clientSecret: string = await getPaymentIntent(
        charges,
        'usd',
        'card',
        itemFields.companyName,
        itemFields.email,
        activeInvoice.id,
        activeDuration.id,
      )
        .catch(e=>{
          Log.message(e);
          if (e) {
            const newErrors: PreOrderFormErrors = {...initialErrors};
            if (e.email) {
              newErrors.email = e.email[0];
            }
            if (e.company_name) {
              newErrors.companyName = e.company_name[0];
            }
            if (e.amount) {
              newErrors.amount = e.amount[0];
            }
            setErrors(newErrors);
          }
          return '';
        });
      Log.message(clientSecret);
      if (clientSecret) {
        const {error: stripeError, paymentIntent} = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
            },
          }
        );
        Log.message(stripeError);
        Log.message(paymentIntent);
        if (stripeError) {
          // TODO: show error somewhere
          return;
        }
        if (paymentIntent) {
          setOpen(true);
        }
      }

    }
  };

  return (
    <>
      <div className={classes.dropdownFields}>
        <InvoicesDropdown
          options={invoices}
          activeOption={activeInvoice}
          setActiveOption={setActiveInvoice}
        />
        <InvoicesDropdown
          options={duration}
          activeOption={activeDuration}
          setActiveOption={setActiveDuration}
        />
      </div>
      <div className={classes.offers}>
        <div>
          <h4 className={classes.offersTitle}>$1<span className={classes.piece}>/month</span></h4>
          <p className={classes.offersSubtitle}>per issued invoice</p>
        </div>
        <div className={classes.descriptionContainer}>
          <p className={classes.offersDescription}>After pre-order, 4.99% of each amount paid by the customer plus 30 cents per transaction</p>
        </div>
      </div>
      <div className={classes.divider} />
      <div className={classes.charges}>
        <h6 className={classes.chargesTitle}>Total Charges</h6>
          <div className={classes.priceContainer}>
            <p className={classes.price}>${charges}</p>
            <p className={classes.bonus}>+ 2.99% of each amount paid by the customer, charged by Stripe</p>
          </div>
      </div>
      <div className={classes.dataCompany}>
        <div className={classes.halfInput}>
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            darkerPlaceholderColor
            onChange={onInputChange}
            name="email"
            error={!!errors.email}
            errorText={errors.email}
            onBlur={() => validateField('email')}
          />
        </div>
        <div className={classes.halfInput}>
          <Input
            type="text"
            label="Name of company"
            placeholder="Enter company"
            darkerPlaceholderColor
            onChange={onInputChange}
            name="companyName"
            error={!!errors.companyName}
            errorText={errors.companyName}
            onBlur={() => validateField('companyName')}
          />
        </div>
      </div>
      <div className={classes.divider} />
      <form onSubmit={handleSubmit}>
        <div className={classes.payment}>
          <div className={classes.numberInput}>
            <label className={classes.paymentLabel} htmlFor="card-number">Card Number</label>
            <CardNumberElement
              id="card-number"
              className={classes.paymentField}
              options={cardElementOptions}
            />
          </div>
          <div className={classes.expirationInput}>
            <label className={classes.paymentLabel} htmlFor="card-expiry">Expiration</label>
            <CardExpiryElement
              id="card-expiry"
              className={classes.paymentField}
              options={cardElementOptions}
            />
          </div>
          <div className={classes.cvcInput}>
            <label className={classes.paymentLabel} htmlFor="card-cvc">CVC</label>
            <CardCvcElement
              id="card-cvc"
              className={classes.paymentField}
              options={cardElementOptions}
            />
          </div>
        </div>
        <Button
          round
          w100
          title={`Pre-order for $${charges}`}
          disabled={!stripe}
        />
      </form>
      <Modal
        open={open}
        handleClose={handleClose}
        backgroundColor="#F1F1F1"
        maxWidth={800}
        borderRadius={24}
        children={
          <ConfirmCompanyModal charges={charges} handleClose={handleClose} />
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
  getPaymentIntent: createPaymentIntent,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(PreOrderForm);
