const key = process.env.REACT_APP_PUBLIC_SERVER_ENV || 'dev';

export const API_DOMAIN = 'url for stage api server';
export const API_PROD_DOMAIN = 'url for prod server';

export let API_HOST: string;

switch (key) {
  case 'stage':
    API_HOST = `https://${API_DOMAIN}`;
    break;
  case 'production':
    API_HOST = `https://${API_PROD_DOMAIN}`;
    break;
  default:
    API_HOST = 'http://142.93.163.218:8007/api';
    break;
}

export let WITHOUT_API_HOST: string;

switch (key) {
  case 'stage':
    WITHOUT_API_HOST = `https://${API_DOMAIN}`;
    break;
  case 'production':
    WITHOUT_API_HOST = `https://${API_PROD_DOMAIN}`;
    break;
  default:
    WITHOUT_API_HOST = 'http://142.93.163.218:8007';
    break;
}
