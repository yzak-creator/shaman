import { useState } from 'react'
import type { BirthProfile, JournalEntry, ReadingPayload, ReadingResult } from '../types'
import { generateReading, saveReading } from '../lib/api'
import { ReadingDisplay } from './ReadingDisplay'
import { Mandala } from './Mandala'
import { Users, Calendar, Clock, MapPin, PenLine, Sparkles, Loader2, User } from 'lucide-react'

interface Props {
  onComplete: () => void
}

const emptyProfile: BirthProfile = {
  name: '',
  birth_date: '',
  birth_time: '12:00',
  birth_location: '',
  gender: '',
}

const emptyJournal: JournalEntry = {
  emotional_state: '',
  recent_events: '',
  recurring_patterns: '',
  intention: '',
}

function ProfileSection({
  title,
  profile,
  setProfile,
  journal,
  setJournal,
  accent,
}: {
  title: string
  profile: BirthProfile
  setProfile: (p: BirthProfile) => void
  journal: JournalEntry
  setJournal: (j: JournalEntry) => void
  accent: string
}) {
  return (
    <div className="glass-panel p-6 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <User size={16} style={{ color: accent }} />
        <h3 className="section-title" style={{ color: accent }}>{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="ritual-label">Nombre</label>
          <input
            className="ritual-input"
            value={profile.name}
            onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            placeholder="Nombre"
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
          <label className="ritual-label"><Calendar size={12} className="inline mr-1" /> Fecha</label>
          <input
            type="date"
            className="ritual-input"
            value={profile.birth_date}
            onChange={(e) => setProfile({ ...profile, birth_date: e.target.value })}
          />
        </div>
        <div>
          <label className="ritual-label"><Clock size={12} className="inline mr-1" /> Hora</label>
          <input
            type="time"
            className="ritual-input"
            value={profile.birth_time}
            onChange={(e) => setProfile({ ...profile, birth_time: e.target.value })}
          />
        </div>
        <div className="md:col-span-2">
          <label className="ritual-label"><MapPin size={12} className="inline mr-1" /> Lugar</label>
          <input
            className="ritual-input"
            value={profile.birth_location}
            onChange={(e) => setProfile({ ...profile, birth_location: e.target.value })}
            placeholder="Ciudad, País"
          />
        </div>
      </div>
      <div className="space-y-3 pt-2">
        <div className="flex items-center gap-2">
          <PenLine size={14} style={{ color: accent, opacity: 0.7 }} />
          <span className="text-xs uppercase tracking-widest text-llama-300/50">Relato</span>
        </div>
        <div>
          <label className="ritual-label">Estado Emocional</label>
          <textarea
            className="ritual-input min-h-[60px] resize-y"
            value={journal.emotional_state}
            onChange={(e) => setJournal({ ...journal, emotional_state: e.target.value })}
            placeholder="¿Cómo se siente esta persona ahora?"
          />
        </div>
        <div>
          <label className="ritual-label">Patrones Recurrentes</label>
          <textarea
            className="ritual-input min-h-[60px] resize-y"
            value={journal.recurring_patterns}
            onChange={(e) => setJournal({ ...journal, recurring_patterns: e.target.value })}
            placeholder="¿Qué patrones se repiten en la relación o en la vida de esta persona?"
          />
        </div>
        <div>
          <label className="ritual-label">Intención</label>
          <textarea
            className="ritual-input min-h-[60px] resize-y"
            value={journal.intention}
            onChange={(e) => setJournal({ ...journal, intention: e.target.value })}
            placeholder="¿Qué busca esta persona en la relación?"
          />
        </div>
      </div>
    </div>
  )
}

export function CoupleForm({ onComplete }: Props) {
  const [profile1, setProfile1] = useState<BirthProfile>(emptyProfile)
  const [profile2, setProfile2] = useState<BirthProfile>(emptyProfile)
  const [journal1, setJournal1] = useState<JournalEntry>(emptyJournal)
  const [journal2, setJournal2] = useState<JournalEntry>(emptyJournal)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [result, setResult] = useState<ReadingResult | null>(null)

  const valid =
    profile1.name && profile1.birth_date && profile1.birth_location &&
    profile2.name && profile2.birth_date && profile2.birth_location

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!valid) {
      setError('Completa los datos de nacimiento de ambos compañeros.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const payload: ReadingPayload = {
        mode: 'couple',
        profiles: [profile1, profile2],
        journals: [journal1, journal2],
      }
      const reading = await generateReading(payload)
      setResult(reading)
      await saveReading(payload, reading)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la sinastria.')
    } finally {
      setLoading(false)
    }
  }

  if (result) {
    return (
      <div className="space-y-6">
        <ReadingDisplay result={result} mode="couple" />
        <div className="flex justify-center gap-4">
          <button className="btn-ghost" onClick={() => setResult(null)}>
            Nueva Sinastria
          </button>
          <button className="btn-primary" onClick={onComplete}>
            Volver al Inicio
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in max-w-5xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Mandala size={80} />
        </div>
        <h2 className="font-ritual text-2xl text-shambhala-gold mb-2">
          Sinastria Shamanica
        </h2>
        <p className="text-llama-300/60 text-sm">
          Cruce de sombras, alquimia esencial y nó kármico entre dos almas.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProfileSection
          title="Compañero 1"
          profile={profile1}
          setProfile={setProfile1}
          journal={journal1}
          setJournal={setJournal1}
          accent="#ed7d44"
        />
        <ProfileSection
          title="Compañero 2"
          profile={profile2}
          setProfile={setProfile2}
          journal={journal2}
          setJournal={setJournal2}
          accent="#599fff"
        />
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
              Cruzando Destinos...
            </>
          ) : (
            <>
              <Users size={16} className="inline mr-2" />
              Realizar Sinastria
            </>
          )}
        </button>
      </div>
    </form>
  )
}
