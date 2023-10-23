class Timer {
    constructor(startTimeMs, endTimeMs, callback=()=>{console.log('ticking');}, endCallback=()=>{console.log('done')}, autoStart=true) {
        this.startTimeMs = startTimeMs;
        this.endTimeMs = endTimeMs;
        this.callback = callback;
        this.endCallback = endCallback;
        this.autoStart = autoStart;
        this.time = 0;

        if(this.autoStart)
            this.start();
    }
    start() {
        this.time = this.startTimeMs;
        this.interval = setInterval(() => {
            this.time++;
            this.callback();
            if (this.time >= this.endTimeMs) {
                this.endCallback();
                clearInterval(this.interval);
            }
        }, 1);
    }
    stop() {
        clearInterval(this.interval);
    }
}
