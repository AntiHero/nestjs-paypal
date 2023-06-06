import paypal from '@paypal/checkout-server-sdk';

import type { PaypalOptions } from '../interfaces';
import { validatePaypalOptions } from './validate-paypal-options.util';

export const createPaypalClient = (options: PaypalOptions) => {
  const { clientID, secret, live = false } = options;

  validatePaypalOptions(options);

  const environment:
    | paypal.core.SandboxEnvironment
    | paypal.core.LiveEnvironment = live
    ? new paypal.core.LiveEnvironment(clientID, secret)
    : new paypal.core.SandboxEnvironment(clientID, secret);

  return new paypal.core.PayPalHttpClient(environment);
};
