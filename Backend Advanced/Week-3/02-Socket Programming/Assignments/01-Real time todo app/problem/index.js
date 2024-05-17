import dotenv from 'dotenv';
dotenv.config();
import { connectToDatabase } from "./db.config.js";
import {server} from './server.js'
connectToDatabase
server.listen(3000, () => {
    console.log('Server is running on port 3000');
    connectToDatabase();
});