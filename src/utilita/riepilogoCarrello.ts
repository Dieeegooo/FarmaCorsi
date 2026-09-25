import { RiepilogoCarrello, RigaCarrello } from '../tipi';
import { calcolaCostoConsegna } from './consegna';
import { arrotondaEuro } from './prezzo';

// Riepilogo del carrello: si calcola dalle righe, non si salva
// (è "stato derivato"). Lo usano il contesto del carrello e il
// servizio degli ordini.
export function calcolaRiepilogo(righe: RigaCarrello[]): RiepilogoCarrello {
  const numeroElementi = righe.reduce((somma, riga) => somma + riga.quantita, 0);
  const subtotale = arrotondaEuro(
    righe.reduce((somma, riga) => somma + riga.prezzo * riga.quantita, 0),
  );
  // Carrello vuoto: niente consegna da pagare.
  const costoConsegna = righe.length === 0 ? 0 : calcolaCostoConsegna(subtotale);

  return {
    numeroElementi,
    subtotale,
    costoConsegna,
    totale: arrotondaEuro(subtotale + costoConsegna),
  };
}
