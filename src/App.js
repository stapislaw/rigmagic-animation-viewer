import './App.css';
import { AnimationSelector } from './components/AnimationSelector';
import { OpenBox } from './components/OpenBox';
import { Viewport } from './components/Viewport';

function App() {
  return (
    <div id="container">
        <Viewport/>
        <AnimationSelector/>
        <OpenBox/>
    </div>
  );
}

export default App;
