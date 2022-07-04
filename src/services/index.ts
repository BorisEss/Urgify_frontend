import { getTokens } from '../actions/auth';
import {AppState, AppStore, createAppStore} from '../store';
import Log from './logger';

export class Services {
  private _store: AppStore;

  private _persistDonePromise: Promise<void>;

  get store(): AppStore {
    return this._store;
  }

  get persistDone(): Promise<void> {
    return this._persistDonePromise;
  }

  constructor() {
    const storeConfig: Partial<AppState> = {};
    this._store = createAppStore(storeConfig);
    Log.setStore(this._store);
    Log.debug('startup', 'Services.started');

    this._persistDonePromise = Promise.resolve();
    this.persistDidDone();
  }

  private persistDidDone() {
    Log.debug('startup', 'Services.persistDidDone');
    const dispatch = this.store.dispatch;
    dispatch(getTokens());
  }
}

let _services: Services;

export function getGlobalServices(): Services {
  if (!_services) {
    _services = new Services();
  }
  return _services;
}
