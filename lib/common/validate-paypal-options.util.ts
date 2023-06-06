import { PaypalOptions } from 'lib/interfaces';

export const validatePaypalOptions = (options: PaypalOptions) => {
  if (typeof options.clientID !== 'string') {
    throw new Error('clientID option should be a string type.');
  }

  if (typeof options.secret !== 'string') {
    throw new Error('secret option should be a string type.');
  }

  if (
    typeof options.live !== 'undefined' &&
    typeof options.live !== 'boolean'
  ) {
    throw new Error('live option should be boolean.');
  }
};
