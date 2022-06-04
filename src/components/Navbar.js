import styled from "styled-components";

const UpperBar = styled.div`
    width: 100%;
    height: 80px;
    line-height: 80px;
    padding: 0 30px;
    box-sizing: border-box;
`;

const Menu = styled.nav`
    float: right;
`;

const MenuItem = styled.li`
    display: block;
    list-style: none;
    float: left;
    margin: 0 10px;
    cursor: pointer;

    &::after {
        content: '';
        border-bottom: 1px solid orange;
        display: block;
        margin-top: -25px;
        width: 0%;
        margin-left: 100%;
        transition: width 0.2s, margin 0.2s;
    }

    &:hover {
        &::after {
            width: 100%;
            margin-left: 0%;
        }
    }
`;

const Link = styled.a`
    text-decoration: none;
    color: #fff;
`;

const Logo = styled.h1`
    display: block;
    float: left;
    margin: 0;
`;

export const Navbar = () => {
    return (
        <UpperBar>
            <Logo>piluk_dev</Logo>
            <Menu>
                <MenuItem><Link href="#about">about me</Link></MenuItem>
                <MenuItem><Link href="#projects">projects</Link></MenuItem>
                <MenuItem><Link href="#contact">contact</Link></MenuItem>
            </Menu>
        </UpperBar>
    );
}