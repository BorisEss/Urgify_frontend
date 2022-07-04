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
    API_HOST = '/api';
    break;
}
