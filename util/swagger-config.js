const swaggerJSdoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const apiJson=require("../api.json")
// const options = {
//     title: "triveous-Ecommerce-API",
//     definition: {
//         openapi: "3.0.0",
//         info: {
//             title: "triveous-Ecommerce-API",
//             description: "Welcome to our E-Commerce project! This project is built using Node.js and Express and serves as an e-commerce platform. This Documentation provides an overview of the API routes available in the application.",
//             version: "1.0.0"
//         },
//         servers: [
//             {
//                 url: "https://successful-worm-glasses.cyclic.cloud",
//                 description: "cyclic deployed url"
//             },
//             {
//                 url: "http://localhost:8080",
//                 description: "Development server"
//             }
//         ]
//     },
//     apis: ["./routes/*.js"]
// }
const options = {
    customSiteTitle: "triveous-Ecommerce-API",
    title: "triveous - Ecommerce - API",
    description: "Welcome to our E- Commerce project! This project is built using Node.js and Express and serves as an e-commerce platform.This Documentation provides an overview of the API routes available in the application"
};

const swaggerUI = swaggerUi.setup(apiJson,options)
const swaggerServe = swaggerUi.serve

module.exports = { swaggerUI,swaggerServe}