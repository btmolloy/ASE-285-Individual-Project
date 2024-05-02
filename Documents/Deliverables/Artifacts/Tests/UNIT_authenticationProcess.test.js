const { User } = require('../src/utils/db');
const { hashPassword, generateSalt } = require('../src/utils/encrypt');
const { authenticateUser } = require('../src/commands');

// Mocking necessary dependencies
jest.mock('../src/utils/db', () => ({
    User: {
        findOne: jest.fn()
    }
}));

describe('Authentication Process', () => {
    let consoleLogSpy, consoleErrorSpy;

    beforeEach(() => {
        // Clear mock calls
        User.findOne.mockClear();
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
    });

    afterEach(() => {
        // Restore the original implementations
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
    });

    it('should log true for correct credentials', async () => {
        const email = 'user@example.com';
        const password = 'correctPassword';
        const salt = generateSalt();
        const hashedPassword = hashPassword(password, salt);

        User.findOne.mockResolvedValue({
            email,
            salt,
            passwordHash: hashedPassword
        });

        await authenticateUser(email, password);
        
        expect(consoleLogSpy).toHaveBeenCalledWith(true);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log false for incorrect credentials', async () => {
        const email = 'user@example.com';
        const password = 'wrongPassword';
        const salt = generateSalt();
        const correctHashedPassword = hashPassword('correctPassword', salt);

        User.findOne.mockResolvedValue({
            email,
            salt,
            passwordHash: correctHashedPassword
        });

        await authenticateUser(email, password);
        
        expect(consoleLogSpy).toHaveBeenCalledWith(false);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should log false for a non-existent user', async () => {
        const email = 'nonexistent@example.com';
        const password = 'anyPassword';

        User.findOne.mockResolvedValue(null);

        await authenticateUser(email, password);

        expect(consoleLogSpy).toHaveBeenCalledWith(false);
        expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should handle missing salt and log error', async () => {
        const email = 'user@example.com';
        const password = 'correctPassword';

        User.findOne.mockResolvedValue({
            email,
            passwordHash: 'someHashWithoutSalt' // Salt intentionally missing
        });

        await authenticateUser(email, password);

        expect(consoleErrorSpy).toHaveBeenCalledWith('No salt defined for user:', email);
        expect(consoleLogSpy).toHaveBeenCalledWith(false);
    });
});
