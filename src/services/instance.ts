import ky from 'ky';

const prefixUrl = 'https://hook.integromat.com/';

export const instance = ky.extend({
  prefixUrl,
  headers: {
    Accept: 'application/json',
  },
});
