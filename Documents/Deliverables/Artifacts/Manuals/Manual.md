# User Manual: Encryption and Secure Storage for Login Credentials

## Overview
This feature allows you to securely encrypt passwords from a text file and store them along with user emails in a MongoDB database.

## How to Use

### Step 1: Prepare Your Text File
Prepare a plain text file with each user's email and password, separated by a colon. Each user should be on a new line. Example:
```
user1@example.com:password123
user2@example.com:password456
```

### Step 2: Encrypt and Store Passwords
To encrypt and store the passwords:

1. Save your text file in the `password_files` directory of the application.
2. Open your terminal or command prompt.
3. Navigate to the directory where the application is stored.
4. Run the following command:

`node app.js -a yourfilename.txt`
Replace yourfilename.txt with the name of your text file.

The application will encrypt the passwords, generate a unique salt for each, and save the encrypted data along with the emails to the database.

### Step 3: Confirmation
Upon successful encryption and storage, you will see a confirmation message in the terminal for each user added, and a final message saying "All entries added successfully"

#### Notes:
Make sure your text file format is correct to avoid errors.
The passwords are encrypted using a secure hash algorithm, enhancing their security.