/**
 * @swagger
 *  components:
 *      schemas:
 *          User:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *                  - email
 *              example:
 *                  username: mekre.abate-swagger
 *                  password: mekreAbate12
 *                  email: mekre.abate.swagger@gmail.com
 * 
 *          UserLogin:
 *              type: object
 *              required:
 *                  - username
 *                  - password
 *              
 *              example:
 *                  username: mekre.abate-swagger
 *                  password: mekreAbate12
 *                  
 * 
 *          UserAndToken:
 *              type: object
 *              required:
 *                  - user:
 *                    - username
 *                    - password
 *                    - email
 *                  - token
 *              example:
 *                  user:
 *                   username: mekre.abate-swagger
 *                   password: mekreAbate12
 *                   email: mekre.abate.swagger@gmail.com
 *                  token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJlMTY5MjBkYzU5ODAwYzc1NWI2MzgiLCJpYXQiOjE2MzA0MTAzODYsImV4cCI6MTYzMDQxMTU4Nn0.OsevGOH-iwaZdKsSy_eM3uR5NxPIc9-WUE5csJQgXZU
 * 
 *          Product:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - price
 *                  - purchase
 *                  - owner
 *              example:
 *                  name: Shoes
 *                  description: A very good product
 *                  price: 20
 *                  purchase: 12
 *                  owner: 612e160e0dc59800c755b62c
 * 
 *          Wishlist:
 *              type: object
 *              required:
 *                  - owner
 *                  - items
 *              example:
 *                  owner: 612e160e0dc59800c755b62c
 *                  items : [612e160e0dc59800c755b62c, 612e160e0dc59800c755b62c, 612e160e0dc59800c755b62c ]
 * 
 *          AdminApprove:
 *              type: object
 *              required:
 *                  - status
 *                  - message
 *                      - title
 *                      - messageBody
 * 
 * 
 *          NewProduct:
 *              type: object
 *              required:
 *                  - name
 *                  - description
 *                  - price
 *                   
 * 
 *          Message:
 *              type: object
 *              required:
 *                  - sender
 *                  - receiver
 *                  - productId
 *                  - title
 *                  - messageBody
 *                  - seen
 *              example:
 *                  sender: 612e160e0dc59800c755b62c
 *                  receiver: 612e160e0dc59800c755b62c
 *                  productId: 612e160e0dc59800c755b62c
 *                  title: This product
 *                  messageBody: It can't be approved because its inappropriate
 *                  seen: false
 */