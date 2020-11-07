import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app).post('/api/tickets').send({});

    expect(response.status).not.toEqual(404);

})

it('can only be accessed if the user is signed in', async () => {
    await request(app).post('/api/tickets').send({}).expect(401)
})

it('returns a status code other than 401 if user is authenticated', async () => {
    const response = await request(app).post('/api/tickets').set('Cookie', global.signin()).send({});

    expect(response.status).not.toEqual(401);
})

it('returns an error if an invalid title is provided', async () => {
    // Empty string as title
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: "",
        price: 10
    }).expect(400)

    // Title field is not present in object
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        price: 10,
    }).expect(400)
})

it('returns an error if an invalid price is provided', async () => {
    // Negative price value
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: "Yanni",
        price: -10
    }).expect(400)

    // Price field is not present in object
    await request(app).post('/api/tickets').set('Cookie', global.signin()).send({
        title: "Yanni",
    }).expect(400)
})

it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: "test",
        price: 25
    }).expect(201)

    tickets = await Ticket.find({});
    expect(tickets.length).toEqual(1);
    expect(tickets[0].price).toEqual(25);
    expect(tickets[0].title).toEqual("test");
})
