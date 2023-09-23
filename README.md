# triveous-Ecommerce-API-with-Node-js

Welcome to our E-Commerce project! This project is built using Node.js and Express and serves as an e-commerce platform. This README provides an overview of the API routes available in the application.

To start the project locally 

1> *Clone this repo* 
            `git clone <repo-url>`
2> *Add .env file and add the following fields,*
    Sample:
    
            mongoURL=mongodb+srv://<username>:<password>@cluster0.nobqy8a.mongodb.net/<database-name>?retryWrites=true&w=majority
            port=8080

            JWT_SECRET=triveous_JWT_Secret
            REFRESH_SECRET=triveous_JWT_Refresh_Secret
            SaltRounds=3`

**Base URL:** `http://localhost:8080`

**Deploy URL:** `https://successful-worm-glasses.cyclic.cloud/`

**Demo video link** `https://drive.google.com/file/d/1FpSiPc1rPj0UWFIJqOpRbrFS37Uhj8W2/view?usp=sharing`

## Table of Contents

1. [User Routes]()  /user
2. [Category Routes]()  /category
3. [Product Routes]()  /product
4. [Cart Routes]()   /cart
5. [Orders Routes]()  /orders

## User Routes

| Route                 | Method | Description              | Request Body                               | Authentication Header       |
|-----------------------|--------|--------------------------|--------------------------------------------|-----------------------------|
| `/user/signup`        | POST   | User registration        | `{ name, email, password,role }`           |                             |
| `/user/adminsignup`   | POST   | Admin registration       | `{ name, email, password,role="Admin" }`,` | `Bearer <Admin JWT token>`  |
| `/user/login`         | POST   | User or Admin login      | `{ email, password }`                      |                             |
| `/user/addresses`     | POST   | Add Address              | `{ address }`                              | `Bearer <JWT token>`        |
| `/user/logout`        | GET    | Logout                   | `{  }`                                     | `Bearer <JWT token>`        |
| `/user/getnewtoken`   | GET    | Get new JWT token        | `{  }`                                     | `Bearer <JWT refreshToken>` |
| `/user/profile`       | GET    | User or Admin profile    | `{  }`                                     | `Bearer <JWT token>`        |
| `/user/deleteuser`    | DELETE | Delete User              | `{ email }`                                | `Bearer <Admin JWT token>`  |

## Category Routes 


## Product Routes 


## Cart Routes 


## Order Routes 

