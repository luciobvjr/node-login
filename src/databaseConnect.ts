import mongoose from 'mongoose';
import 'dotenv/config';
import { connect } from 'http2';

// Connect to Database
const dbUser = process.env.DB_USER;
const dbPass = process.env.DB_PASS;

const databaseConnect = async () => {
  await mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.lw7gjyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.log('Error connecting to database');
  })
}

export default databaseConnect;
