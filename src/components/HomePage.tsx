import { Mandala } from './Mandala'
import { User, Users, History, Sparkles } from 'lucide-react'

type View = 'home' | 'individual' | 'couple' | 'history'

interface Props {
  onNavigate: (view: View) => void
}

export function HomePage({ onNavigate }: Props) {
  return (
    <div className="animate-fade-in max-w-4xl mx-auto">
      {/* Hero */}
      <div className="text-center py-12 relative">
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <Mandala size={500} />
        </div>
        <div className="relative z-10">
          <div className="flex justify-center mb-6 animate-breathe">
            <Mandala size={140} />
          </div>
          <h1 className="font-ritual text-5xl md:text-6xl text-shimmer mb-4 tracking-wide">
            Ayni
          </h1>
          <p className="font-serif text-xl md:text-2xl text-llama-200/80 italic mb-2">
            Shamanic Life Journey
          </p>
          <p className="text-llama-300/60 text-sm max-w-xl mx-auto leading-relaxed">
            Diagnóstico psico-quântico xamânico-andino e astrología junguiana.
            Recorre las 12 Visões y descubre tu campo energético, tu Sombra y tu destino.
          </p>
        </div>
      </div>

      {/* Path Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
        <button
          onClick={() => onNavigate('individual')}
          className="glass-panel p-8 text-left group hover:border-amaru-400/40 transition-all duration-500 hover:transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-amaru-900/30 border border-amaru-700/40 flex items-center justify-center mb-4 group-hover:animate-breathe">
            <User size={24} className="text-amaru-400" />
          </div>
          <h3 className="font-ritual text-lg text-amaru-300 mb-2">Jornada Individual</h3>
          <p className="text-llama-300/60 text-sm leading-relaxed">
            Tu mapa de nacimiento, tu relato actual, tu Sombra y tu destino. Un diagnóstico profundo de tu campo energético.
          </p>
          <div className="flex items-center gap-1 text-amaru-400/70 text-xs mt-4 group-hover:gap-2 transition-all">
            <Sparkles size={12} />
            <span className="uppercase tracking-widest">Comenzar</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('couple')}
          className="glass-panel p-8 text-left group hover:border-tara-400/40 transition-all duration-500 hover:transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-tara-900/30 border border-tara-700/40 flex items-center justify-center mb-4 group-hover:animate-breathe">
            <Users size={24} className="text-tara-400" />
          </div>
          <h3 className="font-ritual text-lg text-tara-300 mb-2">Sinastria Shamanica</h3>
          <p className="text-llama-300/60 text-sm leading-relaxed">
            El choque de sombras, la alquimia esencial y el nó kármico entre dos almas. Para parejas en crisis o alineamiento.
          </p>
          <div className="flex items-center gap-1 text-tara-400/70 text-xs mt-4 group-hover:gap-2 transition-all">
            <Sparkles size={12} />
            <span className="uppercase tracking-widest">Comenzar</span>
          </div>
        </button>

        <button
          onClick={() => onNavigate('history')}
          className="glass-panel p-8 text-left group hover:border-shambhala-gold/40 transition-all duration-500 hover:transform hover:-translate-y-1"
        >
          <div className="w-12 h-12 rounded-xl bg-andes-900/30 border border-andes-700/40 flex items-center justify-center mb-4 group-hover:animate-breathe">
            <History size={24} className="text-shambhala-gold" />
          </div>
          <h3 className="font-ritual text-lg text-shambhala-gold mb-2">Historial</h3>
          <p className="text-llama-300/60 text-sm leading-relaxed">
            Tus lecturas anteriores, guardadas como piedras en el camino. Revisa tu evolución energética.
          </p>
          <div className="flex items-center gap-1 text-shambhala-gold/70 text-xs mt-4 group-hover:gap-2 transition-all">
            <Sparkles size={12} />
            <span className="uppercase tracking-widest">Ver</span>
          </div>
        </button>
      </div>

      {/* Footer note */}
      <div className="text-center mt-12 text-llama-300/30 text-xs">
        <p className="font-serif italic">
          "El Ayni es la reciprocidad sagrada — el intercambio de energía que mantiene el universo en movimiento."
        </p>
      </div>
    </div>
  )
}
