import React from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { logout } from '../actions/auth';
import LogoutBtn from '../ui/LogoutBtn';

const LogoutWrapper: React.FC<ReduxProps> = ({
  signOut,
}) => (
  <LogoutBtn onClick={signOut} />
);

const connector = connect(null, {
  signOut: logout,
});

type ReduxProps = ConnectedProps<typeof connector>;

export default connector(LogoutWrapper);
