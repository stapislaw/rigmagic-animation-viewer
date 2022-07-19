import { useEffect, useState } from "react";
import { Playback } from "../api/playback";
import { State } from "../api/state";

export function AnimationSelector() {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState(null);
    const [paused, setPaused] = useState(false);

    const _handleStateChange = () => {
        setSelected(State.getAnimation());
        setPaused(State.isPaused());
        const newList = [];
        if(State.getInstance() !== null) {
            const character = State.getInstance().character;
            character.animations.forEach(animation => {
                newList.push(animation.name);
            });
        }
        setList(newList);
    };
    
    useEffect(() => {
        State.onStateChange(_handleStateChange);

        return () => {
            State.removeStateListener(_handleStateChange);
        };
    })

    return (
        <div id="data-selector">
            <LoadButton/>
            <AnimationsList list={list} selected={selected}/>
            {
                (selected != null) ? (
                <div id="playback-row">
                    <PauseButton paused={paused}/>
                    <StopButton/>
                </div>
                ) : null
            }
        </div>
    );
}

const AnimationsList = ({list, selected}) => {
    const select = (e) => {
        const value = e.target.value;
        if(typeof value === "string" && value.length > 0) {
            Playback.play(value);
        } else {
            Playback.play(null);
        }
    };

    return (
    <div>
        <label>Animation:</label>
        <select onChange={(e) => {select(e)}} value={(selected === null) ? "" : selected}>
            <option value="">none</option>
            {list.map((item, i) => {
                return <option key={i} value={item}>{item}</option>
            })}
        </select>
    </div>
    );
}

const LoadButton = () => {
    return <button id="open-button" onClick={() => State.flush()}>Load</button>;
}

const PauseButton = ({paused}) => {
    const action = () => {
        if(paused) {
            Playback.play();
        } else {
            Playback.pause();   
        }
    }

    return <button onClick={() => action()}>{(paused) ? "play" : "pause"}</button>;
}

const StopButton = () => {
    return <button onClick={() => Playback.stop()}>stop</button>;
}