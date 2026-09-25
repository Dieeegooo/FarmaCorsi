import posizioneUtente, { Posizione } from '../dati/posizioneUtente';

// Posizione di consegna dell'utente. Per ora è simulata (centro di Sarzana);
// quando useremo il GPS vero cambierà solo questa funzione.
export async function ottieniPosizioneUtente(): Promise<Posizione> {
  return posizioneUtente;
}
