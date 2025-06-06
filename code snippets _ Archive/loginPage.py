#Author: Nathaniel C. Tillery
#Date: 27, May 2025
#Purpose: Login Page Revision 1

import csv
import os

def check_credentials_txt(filename, username, password):
    try:
        with open(filename, 'r') as file:
            for line in file:
                creds = line.strip().split(',')
                if len(creds) == 2 and creds[0] == username and creds[1] == password:
                    return True
    except FileNotFoundError:
        print(f"File {filename} not found.")
    return False

def check_credentials_csv(filename, username, password):
    try:
        with open(filename, newline='') as csvfile:
            reader = csv.reader(csvfile)
            for row in reader:
                if len(row) == 2 and row[0] == username and row[1] == password:
                    return True
    except FileNotFoundError:
        print(f"File {filename} not found.")
    return False

def write_credentials(filename, username, password):
    with open(filename, 'a') as file:
        file.write(f"{username},{password}\n")

def main():
    placeholder_file = input("Enter the placeholder file name (with .txt or .csv): ").strip()
    output_file = input("Enter the output file name: ").strip()
    username = input("Username: ").strip()
    password = input("Password: ").strip()

    # Check file extension and validate credentials
    if placeholder_file.endswith('.csv'):
        valid = check_credentials_csv(placeholder_file, username, password)
    else:
        valid = check_credentials_txt(placeholder_file, username, password)

    if valid:
        print("Login successful. Writing credentials to output file.")
        write_credentials(output_file, username, password)
    else:
        print("Invalid username or password. Credentials not written.")

if __name__ == "__main__":
    main()
