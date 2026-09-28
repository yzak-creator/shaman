export interface BirthProfile {
  name: string
  birth_date: string
  birth_time: string
  birth_location: string
  gender?: string
}

export interface JournalEntry {
  emotional_state: string
  recent_events: string
  recurring_patterns: string
  intention: string
}

export interface ReadingPayload {
  mode: 'individual' | 'couple'
  profiles: BirthProfile[]
  journals: JournalEntry[]
  question?: string
}

export interface AstrosAlignment {
  label: string
  value: string
  archetype: string
}

export interface ReadingResult {
  reading_summary: {
    title: string
    journey_stage: string
    collective_metrics: {
      sami_index: number
      hucha_score: number
      flow_rate: number
    }
  }
  astros_alignment: AstrosAlignment[]
  shadow_diagnosis: {
    primary_drama: string
    trigger_mechanism: string
    interlocking_dynamic?: string
  }
  structural_myth: {
    binary_opposition: string
    karmic_anchor: string
    myth_resolution: string
  }
  ayni_prescription: {
    partner_1_action: string
    partner_2_action: string
  }
}

export interface ReadingRecord {
  id: string
  mode: 'individual' | 'couple'
  payload: ReadingPayload
  result: ReadingResult
  created_at: string
}
