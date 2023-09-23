# triveous-Ecommerce-API-with-Node-js

Welcome to our E-Commerce project! This project is built using Node.js and Express and serves as an e-commerce platform. This README provides an overview of the API routes available in the application.

To start the project locally 

1> *Clone this repo* 

            git clone <repo-url>
            
2> *Add .env file and add the following fields,*
    Sample:

            mongoURL=mongodb+srv://<username>:<password>@cluster0.nobqy8a.mongodb.net/<database-name>?retryWrites=true&w=majority
            port=8080

            JWT_SECRET=triveous_JWT_Secret
            REFRESH_SECRET=triveous_JWT_Refresh_Secret
            SaltRounds=3`
3> Run command

            npm i
            
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

| Route                 | Method | Description              | Request Body                                     | Authentication Header       |
|-----------------------|--------|--------------------------|--------------------------------------------------|-----------------------------|
| `/user/signup`        | POST   | User registration        | `{ name, email, password,role }`                 |                             |
| `/user/adminsignup`   | POST   | Admin registration       | `{ name, email, password,role="Admin" }`         | `Bearer <Admin JWT token>`  |
| `/user/login`         | POST   | User or Admin login      | `{ email, password }`                            |                             |
| `/user/addresses`     | POST   | Add Address              | `{ address }`                                    | `Bearer <JWT token>`        |
| `/user/logout`        | GET    | Logout                   | `{  }`                                           | `Bearer <JWT token>`        |
| `/user/getnewtoken`   | GET    | Get new JWT token        | `{  }`                                           | `Bearer <JWT refreshToken>` |
| `/user/profile`       | GET    | User or Admin profile    | `{  }`                                           | `Bearer <JWT token>`        |
| `/user/deleteuser`    | DELETE | Delete User              | `{ email }`                                      | `Bearer <Admin JWT token>`  |

## Category Routes 
| Route                 | Method | Description              | Request Body                                     | Authentication Header       |
|-----------------------|--------|--------------------------|--------------------------------------------------|-----------------------------|
| `/categories`         | GET    | Get All Categories       | `{  }`                                           |                             |
| `/categories`         | POST   | Create new Category      | `{ label, description }`                         | `Bearer <Admin JWT token>`  |

## Product Routes 
| Route                 | Method | Description              | Request Body                                     | Authentication Header       |
|-----------------------|--------|--------------------------|--------------------------------------------------|-----------------------------|
| `/products`           | POST   | Create new Product       | `{ title, price, description, brand, category }` | `Bearer <Admin JWT token>`  |
| `/products/:id`       | GET    | Get Product by id        | `{  }`                                           |                             |
| `/products/:id`       | PATCH  | Create new Category      | `{ title, price, description, brand, category }` | `Bearer <Admin JWT token>`  |
| `/products`           | GET    | Get Products (Filter, sort, pagination) |                                   |                             |

            // filter = {
            //     "category":["Mobiles","laptops","Tablets","Accessories"],
            //     "brand": ["Apple", "Google", "Huawei", "Samsung","Xiaomi"]
            // }
            // sort = {_sort:"price",_order="desc"}
            // pagination = {_page:1,_limit=10}
Example:

            http://localhost:8080/products?category=Accessories,Tablets&brand=Huawei&_sort=price&_order=desc&_page=7&_limit=2&admin=true
            
`admin=true` retrievs all products included which are deeleted

## Cart Routes 
| Route                 | Method | Description              | Request Body                                     | Authentication Header       |
|-----------------------|--------|--------------------------|--------------------------------------------------|-----------------------------|
| `/cart`               | POST   | Add Product to Cart      | `{ quantity,product }`                           | `Bearer <JWT token>`        |
| `/cart`               | GET    | Get cart User            | `{  }`                                           | `Bearer <JWT token>`        |
| `/cart/:userId`       | GET    | Get cart Admin           | `{  }`                                           | `Bearer <Admin JWT token>`  |
| `/cart/:id`           | PATCH  | Update cart              | `{ quantity,product }`                           | `Bearer <JWT token>`        |
| `/cart/:id`           | DELETE | Delete cart              |                                                  | `Bearer <JWT token>`        |

## Order Routes 
| Route                 | Method | Description              | Request Body                                                          | Authentication Header       |
|-----------------------|--------|--------------------------|-----------------------------------------------------------------------|-----------------------------|
| `/orders`             | POST   | Create new order         | `{ items,totalAmount,totalItems,user,paymentMethod,selectedAddress }` | `Bearer <JWT token>`        |
| `/orders/own/:useID`  | GET    | Get orders by Id Admin   | `{  }`                                                                | `Bearer <JWT token>`        |
| `/orders/own`         | GET    | Get orders from id User  | `{  }`                                                                | `Bearer <Admin JWT token>`  |
| `/orders/:id`         | PATCH  | Patch by admin           | `{ items,totalAmount,totalItems,user,paymentMethod,selectedAddress }` | `Bearer <JWT token>`        |
| `/orders/:id`         | PATCH  | Patch by user            | `{ items,totalAmount,totalItems,user,paymentMethod,selectedAddress }` | `Bearer <JWT token>`        |
| `/orders/:id`         | DELETE | Delete by user           | `{  }`                                                                | `Bearer <JWT token>`        |
| `/orders/:id`         | DELETE | Delete by Admin          | `{  }`                                                                | `Bearer <JWT token>`        |
| `/orders`             | GET    | Get all orders by Admin  | `{  }`                                                                | `Bearer <JWT token>`        |

            // sort = {_sort:"price",_order="desc"}
            // pagination = {_page:1,_limit=10}
Example:

            http://localhost:8080/orders?_sort=price&_order=asc&_page=1&_limit=5
