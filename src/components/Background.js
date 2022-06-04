import { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
    width: 100%;
    height: 100vh;
    overflow: hidden;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #000;
`;

export const Background = () => {
    const ref = useRef(null);

    useEffect(() => {
        const canvas = ref.current;
        const ctx = canvas.getContext("2d");
        initBackground(canvas, ctx);
    });

    return (
        <Canvas ref={ref} width="1280px" height="720px"></Canvas>
    );
}

const initBackground = (canvas, ctx) => {
    const width = canvas.width;
    const height = canvas.height;

    const grad = ctx.createLinearGradient(width / 2, 0, width / 2, height);
    grad.addColorStop('0', '#000');
    grad.addColorStop('1', '#1a1797');

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "#fff";

    const NUM_POINTS = 500;
    const points = [];

    const max = Math.max(width, height);

    for(let i = 0; i < NUM_POINTS; i++) {
        const x = max * (Math.random() - 0.5);
        const y = max * (Math.random() - 0.5);
        points.push(x, y);
    }

    let time = 0.0;
    let shift = 0.0;

    const NUM_CYCLES = 10;

    const draw = () => {
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);

        const angle = time + shift;
        for(let j = 0; j < NUM_CYCLES; j++) {
            const alpha = Math.max(0, Math.sin(angle * 64 + j));
            ctx.fillStyle = "rgba(255, 255, 255," + alpha + ")";
            for(let i = 0; i < NUM_POINTS / NUM_CYCLES; i++) {
                const x = points[j * NUM_POINTS / NUM_CYCLES + 2 * i];
                const y = points[j * NUM_POINTS / NUM_CYCLES + 2 * i + 1];
                const fx = x * Math.cos(angle) + y * Math.sin(angle);
                const fy = x * (-Math.sin(angle)) + y * Math.cos(angle);
                ctx.fillRect(fx + max / 2, fy + max / 2, 1, 1);
            }
        }
        time += 0.0002;
        requestAnimationFrame(draw);
    }
    draw();

    window.onscroll = (e) => {
        shift = -document.body.getBoundingClientRect().top * 0.001;
    };
}