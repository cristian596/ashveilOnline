import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'

export default function App() {
  return (
    <>
      <Navbar />
      <main id="inicio">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
