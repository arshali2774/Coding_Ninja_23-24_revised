import server from "./app.js";
import { PORT } from "./solution.js";

server.listen(PORT, () => {
  console.log(`server is running on ${process.env.PORT}`);
});
