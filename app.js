const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const { addEntriesFromFile, authenticateUser } = require('./src/commands');

const argv = yargs(hideBin(process.argv)).argv;

if (argv.a && argv.t) {
  // Both add and test
  addEntriesFromFile(argv.a).then(() => {
    const [email, password] = argv.t.split(' ');
    authenticateUser(email, password);
  });
} else if (argv.a) {
  // Only add entries from file
  addEntriesFromFile(argv.a);
} else if (argv.t) {
  // Only test authentication
  const [email, password] = argv.t.split(' ');
  authenticateUser(email, password);
} else {
  console.log('No valid command found. Use -a to add entries or -t to test login.');
}
