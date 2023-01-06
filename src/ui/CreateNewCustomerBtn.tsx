import React from 'react';
import {makeStyles} from 'tss-react/mui';

import OutlinedButton from './Buttons/OutlinedButton';

const useStyles = makeStyles()({
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
  onClick: () => void;
};

const CreateNewCustomerBtn: React.FC<Props> = ({
  title,
  onClick,
}) => {
  const {classes} = useStyles();

  return (
    <OutlinedButton
      onClick={onClick}
      type="button"
      title={title}
      color="orange"
      lowerCase
      extraClass={classes.button}
    />
  );
};

export default CreateNewCustomerBtn;
