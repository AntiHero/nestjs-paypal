import { PaypalOptions } from './paypal-options.interface';

export interface PaypalOptionsFactory {
  createPaypalOptions(): Promise<PaypalOptions> | PaypalOptions;
}
