import { Rigmagic } from "rigmagic-animation-engine";
import { State } from "./state";

const _loadInstance = (url, json) => {
    const character = Rigmagic.loadJSON(json);
    const instance = Rigmagic.newInstance(character);
    State.setInstance(instance, url);
};

export const Loader = {
    loadSample: (name) => {
        const imageURL = `samples/${name}.png`;

        const req = new XMLHttpRequest();
        req.onreadystatechange = () => {
            if(req.readyState === 4) {
                _loadInstance(imageURL, req.responseText);
            }
        }

        req.open("GET", `samples/${name}.json`);
        req.send();
    },
    loadFromDrive: (jsonPath, imagePath) => {
        const imageURL = URL.createObjectURL(imagePath);

        const reader = new FileReader();
        reader.onload = () => {
            _loadInstance(imageURL, reader.result);
        }
        reader.readAsText(jsonPath);
    },
}