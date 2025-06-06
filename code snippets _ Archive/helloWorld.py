'''
File:: helloWorld.py
Purpose:This is a document created to refresh Python skills.
Author: Nathaniel C. Tillery
Date: 23, May 2025
'''

#First, running a hello world message
print("Hello world!\n")


#Next, try taking some input and doing something with it. I'll make a function and use it.
def double(int):
    newNum = userIn * 2
    return newNum

userIn = input("Give me a number, and I'll double it!\n")
userIn = int(userIn)
print(double(userIn))

