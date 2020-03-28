const createTimer = (endCb) => {
    let currentCount = 0;
    let max = 0;
    let id = 0;
    let lastCb = null;
    return {
        start(time, cb) {
            max = time;
            lastCb = cb;
            currentCount = -1;
            clearInterval(id);
            this.play();
        },
        stop() {
            console.log('stop');
            clearInterval(id);
        },
        play() {
            id = setInterval(() => (currentCount >= max) ? (clearInterval(id), endCb()) : lastCb(++currentCount), 1000);
        }
    }
}

const timeOutput = document.querySelector('.timeOutput');
const PomodoroBtn = document.querySelector('.PomodoroBtn');
const ShortBreakBtn = document.querySelector('.ShortBreakBtn');
const LongBreakBtn = document.querySelector('.LongBreakBtn');
const pauseBtn = document.querySelector('.pauseBtn');
const playBtn = document.querySelector('.playBtn');
let maxTime = 0;
let currentPhase = '';
const timer = createTimer(() => {
    document.title = "Time is over!"
});

const computedMinutes = time => {
    const minutes = Math.floor(time/60);
    const seconds = time % 60;
    return `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
}

const displayTime = (time, phase) => () => {
    maxTime = time;
    currentPhase = phase;
    timer.start(maxTime, current => {
        const lastTime = computedMinutes(maxTime - current);
        timeOutput.textContent = lastTime
        document.title = `${lastTime} ${currentPhase}`;
    });
}

PomodoroBtn.addEventListener('click', displayTime(1500, 'Pomodoro'));
ShortBreakBtn.addEventListener('click', displayTime(300, 'Short break'));
LongBreakBtn.addEventListener('click', displayTime(900, 'Long break'));
pauseBtn.addEventListener('click', timer.stop);
playBtn.addEventListener('click', timer.play);



