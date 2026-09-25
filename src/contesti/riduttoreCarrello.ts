import { RigaCarrello } from '../tipi';

// Il "riduttore" (reducer) del carrello: una funzione PURA che riceve lo
// stato attuale e un'azione, e restituisce il nuovo stato.
// Non modifica mai lo stato vecchio: ne crea uno nuovo (map, filter, ...),
// così React capisce che qualcosa è cambiato e ridisegna.

export type StatoCarrello = {
  righe: RigaCarrello[];
};

export const STATO_INIZIALE: StatoCarrello = { righe: [] };

// Tutte le azioni possibili. "tipo" dice quale azione è; TypeScript
// controlla che ogni azione abbia i dati giusti.
export type AzioneCarrello =
  | { tipo: 'aggiungi'; riga: RigaCarrello }
  | {
      tipo: 'cambiaQuantita';
      idProdotto: string;
      idFarmacia: string;
      quantita: number;
    }
  | { tipo: 'rimuovi'; idProdotto: string; idFarmacia: string }
  | { tipo: 'svuota' }
  | { tipo: 'ripristina'; righe: RigaCarrello[] };

// Vero se la riga è quel prodotto di quella farmacia.
function stessaRiga(riga: RigaCarrello, idProdotto: string, idFarmacia: string) {
  return riga.idProdotto === idProdotto && riga.idFarmacia === idFarmacia;
}

export function riduttoreCarrello(
  stato: StatoCarrello,
  azione: AzioneCarrello,
): StatoCarrello {
  switch (azione.tipo) {
    case 'aggiungi': {
      const nuova = azione.riga;
      const esistente = stato.righe.find(riga =>
        stessaRiga(riga, nuova.idProdotto, nuova.idFarmacia),
      );

      // Prodotto nuovo: lo aggiungiamo in fondo.
      if (!esistente) {
        return { righe: [...stato.righe, nuova] };
      }

      // Già presente: sommiamo le quantità, senza superare i pezzi disponibili.
      return {
        righe: stato.righe.map(riga =>
          riga === esistente
            ? {
                ...riga,
                quantita: Math.min(
                  riga.quantita + nuova.quantita,
                  riga.quantitaMassima,
                ),
              }
            : riga,
        ),
      };
    }

    case 'cambiaQuantita': {
      // A quantità 0 (o meno) la riga viene tolta, come chiede la SPEC.
      if (azione.quantita <= 0) {
        return riduttoreCarrello(stato, {
          tipo: 'rimuovi',
          idProdotto: azione.idProdotto,
          idFarmacia: azione.idFarmacia,
        });
      }
      return {
        righe: stato.righe.map(riga =>
          stessaRiga(riga, azione.idProdotto, azione.idFarmacia)
            ? { ...riga, quantita: Math.min(azione.quantita, riga.quantitaMassima) }
            : riga,
        ),
      };
    }

    case 'rimuovi':
      return {
        righe: stato.righe.filter(
          riga => !stessaRiga(riga, azione.idProdotto, azione.idFarmacia),
        ),
      };

    case 'svuota':
      return STATO_INIZIALE;

    case 'ripristina':
      return { righe: azione.righe };
  }
}
