import { Rigmagic } from "rigmagic-animation-engine";
import { State } from "./state";

export const Playback = {
    play: (name) => {
        const instance = State.getInstance();
        if(instance) {
            if(name) {
                instance.play(name, Rigmagic.PlayMode.INFINITY);
                State.setAnimation(name);
            } else if(name === null) {
                instance.play(null);
                State.setAnimation(null);
            } else {
                instance.play();
                State.update();
            }
        }
    },
    pause: () => {
        const instance = State.getInstance();
        if(instance) {
            instance.pause();
            State.update();
        }
    },
    stop: () => {
        const instance = State.getInstance();
        if(instance) {
            instance.stop();
            State.setAnimation(null);
        }
    },
}