import app from "./src/app.js";
import connectDB from './src/config/dbConnect.js';

const PORT = 3000;

const conn = await connectDB();
conn.on('error', (err) => {
  console.error('Connection error', err);
});

conn.once('open', () => {
  console.log('Successfully connected to database');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});