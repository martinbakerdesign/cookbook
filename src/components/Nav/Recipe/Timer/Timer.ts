import type { milliseconds } from "types";
import type { TimerCallback } from ".";

class Timer {
    duration: milliseconds;
    startCallback: null|TimerCallback
    resumeCallback: null|TimerCallback;
    pauseCallback: null|TimerCallback;
    stopCallback: null|TimerCallback;
    progressCallback: null|TimerCallback;
    intervalCallback: null|TimerCallback;
    completeCallback: null|TimerCallback;
    elapsed: milliseconds;
    lastTimestamp: null|milliseconds;
    raf: null|milliseconds;
    hasNoDuration: boolean;
    hasCallbacks: boolean;
    shouldNotRun: boolean;
    started: boolean;

    constructor (duration: milliseconds, callbacks?: {
        start?: TimerCallback,
        pause?: TimerCallback,
        resume?: TimerCallback,
        stop?: TimerCallback,
        progress?: TimerCallback,
        complete?: TimerCallback,
    }) {
        this.duration = duration;
        this.hasNoDuration = duration <= 0;

        this.startCallback = callbacks?.start ?? null;
        this.pauseCallback = callbacks?.pause ?? null;
        this.resumeCallback = callbacks?.resume ?? null;
        this.stopCallback = callbacks?.stop ?? null;
        this.progressCallback = callbacks?.progress ?? null;
        this.completeCallback = callbacks?.complete ?? null;

        this.hasCallbacks = Object.entries(callbacks ?? {}).length > 0;

        this.shouldNotRun = this.hasNoDuration || !this.hasCallbacks;

        this.elapsed = 0;
        this.lastTimestamp = null;
        this.started = false;

        this.raf = null;
    }
    setDuration = (newDuration: milliseconds) => {
        if (this.started) return true;
        this.duration = newDuration;
        this.hasNoDuration = newDuration <= 0;
        this.shouldNotRun = this.hasNoDuration || !this.hasCallbacks;
    }
    start = () => {
        console.log('Timer.start()')
        const hasFinished = this.elapsed >= this.duration;
        if (this.shouldNotRun || hasFinished) return;

        const started = null != this.lastTimestamp;

        this.lastTimestamp = performance.now();
        
        this.raf = requestAnimationFrame(() => {
            return this.tick()
        });

        this.started = true;

        !started
            ? this.startCallback && this.startCallback(this.elapsed)
            : this.resumeCallback && this.resumeCallback(this.elapsed)

        return this;
    }
    tick = () => {
        const now = performance.now();
        this.elapsed += now - this.lastTimestamp;
        this.lastTimestamp = now;

        if (this.elapsed >= this.duration) {
            return this.complete()
        }

        this.progressCallback && this.progressCallback(this.elapsed);
        this.raf = requestAnimationFrame(() => {
            return this.tick()
        })
    }
    pause = () => {
        console.log('Timer.pause()')
        if (this.shouldNotRun || null == this.raf) return;

        const now = performance.now();
        this.elapsed += now - this.lastTimestamp;
        this.pauseCallback && this.pauseCallback(this.elapsed);

        cancelAnimationFrame(this.raf);
        return this;
    }
    resume = () => {
        console.log('Timer.resume()')
        return this.start();
    }
    stop = (complete:boolean = false) => {
        if (this.shouldNotRun || null == this.raf) return;
        console.log('Timer.stop()')
        cancelAnimationFrame(this.raf);
        this.started = false;
        this.raf = null;
        this.elapsed = 0;
        this.lastTimestamp = null;
        !complete && this.stopCallback && this.stopCallback();
        return this;
    }
    complete = () => {
        console.log('Timer.complete()')
        this.stop(true);
        this.completeCallback && this.completeCallback();
    }
    restart = () => {
        console.log('Timer.reset()')
        this.stop();
        this.start();
        return this;
    }
}

export default Timer;