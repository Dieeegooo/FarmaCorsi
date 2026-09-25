// Posizione dell'utente simulata: per ora è fissa sul centro di Sarzana.
// Quando arriverà il GPS vero basterà cambiare chi fornisce queste coordinate.
export type Posizione = {
  latitudine: number;
  longitudine: number;
  citta: string;
};

const posizioneUtente: Posizione = {
  latitudine: 44.1113,
  longitudine: 9.9596,
  citta: 'Sarzana',
};

export default posizioneUtente;
