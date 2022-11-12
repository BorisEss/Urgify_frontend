import React from 'react';
import {makeStyles} from 'tss-react/mui';

import OutlinedButton from './Buttons/OutlinedButton';

const useStyles = makeStyles()({
  departmentName: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingTop: 32,
  },
  title: {
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 32,
    lineHeight: '48px',
    color: '#2B364D',
  },
  button: {
    fontSize: 12,
    lineHeight: '18px',
    color: '#F93822',
    padding: '6px 14px',
    border: '2px solid #F93822',
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
    <div className={classes.departmentName}>
      <h2 className={classes.title}>{title}</h2>
      {btnTitle && onClick && (
        <OutlinedButton
          onClick={onClick}
          type="button"
          title={btnTitle}
          color="orange"
          lowerCase
          extraClass={classes.button}
        />
      )}
    </div>
  );
};

export default  CompanyTitleBox;
