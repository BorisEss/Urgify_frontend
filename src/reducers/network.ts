import { createReducer } from '@reduxjs/toolkit';

import { networkActions } from '../actions/network';

export type NetworkStatus = 'online' | 'offline' | 'serverdown';

export type NetworkState = {
  activeRequests: number;
  activeRequestsByKey: Record<string, number>;
  requestsStats: Record<string, RequestStats>;
  isOfflineNotificationVisible: boolean;
  networkState: NetworkStatus;
  lastNetworkState: NetworkStatus;
  networkType: string | undefined;
};

type RequestStats = {
  lastTime: number;
};

export default createReducer(createInitialState(), (builder) => {
  builder.addCase(networkActions.requestStarted, (state, action) => {
    const request = action.payload.request;
    state.activeRequests += 1;

    if (!request.key) return;
    let cnt = state.activeRequestsByKey[request.key] || 0;
    state.activeRequestsByKey[request.key] = cnt + 1;
  });
  builder.addCase(networkActions.requestFinished, (state, action) => {
    const request = action.payload.request;
    let activeRequests = state.activeRequests - 1;
    if (activeRequests < 0) activeRequests = 0;
    state.activeRequests = activeRequests;

    if (!request.key) return;
    const key = request.key;

    let cnt = state.activeRequestsByKey[key];
    state.activeRequestsByKey[key] = cnt > 0 ? cnt - 1 : 0;

    const meta = action.payload.requestMeta;
    if (!meta.error) {
      const stats = state.requestsStats[key] || { lastTime: 0 };
      stats.lastTime = meta.start;
      state.requestsStats[key] = stats;
    }
  });
  builder.addCase(networkActions.setNetworkType, (state, action) => {
    state.networkType = action.payload.type;
  });
  builder.addCase(networkActions.setNetworkStatus, (state, action) => {
    const payload = action.payload;
    if (state.networkState === payload.networkState) return;
    state.lastNetworkState = state.networkState;
    state.networkState = payload.networkState;
    state.isOfflineNotificationVisible = true;
  });
  builder.addCase(networkActions.hideOfflineNotification, (state) => {
    state.isOfflineNotificationVisible = false;
  });
});

function createInitialState(): NetworkState {
  return {
    activeRequests: 0,
    isOfflineNotificationVisible: false,
    networkState: 'online',
    lastNetworkState: 'online',
    activeRequestsByKey: {},
    requestsStats: {},
    networkType: undefined,
  };
}
