import { Rigmagic } from "rigmagic-animation-engine";

const callbacks = [];
let _instance = null;

export const CharacterController = {
    loadCharacter: (url, json) => {
        const character = Rigmagic.loadJSON(json);
        _instance = Rigmagic.newInstance(character);

        callbacks.forEach(callback => {
            callback(url, character, _instance);
        });
    },
    onChange: (callback) => {
        callbacks.push(callback);
    },
    playAnimation: (name) => {
        if(_instance) {
            _instance.play(name, Rigmagic.PlayMode.INFINITY);
        }
    },
    pauseAnimation: () => {
        if(_instance) {
            _instance.pause();
        }
    },
    stopAnimation: () => {
        if(_instance) {
            _instance.stop();
        }
    },
    removeChangeListener: (callback) => {
        const index = callbacks.indexOf(callback);
        if(index !== -1) {
            callbacks.splice(index, 1);
        }
    },
    isPaused: () => {
        return _instance.paused;
    }
}