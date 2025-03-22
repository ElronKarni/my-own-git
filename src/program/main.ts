import { Command } from 'commander';
import figlet from 'figlet';
import { handleAddCommand } from './commands/add/main';

const program = new Command();

console.log(figlet.textSync('My Own Git'));

program.name('myowngit').description('A simple git-like version control system').version('1.0.0');

export function runProgram() {
  program
    .command('add [files...]')
    .description('Add file(s) to staging area')
    .action((files) => {
      console.log('Changes to be committed:');
      handleAddCommand({ files });
    });

  program.parse(process.argv);
}
