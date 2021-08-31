const app = require('../app')
const request = require('supertest')
const {
    setUpDatabase
} = require('./fixtures/mongoose')

const Product = require('../models/product')

beforeEach(setUpDatabase)


let token;
let userId;

beforeAll(async () => {
    const response = await request(app).post('/login').send({
        "username": "mekrea-customer",
        "password": "12345678mK"
    })

    token = response.body.token
    userId = response.body.user._id
});

afterAll(setUpDatabase)



test('Get approved products', async()=>{

    const product = new Product({
        name:"Chama",
        description:"A cool shoe",
        price:"20",
        owner:userId,
        approvedByAdmin:true
    })
    await product.save()
    

    await request(app)
    .get('/products')
    .send().expect(400)

  const response = await request(app)
    .get('/products')
    .set('Authorization', `Bearer ${token}`)
    .send().expect(200)

    expect(response.body.length).toBe(1)
})

test('Buy products', async()=>{

    const product = new Product({
        name:"Chama",
        description:"A cool shoe",
        price:"20",
        owner:userId,
        approvedByAdmin:true
    })
    await product.save()
    

    await request(app)
    .post(`/buy/${product._id}`)
    .send().expect(400)

  const response = await request(app)
    .post(`/buy/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send().expect(200)

    expect(response.body.purchase).toBe(1)
})

test('Add to and remove from wishlist', async()=>{

    const product = new Product({
        name:"Chama",
        description:"A cool shoe",
        price:"20",
        owner:userId,
        approvedByAdmin:true
    })
    await product.save()
    

    await request(app)
    .post(`/wishlist/${product._id}`)
    .send().expect(400)

   await request(app)
    .post(`/wishlist/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send().expect(200)

    // Deleting the products 

    await request(app)
    .delete(`/wishlist/${product._id}`)
    .send().expect(400)

   const response = await request(app)
    .delete(`/wishlist/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send().expect(200)

    expect(response.body.items.length).toBe(0)

})