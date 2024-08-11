import defaultSound from 'assets/audio/alarm.mp3';

class Alarm {
    sound: HTMLAudioElement;
    
    constructor (soundSrc = defaultSound) {
        this.sound = new Audio(soundSrc);
        this.sound.loop = true;
    }
    play = ()=> {
        this.sound.play();
    }
    stop = () => {
        this.sound.pause();
        this.sound.currentTime = 0;
    }
}

export {
    Alarm as default
}