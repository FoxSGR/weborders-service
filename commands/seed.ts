import chalk from 'chalk';
import { runSeeder } from 'typeorm-seeding';

import * as factories from '../src/database/factories';
import * as seeds from '../src/database/seeds';

// Search for seeds and factories
const run = async () => {
  const log = console.log;

  log(chalk.bold('seeds'));
  log(
    '🔎 ',
    chalk.gray.underline(`found:`),
    chalk.blue.bold(
      `${Object.keys(factories).length} factories`,
      chalk.gray('&'),
      chalk.blue.bold(`${Object.keys(seeds).length} seeds`)
    )
  );

  // run the seeds
  for (const seed of Object.values(seeds)) {
    log(
      chalk.gray.underline(`executing seed:  `),
      chalk.green.bold(`${seed.name}`)
    );
    await runSeeder(seed);
  }

  log('\n👍 ', chalk.gray.underline(`finished seeding`));
  process.exit(0);
};

void run();
