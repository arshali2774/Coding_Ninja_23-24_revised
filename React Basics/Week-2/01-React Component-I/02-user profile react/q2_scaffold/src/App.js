import './styles.css';
import { Component } from 'react';
import Hero from './Hero';
import Skills from './Skills';
import About from './About';
// Use Hero, Skills and About component to display your information
class App extends Component {
  render() {
    return (
      <>
        {/* render your component here  */}
        <Hero />
        <Skills />
        <About />
      </>
    );
  }
}
export default App;
