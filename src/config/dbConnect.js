import mongoose, { mongo } from 'mongoose';

async function connectDB() {
  mongoose.connect('mongodb+srv://admin:admin123@cluster0.yodb1sa.mongodb.net/book-store?retryWrites=true&w=majority');

  return mongoose.connection;
}

export default connectDB;
