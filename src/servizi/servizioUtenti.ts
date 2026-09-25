import utenti from '../dati/utenti';
import { Utente } from '../tipi';
import { normalizza } from '../utilita/testo';
import ritardoFinto from './ritardoFinto';

// Login finto: controlla email e password negli utenti di prova.
// Restituisce l'utente SENZA la password, perché è l'unico dato che
// poi finirà in AsyncStorage.
export async function accedi(
  email: string,
  password: string,
): Promise<Utente | null> {
  // ritardo più lungo: serve a vedere l'indicatore di caricamento nel Login
  await ritardoFinto(800);

  const trovato = utenti.find(
    utente =>
      normalizza(utente.email) === normalizza(email) &&
      utente.password === password,
  );

  if (!trovato) {
    return null;
  }

  return { id: trovato.id, nome: trovato.nome, email: trovato.email };
}
