import { Posizione } from '../tipi';

// Posizione dell'utente simulata: per ora è fissa sul centro di Sarzana.
// Quando arriverà il GPS vero basterà cambiare chi fornisce queste coordinate.
const posizioneUtente: Posizione = {
  latitudine: 44.1113,
  longitudine: 9.9596,
  citta: 'Sarzana',
  indirizzo: 'Piazza Matteotti 1, 19038 Sarzana SP',
};

export default posizioneUtente;
