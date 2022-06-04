import styled from "styled-components";

const TilesRow = styled.div`
    margin: 0 auto;
    width: max-content;

    @media only screen and (min-width: 768px) {
        height: 40vh;
    }
`;

export function Tiles(props) {
    const items = [];
    for(let i = 0; i < props.children.length / 2; i++) {
        items.push(<TilesRow>
            {props.children[2* i]}
            {props.children[2* i + 1]}
            </TilesRow>
            );
    }
    return (
        <div>{items}</div>
    );
}