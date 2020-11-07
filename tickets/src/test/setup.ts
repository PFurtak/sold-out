import request from 'supertest';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import { app } from '../app';

declare global {
  namespace NodeJS {
    interface Global {
      signin(): string[];
    }
  }
}

let mongo: any;

beforeAll(async () => {
  process.env.JWT_KEY = 'testkey';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = () => {
  // Build JWT payload. { id, email }
  const payload = {
    id: 'dskjhfsa',
    email: 'test@test.com'
  }
  // Create JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!)

  // Build session object. { jwt: MY_JWT }
  const session = { jwt: token }

  // Turn session into JSON
  const sessionJSON = JSON.stringify(session)

  // Take JSON and base64 encode
  const base64 = Buffer.from(sessionJSON).toString('base64')

  // Return string thats the cookie with encoded data
  return [`express:sess=${base64}`]
};