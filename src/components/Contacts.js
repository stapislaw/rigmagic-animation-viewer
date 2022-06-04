import styled from "styled-components";
import { TitleBox } from "./TitleBox";

const IconDiv = styled.div`
    margin: 3vh 0;
    margin-left: 3vw;
`;

const Image = styled.img`
    width: 6vw;
    height: 6vw;
    float: left;
    margin-right: 0.8vw;
    transition: transform 0.1s;

    @media only screen and (min-width: 768px) {
        width: 2vw;
        height: 2vw;
    }

    ${IconDiv}:hover & {
        transform: scale(1.1);
    }
`;

const Label = styled.label`
    line-height: 6vw;
    display: block;
    width: max-content;
    float: left;

    @media only screen and (min-width: 768px) {
        line-height: 2vw;
    }

    &::after {
        content: '';
        transition: width 0.2s;
        display: block;
        border-bottom: 1px solid orange;
        width: 0%;

        ${IconDiv}:hover & {
            width: 100%;
        }
    }
`;

const Clear = styled.div`
    clear: both;
`;

const Icon = (props) => {
    return (
        <IconDiv>
            <Image src={props.src}></Image>
            <Label>{props.label}</Label>
            <Clear></Clear>
        </IconDiv>
    );
}

export const Contacts = () => {
    return (
        <TitleBox title="contact" id="contact">
            <Icon src="./github.png" label="@stapislaw"></Icon>
            <Icon src="./twitter.svg" label="twitter"></Icon>
            <Icon src="./mail.svg" label="mail"></Icon>
        </TitleBox>
    );
};