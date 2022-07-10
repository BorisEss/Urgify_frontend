import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from '../Button';
import Logo from '../Logo';

export const useStyles = makeStyles<{title?: string}>()((_theme: Theme, {title}) => ({
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
}));

type HospitalHeaderType = {
  title?: string;
  buttonTitle?: string;
};

const HospitalHeader: React.FC<HospitalHeaderType> = ({title, buttonTitle}) => {
  const {classes} = useStyles({title});

  return (
  <>
    <div className={classes.header}>
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
          <Button title={buttonTitle} />
        </div>
      ) : null }
    </div>
  </>
  );
};

export default HospitalHeader;
