/**
 * @swagger
 * /seller/signup:
 *      post:
 *          summary: Signs up a Seller for the service
 *          tags: [Auth] 
 *          requestBody:
 *              required: true
 *              content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/User'
 *          responses:
 *              201:
 *                  description: User created and verification email has been sent
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/User'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /seller/product:
 *      post:
 *          summary: Seller uploads an item
 *          tags: [Products] 
 *          requestBody:
 *              required: true
 *              content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewProduct'
 *                  examples:
 *                      First: 
 *                          value: 
 *                              name: Shoes
 *                              description: A very good product
 *                              price: 20
 *                      Second: 
 *                          value: 
 *                              name: Shoes
 *                              price: 20
 *          responses:
 *              201:
 *                  description: A new product has been created and is waiting approval by admin
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /seller/product/{id}:
 *      delete:
 *          summary: Deleting a product the seller has uploaded
 *          tags: [Products] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Product has been deleted
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /seller/product/{id}:
 *      patch:
 *          summary: Updating a product the seller has uploaded
 *          tags: [Products] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          requestBody:
 *              required: true
 *              content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/NewProduct'
 *                  examples:
 *                      First: 
 *                          value: 
 *                              name: Shoes
 *                              description: A very good product
 *                              price: 20
 *                      Second: 
 *                          value: 
 *                              name: Shoes
 *                              price: 20
 *                      Third: 
 *                          value: 
 *                              name: Shoes
 *          responses:
 *              200:
 *                  description: Product has been updated
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */


/**
 * @swagger
 * /seller/messages:
 *      get:
 *          summary: Returns a list of products uploaded by the seller
 *          tags: [Messages] 
 *          responses:
 *              200:
 *                  description: Returns a list of products uploaded by the seller
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                 $ref: '#/components/schemas/Message'
 *              400:
 *                  description: Bad request
 */


/**
 * @swagger
 * /seller/products:
 *      get:
 *          summary: Returns a list of products uploaded by the seller
 *          tags: [Products] 
 *          responses:
 *              200:
 *                  description: Returns a list of products uploaded by the seller
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                 $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */