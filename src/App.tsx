import { CustomCursor } from './components/effects/CustomCursor'
import { FilmGrain } from './components/effects/FilmGrain'
import { Footer } from './components/layout/Footer'
import { LazySection } from './components/layout/LazySection'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { sectionRegistry } from './components/sections/registry'
import { site } from './config/site'
import { SmoothScroll } from './lib/SmoothScroll'

// Las secciones bajo el hero van en chunks aparte (ver sections/registry.ts) y solo se montan las
// activadas en site.sections: el primer render espera únicamente al hero.
export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="inicio">
        <Hero />
        {sectionRegistry
          .filter(({ key }) => site.sections[key])
          .map(({ key, Component, id, placeholder }) => (
            <LazySection key={key} id={id} placeholder={placeholder}>
              <Component />
            </LazySection>
          ))}
      </main>
      <Footer />
      <FilmGrain />
      <CustomCursor />
    </SmoothScroll>
  )
}
