const app = require('../app')
const request = require('supertest')
const {
    setUpDatabase
} = require('./fixtures/mongoose')

const mongoose = require('mongoose')
const Product = require('../models/product')


let token;
let userId;

beforeAll(async () => {
    const response = await request(app).post('/login').send({
        "username": "mekrea-admin",
        "password": "12345678mK"
    })

    token = response.body.token
    userId = response.body.user._id
});

beforeEach(setUpDatabase)


afterAll(setUpDatabase)


test('Admin should approve submitted products', async()=>{
    const product = new Product({
        name:"Chama",
        description:"A cool shoe",
        price:"20",
        owner:userId
    })
    await product.save()

    const product2 = new Product({
        name:"Shirt",
        description:"A cool shirt",
        price:"40",
        owner:userId
    })
    await product2.save()

    let response = await request(app)
    .post(`/admin/approve/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        status:"true"
    })

    expect(response.status).toBe(200)

     response = await request(app)
    .post(`/admin/approve/${product2._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        status:"false"
    })

    expect(response.status).toBe(400)


    response = await request(app)
    .post(`/admin/approve/${product2._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        status:"false",
        message:{
            title:"",
            messageBody:""
        }
    })

    expect(response.status).toBe(400)

    response = await request(app)
    .post(`/admin/approve/${product2._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send({
        status:"false",
        message:{
            title:"Inappropriate Product",
            messageBody:"This product can not be updated"
        }
    })

    expect(response.status).toBe(200)
})

test('Admin can delete products', async()=>{
    const product = new Product({
        name:"Chama",
        description:"A cool shoe",
        price:"20",
        owner:userId
    })
    await product.save()

    let response = await request(app)
    .delete(`/admin/product/${product._id}`)
    .send()

    expect(response.status).toBe(400)

     response = await request(app)
     .delete(`/admin/product/${product._id}`)
    .set('Authorization', `Bearer ${token}`)
    .send()

    expect(response.status).toBe(200)
    


})