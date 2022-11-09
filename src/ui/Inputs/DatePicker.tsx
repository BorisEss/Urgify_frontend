import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  fullWidth: {
    width: '100%',
  },
  input: {
    width: '100%',

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #DBDBDB',
      borderRadius: 4,
    },

    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #2B364D',
    },

    '& .MuiInputAdornment-root': {
      display: 'none',
    },

    '& input': {
      background: '#fff',
      padding: '14px 22px 14px 14px',
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      color: '#2B364D',
      width: '100%',

      '&::placeholder': {
        fontFamily: 'Poppins-semibold',
        fontWeight: 600,
        fontSize: 16,
        lineHeight: '24px',
        color: '#B8B8B8',
      },
    },
  },
  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,

    [theme.breakpoints.down('sm')]: {
      fontFamily: 'Poppins-regular',
      fontWeight: 500,
      fontSize: 12,
      lineHeight: '18px',
      color: '#777777',
      paddingBottom: 4,
    },
  },
}));

type DatePickerType = {
  label?: string;
};

const DatePicker: React.FC<DatePickerType> = ({
  label,
}) => {
  const [open, setOpen] = React.useState(false);
  const {classes} = useStyles();
  const [value, setValue] = React.useState<Date | null>(new Date());

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  return (
    <div className={classes.fullWidth}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        {label ? <p className={classes.label}>{label}</p> : null}
        <DesktopDatePicker
          inputFormat="mm/dd/yyyy"
          value={value}
          onChange={handleChange}
          onClose={() => setOpen(false)}
          open={open}
          renderInput={(params) => <TextField classes={{root: classes.input}} onClick={() => setOpen(true)} {...params} />}
        />
      </LocalizationProvider>
    </div>
  );
};

export default DatePicker;
