import React from 'react';

import {createAppProvider} from './navigation/AppProvider';
import {getGlobalServices} from './services';

const AppProvider = createAppProvider(getGlobalServices());

const App: React.FC = () => {
  return <AppProvider />;
};

export default App;
