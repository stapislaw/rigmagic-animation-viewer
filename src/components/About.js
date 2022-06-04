import styled from "styled-components";
import { TitleBox } from "./TitleBox";

const Paragraph = styled.p`
    font-size: 22px;
    margin-left: 5%;

    @media only screen and (min-width: 768px) {
        width: 65%;
        float: left;
    }
`;

const Portrait = styled.img`
    width: 100%;
    @media only screen and (min-width: 768px) {
        margin-left: 10%;
        width: 20%;
    }
`;

const Row = styled.div`
    width: 100%;
`;

export const About = () => {
    return (
        <TitleBox title="about me" id="about">
            <Row>
                <Paragraph>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Paragraph>
                <Portrait src="./portrait.jpg"></Portrait>
            </Row>  
        </TitleBox>
    );
};