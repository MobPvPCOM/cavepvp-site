package com.mobpvp.site.redis;

import redis.clients.jedis.Jedis;

/**
 * A utility interface to simplify redis usage.
 *
 * @param <T> the generic type that is return when the command is executed
 */
public interface RedisCommand<T> {

    /**
     * Invoked when a redis connection is made and the command is being executed.
     *
     * @param redis the redis connection that got opened
     * @return the result of the command
     */
    T execute(Jedis redis);

}
