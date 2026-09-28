import { useState } from 'react'
import { Starfield } from './components/Starfield'
import { HomePage } from './components/HomePage'
import { IndividualForm } from './components/IndividualForm'
import { CoupleForm } from './components/CoupleForm'
import { HistoryPage } from './components/HistoryPage'
import { Home } from 'lucide-react'

type View = 'home' | 'individual' | 'couple' | 'history'

export default function App() {
  const [view, setView] = useState<View>('home')

  function navigate(v: View) {
    setView(v)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen relative">
      <Starfield />

      {/* Top bar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-shambhala-deep/70 border-b border-andes-900/40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => navigate('home')}
            className="flex items-center gap-2 group"
          >
            <div className="w-7 h-7 rounded-full border border-shambhala-gold/40 flex items-center justify-center group-hover:border-shambhala-gold/70 transition-all">
              <div className="w-3 h-3 rounded-full bg-shambhala-gold/70 group-hover:bg-shambhala-gold transition-all" />
            </div>
            <span className="font-ritual text-sm text-shambhala-gold tracking-widest">AYNI</span>
          </button>

          {view !== 'home' && (
            <button
              onClick={() => navigate('home')}
              className="btn-ghost text-xs"
            >
              <Home size={14} className="inline mr-1" />
              Inicio
            </button>
          )}
        </div>
      </header>

      {/* Main content */}
      <main className="px-4 py-8 max-w-5xl mx-auto">
        {view === 'home' && <HomePage onNavigate={navigate} />}
        {view === 'individual' && <IndividualForm onComplete={() => navigate('home')} />}
        {view === 'couple' && <CoupleForm onComplete={() => navigate('home')} />}
        {view === 'history' && <HistoryPage onBack={() => navigate('home')} />}
      </main>

      <footer className="py-6 text-center text-llama-300/30 text-xs">
        <p className="font-serif italic">Ayni — Shamanic Life Journey</p>
      </footer>
    </div>
  )
}
