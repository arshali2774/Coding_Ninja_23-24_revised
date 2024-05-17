import { server } from './server.js';
import dotenv from 'dotenv';
import { connectToDatabase } from './db.config.js';
dotenv.config();
server.listen(3000, () => {
  console.log('Listening on port 3000');
  connectToDatabase();
});
