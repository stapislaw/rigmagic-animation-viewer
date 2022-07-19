import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { State } from "../api/state";
import { SHADER } from "./SHADER";
import { CONFIG } from "../CONFIG";

export function Viewport() {
    const canvasRef = useRef(null);

    const app = new PIXI.Application({
        backgroundColor: 0x1c2936,
        resolution: window.devicePixelRatio || 1,
        resizeTo: window
    });

    let mesh = null;

    const _buildMesh = () => {
        const texture = new PIXI.Texture.from(State.getTexture());
        const instance = State.getInstance();
        
        const geometry = new PIXI.Geometry()
        .addAttribute('aPos', instance.getVertices(), 2)
        .addAttribute('aUvs', instance.getTexCoords(), 2)
        .addIndex(instance.getIndices());

        const uniforms = { uSampler2: texture };
        const shader = PIXI.Shader.from(SHADER.vertex, SHADER.fragment, uniforms);

        mesh = new PIXI.Mesh(geometry, shader);

        app.stage.addChild(mesh);
        mesh.scale.set(40, 40);
        mesh.position.set(app.renderer.width / 2, app.renderer.height / 2);
    }

    const _handleState = () => {
        if(mesh) {
            app.stage.removeChild(mesh);
            mesh = null;
        }
        
        if(State.getInstance() !== null) {
            _buildMesh();
        }
    };

    app.ticker.add((delta) => {
        const instance = State.getInstance();
        if(mesh !== null && instance !== null) {
            mesh.geometry.getBuffer('aPos').update(instance.getVertices());

            const pos = State.getPosition();
            mesh.position.set(app.renderer.width * (1/2 + pos.x), app.renderer.height * (1 / 2 + pos.y));
            mesh.scale.set(40 * pos.zoom, 40 * pos.zoom);
        }
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.appendChild(app.view);
        app.resize();
        _initCanvasEvents(canvas);

        State.onStateChange(_handleState);
        return () => {
            State.removeStateListener(_handleState);
        };    
    });

    return (<div id={"canvas"} ref={canvasRef}></div>);
}

const _initCanvasEvents = (canvas) => {
    let moving = false;

    canvas.onmousedown = (e) => {
        if(e.button === 0 && State.getInstance() !== null) {
            moving = true;
        }
    };

    canvas.onmouseup = (e) => {
        moving = false;
    };

    canvas.onmousemove = (e) => {
        if(moving) {
            const pos = State.getPosition();
            pos.x += e.movementX / Math.max(pos.zoom, 1) * CONFIG.move_factor;
            pos.y += e.movementY / Math.max(pos.zoom, 1) * CONFIG.move_factor;
        }
    };

    canvas.onwheel = (e) => {
        const pos = State.getPosition();
        pos.zoom -= e.deltaY * CONFIG.zoom_factor;
        pos.zoom = Math.max(Math.min(pos.zoom, 4.0), 0.15);
    }
}