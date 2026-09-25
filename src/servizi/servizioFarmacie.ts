import farmacie from '../dati/farmacie';
import posizioneUtente from '../dati/posizioneUtente';
import { Farmacia, FarmaciaVicina } from '../tipi';
import { calcolaDistanzaKm } from '../utilita/distanza';
import { calcolaMinutiConsegna } from '../utilita/consegna';
import ritardoFinto from './ritardoFinto';

// Questo è l'unico file (insieme agli altri servizi) che legge da src/dati/.
// Le schermate chiamano solo queste funzioni: il giorno in cui ci sarà
// un'API vera basterà cambiare qui dentro.

// Aggiunge a una farmacia la distanza dall'utente e il tempo di consegna.
export function aggiungiDistanza(farmacia: Farmacia): FarmaciaVicina {
  const distanzaKm = calcolaDistanzaKm(
    posizioneUtente.latitudine,
    posizioneUtente.longitudine,
    farmacia.latitudine,
    farmacia.longitudine,
  );

  return {
    ...farmacia,
    distanzaKm,
    minutiConsegna: calcolaMinutiConsegna(distanzaKm),
  };
}

// Ordina dalla più vicina alla più lontana.
export function ordinaPerDistanza(elenco: FarmaciaVicina[]): FarmaciaVicina[] {
  return [...elenco].sort((a, b) => a.distanzaKm - b.distanzaKm);
}

// Tutte le farmacie, ordinate per vicinanza: serve alla sezione
// "Farmacie vicino a te" della Home.
export async function ottieniFarmacieVicine(): Promise<FarmaciaVicina[]> {
  await ritardoFinto();
  return ordinaPerDistanza(farmacie.map(aggiungiDistanza));
}

// Una sola farmacia, cercata per id. Restituisce null se non esiste.
export async function ottieniFarmacia(
  idFarmacia: string,
): Promise<FarmaciaVicina | null> {
  await ritardoFinto(150);
  const farmacia = farmacie.find(elemento => elemento.id === idFarmacia);
  return farmacia ? aggiungiDistanza(farmacia) : null;
}
