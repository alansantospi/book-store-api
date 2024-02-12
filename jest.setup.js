import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

beforeAll(async () => {
  const mongoServer = await MongoMemoryServer.create();  
  const mongoUri = mongoServer.getUri();

  process.env.MONGO_URI = mongoUri;
});

afterAll(async () => {
  await mongoServer.stop();
});

