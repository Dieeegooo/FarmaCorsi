import AsyncStorage from '@react-native-async-storage/async-storage';
import { RigaCarrello } from '../tipi';

// Salva il carrello sul telefono, così non si perde chiudendo l'app.
// Come per la sessione: AsyncStorage salva solo testo → JSON.

const CHIAVE_CARRELLO = 'farmacorsi:carrello';

export async function salvaCarrello(righe: RigaCarrello[]): Promise<void> {
  await AsyncStorage.setItem(CHIAVE_CARRELLO, JSON.stringify(righe));
}

// Restituisce le righe salvate, oppure un carrello vuoto se non c'è nulla
// (o se i dati salvati sono rovinati).
export async function leggiCarrello(): Promise<RigaCarrello[]> {
  try {
    const testo = await AsyncStorage.getItem(CHIAVE_CARRELLO);
    if (testo === null) {
      return [];
    }
    const righe: RigaCarrello[] = JSON.parse(testo);
    return Array.isArray(righe) ? righe : [];
  } catch {
    return [];
  }
}
