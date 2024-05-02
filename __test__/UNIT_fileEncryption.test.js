const { hashPassword, generateSalt } = require('../src/utils/encrypt');  

describe('File Encryption', () => {
  test('Encrypts plain text passwords correctly', () => {
    const password = 'testPassword123';
    const salt = generateSalt(); // Generate a salt for the test
    const passwordHash = hashPassword(password, salt);


    expect(passwordHash).not.toBe(password);
    expect(passwordHash).toBeDefined();
    expect(passwordHash.length).toBeGreaterThan(0); 
  });
});
