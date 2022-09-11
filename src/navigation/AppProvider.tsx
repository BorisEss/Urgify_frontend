import createCache from '@emotion/cache';
import {CacheProvider} from '@emotion/react';
import {ThemeProvider} from '@mui/material/styles';
// stripe
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import React from 'react';
import {Provider} from 'react-redux';

import type {Services} from '../services';
import Log from '../services/logger';
import { customTheme } from '../theme';
import AppRouter from './AppRouter';

const stripePromise = loadStripe('pk_test_WPcftmoQvTkHygaegAGocRwD', {
  locale: 'en',
});

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export function createAppProvider(services: Services): React.ComponentType {
  return () => {
    const [persistDone, setPersistDone] = React.useState(false);

    React.useEffect(() => {
      services.persistDone.then(() => {
        setPersistDone(true);
        Log.debug('startup', 'PersistGate render', {
          persistDone,
        });
      });
    }, [persistDone, setPersistDone]);
    return (
      <Provider store={services.store}>
        {persistDone ? (
          <CacheProvider value={muiCache}>
            <ThemeProvider theme={customTheme}>
              <Elements stripe={stripePromise}>
                <AppRouter />
              </Elements>
            </ThemeProvider>
          </CacheProvider>
        ) : null}
      </Provider>
    );
  };
}
