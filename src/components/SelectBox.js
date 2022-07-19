import React, { useEffect, useState } from "react"
import { Loader } from "../api/loader";
import { State } from "../api/state";
import { CONFIG } from "../CONFIG";

export function SelectBox() {
    const [show, setShow] = useState(true);

    const _handleStateChange = () => {
        setShow(!State.isLoaded());
    }

    useEffect(() => {
        State.onStateChange(_handleStateChange);
        return () => {
            State.removeStateListener(_handleStateChange);
        }
    })

    const _load = () => {
        const jsonInput = document.querySelector("#json-input");
        const textureInput = document.querySelector("#texture-input");

        if(jsonInput.files.length === 1 && textureInput.files.length === 1) {
            Loader.loadFromDrive(jsonInput.files[0], textureInput.files[0]);
            jsonInput.value = "";
            textureInput.value = "";
        }
    }

    return (
        <div style={(show) ? {display: "block"} : {display: "none"}}>
            <div id="open-bcg"></div>
            <div id="open-box">
                <h1>Open file</h1>
                <div id="open-left-box">
                    <h2>Load from drive</h2>
                    <label>JSON file:</label>
                    <input id="json-input" accept=".json" type="file"/>
                    <label>Texture file:</label>
                    <input id="texture-input" accept="image/*" type="file"/>
                    <button id="load-button" onClick={() => _load()}>Open</button>
                </div>
                <div id="open-right-box">
                    <h2>Samples</h2>
                    <div>
                        {CONFIG.samples.map((item, i) => {
                            return <li key={i.toString()} onClick={() => Loader.loadSample(item)}>{item}</li>
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}