import React, { useState } from "react"
import { CharacterController } from "../api/character-controller";

export function SelectBox() {
    const [show, setShow] = useState(true);

    const _load = () => {
        const jsonInput = document.querySelector("#json-input");
        const textureInput = document.querySelector("#texture-input");

        if(jsonInput.files.length === 1 && textureInput.files.length === 1) {

            const imageURL = URL.createObjectURL(textureInput.files[0]);
    
            const reader = new FileReader();
            reader.onload = () => {
                const jsonData = reader.result;
                document.querySelector("#open-bcg").style.display = "none";
                document.querySelector("#open-box").style.display = "none";
                CharacterController.loadCharacter(imageURL, jsonData);
            }
            reader.readAsText(jsonInput.files[0]);

            setShow(false);
        }
    }

    return (
        <div style={(show) ? {display: "block"} : {display: "none"}}>
            <div id="open-bcg"></div>
            <div id="open-box">
                <h1>Open file</h1>
                <label>JSON file:</label>
                <input id="json-input" accept=".json" type="file"/>
                <label>Texture file:</label>
                <input id="texture-input" accept="image/*" type="file"/>
                <button id="load-button" onClick={() => _load()}>Open</button>
            </div>
        </div>
    );
}