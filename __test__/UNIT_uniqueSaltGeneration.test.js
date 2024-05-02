// Assuming you modify hashPassword to include salt generation
const { generateSalt, hashPassword } = require('../src/utils/encrypt');

describe('Unique Salt Generation', () => {
  test('Generates unique salt for each password', () => {
    const salt1 = generateSalt();
    const salt2 = generateSalt();
    expect(salt1).not.toBe(salt2);
  });
});
