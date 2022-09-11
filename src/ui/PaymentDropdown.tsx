import { ClickAwayListener, Popover, Theme } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import images from '../images';
import type { PaymentOption } from '../types';

const useStyles = makeStyles<{popoverWidth?: number}>()((_theme: Theme, { popoverWidth }) => ({
  root: {
    position: 'relative',
    width: '100%',
  },
  visibleOption: {
    paddingTop: 24,
    paddingBottom: 24,
    paddingLeft: 32,
    paddingRight: 32,
    borderRadius: 12,
    backgroundColor: 'rgba(184, 184, 184, 0.2)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  clickable: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
    padding: '8px 0',
    width: '100%',
  },
  activeOption: {
    backgroundColor: '#fff',
  },
  text: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 24,
    lineHeight: '36px',
    color: '#2B364D',
  },
  piece: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  arrow: {
    width: 32,
    height: 32,
  },
  arrowUp: {
    transform: 'rotate(180deg)',
  },
  dropDown: {
    background: 'rgba(184, 184, 184, 0.2)',
    top: -8,
    width: popoverWidth ? popoverWidth + 8 : 100,
  },
  leftPadding: {
    paddingLeft: 4,
  },
  popoverPaper: {
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
    borderRadius: 12,
  },
  withCheckbox: {
    justifyContent: 'unset',
    borderTop: '1px solid #DBDBDB',
    paddingTop: 8,
  },
  dropdownOption: {
    paddingLeft: 8,
  },
}));

type PaymentDropdownProps = {
  options: PaymentOption[];
  activeOption: PaymentOption;
  setActiveOption: (item: PaymentOption) => void;
}

const PaymentDropdown: React.FC<PaymentDropdownProps> = ({
  options,
  activeOption,
  setActiveOption,
}) => {
  const [popoverWidth, setPopoverWidth] = useState<number>(168);
  const {classes, cx} = useStyles({popoverWidth});

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setPopoverWidth(event.currentTarget.clientWidth);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleRadioClick = (item: PaymentOption) => {
    setActiveOption(item);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div
        className={classes.root}
      >
        <div
          className={cx(classes.clickable, classes.visibleOption)}
          onClick={handleButtonClick}
          aria-describedby={id}
        >
          <span className={classes.text}>{activeOption.title}{activeOption.title2 ? <span className={classes.piece}>/{activeOption.title2}</span> : ''}</span>
          <img className={classes.arrow} src={images.arrowDown}/>
        </div>
        {open && (
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            classes={{paper: classes.popoverPaper}}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            elevation={0}
          >
            <div className={classes.dropDown}>
              {options.map(item => (
                <div
                  key={item.id}
                  className={cx(classes.clickable, classes.dropdownOption, activeOption.id === item.id ? classes.activeOption : '')}
                  onClick={() => handleRadioClick(item)}
                >
                  <span className={classes.text}>{item.title}{item.title2 ? <span className={classes.piece}>/{item.title2}</span> : ''}</span>
                </div>
              ))}
            </div>
          </Popover>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default  PaymentDropdown;
