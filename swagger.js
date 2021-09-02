const swaggerJSDoc = require('swagger-jsdoc')
const swaggerDefinition = {
     openapi: "3.0.0",
     info : {
       version : "1.0.0",
       title : "Documentation for Suqachin",
       description : "Suqachin API"
    },
    host: "localhost:3333",
    basePath: "/",
    tags: [
      {
        name: "Auth",
        description: "API for authentication"
      },
      {
        name: "Products",
        description: "APIs for interfacing with the uploaded products"
      },
      {
        name: "Wishlist",
        description: "APIs for interfacing with the products that have been wishlisted"
      },
      {
        name: "Messages",
        description: "APIs for interfacing with the messages left for a seller"
      }
    ],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
  };
  
  // options for the swagger docs
  const options = {
    // import swaggerDefinitions
    swaggerDefinition,
    // path to the API docs
    apis: ['./docs/*.js'],
  };
  // initialize swagger-jsdoc
  const swaggerSpec = swaggerJSDoc(options);

  module.exports = swaggerSpec