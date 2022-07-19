import { CONFIG } from "../CONFIG";

const stateCallbacks = [];
let _state = {
    loaded: false,
    instance: null,
    animation: null,
    texture: null,
    position: {
        x: 0,
        y: 0,
        zoom: 1
    }
};

const _trigger = () => {
    stateCallbacks.forEach(callback => callback());
}

export const State = {
    getAnimation: () => {
        return _state.animation;
    },
    setAnimation: (name) => {
        _state.animation = name;
        _trigger();
    },
    getSamplesList: () => {
        return [...CONFIG.samples];
    },
    setInstance: (instance, texture) => {
        _state.instance = instance;
        _state.texture = texture;
        _state.loaded = true;
        _trigger();
    },
    getInstance: () => {
        return _state.instance;
    },
    getTexture: () => {
        return _state.texture;
    },
    getPosition: () => {
        return _state.position;
    },
    flush: () => {
        _state.instance = null;
        _state.animation = null;
        _state.position = {x: 0, y: 0, zoom: 1};
        _state.loaded = false;
        _trigger();
    },
    update: () => {
        _trigger();
    },
    onStateChange: (callback) => {
        stateCallbacks.push(callback);
    },
    removeStateListener: (callback) => {
        const index = stateCallbacks.indexOf(callback);
        if(index !== -1) {
            stateCallbacks.splice(index, 1);
        }
    },
    isPaused: () => {
        if(_state.instance) {
            return _state.instance.paused;
        } 
        return false;
    },
    isLoaded: () => {
        return _state.loaded;
    }
}