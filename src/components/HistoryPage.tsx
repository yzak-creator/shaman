import { useEffect, useState } from 'react'
import type { ReadingRecord } from '../types'
import { fetchReadings, deleteReading } from '../lib/api'
import { ReadingDisplay } from './ReadingDisplay'
import { Mandala } from './Mandala'
import { History, Trash2, ArrowLeft, Users, User, Calendar } from 'lucide-react'

interface Props {
  onBack: () => void
}

export function HistoryPage({ onBack }: Props) {
  const [readings, setReadings] = useState<ReadingRecord[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<ReadingRecord | null>(null)

  useEffect(() => {
    fetchReadings().then((data) => {
      setReadings(data)
      setLoading(false)
    })
  }, [])

  async function handleDelete(id: string) {
    const ok = await deleteReading(id)
    if (ok) {
      setReadings(readings.filter((r) => r.id !== id))
    }
  }

  if (selected) {
    return (
      <div className="space-y-6 animate-fade-in">
        <button className="btn-ghost" onClick={() => setSelected(null)}>
          <ArrowLeft size={14} className="inline mr-2" />
          Volver al Historial
        </button>
        <ReadingDisplay result={selected.result} mode={selected.mode} />
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <Mandala size={70} />
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <History size={18} className="text-shambhala-gold/70" />
          <h2 className="font-ritual text-2xl text-shambhala-gold">Historial de Lecturas</h2>
        </div>
        <p className="text-llama-300/60 text-sm">
          Tus diagnósticos anteriores permanecen aquí, como piedras en el camino.
        </p>
      </div>

      <button className="btn-ghost mb-4" onClick={onBack}>
        <ArrowLeft size={14} className="inline mr-2" />
        Volver al Inicio
      </button>

      {loading ? (
        <div className="glass-panel p-8 text-center text-llama-300/60">
          Cargando historial...
        </div>
      ) : readings.length === 0 ? (
        <div className="glass-panel p-12 text-center">
          <Mandala size={60} className="mx-auto mb-4 opacity-50" />
          <p className="text-llama-300/50">
            Aún no hay lecturas. Tu camino comienza ahora.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {readings.map((reading) => (
            <div
              key={reading.id}
              className="glass-panel p-5 flex items-center justify-between gap-4 hover:border-shambhala-gold/30 transition-all duration-300 cursor-pointer group"
              onClick={() => setSelected(reading)}
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="flex-shrink-0">
                  {reading.mode === 'couple' ? (
                    <div className="w-10 h-10 rounded-full bg-tara-900/30 border border-tara-700/40 flex items-center justify-center">
                      <Users size={18} className="text-tara-400" />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-amaru-900/30 border border-amaru-700/40 flex items-center justify-center">
                      <User size={18} className="text-amaru-400" />
                    </div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-ritual text-sm text-shambhala-gold truncate">
                    {reading.result.reading_summary.title}
                  </div>
                  <div className="text-xs text-llama-300/50 truncate mt-1">
                    {reading.mode === 'couple' ? 'Sinastria' : 'Individual'} —{' '}
                    {reading.payload.profiles.map((p) => p.name).join(' × ')}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-llama-300/40 mt-1">
                    <Calendar size={10} />
                    {new Date(reading.created_at).toLocaleDateString('es', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="hidden sm:flex gap-2">
                  <span className="text-xs text-kukhi-400">{reading.result.reading_summary.collective_metrics.sami_index}%</span>
                  <span className="text-xs text-amaru-400">{reading.result.reading_summary.collective_metrics.hucha_score}%</span>
                </div>
                <button
                  className="opacity-0 group-hover:opacity-100 text-llama-300/40 hover:text-ocllo-400 transition-all p-1"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDelete(reading.id)
                  }}
                  aria-label="Eliminar"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
