import React from 'react';
import {makeStyles} from 'tss-react/mui';
import { v4 as uuidv4 } from 'uuid';

import Log from '../services/logger';
import type { InvoiceServiceType, NewInvoiceFormErrors, UserSelectOption} from '../types';
import { formObj, validate } from '../utils/authValidation';
import NewInvoiceCreatePartUI from './NewInvoiceCreatePartUI';
import NewInvoicePreviewPartUI from './NewInvoicePreviewPartUI';

const useStyles = makeStyles()((_theme) => ({
  main: {
    padding: 32,
  },
}));

const dueDates: UserSelectOption[] = [
  {
    label: '15 days',
    value: '15days',
  },
  {
    label: '30 days',
    value: '30days',
  },
];

type NewInvoiceModalType = {
  handleClose: () => void;
};

const NewInvoiceModal: React.FC<NewInvoiceModalType> = ({handleClose}) => {
  const {classes} = useStyles();
  const [step, setStep] = React.useState(0);

  // const [itemFields, setItemFields] = React.useState<NewInvoiceFormFields>({
  //   dateServiceStart: '',
  //   dateServiceEnd: '',
  // });

  const initialErrors: NewInvoiceFormErrors = {
    dateServiceStart: '',
    dateServiceEnd: '',
  };

  const [errors, setErrors] = React.useState<NewInvoiceFormErrors>(initialErrors);

  const [activeDueDate, setActiveDueDate] = React.useState<UserSelectOption>(dueDates[1]);

  const customers = [
    {
      label: 'Jacob Jones',
      value: 'JacobJones',
    },
    {
      label: 'Jacob Jones ml',
      value: 'JacobJonesml',
    },
    {
      label: 'Jacob Jones mx',
      value: 'JacobJonesmx',
    },
  ];

  const [customer, setActiveCustomer] = React.useState<UserSelectOption>(customers[0]);

  const [services, setServices] = React.useState<InvoiceServiceType[]>([
    {
      id: '0',
      description: '',
      chargesAmount: 0,
    },
  ]);

  const onServicesChange = (fieldName: string, fieldValue: string, serviceIndex: number) => {
    // switch (e.target.name) {
    //   case 'description':
    //   case 'chargesAmount': {
    //     updateErrors(e.target.name, !e.target.value ? 'Required field' + '! ' : '');
    //     break;
    //   }
    // }
    const newServices = [...services];

    switch (fieldName) {
      case 'description': {
        newServices[serviceIndex] =  {
          id: newServices[serviceIndex].id,
          description: fieldValue,
          chargesAmount: newServices[serviceIndex].chargesAmount,
        };
        break;
      }
      case 'chargesAmount': {
        newServices[serviceIndex] =  {
          id: newServices[serviceIndex].id,
          description: newServices[serviceIndex].description,
          chargesAmount: +fieldValue,
        };
        break;
      }
    }

    setServices(newServices);
  };

  // const updateErrors = (field: string, error: string) => {
  //   setErrors({...errors, [field]: error});
  // };

  // const validateField = (field: string) => {
  //   switch (field) {
  //     case 'dateServiceStart':
  //     case 'dateServiceEnd':
  //       updateErrors(field, !itemFields[field] ? 'Required field' + '! ' : '');
  //       break;
  //   }
  // };

  // const setValue = (field: string, value: string) => {
  //   switch (field) {
  //     case 'dateServiceStart':
  //     case 'dateServiceEnd': {
  //       updateErrors(field, !value ? 'Required field' + '! ' : '');
  //       break;
  //     }
  //   }

  //   setItemFields({
  //     ...itemFields,
  //     [field]: value,
  //   });
  // };

  // const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.name, e.target.value);

  const onSubmit = () => {
    const form: formObj[] = [
      // {valueType: 'customerName', value: itemFields.customerName},
      // {valueType: 'dateServiceStart', value: itemFields.dateServiceStart},
      // {valueType: 'dateServiceEnd', value: itemFields.dateServiceEnd},
      // {valueType: 'serviceDescription', value: itemFields.serviceDescription},
      // {valueType: 'chargesAmount', value: itemFields.chargesAmount},
      // {valueType: 'dueDate', value: itemFields.dueDate},
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

  const handleMoreServices = () => {
    const newServices = [...services, {
      id: uuidv4(),
      description: '',
      chargesAmount: 0,
    }];
    setServices(newServices);
  };

  return (
    <div className={classes.main}>
      {!step ? (
        <NewInvoiceCreatePartUI
          setStep={setStep}
          handleClose={handleClose}
          errors={errors}
          activeDueDate={activeDueDate}
          setActiveDueDate={setActiveDueDate}
          customer={customer}
          setActiveCustomer={setActiveCustomer}
          onServicesChange={onServicesChange}
          onSubmit={onSubmit}
          handleMoreServices={handleMoreServices}
          customers={customers}
          services={services}
          dueDates={dueDates}
        />
      ) : (
        <NewInvoicePreviewPartUI
          setStep={setStep}
          errors={errors}
          activeDueDate={activeDueDate}
          setActiveDueDate={setActiveDueDate}
          customer={customer}
          setActiveCustomer={setActiveCustomer}
          onServicesChange={onServicesChange}
          onSubmit={onSubmit}
          handleMoreServices={handleMoreServices}
          customers={customers}
          services={services}
          dueDates={dueDates}
        />
      )}
    </div>
  );
};
export default NewInvoiceModal;
