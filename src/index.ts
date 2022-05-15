import { DexcomApiClient } from '@diakem/dexcom-api-client';
import { Command, InvalidOptionArgumentError } from 'commander';
import { NightScoutClient } from './nightscout-client';
import { version } from '../package.json';

const program = new Command();

program
  .name('DiaKEM Dexcom Follower to Nightscout bridge')
  .description(
    "Real-time data bridge between dexcom's sharing service and nightscout"
  )
  .version(version);

program
  .command('sync')
  .description(
    "Synchronize CGM data from Dexcom's sharing service to Nightscout"
  )
  .requiredOption(
    '-u, --username <DEXCOM_FOLLOWER_USERNAME>',
    'Dexcom Follower username',
    process.env.DEXCOM_FOLLOWER_USERNAME
  )
  .requiredOption(
    '-p, --password <DEXCOM_FOLLOWER_PASSWORD>',
    'Dexcom Follower password',
    process.env.DEXCOM_FOLLOWER_PASSWORD
  )
  .requiredOption(
    '-s, --server <string>',
    'Dexcom Follower Server',
    value => {
      if (!['EU', 'US'].includes(value)) {
        throw new InvalidOptionArgumentError(`Please select one of EU|US.`);
      }

      return value;
    },
    process.env.DEXCOM_FOLLOWER_SERVER
  )
  .requiredOption(
    '-i, --url <NIGHTSCOUT_URL>',
    'URL to nightscout instance',
    process.env.NIGHTSCOUT_INSTANCE_URL
  )
  .requiredOption(
    '-a, --api-secret <NIGHTSCOUT_API_SECRECT>',
    'Nightscout API Secret',
    process.env.NIGHTSCOUT_API_SECRET
  )
  .action(async options => {
    const { username, password, server, url, apiSecret } = options;
    const client = DexcomApiClient({
      username,
      password,
      server,
      debug: true,
    });

    const nightScoutClient = NightScoutClient({
      url,
      apiSecret,
    });

    await nightScoutClient.writeCgm(
      (await client.read()).map(nightScoutClient.fromDexcom)
    );

    client.observe({
      maxAttempts: 30,
      delay: 2000,
      listener: async cgmData => {
        await nightScoutClient.writeCgm(nightScoutClient.fromDexcom(cgmData));

        // eslint-disable-next-line no-console
        console.log('DATA RECEIVED', cgmData, new Date());
      },
    });
  });

program.parseAsync();
