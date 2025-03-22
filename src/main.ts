import "dotenv/config";
import { ConnectDatabase } from "./database";
import server from "./server";

ConnectDatabase();
server.startServer();
