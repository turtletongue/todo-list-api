import expressSession from 'express-session';
import { createClient } from 'redis';
import createRedisStore from 'connect-redis';

import { SessionFlusher } from '@declarations';

const RedisStore = createRedisStore(expressSession);

const redisClient = createClient({
  socket: {
    host: process.env.REDIS_HOST,
    port: +(process.env.REDIS_PORT as string),
  },
  legacyMode: true,
});

export const session = expressSession({
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  store: new RedisStore({ client: redisClient as any }),
});

export const sessionFlusher: SessionFlusher = {
  flush: () => redisClient.flushDb(),
};

export const sessionClient = redisClient.connect();
