import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import { leggiCarrello, salvaCarrello } from '../servizi/servizioCarrello';
import { RiepilogoCarrello, RigaCarrello } from '../tipi';
import { calcolaRiepilogo } from '../utilita/riepilogoCarrello';
import { useUtente } from './ContestoUtente';
import { riduttoreCarrello, STATO_INIZIALE } from './riduttoreCarrello';

// Esito di "aggiungi": se il carrello contiene prodotti di un'altra
// farmacia non aggiungiamo niente e lo diciamo alla schermata, che
// chiederà all'utente se svuotarlo (un ordine = una sola farmacia).
export type EsitoAggiunta = 'aggiunto' | 'altraFarmacia';

type ValoreContestoCarrello = RiepilogoCarrello & {
  righe: RigaCarrello[];
  nomeFarmacia: string | null; // farmacia dell'ordine, null se vuoto
  aggiungi: (riga: RigaCarrello) => EsitoAggiunta;
  svuotaEAggiungi: (riga: RigaCarrello) => void;
  cambiaQuantita: (idProdotto: string, idFarmacia: string, quantita: number) => void;
  rimuovi: (idProdotto: string, idFarmacia: string) => void;
  svuota: () => void;
};

const ContestoCarrello = createContext<ValoreContestoCarrello | null>(null);

type FornitoreCarrelloProps = {
  children: ReactNode;
};

function FornitoreCarrello({ children }: FornitoreCarrelloProps) {
  // useReducer: come useState, ma i cambiamenti passano da riduttoreCarrello.
  // dispatch(azione) = "manda questa azione al riduttore".
  const [stato, dispatch] = useReducer(riduttoreCarrello, STATO_INIZIALE);
  const [caricato, setCaricato] = useState(false);
  const { utente, caricamentoIniziale } = useUtente();

  // Quando c'è un utente (avvio o login) rileggiamo il carrello salvato;
  // quando esce (logout) lo svuotiamo, così il prossimo utente non lo vede.
  useEffect(() => {
    if (caricamentoIniziale) {
      return;
    }
    if (utente === null) {
      dispatch({ tipo: 'svuota' });
      setCaricato(false);
      salvaCarrello([]);
      return;
    }

    let attivo = true;
    leggiCarrello().then(righe => {
      if (attivo) {
        dispatch({ tipo: 'ripristina', righe });
        setCaricato(true);
      }
    });
    return () => {
      attivo = false;
    };
  }, [utente, caricamentoIniziale]);

  // A ogni modifica salviamo (solo dopo aver caricato, per non
  // sovrascrivere il carrello salvato con quello vuoto iniziale).
  useEffect(() => {
    if (caricato) {
      salvaCarrello(stato.righe);
    }
  }, [stato.righe, caricato]);

  const nomeFarmacia = stato.righe[0]?.nomeFarmacia ?? null;

  function aggiungi(riga: RigaCarrello): EsitoAggiunta {
    const farmaciaAttuale = stato.righe[0]?.idFarmacia;
    if (farmaciaAttuale !== undefined && farmaciaAttuale !== riga.idFarmacia) {
      return 'altraFarmacia';
    }
    dispatch({ tipo: 'aggiungi', riga });
    return 'aggiunto';
  }

  function svuotaEAggiungi(riga: RigaCarrello) {
    dispatch({ tipo: 'svuota' });
    dispatch({ tipo: 'aggiungi', riga });
  }

  function cambiaQuantita(idProdotto: string, idFarmacia: string, quantita: number) {
    dispatch({ tipo: 'cambiaQuantita', idProdotto, idFarmacia, quantita });
  }

  function rimuovi(idProdotto: string, idFarmacia: string) {
    dispatch({ tipo: 'rimuovi', idProdotto, idFarmacia });
  }

  function svuota() {
    dispatch({ tipo: 'svuota' });
  }

  return (
    <ContestoCarrello.Provider
      value={{
        righe: stato.righe,
        nomeFarmacia,
        ...calcolaRiepilogo(stato.righe),
        aggiungi,
        svuotaEAggiungi,
        cambiaQuantita,
        rimuovi,
        svuota,
      }}
    >
      {children}
    </ContestoCarrello.Provider>
  );
}

// Nelle schermate: const { righe, totale, aggiungi } = useCarrello();
export function useCarrello(): ValoreContestoCarrello {
  const valore = useContext(ContestoCarrello);
  if (valore === null) {
    throw new Error('useCarrello va usato dentro FornitoreCarrello');
  }
  return valore;
}

export default FornitoreCarrello;
