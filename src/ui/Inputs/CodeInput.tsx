import React from 'react';
import AuthCode from 'react-auth-code-input';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles()((_theme) => ({

  label: {
    fontFamily: 'Poppins-medium',
    fontWeight: 500,
    fontSize: 16,
    lineHeight: '24px',
    textTransform: 'uppercase',
    color: '#777777',
    paddingBottom: 8,
  },
  authcodeContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  authcodeInput: {
    background: '#FFFFFF',
    border: '2px solid #DBDBDB',
    borderRadius: 4,
    width: 56,
    height: 56,
    display: 'flex',
    textAlign: 'center',
    fontFamily: 'Poppins-semibold',
    fontWeight: 600,
    fontSize: 16,
    lineHeight: '24px',

    '&:focus': {
      outline: 'none',
    },
  },
  error: {
    border: '2px solid #f60707',
  },
}));

type CodeInputType = {
  onAuthCodeChange: (value: string) => void;
  error?: boolean;
};

const CodeInput: React.FC<CodeInputType> = ({
  onAuthCodeChange,
  error,
}) => {
  const {cx, classes} = useStyles();

  return (
    <>
      <p className={classes.label}>confirmation code</p>
      <AuthCode
        allowedCharacters="numeric"
        onChange={onAuthCodeChange}
        autoFocus={true}
        containerClassName={classes.authcodeContainer}
        inputClassName={cx(classes.authcodeInput, error ? classes.error : '')}
      />
    </>
  );
};

export default CodeInput;
