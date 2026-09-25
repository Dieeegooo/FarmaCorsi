// Test del servizio ordini e delle funzioni del checkout.
import { inviaOrdine } from '../src/servizi/servizioOrdini';
import { RigaCarrello } from '../src/tipi';
import { orarioArrivo } from '../src/utilita/orario';
import { erroreIndirizzo } from '../src/utilita/validazione';

const rigaTachipirina: RigaCarrello = {
  idProdotto: 'p01',
  idFarmacia: 'f1',
  prezzo: 4.9,
  quantita: 3,
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
  quantitaMassima: 24,
};

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

describe('inviaOrdine', () => {
  test('crea un ordine con numero, totali e solo i campi della SPEC', async () => {
    const promessa = inviaOrdine({
      righe: [rigaTachipirina],
      indirizzo: '  Piazza Matteotti 1, Sarzana  ',
      note: 'Citofono Rossi',
      metodoPagamento: 'contanti',
    });
    await jest.runAllTimersAsync();
    const ordine = await promessa;

    expect(ordine.id).toMatch(/^FC-\d{6}$/);
    expect(ordine.subtotale).toBe(14.7);
    expect(ordine.costoConsegna).toBe(2.99);
    expect(ordine.totale).toBe(17.69);
    expect(ordine.indirizzo).toBe('Piazza Matteotti 1, Sarzana'); // senza spazi
    expect(ordine.metodoPagamento).toBe('contanti');
    expect(ordine.nomeFarmacia).toBe('Farmacia Centrale');
    expect(ordine.elementi).toEqual([
      { idProdotto: 'p01', idFarmacia: 'f1', prezzo: 4.9, quantita: 3 },
    ]);
  });

  test('carrello vuoto: errore', async () => {
    await expect(
      inviaOrdine({
        righe: [],
        indirizzo: 'Piazza Matteotti 1',
        note: '',
        metodoPagamento: 'carta',
      }),
    ).rejects.toThrow('Il carrello è vuoto');
  });
});

describe('orarioArrivo', () => {
  test('aggiunge i minuti e scrive HH:MM', () => {
    expect(orarioArrivo(25, new Date(2026, 8, 25, 16, 10))).toBe('16:35');
  });

  test('passa all\'ora successiva e alla mezzanotte', () => {
    expect(orarioArrivo(15, new Date(2026, 8, 25, 9, 50))).toBe('10:05');
    expect(orarioArrivo(20, new Date(2026, 8, 25, 23, 50))).toBe('00:10');
  });
});

describe('erroreIndirizzo', () => {
  test('obbligatorio e non troppo corto', () => {
    expect(erroreIndirizzo('   ')).toBe("Inserisci l'indirizzo di consegna");
    expect(erroreIndirizzo('Via 1')).not.toBeNull();
    expect(erroreIndirizzo('Piazza Matteotti 1, Sarzana')).toBeNull();
  });
});
