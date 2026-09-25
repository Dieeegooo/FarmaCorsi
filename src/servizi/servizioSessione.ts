import AsyncStorage from '@react-native-async-storage/async-storage';
import { Utente } from '../tipi';

// Unico file dell'app che usa AsyncStorage per la sessione.
// AsyncStorage salva solo stringhe: l'utente viene trasformato in testo
// con JSON.stringify e riletto con JSON.parse.
// Il tipo Utente non contiene la password: non può finire qui per sbaglio.

const CHIAVE_SESSIONE = 'farmacorsi:sessione';

export async function salvaSessione(utente: Utente): Promise<void> {
  // salviamo esplicitamente solo i tre campi ammessi
  const datiDaSalvare: Utente = {
    id: utente.id,
    nome: utente.nome,
    email: utente.email,
  };
  await AsyncStorage.setItem(CHIAVE_SESSIONE, JSON.stringify(datiDaSalvare));
}

// Restituisce l'utente salvato, oppure null se non c'è una sessione
// (o se i dati salvati sono rovinati).
export async function leggiSessione(): Promise<Utente | null> {
  try {
    const testo = await AsyncStorage.getItem(CHIAVE_SESSIONE);
    if (testo === null) {
      return null;
    }
    const dati: Utente = JSON.parse(testo);
    return dati;
  } catch {
    return null;
  }
}

export async function cancellaSessione(): Promise<void> {
  await AsyncStorage.removeItem(CHIAVE_SESSIONE);
}
