// Regole di consegna della SPEC (sezione 3), tutte in un posto solo.

const MINUTI_BASE = 15;
const MINUTI_PER_KM = 4;

export const COSTO_CONSEGNA = 2.99;
export const SOGLIA_CONSEGNA_GRATIS = 30;

// Tempo stimato: 15 minuti più 4 minuti per ogni km, arrotondato ai 5 minuti.
export function calcolaMinutiConsegna(distanzaKm: number): number {
  const minuti = MINUTI_BASE + MINUTI_PER_KM * distanzaKm;
  return Math.round(minuti / 5) * 5;
}

// Sopra i 30 € di subtotale la consegna è gratis.
export function calcolaCostoConsegna(subtotale: number): number {
  return subtotale >= SOGLIA_CONSEGNA_GRATIS ? 0 : COSTO_CONSEGNA;
}

// "circa 25 min": testo già pronto per le schermate.
export function formattaTempoConsegna(minuti: number): string {
  return `circa ${minuti} min`;
}
