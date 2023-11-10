import React, { useState, useCallback, useEffect } from 'react';

import { About, Footer, Header, Skills, Testimonial, Work } from './container';
import { Navbar } from './components';
import './App.scss';

const App = () => {
  const [wave, setWave] = useState(false);

  // Function to handle the waving animation
  const triggerWave = useCallback(() => {
    setWave(true);
    setTimeout(() => setWave(false), 2000); // Assuming 2000 is your animation duration
  }, []);

  // Effect for initial wave on component mount
  useEffect(() => {
    const timeoutId = setTimeout(() => setWave(false), 2000); // Turn off wave after it's been shown initially
    triggerWave();
    return () => clearTimeout(timeoutId);
  }, [triggerWave]);

  useEffect(() => {
    const handleWave = () => {
      const header = document.getElementById('header');
      if (header) {
        const position = header.getBoundingClientRect();
        // Check if the header is in the viewport
        if (position.top >= 0 && position.bottom <= window.innerHeight) {
          triggerWave();
        }
      }
    };

    // Set up scroll event listener
    window.addEventListener('scroll', handleWave);

    // Cleanup function
    return () => {
      window.removeEventListener('scroll', handleWave);
    };
  }, [triggerWave]);

  return (
    <div className="app">
      <Navbar triggerWave={triggerWave} />
      <Header wave={wave} triggerWave={triggerWave} />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default App;
