import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

export const SQUAD_PROVIDER = 'SQUAD_PROVIDER';

export const SquadCoProvider: Provider = {
  provide: SQUAD_PROVIDER,
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    const squadApiKey = configService.get<string>('SQUAD_CO_API_KEY');

    const axiosInstance = axios.create({
      baseURL: configService.get<string>('SQUAD_CO_BASE_URL'),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${squadApiKey}`,
      },
    });

    return axiosInstance;
  },
};
