// Saluto in base all'ora del telefono:
// 05:00-12:59 Buongiorno · 13:00-17:59 Buon pomeriggio · 18:00-04:59 Buonasera.
// L'ora si passa come parametro (con un valore di default) così la funzione
// è facile da provare senza dipendere dall'orologio.
export function salutoPerOra(ora: number = new Date().getHours()): string {
  if (ora >= 5 && ora < 13) {
    return 'Buongiorno';
  }
  if (ora >= 13 && ora < 18) {
    return 'Buon pomeriggio';
  }
  return 'Buonasera';
}

// "Buongiorno Diego"
export function salutaUtente(
  nome: string,
  ora: number = new Date().getHours(),
): string {
  return `${salutoPerOra(ora)} ${nome}`;
}
