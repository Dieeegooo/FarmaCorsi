// I prezzi si mostrano sempre con due decimali e la virgola: "4,90 €".
export function formattaPrezzo(prezzo: number): string {
  return `${prezzo.toFixed(2).replace('.', ',')} €`;
}

// "da 4,90 €": usato nelle liste, dove mostriamo il prezzo più basso
// fra le farmacie che hanno quel prodotto.
export function formattaPrezzoDa(prezzo: number): string {
  return `da ${formattaPrezzo(prezzo)}`;
}

// Somma di soldi: si arrotonda ai centesimi per evitare totali
// come 12.300000000000001 dovuti ai numeri con la virgola.
export function arrotondaEuro(valore: number): number {
  return Math.round(valore * 100) / 100;
}
