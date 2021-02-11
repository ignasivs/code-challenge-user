<h1  align="center">

<br>

<a target="_blank" href="http://ivicents.es/"><img  src="https://i.ibb.co/zh1W2wn/d6809f64-3901-4d6f-9b2f-867d86538737.png"  alt="CodeChallenge"  width="200"></a>

<br>

</h1>

  

# Code Challenge

  

These are the requirements for the code challenge: 
- Develop a backend (RESTful) in javascript of users using the swagger available in the following urlhttps://s3-eu-west-1.amazonaws.com/mmi-codechallenge/swagger-users-v1.json 
- Use node.js 
- The API will allow you to register, modify, delete and query users. 
- The API has to fulfill the resources defined in the Swagger url. 

On the other hand, the realization of tests will be valued.

  

## Modes to start application

  

The application can be started in the different modes:

  

-  **npm start** -> It does not support arguments in the call but it does support environment variables.

-  **npm run production** -> Supports arguments in the call and supports environment variables. To pass arguments in the call, use "-- -arg1 = value1 -arg2 = value2" (without quotes).

  

The application will **first consider the arguments** that are passed in the call and **then the environment variables**.

  

## Valid Arguments

  

These arguments are found in the files "config.js" and "statics.js"

  

-  **-portServer** -> The port where the application will be listening.

-  **-namesqlite** -> The name that the database will have.

  

## Valid Environment variables

  

These variables are found in the files "config.js" and "statics.js"

  

-  **portServer** -> The port where the application will be listening.

-  **namesqlite** -> The name that the database will have.

  

## Codes HTTP

  

- 200 -> All is correct

  

- 201 -> User created

  

- 400 -> Invalid user id

  

- 404 -> User not found

  

- 405 -> Invalid input

  

- 500 -> Internal server error

  

## enable debug mode

  

```js

{

"version": "0.2.0",

"configurations": [

{

"type":  "node",

"request":  "launch",

"name":  "Babel-Nodejs",

"program":  "${workspaceFolder}/src/bin/www.js",

"args": [],

"preLaunchTask":  null,

"runtimeExecutable":  null,

"envFile":  "${workspaceFolder}/.env",

"sourceMaps":  true,

"outDir":  "${workspaceFolder}/dist"

}

]

}

```