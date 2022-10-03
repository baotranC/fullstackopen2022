# Part 3: Programming a server with NodeJS and Express

## phonebook

This frontend application communicates with the backend server (Heroku server) to manage a phonebook: addition, modification, deletion and filter of a contact. Field validation is also done.

This section teaches how to do a production build of an application created with create-react-app.
This section also teaches how to add a proxy so that the frontend application works in development and production mode.

![](phonebook1.JPG)

## Run 
- `npm start`
Runs the app in the development mode.<br />
Open [http://localhost:3002](http://localhost:3002) after running the backend server to view the app in the browser.

## This project contains two sections:
### BE
https://github.com/baotranC/fullstackopen2022_part3_BE
### FE
https://github.com/baotranC/fullstackopen2022/tree/main/part3/phonebook_part2_Frontend

## Application: phonebook

### Add a person

![](phonebook_d0.JPG) ![](phonebook_d1.JPG)

### Modify a person

![](phonebook_d2.JPG) 

![](phonebook_d3.JPG)

### Delete a person

![](phonebook_d4.JPG) 

![](phonebook_d5.JPG)

### Applly filter

![](phonebook_d6.JPG)

## Validations: phonebook

### Field missing

![](phonebook_v1.JPG) ![](phonebook_v2.JPG)

### Not a valid phone number

![](phonebook_v3.JPG) ![](phonebook_v4.JPG)

![](phonebook_v5.JPG) ![](phonebook_v6.JPG)

![](phonebook_v7.JPG)

### Update a person who was just deleted

![](phonebook_v8.JPG)

![](phonebook_v9.JPG)

## Others
### Debugging
Different ways to debug: 
1) Console log
2) Visual Studio Code debugger: See Debugging in VS Code: https://code.visualstudio.com/docs/editor/debugging
  ![](../Debugging1_VSCodeDebugger.JPG)
4) Chrome dev tools: by starting your application with the command: node --inspect index.js 
  ![](../Debugging2_ChromeDevTool.JPG)
