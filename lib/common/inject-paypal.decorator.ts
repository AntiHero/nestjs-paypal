import { Inject } from '@nestjs/common';

import { PAYPAL_TOKEN } from './constants';

export const InjectPaypal = () => Inject(PAYPAL_TOKEN);
