import { ClickAwayListener, Popover, Theme } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import images from '../images';
import {ReactComponent as ArrowDown} from '../images/arrow-down.svg';

const useStyles = makeStyles<{popoverWidth?: number}>()((_theme: Theme, { popoverWidth }) => ({
  root: {
    position: 'relative',
  },
  clickable: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  text: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    color: '#777777',
  },
  arrow: {
    width: 16,
    height: 16,

    '& path': {
      fill: ' #777777',
    },
  },
  arrowUp: {
    transform: 'rotate(180deg)',
  },
  dropDown: {
    background: '#FFFFFF',
    padding: 8,
    paddingBottom: 0,
    top: -8,
    width: popoverWidth ? popoverWidth + 8 : 100,
  },
  leftPadding: {
    paddingLeft: 4,
  },
  popoverPaper: {
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
  },
}));

type InvoicesListDropdownProps = {

}

const InvoicesListDropdown: React.FC<InvoicesListDropdownProps> = ({

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

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.root}>
        <div className={classes.clickable} onClick={handleButtonClick} aria-describedby={id}>
          <span className={classes.text}>Status</span>
          <ArrowDown className={classes.arrow} />
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
                  <div className={classes.clickable} onClick={handleClose}>
                    <span className={classes.text}>Status</span>
                    <img className={cx(classes.arrow, open && classes.arrowUp)} src={images.arrowDown}/>
                </div>
                <div>
                  <div className={classes.clickable}>
                    <span className={cx(classes.text,classes.leftPadding)}>Status</span>
                  </div>
                </div>
            </div>
          </Popover>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default  InvoicesListDropdown;
