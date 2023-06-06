import { ModuleMetadata, Type } from '@nestjs/common/interfaces';

import { PaypalOptions } from './paypal-options.interface';
import { PaypalOptionsFactory } from './paypal-options-factory.interface';

export interface PaypalAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  inject?: any[];
  useClass?: Type<PaypalOptionsFactory>;
  useExisting?: Type<PaypalOptionsFactory>;
  useFactory?: (...args: any[]) => Promise<PaypalOptions> | PaypalOptions;
}
