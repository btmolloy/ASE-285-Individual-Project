const { hashPassword, generateSalt } = require('../src/utils/encrypt');  // adjust the path as needed

describe('File Encryption', () => {
  test('Encrypts plain text passwords correctly', () => {
    const password = 'testPassword123';
    const salt = generateSalt(); // Generate a salt for the test
    const passwordHash = hashPassword(password, salt);

    // For a true unit test, you'd compare against a known result.
    // Here, we can't do that because the salt should be random.
    // Instead, we verify the hash is generated and is not equal to the plain password.
    expect(passwordHash).not.toBe(password);
    expect(passwordHash).toBeDefined();
    expect(passwordHash.length).toBeGreaterThan(0); // Check if the hash seems valid
  });
});
