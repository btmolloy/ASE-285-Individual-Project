const mongoose = require('mongoose');
const readline = require('readline');
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI);
console.log("Connected to db!");

const userSchema = new mongoose.Schema({
  email: String,
  passwordHash: String
});

const User = mongoose.model('User', userSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function hashPassword(password, salt = 'a-secure-salt') {
  return crypto.createHmac('sha256', salt).update(password).digest('hex');
}

function encryptPasswordsAndStore() {
  const fs = require('fs');
  const lines = fs.readFileSync('password.txt', 'utf8').split('\r\n');  // Adjusted for Windows line endings
  lines.forEach(async (line) => {  // Use async here
    if (line.trim() === '') return; // Skip empty lines
    const [email, password] = line.split(':');
    if (!email || !password) return; // Skip lines without proper email:password format
    const passwordHash = hashPassword(password);
    const user = new User({ email, passwordHash });
    try {
      await user.save();  // Use await instead of a callback
      console.log(`User ${email} saved successfully.`);
    } catch (err) {
      console.error('Error saving user:', err);
    }
    // Write to encrypted file
    fs.appendFileSync('password.enc.txt', `${email}:${passwordHash}\n`);
  });
}


function authenticateUser(email, password) {
  const passwordHash = hashPassword(password);
  User.findOne({ email: email }, (err, user) => {
    if (err) console.log(err);
    else if (user && user.passwordHash === passwordHash) console.log(true);
    else console.log(false);
  });
}

rl.question('Enter email and password: ', answer => {
  const [email, password] = answer.split(',');
  authenticateUser(email, password);
  rl.close();
});

// Optionally, you can call this function once to initialize your database
// encryptPasswordsAndStore();
