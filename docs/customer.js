

/**
 * @swagger
 * /signup:
 *      post:
 *          summary: Signs up a user for the service
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
 * /verifyAccount/{token}:
 *      post:
 *          summary: Verifies the user's email address
 *          tags: [Auth] 
 *          parameters:
 *             - name: token
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: User's email has been verified
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/UserAndToken'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /login:
 *      post:
 *          summary: Login into account
 *          tags: [Auth] 
 *          requestBody:
 *              required: true
 *              content:
 *               application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/UserLogin'
 *          responses:
 *              200:
 *                  description: Login Successful
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/UserAndToken'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /products:
 *      get:
 *          summary: Returns a list of products
 *          tags: [Products] 
 *          responses:
 *              200:
 *                  description: Returns a list of products
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                 $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /buy/{id}:
 *      post:
 *          summary: Buy a product
 *          tags: [Products] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Product has been bought
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /wishlist/{id}:
 *      post:
 *          summary: Add product to wishlist
 *          tags: [Wishlist] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Product has been added to wishlist
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Wishlist'
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /wishlist/{id}:
 *      delete:
 *          summary: Buy a product
 *          tags: [Wishlist] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Product has been deleted from wishlist
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Wishlist'
 *              400:
 *                  description: Bad request
 */