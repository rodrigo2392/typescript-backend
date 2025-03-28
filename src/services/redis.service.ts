import { createClient, RedisClientType } from "redis";

class RedisServer {
  async createServer() {
    const client = (await createClient()
      .on("error", (err) => console.log("Redis Client Error", err))
      .connect()) as RedisClientType;
    return client;
  }
}

const redisServer = new RedisServer();

export default redisServer;
