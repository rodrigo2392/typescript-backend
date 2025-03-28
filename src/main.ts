import "dotenv/config";
import { ConnectDatabase } from "./database";
import CreateServer from "./server";
const port = process.env.PORT ?? 4000;

async function bootstrap() {
  await ConnectDatabase();
  const app = CreateServer();
  app.listen(port, () => {
    console.log(`servidor funcionando ${port}`);
  });
}

bootstrap().catch((error) => console.log(error));
