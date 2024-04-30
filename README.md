# Features
1) Encryption and Secure Storage for Login Credentials

As a student, I want to encrypt passwords from a text file using a secure hash algorithm so that they cannot be easily deciphered by unauthorized individuals.

As a student, I want to store encrypted passwords along with user emails in a MongoDB database using Mongoose so that user credentials are securely managed and easily retrievable.

As a student, I want to generate a unique salt for each password before encryption to enhance security by ensuring that each hash is unique, even for identical passwords.

2) Authentication Validator with Encrypted Data Matching

As a student, I want to develop a functionality that accepts email and password inputs, encrypts the input password, and compares it with the stored hash to authenticate users securely.

As a student, I want the system to return true for a login attempt when the user's email and password match the encrypted credentials in the database, ensuring that the user is authenticated correctly.

As a student, I want the system to return false for login attempts with incorrect passwords, non-existent email addresses, or when no password is provided, to prevent unauthorized access.

As a student, I want to implement a mechanism to handle edge cases in user authentication, such as empty input fields or invalid email formats, to ensure the system's reliability and user-friendliness.

 

Project Test Plan
Unit Tests

File Encryption Test: Verify that plain text passwords are correctly encrypted.
Database Write Test: Ensure that encrypted passwords and user emails are correctly written to the MongoDB database.
Unique Salt Generation Test: Test the salt generation process for each password to confirm that each salt is unique and correctly enhances the encryption.
Authentication Process Test: Validate the login mechanism, ensuring that the system accurately compares encrypted input passwords against stored hashes and returns true or false as appropriate.
Integration Tests

Encryption to Storage Workflow: Test the integrated workflow from password encryption to storage in the database, ensuring seamless data handling and error-free execution.
Authentication Validation: Evaluate the integration between the input authentication process and the database retrieval of encrypted credentials, confirming the system's ability to correctly authenticate or reject user logins based on stored data.
Regression Tests

Feature Update Stability Test: After any updates or changes to the encryption algorithm or database schema, verify that existing functionalities, such as password storage and user authentication, remain unaffected and operate as expected.
Error Handling Enhancements Test: Ensure that improvements in error handling for edge cases (e.g., empty fields, invalid formats) do not adversely affect the system's performance or existing user experience.
Acceptance Tests

User Login Scenario Test: Simulate various user login scenarios, including correct credentials, incorrect passwords, non-existent emails, and edge cases, to assess whether the system's responses align with the requirements.
Correct Login Test: Ensure the system returns true for correct email/password combinations and false for incorrect ones.
