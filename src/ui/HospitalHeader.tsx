import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from './Buttons/Button';
// import Button from './Buttons/Button';
import Logo from './Logo';

const useStyles = makeStyles<{title?: string}>()((_theme: Theme, {title}) => ({
  main: {
    paddingLeft: 112,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 112,
  },
  leftSideWrap: {
    display: 'flex',
    alignItems: 'center',
    padding: title ? '16px 0' : '20px 0',
  },
  hospitalName: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',
    color: '#2B364D',
    paddingLeft: 24,
  },
  disablePaddingLeft: {
    paddingLeft: 0,
  },
}));

type HospitalHeaderType = {
  title?: string;
  buttonTitle?: string;
  disablePaddingLeft?: boolean;
  onClick?: () => void;
};

const HospitalHeader: React.FC<HospitalHeaderType> = ({
    title,
    buttonTitle,
    disablePaddingLeft,
    onClick,
  }) => {
  const {classes, cx} = useStyles({title});

  return (
    <>
      <div className={cx(classes.header, disablePaddingLeft ? classes.disablePaddingLeft : '')}>
        <div className={classes.leftSideWrap}>
          <Logo
            width={83}
            height={16}
          />
          {title ? (
            <div className={classes.hospitalName}>
              <p>{title}</p>
            </div>
          ) : null }
        </div>

        {buttonTitle ? (
          <div>
            <Button
              title={buttonTitle}
              w100
              onClick={onClick}
            />
          </div>
        ) : null }
      </div>
    </>
  );
};

export default HospitalHeader;
