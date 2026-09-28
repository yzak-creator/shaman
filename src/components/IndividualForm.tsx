import { useState } from 'react'
import type { BirthProfile, JournalEntry, ReadingPayload } from '../types'
import { generateReading, saveReading } from '../lib/api'
import { ReadingDisplay } from './ReadingDisplay'
import { Mandala } from './Mandala'
import { User, Calendar, Clock, MapPin, PenLine, Sparkles, Loader2 } from 'lucide-react'
import type { ReadingResult } from '../types'

interface Props {
  onComplete: () => void
}

export function IndividualForm({ onComplete }: Props) {
  const [profile, setProfile] = useState<BirthProfile>({
    name: '',
    birth_date: '',
    birth_time: '12:00',
    birth_location: '',
    gender: '',
  })
  const [journal, setJournal] = useState<JournalEntry>({
    emotional_state: '',
    recent_events: '',
    recurring_patterns: '',
    intention: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReadingResult | null>(null)

  const valid = profile.name && profile.birth_date && profile.birth_location

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) {
      setError('Por favor completa nombre, fecha y lugar de nacimiento.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const payload: ReadingPayload = {
        mode: 'individual',
        profiles: [profile],
        journals: [journal],
      }
      const reading = await generateReading(payload)
      setResult(reading)
      await saveReading(payload, reading)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la lectura.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="space-y-6">
        <ReadingDisplay result={result} mode="individual" />
        <div className="flex justify-center gap-4">
          <button className="btn-ghost" onClick={() => setResult(null)}>
            Nueva Lectura
          </button>
          <button className="btn-primary" onClick={onComplete}>
            Volver al Inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in max-w-3xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Mandala size={80} />
        </div>
        <h2 className="font-ritual text-2xl text-shambhala-gold mb-2">
          Jornada Individual
        </h2>
        <p className="text-llama-300/60 text-sm">
          Ingresa tus datos de nacimiento y tu relato actual para recibir el diagnóstico.
        </p>
      </div>

      {/* Birth Profile */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <User size={16} className="text-shambhala-gold/70" />
          <h3 className="section-title">Perfil de Nacimiento</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="ritual-label">Nombre</label>
            <input
              className="ritual-input"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="ritual-label">Género (opcional)</label>
            <input
              className="ritual-input"
              value={profile.gender}
              onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
              placeholder="Femenino / Masculino / Otro"
            />
          </div>
          <div>
            <label className="ritual-label">
              <Calendar size={12} className="inline mr-1" /> Fecha de Nacimiento
            </label>
            <input
              type="date"
              className="ritual-input"
              value={profile.birth_date}
              onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
            />
          </div>
          <div>
            <label className="ritual-label">
              <Clock size={12} className="inline mr-1" /> Hora de Nacimiento
            </label>
            <input
              type="time"
              className="ritual-input"
              value={profile.birth_time}
              onChange={(e) => setProfile({ ...profile, birth_time: e.target.value })}
            />
          </div>
          <div className="md:col-span-2">
            <label className="ritual-label">
              <MapPin size={12} className="inline mr-1" /> Lugar de Nacimiento
            </label>
            <input
              className="ritual-input"
              value={profile.birth_location}
              onChange={(e) => setProfile({ ...profile, birth_location: e.target.value })}
              placeholder="Ciudad, País"
            />
          </div>
        </div>
      </div>

      {/* Journal Entry */}
      <div className="glass-panel p-6 space-y-4">
        <div className="flex items-center gap-2 mb-2">
          <PenLine size={16} className="text-shambhala-gold/70" />
          <h3 className="section-title">Relato Actual</h3>
        </div>
        <div>
          <label className="ritual-label">Estado Emocional</label>
          <textarea
            className="ritual-input min-h-[80px] resize-y"
            value={journal.emotional_state}
            onChange={(e) => setJournal({ ...journal, emotional_state: e.target.value })}
            placeholder="¿Cómo te sientes ahora? Describe tus emociones actuales con honestidad..."
          />
        </div>
        <div>
          <label className="ritual-label">Eventos Recientes</label>
          <textarea
            className="ritual-input min-h-[80px] resize-y"
            value={journal.recent_events}
            onChange={(e) => setJournal({ ...journal, recent_events: e.target.value })}
            placeholder="¿Qué ha sucedido en tu vida últimamente? Hechos, encuentros, coincidencias..."
          />
        </div>
        <div>
          <label className="ritual-label">Patrones Recurrentes</label>
          <textarea
            className="ritual-input min-h-[80px] resize-y"
            value={journal.recurring_patterns}
            onChange={(e) => setJournal({ ...journal, recurring_patterns: e.target.value })}
            placeholder="¿Qué patrones se repiten en tu vida? Relaciones, conflictos, miedos que vuelven..."
          />
        </div>
        <div>
          <label className="ritual-label">Intención</label>
          <textarea
            className="ritual-input min-h-[80px] resize-y"
            value={journal.intention}
            onChange={(e) => setJournal({ ...journal, intention: e.target.value })}
            placeholder="¿Qué quieres manifestar o sanar? Tu propósito, tu visión, tu pregunta al destino..."
          />
        </div>
      </div>

      {error && (
        <div className="glass-panel p-4 border-ocllo-500/30 text-ocllo-300 text-sm text-center">
          {error}
        </div>
      )}

      <div className="flex justify-center">
        <button type="submit" className="btn-primary" disabled={loading || !valid}>
          {loading ? (
            <>
              <Loader2 size={18} className="inline mr-2 animate-spin" />
              Procesando...
            </>
          ) : (
            <>
              <Sparkles size={16} className="inline mr-2" />
              Recibir Diagnóstico
            </>
          )}
        </button>
      </div>
    </form>
  )
}
