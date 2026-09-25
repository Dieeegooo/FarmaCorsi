// Test del carrello: il riduttore è una funzione pura, si prova senza React.
import {
  riduttoreCarrello,
  STATO_INIZIALE,
  StatoCarrello,
} from '../src/contesti/riduttoreCarrello';
import { calcolaRiepilogo } from '../src/utilita/riepilogoCarrello';
import { leggiCarrello, salvaCarrello } from '../src/servizi/servizioCarrello';
import { RigaCarrello } from '../src/tipi';

// Crea una riga di prova; i campi si possono cambiare con "modifiche".
function rigaDiProva(modifiche: Partial<RigaCarrello> = {}): RigaCarrello {
  return {
    idProdotto: 'p01',
    idFarmacia: 'f1',
    prezzo: 4.9,
    quantita: 1,
    prodotto: {
      id: 'p01',
      nome: 'Tachipirina 500 mg',
      marca: 'Angelini',
      formato: '20 compresse',
      descrizione: '',
      categoria: 'dolore-febbre',
      piuCercato: true,
    },
    nomeFarmacia: 'Farmacia Centrale',
    minutiConsegna: 15,
    quantitaMassima: 5,
    ...modifiche,
  };
}

describe('riduttoreCarrello', () => {
  test('aggiunge un prodotto nuovo', () => {
    const stato = riduttoreCarrello(STATO_INIZIALE, {
      tipo: 'aggiungi',
      riga: rigaDiProva({ quantita: 2 }),
    });
    expect(stato.righe).toHaveLength(1);
    expect(stato.righe[0].quantita).toBe(2);
  });

  test('stesso prodotto e stessa farmacia: somma le quantità', () => {
    let stato = riduttoreCarrello(STATO_INIZIALE, {
      tipo: 'aggiungi',
      riga: rigaDiProva({ quantita: 2 }),
    });
    stato = riduttoreCarrello(stato, {
      tipo: 'aggiungi',
      riga: rigaDiProva({ quantita: 1 }),
    });
    expect(stato.righe).toHaveLength(1);
    expect(stato.righe[0].quantita).toBe(3);
  });

  test('la somma non supera i pezzi disponibili', () => {
    let stato = riduttoreCarrello(STATO_INIZIALE, {
      tipo: 'aggiungi',
      riga: rigaDiProva({ quantita: 4 }),
    });
    stato = riduttoreCarrello(stato, {
      tipo: 'aggiungi',
      riga: rigaDiProva({ quantita: 4 }),
    });
    expect(stato.righe[0].quantita).toBe(5);
  });

  test('non modifica lo stato precedente', () => {
    const prima: StatoCarrello = { righe: [rigaDiProva()] };
    riduttoreCarrello(prima, {
      tipo: 'cambiaQuantita',
      idProdotto: 'p01',
      idFarmacia: 'f1',
      quantita: 3,
    });
    expect(prima.righe[0].quantita).toBe(1);
  });

  test('cambia quantità, con il limite dei pezzi disponibili', () => {
    const prima: StatoCarrello = { righe: [rigaDiProva()] };
    const dopo = riduttoreCarrello(prima, {
      tipo: 'cambiaQuantita',
      idProdotto: 'p01',
      idFarmacia: 'f1',
      quantita: 99,
    });
    expect(dopo.righe[0].quantita).toBe(5);
  });

  test('a quantità 0 la riga viene rimossa', () => {
    const prima: StatoCarrello = { righe: [rigaDiProva()] };
    const dopo = riduttoreCarrello(prima, {
      tipo: 'cambiaQuantita',
      idProdotto: 'p01',
      idFarmacia: 'f1',
      quantita: 0,
    });
    expect(dopo.righe).toHaveLength(0);
  });

  test('rimuovi e svuota', () => {
    const prima: StatoCarrello = {
      righe: [rigaDiProva(), rigaDiProva({ idProdotto: 'p02' })],
    };
    const dopoRimuovi = riduttoreCarrello(prima, {
      tipo: 'rimuovi',
      idProdotto: 'p01',
      idFarmacia: 'f1',
    });
    expect(dopoRimuovi.righe.map(r => r.idProdotto)).toEqual(['p02']);
    expect(riduttoreCarrello(prima, { tipo: 'svuota' }).righe).toHaveLength(0);
  });
});

describe('calcolaRiepilogo', () => {
  test('carrello vuoto: tutto a zero, niente consegna', () => {
    expect(calcolaRiepilogo([])).toEqual({
      numeroElementi: 0,
      subtotale: 0,
      costoConsegna: 0,
      totale: 0,
    });
  });

  test('sotto i 30 €: consegna 2,99 €', () => {
    const riepilogo = calcolaRiepilogo([rigaDiProva({ quantita: 3 })]);
    expect(riepilogo.numeroElementi).toBe(3);
    expect(riepilogo.subtotale).toBe(14.7);
    expect(riepilogo.costoConsegna).toBe(2.99);
    expect(riepilogo.totale).toBe(17.69);
  });

  test('da 30 € in su: consegna gratis', () => {
    const riepilogo = calcolaRiepilogo([
      rigaDiProva({ prezzo: 18.9, quantita: 1 }),
      rigaDiProva({ idProdotto: 'p02', prezzo: 12.5, quantita: 1 }),
    ]);
    expect(riepilogo.subtotale).toBe(31.4);
    expect(riepilogo.costoConsegna).toBe(0);
    expect(riepilogo.totale).toBe(31.4);
  });
});

describe('servizioCarrello', () => {
  test('salva e rilegge il carrello', async () => {
    const righe = [rigaDiProva({ quantita: 2 })];
    await salvaCarrello(righe);
    expect(await leggiCarrello()).toEqual(righe);
  });

  test('nessun carrello salvato: lista vuota', async () => {
    await salvaCarrello([]);
    expect(await leggiCarrello()).toEqual([]);
  });
});
