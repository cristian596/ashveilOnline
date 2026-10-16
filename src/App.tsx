import { lazy } from 'react'
import { CustomCursor } from './components/effects/CustomCursor'
import { FilmGrain } from './components/effects/FilmGrain'
import { Footer } from './components/layout/Footer'
import { LazySection } from './components/layout/LazySection'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { site } from './config/site'
import { SmoothScroll } from './lib/SmoothScroll'

// Todo lo que está bajo el hero va en chunks aparte: el primer render solo espera al hero.
// React.lazy pide los chunks al montar App, así que llegan en paralelo justo después del principal.
const Pillars = lazy(() => import('./components/sections/Pillars').then((m) => ({ default: m.Pillars })))
const Classes = lazy(() => import('./components/sections/Classes').then((m) => ({ default: m.Classes })))
const Lore = lazy(() => import('./components/sections/Lore').then((m) => ({ default: m.Lore })))
const Journey = lazy(() => import('./components/sections/Journey').then((m) => ({ default: m.Journey })))
const Timeline = lazy(() => import('./components/sections/Timeline').then((m) => ({ default: m.Timeline })))
const Community = lazy(() => import('./components/sections/Community').then((m) => ({ default: m.Community })))
const Faq = lazy(() => import('./components/sections/Faq').then((m) => ({ default: m.Faq })))
const FinalCta = lazy(() => import('./components/sections/FinalCta').then((m) => ({ default: m.FinalCta })))

export default function App() {
  return (
    <SmoothScroll>
      <Navbar />
      <main id="inicio">
        <Hero />
        {/* Alturas de los placeholders medidas a 390, 768 y 1440 px de ancho;
            si cambias el contenido de una sección, vuelve a medirla. */}
        <LazySection placeholder="h-[1155px] sm:h-[765px] lg:h-[730px]">
          <Pillars />
        </LazySection>
        <LazySection id={site.classes.id} placeholder="h-[820px] sm:h-[725px] lg:h-[850px]">
          <Classes />
        </LazySection>
        <LazySection id={site.lore.id} placeholder="h-[1065px] sm:h-[850px] lg:h-[975px]">
          <Lore />
        </LazySection>
        <LazySection id={site.journey.id} placeholder="h-[400svh]">
          <Journey />
        </LazySection>
        <LazySection placeholder="h-[895px] sm:h-[835px] lg:h-[955px]">
          <Timeline />
        </LazySection>
        <LazySection id={site.community.id} placeholder="h-[1750px] sm:h-[1335px] lg:h-[1020px]">
          <Community />
        </LazySection>
        <LazySection placeholder="h-[795px] sm:h-[800px] lg:h-[925px]">
          <Faq />
        </LazySection>
        <LazySection id={site.finalCta.id} placeholder="h-[637px] sm:h-[575px] lg:h-[746px]">
          <FinalCta />
        </LazySection>
      </main>
      <Footer />
      <FilmGrain />
      <CustomCursor />
    </SmoothScroll>
  )
}
