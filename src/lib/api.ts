import { supabase } from '../lib/supabase'
import type { ReadingPayload, ReadingResult, ReadingRecord } from '../types'

const EDGE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ayni-engine`

export async function generateReading(payload: ReadingPayload): Promise<ReadingResult> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY
  if (anonKey) {
    headers['Authorization'] = `Bearer ${anonKey}`
  }

  const res = await fetch(EDGE_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const errBody = await res.json().catch(() => ({}))
    throw new Error(errBody.error || `El motor Ayni respondió ${res.status}`)
  }

  const data = await res.json()
  if (!data.reading_summary || !data.shadow_diagnosis) {
    throw new Error('Respuesta del motor incompleta o malformada.')
  }
  return data as ReadingResult
}

export async function saveReading(
  payload: ReadingPayload,
  result: ReadingResult,
): Promise<ReadingRecord | null> {
  const { data, error } = await supabase
    .from('readings')
    .insert({ mode: payload.mode, payload, result })
    .select('*')
    .single()

  if (error) {
    console.error('Error guardando lectura:', error)
    return null
  }
  return data as ReadingRecord
}

export async function fetchReadings(): Promise<ReadingRecord[]> {
  const { data, error } = await supabase
    .from('readings')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Error cargando historial:', error)
    return []
  }
  return (data as ReadingRecord[]) || []
}

export async function deleteReading(id: string): Promise<boolean> {
  const { error } = await supabase.from('readings').delete().eq('id', id)
  if (error) {
    console.error('Error eliminando lectura:', error)
    return false
  }
  return true
}
