import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';

import type {
  PaypalOptions,
  PaypalAsyncOptions,
  PaypalOptionsFactory,
} from './interfaces';
import { PAYPAL_OPTIONS_TOKEN, PAYPAL_TOKEN } from './common/constants';
import { createPaypalClient } from './common/create-paypal-client.util';

@Global()
@Module({})
export class PaypalCoreModule {
  public static forRoot(options: PaypalOptions): DynamicModule {
    const { clientID, secret, live = false } = options;

    const provider: Provider = {
      provide: PAYPAL_TOKEN,
      useValue: createPaypalClient({
        clientID,
        secret,
        live,
      }),
    };

    return {
      exports: [provider],
      module: PaypalCoreModule,
      providers: [provider],
    };
  }

  public static forRootAsync(options: PaypalAsyncOptions): DynamicModule {
    const paypalProvider: Provider = {
      inject: [PAYPAL_OPTIONS_TOKEN],
      provide: PAYPAL_TOKEN,
      useFactory: (paypalOptions: PaypalOptions) =>
        createPaypalClient(paypalOptions),
    };

    return {
      exports: [paypalProvider],
      imports: options.imports,
      module: PaypalCoreModule,
      providers: [...this.createAsyncProviders(options), paypalProvider],
    };
  }

  private static createAsyncProviders(options: PaypalAsyncOptions): Provider[] {
    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options)];
    }

    return [
      this.createAsyncOptionsProvider(options),
      {
        provide: <any>options.useClass,
        useClass: <any>options.useClass,
      },
    ];
  }

  private static createAsyncOptionsProvider(
    options: PaypalAsyncOptions,
  ): Provider {
    if (!options.useFactory && !options.useClass && !options.useExisting) {
      throw new Error('Provider value missing.');
    }

    if (options.useFactory) {
      return {
        inject: options.inject || [],
        provide: PAYPAL_OPTIONS_TOKEN,
        useFactory: options.useFactory,
      };
    }

    return {
      inject: [
        <Type<PaypalOptionsFactory>>options.useExisting ||
          <Type<PaypalOptionsFactory>>options.useClass,
      ],
      provide: PAYPAL_OPTIONS_TOKEN,
      useFactory: (optionsFactory: PaypalOptionsFactory) =>
        optionsFactory.createPaypalOptions(),
    };
  }
}
