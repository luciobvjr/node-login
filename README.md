# Node Login

## Description
This project is an API for managing user authentication, implemented with the following technologies:

- Node.js: A runtime environment for executing JavaScript code on the server.
- Express.js: A framework for quickly and efficiently building the API.
- TypeScript: A language that adds static typing to JavaScript, improving code maintenance and quality.
- JWT (JSON Web Tokens): Used for secure user authentication and authorization.
- BCrypt: A library for password hashing and data security.
- Dotenv: Manages environment variables for configuring the application.
- MongoDB: A NoSQL database for storing user information and other entities.
  
The API provides features such as user registration, JWT authentication, and a test route for authenticated users.

## Install
``` bash
git clone https://github.com/luciobvjr/node-login.git
npm install
cp .env.example .env
```

- Create an API secret and add to `.env` file. I've used this generator: [CodePen API Key Generator](https://codepen.io/corenominal/pen/rxOmMJ)
- Login to you account and create a cluster at [MongoDB](https://cloud.mongodb.com), add database `user` and `password` to `.env` file


## Use
Start the server with `npm run start`

- ### Signup:
url: `http://localhost:4200/auth/signup`

body:
```
{
    "name": "user test",
    "email": "user@mail.com",
    "password": "password",
    "confirmPassword": "password"
}
```

- ### Login:
url: `http://localhost:4200/auth/login`

body:
```
{
    "email": "user@mail.com",
    "password": "password",
}
```

- ### Private route
url: `http://localhost:4200/auth/login`

authorization: Bearer Token
