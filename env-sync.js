#!/usr/bin/env node

const program = require('commander');
const syncEnv = require('./src/syncEnv');

program
    .version('1.0.0', '-V, --version')
    .arguments('<file1> <file2> ')
    .description('file1: is file need to check\nfile2: is file use to compare')
    .option('-s, --sync', 'Sync the missing environment key and write to file1')
    .option('-v, --verbose', 'Display verbose')
    .action(syncEnv.syncEnv);

program.parse(process.argv);

if (!process.argv.slice(2).length) {
    program.outputHelp();
}
