const fs = require('fs');
const path = require('path');
const { User } = require('./utils/db');
const { hashPassword } = require('./utils/encrypt');

const PASSWORD_DIR = path.join(__dirname, '..', 'password_files'); // Directory path

async function addEntriesFromFile(filename) {
  const filePath = path.join(PASSWORD_DIR, filename);
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const lines = data.split('\r\n');
    const outputFilePath = path.join(PASSWORD_DIR, 'password.enc.txt');
    fs.writeFileSync(outputFilePath, ''); // Clear existing contents
    for (const line of lines) {
      if (!line) continue;
      const [email, password] = line.split(':');
      if (!email || !password) continue;
      const passwordHash = hashPassword(password);
      const user = new User({ email, passwordHash });
      await user.save();
      console.log(`${email} added.`);
      fs.appendFileSync(outputFilePath, `${email}:${passwordHash}\n`); // Write to encrypted file
    }
    console.log('All entries added successfully.');
  } catch (error) {
    console.error('Failed to add entries:', error);
  }
}

async function authenticateUser(email, password) {
  try {
    const passwordHash = hashPassword(password);
    const user = await User.findOne({ email: email });
    const result = user && user.passwordHash === passwordHash;
    console.log(result ? true : false);
  } catch (error) {
    console.error('Authentication failed:', error);
  }
}

module.exports = { addEntriesFromFile, authenticateUser };
