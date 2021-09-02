/**
 * @swagger
 * /admin/signup:
 *      post:
 *          summary: Signs up an admin for the service
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
 * /admin/aprrove{id}:
 *      post:
 *          summary: Approve the submitted products
 *          tags: [Products] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          requestBody:
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/AdminApprove'
 *                      examples:
 *                           First:
 *                                value:
 *                                   status: false
 *                                   message:
 *                                       title: Bad Product
 *                                       messageBody: This product is inappropriate and it won't be uploaded
 *                           Second:
 *                                value:
 *                                   status: true
 *          responses:
 *              200:
 *                  description: Product has been approved or disapproved, If the item has been disapproved, the admin is required to leave a message for the seller explaining why the item was not allowed
 *              400:
 *                  description: Bad request
 */

/**
 * @swagger
 * /admin/product/{id}:
 *      delete:
 *          summary: Deleting a product by admin
 *          tags: [Products] 
 *          parameters:
 *             - name: id
 *               in: path
 *               required: true
 *               schema:
 *                      type: string
 *          responses:
 *              200:
 *                  description: Product has been deleted by admin
 *                  content:
 *                      application/json:
 *                          schema:                         
 *                              $ref: '#/components/schemas/Product'
 *              400:
 *                  description: Bad request
 */