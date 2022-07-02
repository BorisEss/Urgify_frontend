import { createAction } from '@reduxjs/toolkit';

import type { Request, RequestMeta } from '../api/apiTypes';
import type { NetworkStatus } from '../reducers/network';

export const networkActions = {
  requestStarted: createAction('networkRequestStarted', (request: Request) => ({
    payload: { request },
  })),
  requestFinished: createAction(
    'networkRequestFinished',
    (request: Request, requestMeta: RequestMeta) => ({
      payload: { request, requestMeta },
    }),
  ),
  setNetworkStatus: createAction<
    { networkState: NetworkStatus },
    'networkSetNetworkStatus'
  >('networkSetNetworkStatus'),
  hideOfflineNotification: createAction('networkHideOfflineNotification'),
  setNetworkType: createAction(
    'setNetworkType',
    (type: string | undefined) => ({ payload: { type } }),
  ),
};
