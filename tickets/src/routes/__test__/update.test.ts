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
  const response = await request(app)
   .post('/api/tickets')
   .set('Cookie', global.signin())
   .send({
       title: 'Beastie Boys',
       price: 38
   });

   await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', global.signin())
   .send({
       title: 'Orchestra',
       price: 65
   })
   .expect(401);
})

it('returns 400 if provided title or price is invalid', async () => {
    const cookie = global.signin();

    const response = await request(app)
     .post('/api/tickets')
     .set('Cookie', cookie)
     .send({
       title: 'Beastie Boys',
       price: 38
   });

   await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', cookie)
   .send({
       title: 'Beastie Boys',
       price: -30
   })
   .expect(400);

   await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', cookie)
   .send({
       title: '',
       price: 30
   })
   .expect(400);

})

it('updates the ticket if user is authenticated and valid inputs are provided', async () => {
    const cookie = global.signin();

    const response = await request(app)
     .post('/api/tickets')
     .set('Cookie', cookie)
     .send({
       title: 'Beastie Boys',
       price: 38
   });

   await request(app)
   .put(`/api/tickets/${response.body.id}`)
   .set('Cookie', cookie)
   .send({
       title: 'Weird Al',
       price: 12
   })
   .expect(200);

   const ticketResponse = await request(app)
   .get(`/api/tickets/${response.body.id}`)
   .send();

   expect(ticketResponse.body.title).toEqual('Weird Al');
   expect(ticketResponse.body.price).toEqual(12);
});
