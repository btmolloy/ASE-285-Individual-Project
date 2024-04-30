const mongoose = require('mongoose');
const readline = require('readline');
const crypto = require('crypto');
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
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
  const lines = fs.readFileSync('password.txt', 'utf8').split('\n');
  lines.forEach(line => {
    const [email, password] = line.split(':');
    const passwordHash = hashPassword(password);
    const user = new User({ email, passwordHash });
    user.save(err => {
      if (err) console.log(err);
    });
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
 //encryptPasswordsAndStore();
