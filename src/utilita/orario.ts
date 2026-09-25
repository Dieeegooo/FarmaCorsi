// Orario di arrivo previsto: ora di partenza + minuti di consegna.
// "da" ha un valore di default (adesso) ma si può passare, così la
// funzione è facile da provare nei test.
export function orarioArrivo(minuti: number, da: Date = new Date()): string {
  const arrivo = new Date(da.getTime() + minuti * 60 * 1000);
  const ore = String(arrivo.getHours()).padStart(2, '0');
  const minutiOrario = String(arrivo.getMinutes()).padStart(2, '0');
  return `${ore}:${minutiOrario}`;
}
