const app = require('../app')
const request = require('supertest')
const {
    setUpDatabase
} = require('./fixtures/mongoose')

const Message = require('../models/message')
const mongoose = require('mongoose')


beforeEach(setUpDatabase)


let token;
let userId;

beforeAll(async () => {
    const response = await request(app).post('/login').send({
        "username": "mekrea-seller",
        "password": "12345678mK"
    })

    token = response.body.token
    userId = response.body.user._id
});

afterAll(setUpDatabase)

test('Seller Add Product', async () => {
    await request(app)
        .post('/seller/product')
        .send({
            name: "Gelawun",
            price: "20"
        }).expect(400)


    await request(app)
        .post('/seller/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Gelawun",
            price: "10"
        }).expect(201)
})

test('Delete Added Product', async () => {

    const response = await request(app)
        .post('/seller/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Gelawun",
            price: "10"
        }).expect(201)

    await request(app)
        .delete(`/seller/product/${response.body._id}`)
        .send().expect(400)


    await request(app)
        .delete(`/seller/product/${response.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send().expect(200)
})


test('Update Existing Product', async () => {

    const response = await request(app)
        .post('/seller/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Gelawun",
            price: "10"
        }).expect(201)

    await request(app)
        .patch(`/seller/product/${response.body._id}`)
        .send({
            price: "15"
        }).expect(400)


    await request(app)
        .patch(`/seller/product/${response.body._id}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
            price: "15"
        }).expect(200)
})


test('Retreive all added Products', async () => {

    await request(app)
        .post('/seller/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Gelawun",
            price: "10"
        }).expect(201)

    await request(app)
        .post('/seller/product')
        .set('Authorization', `Bearer ${token}`)
        .send({
            name: "Gelawun",
            price: "10"
        }).expect(201)

    await request(app)
        .get(`/seller/products`)
        .send().expect(400)


    const response = await request(app)
        .get(`/seller/products`)
        .set('Authorization', `Bearer ${token}`)
        .send().expect(200)

    expect(response.body.length).toBe(2)
})

test('Retreive all messages for sellers', async () => {


    const message = new Message({
        sender: mongoose.Types.ObjectId(),
        receiver: mongoose.Types.ObjectId(userId),
        productId: mongoose.Types.ObjectId(),
        title: 'Title',
        messageBody: 'Testing Body',
    })
    await message.save()

    const message2 = new Message({
        sender: mongoose.Types.ObjectId(),
        receiver: mongoose.Types.ObjectId(userId),
        productId: mongoose.Types.ObjectId(),
        title: 'Title',
        messageBody: 'Testing Body',
    })
    await message2.save()

    await request(app)
        .get(`/seller/messages`)
        .send().expect(400)


    const response = await request(app)
        .get(`/seller/messages`)
        .set('Authorization', `Bearer ${token}`)
        .send().expect(200)


    expect(response.body.length).toBe(2)
})