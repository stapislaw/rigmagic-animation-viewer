import styled from "styled-components";
import { Tiles } from "./Tiles";
import { Tile } from "./Tile";

const Box = styled.div`
    width: max-content;
    margin: 0 auto;
`;

const Header = styled.h2`
    font-size: 30px;
    width: max-content;
    margin: 2vh auto;

    &::after {
        content: '';
        display: block;
        border-bottom: 2px solid orange;
        width: 0%;
        margin: 0 auto;
        transition: width 0.2s;

        ${Box}:hover & {
            width: 100%;
        }
    }
`;

export const Projects = () => {
    return (
        <Box id="projects">
            <Header>some projects of mine</Header>
            <Tiles>
                <Tile src="./project.jpg" name="project #1" details={
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                } href=""></Tile>
                <Tile src="./project2.jpg" name="project #2" details={
                    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                } href=""></Tile>
                <Tile name="project #3" details={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id nibh sem. Etiam semper id neque eget consectetur. Maecenas sapien turpis, pharetra at lectus in, elementum cursus diam."
                }/>
                <Tile name="project #4" details={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id nibh sem. Etiam semper id neque eget consectetur. Maecenas sapien turpis, pharetra at lectus in, elementum cursus diam."
                }/>
                <Tile name="project #5" details={
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas id nibh sem. Etiam semper id neque eget consectetur. Maecenas sapien turpis, pharetra at lectus in, elementum cursus diam."
                }/>
            </Tiles>
        </Box>
    )
}