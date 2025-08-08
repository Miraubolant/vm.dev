import React from 'react';
import Layout from './components/layout/Layout';
import Hero from './components/sections/Hero';
import Process from './components/sections/Process';
import InteractiveDemo from './components/sections/InteractiveDemo';
import About from './components/sections/About';
import Portfolio from './components/sections/Portfolio';
import Contact from './components/sections/Contact';
import './styles/globals.css';
import PerformanceOptimizer from './components/ui/PerformanceOptimizer';

function App() {
  return (
    <Layout>
      <PerformanceOptimizer />
      <Hero />
      <Process />
      <InteractiveDemo />
      <About />
      <Portfolio />
      <Contact />
    </Layout>
  );
}

export default App;