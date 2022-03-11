class Time {
    constructor() {
        this.pt = new Date().getMilliseconds();
        this.dt = 0;
        this.el = 0;
        this.tick();
    }

    tick(elapsedtime) {
        this.el = elapsedtime;
        this.dt = new Date().getMilliseconds() - this.pt;
        this.pt = new Date().getMilliseconds();
    }

    get deltaTime() {
        if (this.dt < 0) return 0;
        return this.dt;
    }

    get elapsedtime() {
        return this.el;
    }
}

const instance = new Time();
export default instance;