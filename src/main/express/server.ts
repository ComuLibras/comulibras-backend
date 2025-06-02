import { env } from "../../application/config/env";
import { app } from "./app";

app.listen(env.port, () => {
  console.log(`🚀 Server started at http://localhost:${env.port}`);
});
