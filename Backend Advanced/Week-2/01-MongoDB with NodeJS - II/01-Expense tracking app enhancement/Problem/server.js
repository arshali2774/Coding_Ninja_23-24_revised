import app from "./index.js";
import { connectToMongoDB } from "./src/config/mongodb.js";
// import dotenv from "dotenv";
// dotenv.config();

app.listen(3000, () => {
  console.log("server is listening at port 3000");
  connectToMongoDB();
});
