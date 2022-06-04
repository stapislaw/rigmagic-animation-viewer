import styled from "styled-components";

const Box = styled.div`
    width: 90vw;
    height: max-content;
    margin: 0 auto;
    background-color: #353535;
    padding: 5vh 5vw;
    box-sizing: border-box;

    @media only screen and (min-width: 768px) {
        width: 60vw;
    }
`;

const Title = styled.div`
    font-size: 35px;
    display: block;
    width: max-content;

    &::after {
        content: '';
        border-bottom: 3px solid orange;
        display: block;
        width: 0%;
        padding-right: 0vw;
        transition: width 0.3s, padding 0.2s;
        ${Box}:hover & {
            padding-right: 2vw;
            width: 100%;
        }
    }
`;


export function TitleBox(props) {
    return (
        <Box id={props.id}>
            <Title>{props.title}</Title>
            <div>{props.children}</div>
        </Box>
    )
}