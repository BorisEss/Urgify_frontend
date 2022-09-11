import type { AppAsyncThunk } from '../actions/actionsTypes';
import type { PaymentIntentRequest } from './apiTypes';
import { decodeString } from './decoders';
import { makeRequest } from './makeRequest';

export const submitWaitingList = (
  params: {email: string},
): AppAsyncThunk<undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'exploreIdea',
      method: 'post',
      path: '/accounts/waiting-list/',
      isAuth: true,
      params,
    }),
  );
};

export const createPaymentIntent = (
  params: PaymentIntentRequest,
): AppAsyncThunk<string | undefined> => (dispatch) => {
  return dispatch(
    makeRequest({
      key: 'exploreIdea',
      method: 'post',
      path: '/stripe/create-payment-intent/',
      isAuth: true,
      params,
    }),
  ).then(decodePaymentIntent);
};

const decodePaymentIntent = (data: any): string | undefined => {
  if (!data) return undefined;
  return decodeString(data.client_secret);
};
