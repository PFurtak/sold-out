import request from 'supertest';
import { app } from '../../app';
import mongoose from 'mongoose'

it('returns 404 if provided id is invalid', async () => {
   const id = new mongoose.Types.ObjectId().toHexString();
   
   await request(app)
     .put(`/api/tickets/${id}`)
     .set('Cookie', global.signin())
     .send({
         title: 'Wu Tang',
         price: 42
     })
     .expect(404)
})

it('returns 401 if user is not authenticated', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();
   
    await request(app)
      .put(`/api/tickets/${id}`)
      .send({
          title: 'Wu Tang',
          price: 42
      })
      .expect(401)
})

it('returns 401 if user does not own the ticket', async () => {

})

it('returns 400 if provided title or price is invalid', async () => {

})

it('updates the ticket if user is authenticated and valid inputs are provided', async () => {

});
