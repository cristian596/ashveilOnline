import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Classes } from './components/sections/Classes'
import { Community } from './components/sections/Community'
import { Faq } from './components/sections/Faq'
import { FinalCta } from './components/sections/FinalCta'
import { Hero } from './components/sections/Hero'
import { Lore } from './components/sections/Lore'
import { Pillars } from './components/sections/Pillars'
import { Timeline } from './components/sections/Timeline'
import { SmoothScroll } from './lib/SmoothScroll'

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="inicio">
        <Hero />
        <Pillars />
        <Classes />
        <Lore />
        <Timeline />
        <Community />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </SmoothScroll>
  )
}
