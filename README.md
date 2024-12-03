# NodeJS e-shop API

## API for NodeJS e-shop Project

### Description

##### This project is a RESTful API built with Node.js and Express.js for managing user data and working with products. It includes authentication and authorization features and provides access to user information. Implemented adding, updating, and deleting product features

### Features
* User authentication and authorization
* Retrieve user information
* Product CRUD logic

### Technologies
* Node.js
* Express.js
* TypeScript
* Prisma
* MongoDB
* Mongoose
* JSON Web Tokens (JWT)

### Installation

#### Clone the repository
`git clone https://github.com/antonlazurko/nodejs-dashboard-api.git`


#### Install dependencies
`npm install`


#### Generate prisma
`npm run generate`

#### Build app
`npm run build`

#### Start the server
`npm start`

### Endpoints
* [get] /users/info: Retrieve user information
* [post] /users/login: Login user with credentials *( email, password )*
* [post] /users/register: Register user with credentials *( name, email, password )*
* [post] /products/ Add new product
* [patch] /products/:id Update existed product
* [delete] /products/:id Delete existed product


### Development
#### Recommended IDE
##### Visual Studio Code with TypeScript support

#### Add the `.env` file to the root directory and add the necessary values

```env
SALT=10
SECRET=MY_SECRET_KEY
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/<database-name>"
```

#### Create DB and add migration
`npm run generate`

`npx prisma migrate dev`

#### Run server in development mode
`npm run dev`
