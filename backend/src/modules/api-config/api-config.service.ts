import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import apiConfig from './api-config';

@Injectable()
export class APIConfigService {
  constructor(
    @Inject(apiConfig.KEY)
    public env: ConfigType<typeof apiConfig>,
  ) {}
}
