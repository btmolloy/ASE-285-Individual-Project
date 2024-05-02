const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const { User } = require('../src/utils/db'); // adjust the path as needed

describe('Database Write', () => {
  let mongoServer;
  let uri;

  beforeAll(async () => {
    // Ensure there's no active connection before starting a new one
    if (mongoose.connection.readyState) {
      await mongoose.disconnect();
    }
    mongoServer = await MongoMemoryServer.create();
    uri = mongoServer.getUri();
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test('Writes encrypted passwords and emails to the database', async () => {
    const userEmail = 'test@example.com';
    const userPasswordHash = 'encryptedPassword';
    const user = new User({ email: userEmail, passwordHash: userPasswordHash });

    const savedUser = await user.save();
    expect(savedUser.email).toBe(userEmail);
    expect(savedUser.passwordHash).toBe(userPasswordHash);
  });
});
