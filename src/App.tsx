import AboutSkills from './components/AboutSkills'
import Contact from './components/Contact'
import Experience from './components/Experience'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Navbar from './components/Navbar'
import Projects from './components/Projects'
import VelocityMarquee from './components/ui/VelocityMarquee'
import { LenisProvider } from './providers/LenisProvider'

export default function App() {
  return (
    <LenisProvider>
      {/* overflow-x: clip (not hidden) contains rotated/offset elements without breaking position: sticky.
          It lives on a wrapper because on <body> it would propagate to the viewport. */}
      <div className="overflow-x-clip">
      <Navbar />
      <main>
        <Hero />
        <AboutSkills />
        <Projects />
        <Experience />
        {/* Scroll-reactive divider before the call to action */}
        <div className="rotate-1 border-y-4 border-neo-ink bg-neo-pink py-4 font-display text-3xl uppercase sm:text-5xl">
          <VelocityMarquee items={["Let's work together", 'Available now']} baseVelocity={-2.5} repeat={3} />
        </div>
        <Contact />
      </main>
      <Footer />
      </div>
    </LenisProvider>
  )
}
