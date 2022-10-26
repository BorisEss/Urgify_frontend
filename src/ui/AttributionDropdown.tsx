import { ClickAwayListener, Popover, Theme } from '@mui/material';
import React, { useState } from 'react';
import { makeStyles } from 'tss-react/mui';

import images from '../images';
import type { EmployeeAttributeItem } from '../types';

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
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
  },
  description: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 12,
    lineHeight: '18px',
    color: '#666666',
    paddingTop: 8,
    paddingBottom: 8,
  },
  arrow: {
    width: 24,
    height: 24,
  },
  arrowUp: {
    transform: 'rotate(180deg)',
  },
  dropDown: {
    background: '#FFFFFF',
    padding: 8,
    paddingBottom: 0,
    width: popoverWidth ? popoverWidth + 16 : 100,
  },
  withCheckbox: {
    justifyContent: 'unset',
    borderTop: '1px solid #DBDBDB',
    paddingTop: 8,
  },
  leftPadding: {
    paddingLeft: 4,
  },
  popoverPaper: {
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.15)',
  },
}));

type AttributionDropdownProps = {
  attributes: EmployeeAttributeItem[];
  setAttributes: (items: EmployeeAttributeItem[]) => void;
}

const AttributionDropdown: React.FC<AttributionDropdownProps> = ({
  attributes,
  setAttributes,
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

  const handleRadioClick = (id: number) => {
    setAttributes([
      ...attributes.map(item => {
        if (item.id === id) return {...item, checked: true};
        return {...item, checked: false};
      }).sort((a) => {
        if (a.checked) return -1;
        else return 1;
      }),
    ]);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className={classes.root}>
        <div className={classes.clickable} onClick={handleButtonClick} aria-describedby={id}>
          <span className={classes.text}>{attributes[0].title}</span>
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
              {attributes.map((item, i) => i === 0 ? (
                <div key={item.id}>
                  <div className={classes.clickable} onClick={handleClose}>
                    <span className={classes.text}>{item.title}</span>
                    <img className={cx(classes.arrow, open && classes.arrowUp)} src={images.arrowDown}/>
                  </div>
                  <p className={classes.description}>{item.description}</p>
                </div>
              ) : (
                <div  key={item.id}>
                  <div className={cx(classes.clickable, classes.withCheckbox)} onClick={() => handleRadioClick(item.id)}>
                    <img src={images.radio}/>
                    <span className={cx(classes.text,classes.leftPadding)}>{item.title}</span>
                  </div>
                  <p className={classes.description}>{item.description}</p>
                </div>
              ))}
            </div>
          </Popover>
        )}
      </div>
    </ClickAwayListener>
  );
};

export default  AttributionDropdown;
