import styled from "styled-components";

const Box = styled.div`
    height: 35vh;
    background-color: #4242429a;
    margin: 0.5vh 2vw;
    position: relative;
    transition: transform 0.3s;
    position: relative;
    overflow: hidden;
    width: 80vw;
    
    @media only screen and (min-width: 768px) {
        float: left;
        width: 30vw;
    }

    &:hover {
        transform: scale(1.05);
    }
`;

const Image = styled.img`
    width: 100%;
    height: 30vh;
    object-fit: cover;
`;

const Title = styled.div`
    width: 100%;
    height: 5vh;
    bottom: 0;
    position: absolute;
    font-size: 25px;
    margin: 0 1vw;
    line-height: 5vh;
`;

const Details = styled.div`
    background-color: orange;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    transform: translateY(0%);
    transition: transform 0.2s;
    display: block;

    ${Box}:hover & {
        transform: translateY(-100%);
    }

    ${Box}:focus & {
        transform: translateY(-100%);
    }
`

const DetailsP = styled.p`
    padding: 1vw;
    font-size: 18px;
`;

const Link = styled.div`
    transition: transform 0.2s;
    padding: 1vw;
    
    &:hover {
        transform: scale(1.05);
    }
`

const Anchor = styled.a`
    font-size: 20px;
    color: #fff;
    display: block;
    width: max-content;
    float: left;
`;

const Arrow = styled.div`
    width: 20px;
    height: 10px;
    margin-top: 15px;
    display: block;
    float: left;

    &::before {
        content: '';
        display: block;
        width: 100%;
        height: 2px;
        background-color: #fff;
        transform: translate(14%, 4%);
    }

    &::after {
        content: '';
        display: block;
        width: 50%;
        height: 100%;
        border-right: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: translate(100%, -50%) rotate(-45deg);
    }
`

export function Tile(props) {
    return (
        <Box tabIndex={1}>
            {(props.src) ? <Image src={props.src} alt=""></Image> : null}
            <Title>{props.name}</Title>
            <Details>
                <DetailsP>{props.details}</DetailsP>
                <Link>
                    <Anchor href={props.href}>go to project</Anchor>
                    <Arrow/>
                </Link>
            </Details>
        </Box>
    );
}