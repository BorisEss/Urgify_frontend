import type {AppStore} from '../store';
import {strerr} from '../utils/strings';

type ExtraData = {[key: string]: any};

class LoggerService {
  // @ts-ignore
  private store: AppStore;

  setStore(store: AppStore) {
    this.store = store;
  }

  debug(category: string, message: string, data?: ExtraData) {
    // eslint-disable-next-line no-console
    console.log('DEBUG', category, message, data);
  }

  error(e: Error, data?: ExtraData) {
    // eslint-disable-next-line no-console
    console.log('ERROR', strerr(e), data);
  }

  message(message: any) {
    // eslint-disable-next-line no-console
    console.log('MESSAGE', message);
  }
}

const Log = new LoggerService();

export default Log;
