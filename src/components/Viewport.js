import { useEffect, useRef } from "react";
import * as PIXI from "pixi.js";
import { CharacterController } from "../api/character-controller";

const vertexSrc = `
    precision mediump float;

    attribute vec2 aPos;
    attribute vec2 aUvs;

    uniform mat3 translationMatrix;
    uniform mat3 projectionMatrix;

    varying vec2 vUvs;

    void main() {
        vUvs = aUvs;
        gl_Position = vec4((projectionMatrix * translationMatrix * vec3(aPos, 1.0)).xy, 0.0, 1.0);
    }`;

const fragmentSrc = `
    precision mediump float;

    varying vec2 vUvs;

    uniform sampler2D uSampler2;

    void main() {
        gl_FragColor = texture2D(uSampler2, vUvs);
    }`;

export function Viewport() {
    const canvasRef = useRef(null);

    const app = new PIXI.Application({
        backgroundColor: 0x1c2936,
        resolution: window.devicePixelRatio || 1,
        resizeTo: window
    });

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.appendChild(app.view);
        app.resize();

        let moving = false;
        let x = 0.0, y = 0.0, zoom = 1.0;
        let mesh = null;

        const handleChange = (url, character, _instance) => {
            console.log("onChange", url, character, _instance);
            const texture = new PIXI.Texture.from(url);

            const geometry = new PIXI.Geometry()
            .addAttribute('aPos', _instance.getVertices(), 2)
            .addAttribute('aUvs', _instance.getTexCoords(), 2)
            .addIndex(_instance.getIndices());

            const uniforms = { uSampler2: texture };

            const shader = PIXI.Shader.from(vertexSrc, fragmentSrc, uniforms);

            mesh = new PIXI.Mesh(geometry, shader);

            x = y = 0.0;
            zoom = 1.0;
            mesh.scale.set(40, 40);
            mesh.position.set(app.renderer.width / 2, app.renderer.height / 2);

            app.stage.addChild(mesh);

            app.ticker.add((delta) => {
                geometry.getBuffer('aPos').update(_instance.getVertices());
                mesh.position.set(app.renderer.width * (1/2 + x), app.renderer.height * (1 / 2 + y));
                mesh.scale.set(40 * zoom, 40 * zoom);
                // app.render(app.stage);
            });
        };

        canvas.onmousedown = (e) => {
            if(e.button === 0 && mesh !== null) {
                moving = true;
            }
        };

        canvas.onmouseup = (e) => {
            moving = false;
        };

        canvas.onmousemove = (e) => {
            if(moving) {
                x += e.movementX / zoom / 600;
                y += e.movementY / zoom / 600;
            }
        };

        canvas.onwheel = (e) => {
            zoom -= e.deltaY / 200;
            zoom = Math.max(Math.min(zoom, 4.0), 0.15);
        }

        CharacterController.onChange(handleChange);

        return () => {
            CharacterController.removeChangeListener(handleChange);
        };    
    });

    return (<div id={"canvas"} ref={canvasRef}></div>);
}