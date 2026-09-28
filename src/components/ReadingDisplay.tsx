import type { ReadingResult } from '../types'
import { MetricRing } from './MetricRing'
import { Mandala } from './Mandala'
import { Mountain, Eye, Swords, Sparkles, Scroll, Heart, Moon, Flame, BookOpen } from 'lucide-react'

interface ReadingDisplayProps {
  result: ReadingResult
  mode: 'individual' | 'couple'
}

export function ReadingDisplay({ result, mode }: ReadingDisplayProps) {
  const { reading_summary, astros_alignment, shadow_diagnosis, structural_myth, ayni_prescription } = result
  const { sami_index, hucha_score, flow_rate } = reading_summary.collective_metrics

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ── Header / Title ─────────────────────────────── */}
      <div className="glass-panel p-8 text-center relative overflow-hidden">
        <div className="absolute top-4 right-4 opacity-10">
          <Mandala size={120} />
        </div>
        <div className="absolute top-4 left-4 opacity-10">
          <Mandala size={120} />
        </div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 text-shambhala-gold/60 mb-3">
            <Sparkles size={16} />
            <span className="section-title">Diagnóstico Xamânico</span>
            <Sparkles size={16} />
          </div>
          <h2 className="font-ritual text-3xl md:text-4xl text-shambhala-gold mb-2 tracking-wide">
            {reading_summary.title}
          </h2>
          <p className="text-llama-300/80 text-sm uppercase tracking-widest">
            {reading_summary.journey_stage}
          </p>
        </div>
      </div>

      {/* ── Metrics ────────────────────────────────────── */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6">
          <Mountain size={18} className="text-shambhala-gold/70" />
          <h3 className="section-title">Métricas del Campo Energético</h3>
        </div>
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          <MetricRing label="Sami Index" value={sami_index} color="#47bf85" />
          <MetricRing label="Hucha Score" value={hucha_score} color="#e85d24" />
          <MetricRing label="Flow Rate" value={flow_rate} color="#599fff" />
        </div>
        <div className="mt-6 space-y-2 text-sm text-llama-200/70 max-w-2xl mx-auto text-center">
          <p>
            <span className="text-kukhi-400 font-medium">Sami</span> — energía refinada captada de la naturaleza y proyectada como amor incondicional.
          </p>
          <p>
            <span className="text-amaru-400 font-medium">Hucha</span> — densidad de la Sombra, activación de los mecanismos de defensa del Ego.
          </p>
          <p>
            <span className="text-tara-400 font-medium">Flow</span> — frecuencia de sincronicidad, colapso de coincidencias significativas e intuición activa.
          </p>
        </div>
      </div>

      {/* ── Astros Alignment ───────────────────────────── */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6">
          <Moon size={18} className="text-shambhala-gold/70" />
          <h3 className="section-title">Alineación Astral</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {astros_alignment.map((astro, i) => (
            <div
              key={i}
              className="bg-shambhala-mist/40 border border-andes-800/40 rounded-xl p-4 hover:border-shambhala-gold/30 transition-all duration-300"
            >
              <div className="text-xs uppercase tracking-widest text-llama-300/50 mb-1">
                {astro.label}
              </div>
              <div className="text-lg font-ritual text-shambhala-gold mb-1">
                {astro.value}
              </div>
              <div className="text-xs text-llama-300/60 italic">
                {astro.archetype}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Shadow Diagnosis ───────────────────────────── */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6">
          <Eye size={18} className="text-amaru-400/80" />
          <h3 className="section-title" style={{ color: '#ed7d44' }}>Diagnóstico de la Sombra</h3>
        </div>
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Flame size={14} className="text-amaru-400/70" />
              <span className="text-xs uppercase tracking-widest text-amaru-300/70">Drama Primario</span>
            </div>
            <p className="text-llama-100 leading-relaxed">{shadow_diagnosis.primary_drama}</p>
          </div>
          <div className="h-px bg-andes-800/40" />
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Swords size={14} className="text-amaru-400/70" />
              <span className="text-xs uppercase tracking-widest text-amaru-300/70">Mecanismo Gatillador</span>
            </div>
            <p className="text-llama-100 leading-relaxed">{shadow_diagnosis.trigger_mechanism}</p>
          </div>
          {shadow_diagnosis.interlocking_dynamic && (
            <>
              <div className="h-px bg-andes-800/40" />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Heart size={14} className="text-amaru-400/70" />
                  <span className="text-xs uppercase tracking-widest text-amaru-300/70">
                    Danza de Drenaje Mutuo {mode === 'couple' ? '' : ''}
                  </span>
                </div>
                <p className="text-llama-100 leading-relaxed">
                  {shadow_diagnosis.interlocking_dynamic}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Structural Myth ────────────────────────────── */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen size={18} className="text-shambhala-gold/70" />
          <h3 className="section-title">Mito Estrutural</h3>
        </div>
        <div className="space-y-5">
          <div>
            <span className="text-xs uppercase tracking-widest text-llama-300/50 block mb-2">
              Oposición Binária (Lévi-Strauss)
            </span>
            <p className="text-llama-100 leading-relaxed font-medium">
              {structural_myth.binary_opposition}
            </p>
          </div>
          <div className="h-px bg-andes-800/40" />
          <div>
            <span className="text-xs uppercase tracking-widest text-llama-300/50 block mb-2">
              Nó Kármico
            </span>
            <p className="text-llama-100 leading-relaxed">
              {structural_myth.karmic_anchor}
            </p>
          </div>
          <div className="h-px bg-andes-800/40" />
          <div>
            <span className="text-xs uppercase tracking-widest text-llama-300/50 block mb-2">
              Resolución Mítica
            </span>
            <p className="text-llama-100 leading-relaxed">
              {structural_myth.myth_resolution}
            </p>
          </div>
        </div>
      </div>

      {/* ── Ayni Prescription ──────────────────────────── */}
      <div className="glass-panel p-8">
        <div className="flex items-center gap-2 mb-6">
          <Scroll size={18} className="text-kukhi-400/80" />
          <h3 className="section-title" style={{ color: '#47bf85' }}>Prescripción Ayni</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="bg-kukhi-900/20 border border-kukhi-700/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-kukhi-700/30 flex items-center justify-center">
                <span className="text-kukhi-300 text-xs font-ritual">1</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-kukhi-300/70">
                {mode === 'couple' ? 'Compañero 1' : 'Práctica Principal'}
              </span>
            </div>
            <p className="text-llama-100 leading-relaxed text-sm">
              {ayni_prescription.partner_1_action}
            </p>
          </div>
          <div className="bg-kukhi-900/20 border border-kukhi-700/30 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-kukhi-700/30 flex items-center justify-center">
                <span className="text-kukhi-300 text-xs font-ritual">2</span>
              </div>
              <span className="text-xs uppercase tracking-widest text-kukhi-300/70">
                {mode === 'couple' ? 'Compañero 2' : 'Práctica de Integración'}
              </span>
            </div>
            <p className="text-llama-100 leading-relaxed text-sm">
              {ayni_prescription.partner_2_action}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
