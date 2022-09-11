import React from 'react';
import {makeStyles} from 'tss-react/mui';

import Button from './Buttons/Button';

const useStyles = makeStyles()({
  logoutWrapper: {
    width: 'max-content',
    position: 'absolute',
    right: 0,
    top: 0,
  },
});

type LogoutBtnType = {
  onClick: () => void;
};

const LogoutBtn: React.FC<LogoutBtnType> = ({onClick}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.logoutWrapper}>
      <Button smaller title="Logout" w100 onClick={onClick} />
    </div>
  );
};

export default LogoutBtn;
