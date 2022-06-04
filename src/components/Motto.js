import { useEffect, useRef } from "react";
import styled from "styled-components";

const msg = `motto\n   new line`;

const Paragraph = styled.p`
    font-size: 10vw;
    position: absolute;
    bottom: 4vh;
    white-space: pre-wrap;
    width: 90%;
    margin-left: 10%;

    @media only screen and (min-width: 768px) {
        left: 50%;
        width: 50%;
        font-size: 50px;
        margin-left: 0%;
    }

    @media only screen and (min-width: 1200px) {
        left: 55%;
        width: 45%;
        font-size: 70px;
    }
`

export const Motto = props => {
    const ref = useRef(null);

    useEffect(() => {
        const element = ref.current;

        let letter = 0;
        const writeLetter = () => {
            if(letter <= msg.length) {
                element.innerText = "> " + msg.slice(0, letter) + "_";
                letter += 2;
                setTimeout(writeLetter, 80);
            } else {
                let state = true;
                const cursor = () => {
                    if(state) {
                        element.innerText = "> " + msg.slice(0, letter) + "\u00A0";
                    } else {
                        element.innerText = "> " + msg.slice(0, letter) + "_";
                    }
                    state = !state;
                }
                setInterval(cursor, 500);
            }
        };

        setTimeout(writeLetter, 1500);

        window.addEventListener("scroll", (e) => {
            const rect = document.body.getBoundingClientRect();
            const val = Math.min(2 * -rect.top / window.innerHeight, 1.0);
            element.style.opacity = 1.0 - val;
        });
    });

    return (
    <Paragraph ref={ref}></Paragraph>
    );
}