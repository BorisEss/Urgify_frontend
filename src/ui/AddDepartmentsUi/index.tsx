import type {Theme} from '@mui/material';
import React from 'react';
import {makeStyles} from 'tss-react/mui';

import AuthPageTitle from '../AuthPageTitle';
import Button from '../Button';
import DepartmentsName from '../DepartmentsName';
import Input from '../Input';
import Logo from '../Logo';
import OutlinedButton from '../OutlinedButton';
import PagesName from '../PagesName';

const useStyles = makeStyles()((theme: Theme) => ({
  main: {
    paddingLeft: 112,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  buttonWrapper: {
    width: 220,
  },

  content: {
    paddingTop: 52,
    paddingLeft: 105,
    width: '64%',
  },

  pagesNameSpace: {
    paddingBottom: 48,
  },
  departmentsNameSpace: {
    paddingBottom: 16,
  },

  titleSpacing: {
    paddingTop: 32,
    paddingBottom: 8,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 41,
      paddingBottom: 24,
    },
  },
  subtitle: {
    fontFamily: 'Poppins-regular',
    fontWeight: 400,
    fontSize: 16,
    color: '#666666',
    [theme.breakpoints.down('sm')]: {
      fontSize: 14,
      lineHeight: '24px',
    },
  },
  divider: {
    width: '100%',
    height: 1,
    background: 'rgba(184, 184, 184, 0.2)',

    [theme.breakpoints.down('sm')]: {
      marginTop: 24,
    },
  },
  authFormSpacing: {
    paddingTop: 32,

    [theme.breakpoints.down('sm')]: {
      paddingTop: 23,
    },
  },
  changeAuthSpacing: {
    paddingTop: 32,
    display: 'flex',

    [theme.breakpoints.down('sm')]: {
      paddingTop: 16,
    },
  },
  inputSpacing: {
    paddingBottom: 32,

    [theme.breakpoints.down('sm')]: {
      paddingBottom: 16,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  actionsButton: {
    flex: '0 0 50%',
  },
  actionsOutlined: {
    flex: '0 0 50%',
  },
}));

const AddDepartmentsUi = () => {
  const {classes} = useStyles();

  return (
    <>
      <div className={classes.main}>
        <div className={classes.header}>
          <div>
            <Logo />
          </div>
          <div className={classes.buttonWrapper}>
            <Button title="Add another hospital"/>
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.pagesNameSpace}>
           <PagesName title="Your hospitals" />
          </div>
          <div className={classes.departmentsNameSpace}>
            <DepartmentsName title="Hospital Pediatric WA" />
          </div>
          <div className={classes.divider} />
          <div className={classes.titleSpacing}>
            <AuthPageTitle
              title="Let’s add your first department"
              subtitle={
                <p className={classes.subtitle}>
                  Aliquam convallis nam luctus egestas amet quis ut ac. Aliquet vulputate non elit turpis pellentesque. A cras a elementum faucibus egestas.
                </p>
              }
            />
          </div>
          <div className={classes.authFormSpacing}>
            <div className={classes.inputSpacing}>
              <Input label="department name" type="text" />
            </div>
            <div className={classes.actions}>
              <div className={classes.actionsButton}>
                <Button title="Save department" />
              </div>
              <div className={classes.actionsOutlined}>
                <OutlinedButton
                  bigger
                  type="button"
                  title="Add one more"
                  w100
                  lowerCase
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddDepartmentsUi;
