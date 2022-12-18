import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import type { SelectChangeEvent } from '@mui/material/Select';
import Select from '@mui/material/Select';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import images from '../images';
import type { UserSelectOption } from '../types';

const useStyles = makeStyles()({
  root: {
    width: '100%',

    '& .MuiInputBase-root': {
      zIndex: 1,
    },

    '& .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #DBDBDB',
      borderRadius: 4,
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: '2px solid #2B364D',
      borderRadius: 4,
    },

    '& .MuiSelect-select': {
      fontFamily: 'Poppins-semibold',
      fontWeight: 600,
      fontSize: 16,
      lineHeight: '24px',
      color: '#2B364D',
      paddingRight: 0,
    },

    '& .MuiSvgIcon-root': {
      display: 'none',
    },
  },
  noBorder: {
    '& .MuiOutlinedInput-notchedOutline': {
      border: 'none',
    },

    '& .MuiInputBase-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      border: 'none',
      borderRadius: 4,
    },

    '& .MuiSelect-select': {
      paddingTop: 14,
      paddingBottom: 14,
    },
  },
  selectIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 12,
    top: 16,
    zIndex: 0,
  },
  selectIconInverted: {
    transform: 'rotate(180deg)',
  },
});

type Props = {
  options: UserSelectOption[];
  activeOption: UserSelectOption;
  setActiveOption: (item: UserSelectOption) => void;
  noBorder?: boolean;
};

const UserSelect: React.FC<Props> = ({
  options,
  activeOption,
  setActiveOption,
  noBorder,
}) => {
  const {classes,cx} = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: SelectChangeEvent) => {
    const selected = options.find(item => item.value === event.target.value);
    if (selected) {
      setActiveOption(selected);
    }
  };
  return (
    <FormControl
      sx={{ minWidth: 120 }}
      className={cx(
        classes.root,
        noBorder ? classes.noBorder : '',
      )}
    >
      <Select
        value={activeOption.value}
        onChange={handleChange}
        displayEmpty
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
      >
        {options.map(opt => (
          <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
        ))}
      </Select>
      <img
        src={images.arrowDownBolder}
        alt="select icon"
        className={cx(
          classes.selectIcon,
          open && classes.selectIconInverted,
        )}
      />
    </FormControl>
  );
};

export default UserSelect;
