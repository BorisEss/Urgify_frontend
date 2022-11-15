import React from 'react';
import { useNavigate } from 'react-router-dom';

import { SignInRoute } from '../navigation/navTypes';
import HomePageUi from '../ui/HomePageUi';

const Home = () => {
  const navigate = useNavigate();

  const redirectToSignIn = () => {
    navigate(SignInRoute());
  };

  return <HomePageUi redirectToSignIn={redirectToSignIn} />;
};
export default Home;
