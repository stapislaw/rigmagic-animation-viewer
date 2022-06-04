import styled from 'styled-components';
import './App.css';
import { About } from './components/About';
import { Background } from './components/Background';
import { Contacts } from './components/Contacts';
import { Header } from './components/Header';
import { Motto } from './components/Motto';
import { Navbar } from './components/Navbar';
import { Projects } from './components/Projects';

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
`;

const Footer = styled.footer`
  text-align: center;
  padding: 5vh 0 2vh 0;
`;

const Spacing = styled.div`
  margin: 0 0 10vh 0;
`

function App() {
  return (
    <div className="App">
      <Background/>
      <Content>
        <Header>
          <Navbar/>
          <Motto/>
        </Header>
        <About></About>
        <Spacing/>
        <Projects></Projects>
        <Spacing/>
        <Contacts></Contacts>
        <Spacing></Spacing>
        <Footer>&copy; 2022 Aleksander Piluk</Footer>
      </Content>
    </div>
  );
}

export default App;
