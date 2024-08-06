package com.mobpvp.site.util.thread;

public abstract class SiteThread extends Thread {

    private final long sleepTime;

    public SiteThread(String name, long sleepTime) {
        this.sleepTime = sleepTime;

        setName(name);
        start();
    }

    public abstract void execute();

    @Override
    public void run() {
        while (true) {
            try {
                execute();
                Thread.sleep(sleepTime);
            } catch (InterruptedException ignored) {
            }
        }
    }

}