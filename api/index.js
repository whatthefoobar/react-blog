import express from 'express';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
console.log('testing testing 123');
const app = express();

app.use(express.json());

app.use('/foof', (req, res) => {
  console.log('this is foof url');
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`);
});
