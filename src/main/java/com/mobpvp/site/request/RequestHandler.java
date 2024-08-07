package com.mobpvp.site.request;

import com.mobpvp.site.SiteConstant;
import com.google.gson.JsonElement;
import lombok.Getter;
import okhttp3.*;

import java.io.IOException;
import java.time.Duration;
import java.util.logging.Level;
import java.util.logging.Logger;

public class RequestHandler {

    @Getter
    private static boolean apiDown = false;

    @Getter
    private static long lastError = -1;

    @Getter
    private static long lastRequest = -1;

    @Getter
    private static long lastLatency = 0;
    private static long averageLatency = 0;

    @Getter
    private static long totalRequests = 0;

    @Getter
    private static long averageLatencyTicks = 0;

    public static double getAverageLatency() {
        if (averageLatencyTicks == 0)
            return -1;

        return (averageLatency + 0.0D) / (averageLatencyTicks + 0.0D);
    }

    private static final OkHttpClient CLIENT = new OkHttpClient.Builder()
            .connectTimeout(Duration.ofSeconds(2L))
            .writeTimeout(Duration.ofSeconds(2L))
            .readTimeout(Duration.ofSeconds(2L))
            .build();

    static {
        Logger.getLogger(OkHttpClient.class.getName()).setLevel(Level.FINE);
    }

    public static RequestResponse get(String endpoint, Object... args) {
        Request.Builder builder = newBuilder(endpoint, args);
        builder.get();

        return call(builder);
    }

    public static RequestResponse post(String endpoint, JsonElement body, Object... args) {
        Request.Builder builder = newBuilder(endpoint, args);
        builder.post(RequestBody.create(body.toString(), MediaType.parse("application/json; charset=utf-8")));

        return call(builder);
    }

    public static RequestResponse put(String endpoint, JsonElement body, Object... args) {
        Request.Builder builder = newBuilder(endpoint, args);
        builder.put(RequestBody.create(body.toString(), MediaType.parse("application/json; charset=utf-8")));

        return call(builder);
    }

    public static RequestResponse delete(String endpoint, Object... args) {
        Request.Builder builder = newBuilder(endpoint, args);
        builder.delete();

        return call(builder);
    }

    private static RequestResponse call(Request.Builder builder) {
        long start = System.currentTimeMillis();
        lastRequest = System.currentTimeMillis();
        totalRequests++;

        boolean newDown = false;
        try {
            Response response = CLIENT.newCall(builder.build()).execute();
            RequestResponse requestResponse = RequestResponse.ofResponse(response, builder);
            newDown = requestResponse.couldNotConnect();

            if (newDown)
                lastError = System.currentTimeMillis();
            else {
                lastLatency = System.currentTimeMillis() - start;
                averageLatency += System.currentTimeMillis() - start;
                averageLatencyTicks++;
            }
            return requestResponse;
        } catch (IOException e) {
            newDown = true;
            lastError = System.currentTimeMillis();
            return RequestResponse.ofError(e, builder);
        } finally {
            apiDown = newDown;
        }
    }

    private static Request.Builder newBuilder(String endpoint, Object... args) {
        if (SiteConstant.API_DEBUG)
            System.out.println("Creating Builder for " + SiteConstant.API_HOST + String.format(endpoint, args));
        return new Request.Builder()
                .url(SiteConstant.API_HOST + String.format(endpoint, args))
                .addHeader("Authorization", SiteConstant.API_KEY);
    }

}
