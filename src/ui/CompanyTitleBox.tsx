import React from 'react';
import {makeStyles} from 'tss-react/mui';

import CreateNewCustomerBtn from './CreateNewCustomerBtn';

const useStyles = makeStyles()({
  companyName: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 32,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
});

type Props = {
  title: string;
  btnTitle?: string;
  onClick?: () => void;
};

const CompanyTitleBox: React.FC<Props> = ({
  title,
  btnTitle,
  onClick,
}) => {
  const {classes} = useStyles();

  return (
    <div className={classes.companyName}>
      <h2 className={classes.title}>{title}</h2>
      {btnTitle && onClick && (
        <CreateNewCustomerBtn
          onClick={onClick}
          title={btnTitle}
        />
      )}
    </div>
  );
};

export default  CompanyTitleBox;
