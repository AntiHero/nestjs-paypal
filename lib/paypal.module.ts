import { DynamicModule, Module } from '@nestjs/common';

import { PaypalCoreModule } from './paypal.core.module';
import type { PaypalOptions, PaypalAsyncOptions } from './interfaces';

@Module({})
export class PaypalModule {
  public static forRoot(options: PaypalOptions): DynamicModule {
    return {
      module: PaypalModule,
      imports: [PaypalCoreModule.forRoot(options)],
    };
  }

  public static forRootAsync(options: PaypalAsyncOptions): DynamicModule {
    return {
      module: PaypalModule,
      imports: [PaypalCoreModule.forRootAsync(options)],
    };
  }
}
