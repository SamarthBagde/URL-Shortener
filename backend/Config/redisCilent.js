import { Redis } from "ioredis";

const redisClient = new Redis(6379, "redis");

export default redisClient;
