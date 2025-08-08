import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import InteractiveDemo from './components/sections/InteractiveDemo';
import Process from './components/sections/Process';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';
import './styles/globals.css';
import PerformanceOptimizer from './components/ui/PerformanceOptimizer';

function App() {
  return (
    <Layout>
      <PerformanceOptimizer />
      <Hero />
      <About />
      <InteractiveDemo />
      <Process />
      <Portfolio />
      <Contact />
    </Layout>
  );
}

export default App;