// I servizi sono funzioni asincrone, come se parlassero con un'API vera.
// Questo piccolo ritardo serve a simulare il tempo di rete: così le
// schermate devono gestire davvero il caricamento.
export default function ritardoFinto(millisecondi: number = 300): Promise<void> {
  return new Promise(risolvi => setTimeout(risolvi, millisecondi));
}
