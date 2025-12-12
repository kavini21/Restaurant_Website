import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Gallery from './sections/Gallery';
import Footer from './sections/Footer';

function App() {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Footer />
    </div>
  )
}

export default App
