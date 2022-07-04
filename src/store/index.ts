import {configureStore} from '@reduxjs/toolkit';

import rootReducer from './rootReducer';

export type AppState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof createAppStore>;

export const createAppStore = (config?: Partial<AppState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: {...config},
  });
};
