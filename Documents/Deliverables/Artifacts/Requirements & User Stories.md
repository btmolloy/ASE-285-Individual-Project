# REQUIREMENTS CREATED USING USER STORIES 

1) Encryption and Secure Storage for Login Credentials

 - As a student, I want to encrypt passwords from a text file using a secure hash algorithm so that they cannot be easily deciphered by unauthorized individuals.

 - As a student, I want to store encrypted passwords along with user emails in a MongoDB database using Mongoose so that user credentials are securely managed and easily retrievable.

 - As a student, I want to generate a unique salt for each password before encryption to enhance security by ensuring that each hash is unique, even for identical passwords.


2) Authentication Validator with Encrypted Data Matching

 - As a student, I want to develop a functionality that accepts email and password inputs, encrypts the input password, and compares it with the stored hash to authenticate users securely.

 - As a student, I want the system to return true for a login attempt when the user's email and password match the encrypted credentials in the database, ensuring that the user is authenticated correctly.

 - As a student, I want the system to return false for login attempts with incorrect passwords, non-existent email addresses, or when no password is provided, to prevent unauthorized access.

 - As a student, I want to implement a mechanism to handle edge cases in user authentication, such as empty input fields or invalid email formats, to ensure the system's reliability and user-friendliness.