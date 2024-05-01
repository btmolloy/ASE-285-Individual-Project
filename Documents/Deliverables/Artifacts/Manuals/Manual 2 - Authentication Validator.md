# User Manual: Authentication Validator with Encrypted Data Matching

## Overview
This feature is designed to securely authenticate users by comparing the encrypted input password against the stored password hashes in the database.

## How to Use

### Step 1: Prepare Your Input
Before you start, ensure you know the user's email and password you want to authenticate. Remember, the password should be the plaintext password that the user would typically enter during a login process.

### Step 2: Run the Authentication Command
To authenticate a user, you need to run a command in your terminal. Here's how:

1. Open your terminal or command line interface.
2. Navigate to the directory where the application is installed.
3. Execute the following command:

`node app.js -t "user@example.com myPassword"`

Replace user@example.com with the user's email and myPassword with the user's password.

### Step 3: Understand the Output
After running the command, the application will process the authentication by:

- Encrypting the input password.
- Comparing it with the encrypted password stored in the database.

The terminal will then display the result:
- `true` if the email and password match the encrypted credentials in the database, indicating that the authentication was successful.
- `false` if there is no match, the email does not exist, the password is incorrect, or if the password field was left blank. This ensures that unauthorized access is prevented.