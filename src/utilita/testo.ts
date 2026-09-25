// Porta il testo in una forma "neutra" per la ricerca: tutto minuscolo e
// senza accenti, così "Dompé" viene trovato anche scrivendo "dompe".
export function normalizza(testo: string): string {
  return testo
    .toLowerCase()
    .normalize('NFD') // separa la lettera dal suo segno di accento
    .replace(/[\u0300-\u036f]/g, '') // toglie i segni di accento
    .trim();
}

// Vero se il testo contiene la ricerca, ignorando maiuscole e accenti.
export function contiene(testo: string, ricerca: string): boolean {
  return normalizza(testo).includes(normalizza(ricerca));
}
