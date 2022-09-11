const key = process.env.REACT_APP_PUBLIC_SERVER_ENV || 'dev';

export const API_DEV_DOMAIN = 'http://142.93.163.218:8007';

export let API_HOST: string;

switch (key) {
  case 'stage':
    API_HOST = '/api';
    break;
  case 'production':
    API_HOST = '/api';
    break;
  default:
    API_HOST = `${API_DEV_DOMAIN}/api`;
    break;
}

export let WITHOUT_API_HOST: string;

switch (key) {
  case 'stage':
    WITHOUT_API_HOST = '';
    break;
  case 'production':
    WITHOUT_API_HOST = '';
    break;
  default:
    WITHOUT_API_HOST = API_DEV_DOMAIN;
    break;
}
