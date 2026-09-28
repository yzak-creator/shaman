import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

// ═══════════════════════════════════════════════════════════════
// AYNI SHAMANIC ENGINE — Psycho-Quantum Diagnostic Processor
// ═══════════════════════════════════════════════════════════════

interface BirthProfile {
  name: string;
  birth_date: string;
  birth_time: string;
  birth_location: string;
  gender?: string;
}

interface JournalEntry {
  emotional_state: string;
  recent_events: string;
  recurring_patterns: string;
  intention: string;
}

interface Payload {
  mode: "individual" | "couple";
  profiles: BirthProfile[];
  journals: JournalEntry[];
  question?: string;
}

// ── Astrological sign calculation ──────────────────────────────
const ZODIAC: { sign: string; element: string; archetype: string; modality: string; ruling: string; shadow: string; drama: string }[] = [
  { sign: "Aries", element: "Fuego", archetype: "El Guerrero", modality: "Cardinal", ruling: "Marte", shadow: "Impaciencia, furia, imposición", drama: "Intimidador" },
  { sign: "Tauro", element: "Tierra", archetype: "El Constructor", modality: "Fijo", ruling: "Venus", shadow: "Inercia, posesividad, terquedad", drama: "Distante" },
  { sign: "Géminis", element: "Aire", archetype: "El Mensajero", modality: "Mutable", ruling: "Mercurio", shadow: "Dispersión, dualidad, evasión", drama: "Interrogador" },
  { sign: "Cáncer", element: "Agua", archetype: "La Madre", modality: "Cardinal", ruling: "Luna", shadow: "Dependencia, victimización, nostalgia", drama: "Coitadinho" },
  { sign: "Leo", element: "Fuego", archetype: "El Rey", modality: "Fijo", ruling: "Sol", shadow: "Orgullo, egocentrismo, tiranía", drama: "Intimidador" },
  { sign: "Virgo", element: "Tierra", archetype: "El Sanador", modality: "Mutable", ruling: "Mercurio", shadow: "Criticismo, ansiedad, purismo", drama: "Interrogador" },
  { sign: "Libra", element: "Aire", archetype: "El Diplomático", modality: "Cardinal", ruling: "Venus", shadow: "Indecisión, complacencia, evasión", drama: "Coitadinho" },
  { sign: "Escorpio", element: "Agua", archetype: "El Chamán", modality: "Fijo", ruling: "Plutón", shadow: "Control, venganza, obsesión", drama: "Interrogador" },
  { sign: "Sagitario", element: "Fuego", archetype: "El Explorador", modality: "Mutable", ruling: "Júpiter", shadow: "Dogmatismo, exceso, fuga", drama: "Distante" },
  { sign: "Capricornio", element: "Tierra", archetype: "El Anciano", modality: "Cardinal", ruling: "Saturno", shadow: "Rigidez, aislamiento, cinismo", drama: "Intimidador" },
  { sign: "Acuario", element: "Aire", archetype: "El Visionario", modality: "Fijo", ruling: "Urano", shadow: "Desapego emocional, rebeldía, frialdad", drama: "Distante" },
  { sign: "Piscis", element: "Agua", archetype: "El Místico", modality: "Mutable", ruling: "Neptuno", shadow: "Confusión, evasión, sacrificio", drama: "Coitadinho" },
];

function getZodiacSign(dateStr: string): typeof ZODIAC[0] {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return ZODIAC[8];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dateNum = month * 100 + day;
  // signRanges sorted in calendar order (Jan → Dec)
  const signRanges: { sign: number; start: number; end: number }[] = [
    { sign: 9, start: 101, end: 119 },   // Capricornio: Jan 1 – Jan 19
    { sign: 10, start: 120, end: 218 },  // Acuario: Jan 20 – Feb 18
    { sign: 11, start: 219, end: 320 },  // Piscis: Feb 19 – Mar 20
    { sign: 0, start: 321, end: 419 },   // Aries: Mar 21 – Apr 19
    { sign: 1, start: 420, end: 520 },   // Tauro: Apr 20 – May 20
    { sign: 2, start: 521, end: 620 },   // Géminis: May 21 – Jun 20
    { sign: 3, start: 621, end: 722 },   // Cáncer: Jun 21 – Jul 22
    { sign: 4, start: 723, end: 822 },   // Leo: Jul 23 – Aug 22
    { sign: 5, start: 823, end: 922 },   // Virgo: Aug 23 – Sep 22
    { sign: 6, start: 923, end: 1022 },  // Libra: Sep 23 – Oct 22
    { sign: 7, start: 1023, end: 1121 }, // Escorpio: Oct 23 – Nov 21
    { sign: 8, start: 1122, end: 1221 }, // Sagitario: Nov 22 – Dec 21
    { sign: 9, start: 1222, end: 1231 }, // Capricornio: Dec 22 – Dec 31
  ];
  for (const r of signRanges) {
    if (dateNum >= r.start && dateNum <= r.end) return ZODIAC[r.sign];
  }
  return ZODIAC[9];
}

// ── Moon phase calculation ─────────────────────────────────────
function getMoonPhase(dateStr: string): { phase: string; archetype: string } {
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return { phase: "Luna Llena", archetype: "Iluminación" };
  const knownNewMoon = new Date("2000-01-06T18:14:00Z");
  const lunarCycle = 29.530588853;
  const daysSince = (date.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
  const phaseNum = ((daysSince % lunarCycle) + lunarCycle) % lunarCycle;
  const fraction = phaseNum / lunarCycle;
  if (fraction < 0.03 || fraction > 0.97) return { phase: "Luna Nueva", archetype: "Siembra" };
  if (fraction < 0.22) return { phase: "Luna Creciente", archetype: "Crecimiento" };
  if (fraction < 0.28) return { phase: "Cuarto Creciente", archetype: "Acción" };
  if (fraction < 0.47) return { phase: "Gibosa Creciente", archetype: "Refinamiento" };
  if (fraction < 0.53) return { phase: "Luna Llena", archetype: "Iluminación" };
  if (fraction < 0.72) return { phase: "Gibosa Menguante", archetype: "Integración" };
  if (fraction < 0.78) return { phase: "Cuarto Menguante", archetype: "Liberación" };
  return { phase: "Luna Menguante", archetype: "Entrega" };
}

// ── Chinese element from birth year ────────────────────────────
function getChineseElement(year: number): string {
  const elements = ["Metal", "Agua", "Madera", "Fuego", "Tierra"];
  const stems = ["Yang", "Yin"];
  const stemIdx = (year - 4) % 2;
  const elemIdx = Math.floor(((year - 4) % 10) / 2);
  return `${stems[stemIdx]} ${elements[elemIdx]}`;
}

function getChineseAnimal(year: number): string {
  const animals = ["Rata", "Buey", "Tigre", "Conejo", "Dragón", "Serpiente", "Caballo", "Cabra", "Mono", "Gallo", "Perro", "Cerdo"];
  return animals[(year - 4) % 12];
}

// ── Journal text analysis for Hucha/Sami scoring ───────────────
const HUCHA_KEYWORDS = ["ansiedad", "miedo", "rabia", "ira", "culpa", "vergüenza", "tristeza", "vacío", "soledad", "abandono", "traición", "fracaso", "desesperación", "agotado", "perdido", "confusión", "conflicto", "pelea", "ruptura", "distancia", "rechazo", "inseguridad", "control", "manipulación", "celos", "posesivo", "víctima", "injusticia", "opresión", "duda", "parálisis", "estancado", "oscuridad", "dolor", "herida", "sombra"];

const SAMI_KEYWORDS = ["gratitud", "amor", "paz", "alegría", "abundancia", "fluidez", "confianza", "fe", "propósito", "misión", "sueño", "visión", "creación", "manifestar", "energía", "luz", "conexión", "naturaleza", "meditación", "silencio", "intuición", "sincronicidad", "despertar", "alquimia", "cura", "perdón", "compasión", "expansión", "libertad", "verdad"];

const FLOW_KEYWORDS = ["sincronicidad", "coincidencia", "intuición", "señal", "símbolo", "sueño", "presagio", "dejavu", "camino", "encuentro", "puerta", "portal", "mensaje", "guía", "destino", "flujo", "alineación"];

function analyzeText(text: string, keywords: string[]): number {
  if (!text) return 0;
  const lower = text.toLowerCase();
  let count = 0;
  for (const kw of keywords) {
    if (lower.includes(kw)) count++;
  }
  return count;
}

function textLength(text: string): number {
  return text ? text.trim().length : 0;
}

// ── Element compatibility for couples ──────────────────────────
const ELEMENT_HARMONY: Record<string, Record<string, number>> = {
  "Fuego": { "Fuego": 60, "Tierra": 35, "Aire": 85, "Agua": 40 },
  "Tierra": { "Fuego": 35, "Tierra": 70, "Aire": 45, "Agua": 80 },
  "Aire": { "Fuego": 85, "Tierra": 45, "Aire": 65, "Agua": 50 },
  "Agua": { "Fuego": 40, "Tierra": 80, "Aire": 50, "Agua": 75 },
};

const DRAMA_INTERLOCK: Record<string, Record<string, string>> = {
  "Intimidador": {
    "Coitadinho": "El Intimidador proyecta fuerza y el Coitadinho absorbe el golpe como confirmación de su invalidez — un circuito de drenaje donde la fuerza del uno alimenta el martyrio del otro.",
    "Interrogador": "El Intimidador impone y el Interrogador escruta el porqué de la imposición — ambos luchando por control desde ángulos opuestos: el poder bruto contra el poder del análisis.",
    "Distante": "El Intimidador lanza llamaradas contra un muro de silencio — el Distante se retira más ante cada choque, intensificando la furia del Intimidador en un espiral de frustración creciente.",
    "Intimidador": "Dos fuegos que compiten por dominar el mismo territorio — cada uno intenta sobrepasar al otro, generando un campo de batalla donde nadie cede terreno.",
  },
  "Interrogador": {
    "Coitadinho": "El Interrogador examina y el Coitadinho se desmorona bajo el escrutinio — el cuestionamiento es recibido como ataque, reforzando el rol de víctima y justificando más preguntas.",
    "Distante": "El Interrogador presiona para obtener respuestas y el Distante se cierra más — cuanto mayor la presión, mayor el retraimiento, en un ciclo de persecución-evitación que drena a ambos.",
    "Intimidador": "El Interrogador examina y el Intimidador estalla ante el cuestionamiento — el análisis es vivido como amenaza al control, detonando reacciones explosivas.",
    "Interrogador": "Dos mentes que se escrutan mutuamente — paranoia compartida donde cada movimiento del otro es sospechoso, generando un campo de desconfianza paralizante.",
  },
  "Distante": {
    "Intimidador": "El Distante se retira y el Intimidador estalla por la falta de respuesta — el silencio como provocación, la furia como respuesta, un circuito de abandono activo y pasivo.",
    "Interrogador": "El Distante se evade y el Interrogador persigue con preguntas — persecución y fuga, donde el silencio alimenta la obsesión del otro por entender.",
    "Coitadinho": "El Distante se ausenta y el Coitadinho se hunde en la soledad del abandono — la evasión del uno confirma el miedo a no ser amado del otro.",
    "Distante": "Dos islas que se miran a través del mar — ninguno da el primer paso, el silencio se vuelve pacto de no-agresión que lentamente se convierte en tumba.",
  },
  "Coitadinho": {
    "Intimidador": "El Coitadinho sufre y el Intimidador reacciona con impaciencia ante el dolor ajeno — la víctima se siente más víctima, el fuerte se siente atacado por la debilidad.",
    "Interrogador": "El Coitadinho se queja y el Interrogador analiza las quejas buscando fallas — el sufrimiento es cuestionado, lo que profundiza la herida.",
    "Distante": "El Coitadinho clama por atención y el Distante se abruma y se retira — la demanda emocional ahuyenta, confirmando el abandono que el Coitadinho temía.",
    "Coitadinho": "Dos víctimas que compiten por quien sufre más — nadie sostiene a nadie, ambos hundiéndose en el mismo pozo, alimentando la narrativa de desdicha mutua.",
  },
};

// ── Binary opposition (Lévi-Strauss) ───────────────────────────
function getBinaryOpposition(elem1: string, elem2: string, mod1: string, mod2: string, drama1: string, drama2: string): string {
  const elemPairs: Record<string, string> = { "Fuego": "Tierra", "Aire": "Agua" };
  const inv: Record<string, string> = { "Tierra": "Fuego", "Agua": "Aire" };
  const termA = elem1;
  const termB = elem2;
  const isOpposite = elemPairs[elem1] === elem2 || inv[elem1] === elem2;
  const modDesc: Record<string, string> = { "Cardinal": "Iniciador", "Fijo": "Estabilizador", "Mutable": "Adaptador" };
  if (isOpposite) {
    return `${termA} ${modDesc[mod1]} vs. ${termB} ${modDesc[mod2]} — Oposición elemental primaria: la fuerza transformadora contra la fuerza estabilizadora`;
  }
  if (elem1 === elem2) {
    return `${drama1} vs. ${drama2} — Espejo del mismo elemento: la oposición no está en la naturaleza sino en el mecanismo de defensa`;
  }
  return `${termA} ${modDesc[mod1]} (${drama1}) vs. ${termB} ${modDesc[mod2]} (${drama2}) — Complementariedad tensional vía Lévi-Strauss`;
}

// ── Myth resolution generation ─────────────────────────────────
function getMythResolution(elem1: string, elem2: string, drama1: string, drama2: string, harmony: number): string {
  if (harmony >= 75) {
    return `La alquimia está disponible: ${elem1} y ${elem2} son elementos que se nutren mutuamente en la rueda medicinal. La cura requiere que cada uno reconozca al otro como maestro, no como amenaza. ${drama1} debe soltar su mecanismo y ${drama2} debe dejar de reaccionar — solo entonces el Ayni (reciprocidad sagrada) fluye entre ambos como agua de río.`;
  }
  if (harmony >= 50) {
    return `La tensión es creativa, no destructiva. ${elem1} y ${elem2} no se oponen sino que se tensionan como los dos lados del puente Inca sobre el Abismo. La resolución mítica: que ${drama1} se vuelva el guardián del umbral y ${drama2} el navegante del misterio — roles complementarios, no jerarquías. El Ayni se restablece cuando cada uno ofrece lo que el otro no puede generar por sí mismo.`;
  }
  return `La fricción es alta porque los elementos pelean por el mismo espacio energético. La resolución mítica exige un tercer principio — un ritual compartido que sea territorio neutral. ${drama1} debe aprender a contener sin controlar y ${drama2} debe aprender a expresar sin evadir. El Ayni aquí no es armonía pasiva sino alquimia activa: transmutar el choque en combustible de evolución conjunta, como el Karpay andino donde el desgarro se vuelve portal.`;
}

// ── Karmic anchor patterns ─────────────────────────────────────
const KARMIC_PATTERNS = [
  "El patrón repetitivo señala un linaje no resuelto: la historia de la madre o el padre se reproduce en la elección del compañero. El nodo kármico exige que se rompa el ciclo de lealtad invisible al dolor ancestral.",
  "Las sincronicidades biográficas revelan un encuentro de almas que ya se cruzaron en encarnaciones previas. El choque actual es la reactivación de un contrato de alma pendiente — el Destino los vuelve a juntar para cerrar lo que quedó abierto.",
  "El casi-nacimiento compartido en la linhagem — historias familiares de pérdida, aborto o muerte temprana — crea un campo de supervivencia culposa. Ambos cargan el peso de quien no llegó, y se buscan para reparar lo que no les pertenece.",
  "El patrón de abandono-recibido se repite en ambos linajes: uno aprendió a sobrevivir marchándose, el otro aprendió a sobrevivir aguantando. El nodo kármico es sanar la herida de la separación sin reproducirla.",
];

function pickKarmicAnchor(j1: JournalEntry, j2: JournalEntry, z1: typeof ZODIAC[0], z2: typeof ZODIAC[0]): string {
  const combined = (j1.recurring_patterns + " " + j2.recurring_patterns + " " + j1.emotional_state + " " + j2.emotional_state).toLowerCase();
  if (combined.includes("abandon") || combined.includes("pérdida") || combined.includes("perdi") || combined.includes("soledad")) return KARMIC_PATTERNS[3];
  if (combined.includes("famil") || combined.includes("madre") || combined.includes("padre") || combined.includes("linaje")) return KARMIC_PATTERNS[0];
  if (combined.includes("anterior") || combined.includes("pasado") || combined.includes("vida") || combined.includes("repet")) return KARMIC_PATTERNS[1];
  if (combined.includes("nacimiento") || combined.includes("muerte") || combined.includes("casi") || combined.includes("abort")) return KARMIC_PATTERNS[2];
  // default based on element relationship
  if (z1.element === z2.element) return KARMIC_PATTERNS[1];
  return KARMIC_PATTERNS[0];
}

// ── Journey stage determination ────────────────────────────────
function getJourneyStage(hucha: number, sami: number, flow: number): string {
  if (hucha > 70) return "Etapa 2 — La Sombra (Ch'ulla)";
  if (hucha > 45 && sami < 50) return "Etapa 3 — El Choque de Control";
  if (flow > 60 && sami > 50) return "Etapa 5 — La Sincronicidad";
  if (sami > 70 && hucha < 30) return "Etapa 8 — La Alquimia Essencial";
  if (sami > 80 && flow > 70) return "Etapa 10 — La Visión de Nacimiento";
  if (sami > 90) return "Etapa 12 — Shambhala";
  return "Etapa 4 — El Campo de Energía";
}

// ── Prescription generation ────────────────────────────────────
function getPrescription(z: typeof ZODIAC[0], hucha: number, drama: string, isPartner2: boolean): string {
  const elemental: Record<string, string> = {
    "Fuego": "Ritual de fuego (Pago a la Pachamama con velas amarillas): escribe en papel lo que quieres transmutar, quémalo al atardecer mirando al oeste. Ofrece el humo como Sami a los Apus.",
    "Tierra": "Ritual de tierra (Ofrenda a la Pachamama): entierra un objeto simbólico del drama con tabaco y coca, pidiendo que la Madre Tierra lo composte. Camina descalzo 12 minutos al amanecer.",
    "Aire": "Ritual de aire (Meditación de respiración Andina): inhala por 4, retén por 7, exhala por 8 — repite 12 ciclos al amanecer mirando al este. Visualiza que tu Drama se disuelve en el viento.",
    "Agua": "Ritual de agua (Limpieza con agua viva): sumerge las manos en agua fría corriente y deja que el Hucha se disuelva. Pide al elemento que lleve lo denso río abajo. Bebe agua con intención antes de hablar.",
  };
  const dramaWork: Record<string, string> = {
    "Intimidador": "Práctica de la Pausa Sagrada: antes de reaccionar, cuenta 3 respiraciones. Reconoce que tu fuerza es máscara de miedo. Pregunta a la Sombra: ¿Qué estás protegiendo realmente?",
    "Interrogador": "Práctica del Silencio Chamánico: durante 3 días, no preguntes nada que no te hayas preguntado primero a ti. Tu compulsión de investigar es huida de tu propio vacío. Siéntate con la duda sin resolverla.",
    "Distante": "Práctica de la Presencia Radical: durante 7 días, cuando sientas el impulso de retirarte, quédate 5 minutos más. Tu silencio es protección pero también condena. Habla lo que sientes aunque tiemble.",
    "Coitadinho": "Práctica de la Soberanía Energética: durante 9 días, cada vez que te venga la narrativa de víctima, detente y lista 3 cosas que sí puedes controlar ahora. Tu sufrimiento es forma de controlar mediante la culpa.",
  };
  const partnerTag = isPartner2 ? "(Compañero 2)" : "(Compañero 1)";
  return `${partnerTag} ${elemental[z.element]} ${dramaWork[drama]}`;
}

// ── Trigger mechanism generation ───────────────────────────────
function getTriggerMechanism(z: typeof ZODIAC[0], journal: JournalEntry): string {
  const text = (journal.emotional_state + " " + journal.recent_events + " " + journal.recurring_patterns).toLowerCase();
  if (text.includes("rechaz") || text.includes("abandon")) return `El gatillo primario es la herida de rechazo/abandono: cuando el entorno señala separación, el ${z.sign} activa su Drama de ${z.drama} como blindaje. La Sombra ancestral grita "no soy suficiente" y el Ego responde con control o retirada.`;
  if (text.includes("control") || text.includes("manipul")) return `El gatillo es la pérdida de control: el ${z.sign} siente que el suelo se mueve bajo sus pies y reacciona con ${z.drama}. La Sombra es el terror a la impotencia heredada del linaje.`;
  if (text.includes("vergüenza") || text.includes("culpa") || text.includes("insegur")) return `El gatillo es la vergüenza tóxica: el ${z.sign} carga la creencia de estar fundamentalmente roto, y el Drama de ${z.drama} es la estrategia para no sentir esa herida en carne viva.`;
  if (text.includes("miedo") || text.includes("ansiedad") || text.includes("pánico")) return `El gatillo es el miedo existencial no metabolizado: el ${z.sign} proyecta amenaza donde hay incertidumbre, activando ${z.drama} como sistema de alarma hipervigilante.`;
  return `El gatillo se activa cuando el ${z.sign} siente que su identidad (${z.archetype}) es cuestionada. La Sombra de "${z.shadow}" se infla como mecanismo de preservación del Tonal — la máscara que el Ego cree ser.`;
}

// ── Astros alignment generation ────────────────────────────────
function getAstrosAlignment(profile: BirthProfile, z: typeof ZODIAC[0], moon: { phase: string; archetype: string }, chineseElem: string, chineseAnimal: string): { label: string; value: string; archetype: string }[] {
  const year = new Date(profile.birth_date).getFullYear();
  return [
    { label: "Sol", value: z.sign, archetype: z.archetype },
    { label: "Elemento Solar", value: z.element, archetype: `Modalidad ${z.modality}` },
    { label: "Regente", value: z.ruling, archetype: "Fuerza Arquetípica" },
    { label: "Luna Natal", value: moon.phase, archetype: moon.archetype },
    { label: "Animal Chino", value: `${chineseAnimal} ${chineseElem}`, archetype: "Tótem Energético" },
    { label: "Año Numerológico", value: String(year).split("").reduce((a, b) => a + parseInt(b), 0).toString(), archetype: "Vibración de Nacimiento" },
  ];
}

// ═══════════════════════════════════════════════════════════════
// MAIN PROCESSOR
// ═══════════════════════════════════════════════════════════════

function processReading(payload: Payload) {
  const { mode, profiles, journals } = payload;

  const zodiacs = profiles.map((p) => getZodiacSign(p.birth_date));
  const moons = profiles.map((p) => getMoonPhase(p.birth_date));
  const chineseElems = profiles.map((p) => getChineseElement(new Date(p.birth_date).getFullYear()));
  const chineseAnimals = profiles.map((p) => getChineseAnimal(new Date(p.birth_date).getFullYear()));

  // ── Metric calculations ──────────────────────────────────────
  const huchaRaw = journals.reduce((sum, j, idx) => {
    const kw = analyzeText(j.emotional_state + " " + j.recent_events + " " + j.recurring_patterns, HUCHA_KEYWORDS);
    const len = textLength(j.emotional_state + " " + j.recent_events + " " + j.recurring_patterns);
    const intensity = len > 200 ? 1.3 : len > 100 ? 1.1 : 1.0;
    return sum + kw * intensity * 12;
  }, 0);
  const huchaScore = Math.min(100, Math.round(huchaRaw / profiles.length + 15));

  const samiRaw = journals.reduce((sum, j) => {
    const kw = analyzeText(j.intention + " " + j.emotional_state, SAMI_KEYWORDS);
    return sum + kw * 10;
  }, 0);
  const samiIndex = Math.max(5, Math.min(100, Math.round(85 - huchaScore * 0.5 + samiRaw / profiles.length)));

  const flowRaw = journals.reduce((sum, j) => {
    const kw = analyzeText(j.recent_events + " " + j.intention, FLOW_KEYWORDS);
    return sum + kw * 15;
  }, 0);
  const flowRate = Math.max(5, Math.min(100, Math.round(30 + flowRaw / profiles.length + (samiIndex - huchaScore) * 0.2)));

  // ── Journey stage ────────────────────────────────────────────
  const journeyStage = getJourneyStage(huchaScore, samiIndex, flowRate);

  // ── Title generation ─────────────────────────────────────────
  let title: string;
  if (mode === "couple") {
    if (huchaScore > 65) title = "Choque de Sombras — El Portal del Miedo";
    else if (samiIndex > 65 && flowRate > 55) title = "Alquimia del Mito — Portal de Shambhala";
    else if (flowRate > 50) title = "Puente de Sincronicidad — Danza del Ayni";
    else title = "Nudo Kármico — El Cruce de Destinos";
  } else {
    if (huchaScore > 65) title = "Descenso a la Sombra — El Karpay Oscuro";
    else if (samiIndex > 70) title = "Ascenso del Sami — Visión de Nacimiento";
    else if (flowRate > 55) title = "Flujo del Destino — Sincronicidad Activa";
    else title = "Cruce de Energías — El Campo del Tonal";
  }

  // ── Astros alignment ─────────────────────────────────────────
  const astros = getAstrosAlignment(profiles[0], zodiacs[0], moons[0], chineseElems[0], chineseAnimals[0]);

  // ── Shadow diagnosis ─────────────────────────────────────────
  const primaryDrama = zodiacs[0].drama;
  const triggerMechanism = getTriggerMechanism(zodiacs[0], journals[0]);

  let interlockingDynamic: string | undefined;
  if (mode === "couple") {
    const drama1 = zodiacs[0].drama;
    const drama2 = zodiacs[1].drama;
    interlockingDynamic = DRAMA_INTERLOCK[drama1]?.[drama2] || "Los Dramas de Control se activan mutuamente en un circuito de drenaje energético donde ambos pierden Sami sin ganar consciencia.";
  }

  // ── Structural myth ──────────────────────────────────────────
  let binaryOpposition: string;
  let karmicAnchor: string;
  let mythResolution: string;

  if (mode === "couple") {
    const harmony = ELEMENT_HARMONY[zodiacs[0].element]?.[zodiacs[1].element] ?? 50;
    binaryOpposition = getBinaryOpposition(zodiacs[0].element, zodiacs[1].element, zodiacs[0].modality, zodiacs[1].modality, zodiacs[0].drama, zodiacs[1].drama);
    karmicAnchor = pickKarmicAnchor(journals[0], journals[1], zodiacs[0], zodiacs[1]);
    mythResolution = getMythResolution(zodiacs[0].element, zodiacs[1].element, zodiacs[0].drama, zodiacs[1].drama, harmony);
  } else {
    binaryOpposition = `${zodiacs[0].archetype} (${zodiacs[0].element}) vs. ${zodiacs[0].drama} (Sombra) — La oposición interna entre el Self y el Ego`;
    const combinedText = (journals[0].recurring_patterns + " " + journals[0].emotional_state).toLowerCase();
    if (combinedText.includes("famil") || combinedText.includes("madre") || combinedText.includes("padre")) {
      karmicAnchor = KARMIC_PATTERNS[0];
    } else if (combinedText.includes("abandon") || combinedText.includes("soledad")) {
      karmicAnchor = KARMIC_PATTERNS[3];
    } else {
      karmicAnchor = KARMIC_PATTERNS[1];
    }
    mythResolution = getMythResolution(zodiacs[0].element, zodiacs[0].element, zodiacs[0].drama, zodiacs[0].drama, 50);
  }

  // ── Ayni prescription ────────────────────────────────────────
  const partner1Action = getPrescription(zodiacs[0], huchaScore, zodiacs[0].drama, false);
  const partner2Action = mode === "couple"
    ? getPrescription(zodiacs[1], huchaScore, zodiacs[1].drama, true)
    : `Ritual de integración del Self: durante 21 días, cada mañana, pregúntate "¿Qué parte de mí está operando hoy — el ${zodiacs[0].drama} o el ${zodiacs[0].archetype}?" Y elige conscientemente desde el arquetipo, no desde la Sombra. Esto es el inicio del Kausay Alignment.`;

  // ── Assemble result ──────────────────────────────────────────
  const result = {
    reading_summary: {
      title,
      journey_stage: journeyStage,
      collective_metrics: {
        sami_index: samiIndex,
        hucha_score: huchaScore,
        flow_rate: flowRate,
      },
    },
    astros_alignment: astros,
    shadow_diagnosis: {
      primary_drama: `${primaryDrama} — Activación del ${zodiacs[0].sign} (${zodiacs[0].archetype})`,
      trigger_mechanism: triggerMechanism,
      ...(interlockingDynamic ? { interlocking_dynamic: interlockingDynamic } : {}),
    },
    structural_myth: {
      binary_opposition: binaryOpposition,
      karmic_anchor: karmicAnchor,
      myth_resolution: mythResolution,
    },
    ayni_prescription: {
      partner_1_action: partner1Action,
      partner_2_action: partner2Action,
    },
  };

  return result;
}

// ═══════════════════════════════════════════════════════════════
// EDGE FUNCTION ENTRY
// ═══════════════════════════════════════════════════════════════

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return new Response(
        JSON.stringify({ error: "Método no permitido. Use POST." }),
        { status: 405, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const payload: Payload = await req.json();

    if (!payload.profiles || payload.profiles.length === 0) {
      return new Response(
        JSON.stringify({ error: "Payload inválido: se requiere al menos un perfil de nacimiento." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (payload.mode === "couple" && payload.profiles.length < 2) {
      return new Response(
        JSON.stringify({ error: "Modo casal requiere dos perfiles de nacimiento." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (payload.mode === "couple" && payload.journals.length < 2) {
      // pad with empty journal for partner 2 if missing
      while (payload.journals.length < 2) {
        payload.journals.push({ emotional_state: "", recent_events: "", recurring_patterns: "", intention: "" });
      }
    }

    if (payload.mode === "individual" && payload.journals.length === 0) {
      payload.journals.push({ emotional_state: "", recent_events: "", recurring_patterns: "", intention: "" });
    }

    const result = processReading(payload);

    return new Response(
      JSON.stringify(result),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Error interno del motor Ayni" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
