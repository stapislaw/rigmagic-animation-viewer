import styled from 'styled-components';
import './App.css';
import { AnimationSelector } from './components/AnimationSelector';
import { SelectBox } from './components/SelectBox';
import { Viewport } from './components/Viewport';

function App() {
  return (
    <div id="container">
        <Viewport></Viewport>
        <AnimationSelector/>
        <SelectBox/>
    </div>
  );
}

export default App;
