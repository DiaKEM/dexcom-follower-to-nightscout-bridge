import { DexcomTrendType, CGMDataType } from '@diakem/dexcom-api-client';
import axios from 'axios';
import crypto from 'crypto';

type NightScountClientArgs = {
  apiSecret: string;
  url: string;
};

type NightScoutCgmEntry = {
  date: number;
  sgv: number;
  direction: DexcomTrendType;
};

export const NightScoutClient = ({ apiSecret, url }: NightScountClientArgs) => {
  const client = axios.create({
    baseURL: url,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'API-SECRET': crypto.createHash('sha1').update(apiSecret).digest('hex'),
    },
  });

  const fromDexcom = (cgmData: CGMDataType) => ({
    sgv: cgmData.value,
    date: cgmData.date.getTime(),
    dateString: cgmData.date.toISOString(),
    direction: cgmData.trend,
  });

  const writeCgm = async (data: NightScoutCgmEntry | NightScoutCgmEntry[]) =>
    client.post<NightScoutCgmEntry>(
      '/api/v2/entries',
      (Array.isArray(data) ? data : [data]).map(e => ({
        type: 'svg',
        device: 'share2',
        ...e,
      }))
    );

  return {
    writeCgm,
    fromDexcom,
  };
};
