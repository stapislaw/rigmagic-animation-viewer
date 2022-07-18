import { useState } from "react";
import { CharacterController } from "../api/character-controller";

export function AnimationSelector() {
    const [list, setList] = useState([]);

    useState(() => {
        CharacterController.onChange((url, character) => {
            const newList = [];
            character.animations.forEach(animation => {
                newList.push(animation.name);
            });
            setList(newList);
        });
    })

    const _handleSelect = (e) => {
        const value = e.target.value;
        if(typeof value === "string" && value.length > 0) {
            CharacterController.playAnimation(value);
        } else {
            CharacterController.playAnimation(null);
        }
    };

    const _handlePlayPause = () => {
        if(CharacterController.isPaused()) {
            CharacterController.playAnimation(null);
        } else {
            CharacterController.pauseAnimation();   
        }
    }

    return (
        <div id="data-selector">
            <button id="open-button">Open file</button>
            <label>Animation:</label>
            <select onChange={(e) => {_handleSelect(e)}}>
                <option value="">none</option>
                {list.map((item, i) => {
                    return <option key={i} value={item}>{item}</option>
                })}
            </select>
            <button onClick={() => _handlePlayPause()}>pause</button>
            <button onClick={() => CharacterController.stopAnimation()}>stop</button>
        </div>
    );
}