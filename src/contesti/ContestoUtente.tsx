import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { Utente } from '../tipi';
import { accedi as verificaCredenziali } from '../servizi/servizioUtenti';
import {
  cancellaSessione,
  leggiSessione,
  salvaSessione,
} from '../servizi/servizioSessione';

// Cosa mette a disposizione il contesto a tutte le schermate.
type ValoreContestoUtente = {
  utente: Utente | null; // null = nessuno ha fatto il login
  caricamentoIniziale: boolean; // true mentre leggiamo la sessione salvata
  accedi: (email: string, password: string) => Promise<boolean>;
  esci: () => Promise<void>;
};

// 1. Creiamo il contesto. Il valore iniziale è null: se qualcuno usa
//    useUtente() fuori dal Provider, lo segnaliamo con un errore chiaro.
const ContestoUtente = createContext<ValoreContestoUtente | null>(null);

type FornitoreUtenteProps = {
  children: ReactNode;
};

// 2. Il Provider: avvolge l'app e tiene lo stato dell'utente.
function FornitoreUtente({ children }: FornitoreUtenteProps) {
  const [utente, setUtente] = useState<Utente | null>(null);
  const [caricamentoIniziale, setCaricamentoIniziale] = useState(true);

  // All'avvio dell'app: se c'è una sessione salvata, l'utente è già dentro.
  useEffect(() => {
    async function ripristinaSessione() {
      const utenteSalvato = await leggiSessione();
      setUtente(utenteSalvato);
      setCaricamentoIniziale(false);
    }

    ripristinaSessione();
  }, []);

  // Restituisce true se le credenziali sono giuste, false altrimenti.
  async function accedi(email: string, password: string): Promise<boolean> {
    const trovato = await verificaCredenziali(email, password);
    if (trovato === null) {
      return false;
    }
    await salvaSessione(trovato);
    setUtente(trovato); // cambiando lo stato, la navigazione passa alle tab
    return true;
  }

  async function esci(): Promise<void> {
    await cancellaSessione();
    setUtente(null); // utente null: la navigazione torna al Login
  }

  return (
    <ContestoUtente.Provider
      value={{ utente, caricamentoIniziale, accedi, esci }}
    >
      {children}
    </ContestoUtente.Provider>
  );
}

// 3. Hook personalizzato: nelle schermate basta scrivere
//    const { utente, esci } = useUtente();
export function useUtente(): ValoreContestoUtente {
  const valore = useContext(ContestoUtente);
  if (valore === null) {
    throw new Error('useUtente va usato dentro FornitoreUtente');
  }
  return valore;
}

export default FornitoreUtente;
