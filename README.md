<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

## Description

PayPal client for [Nest](https://github.com/nestjs/nest) framework.

## Installation

```bash
$ yarn add nestjs-paypal
```

## Available options

- clientID (string) - Paypal Client ID.
- secret (string) - Paypal Secret Key.
- live (boolean) - Paypal Environment you want to work in: false **(default)** - `Sandbox`, true - `Live`.

## Usage

Sync mode. Sandbox Environment.

```ts
import { PaypalModule } from 'nestjs-paypal';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    PaypalModule.forRoot({
      clientID: 'XXX-XXX',
      secret: 'XXX-XXX',
    }),
  ],
})
export class PaymentModule {}
```

Async mode (preferred). Live Environment.

```ts
import { PaypalModule, PaypalOptions } from 'nestjs-paypal';
import { ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

type PaypalConfigService = ConfigService<
  {
    paypal: PaypalOptions;
  },
  true
>;

@Module({
  imports: [
    PaypalModule.forRootAsync({
      useFactory: (configService: PaypalConfigService) => ({
        clientID: configService.get('paypal.clientID', { infer: true }),
        secret: configService.get('paypal.secret', { infer: true }),
        live: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class PaymentModule {}
```

Client.

```ts
import { PayPalHttpClient } from '@paypal/checkout-server-sdk/lib/core/paypal_http_client';
import { InjectPaypal } from 'nestjs-paypal';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PaypalService {
  public constructor(
    @InjectPaypal() private readonly paypalClient: PayPalHttpClient,
  ) {}
}
```

[MIT licensed](LICENSE).

Copyright © 2023 Aleksandr Schemelev
