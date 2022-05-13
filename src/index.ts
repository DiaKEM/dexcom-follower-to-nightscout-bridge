/**
 * dexcom-follower-to-nightscout-bridge
 *
 * @author Selcuk Kekec <khskekec@gmail.com
 */

import { Command } from 'commander';
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
  .option('-u', '--username <string>', 'Dexcom Follower username')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();
