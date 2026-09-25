// Test dei servizi: leggono i dati finti come farebbe un'API.
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ottieniFarmacieVicine } from '../src/servizi/servizioFarmacie';
import {
  cercaProdotti,
  ottieniFarmacieConProdotto,
  ottieniPiuCercati,
} from '../src/servizi/servizioProdotti';
import {
  cancellaSessione,
  leggiSessione,
  salvaSessione,
} from '../src/servizi/servizioSessione';
import { accedi } from '../src/servizi/servizioUtenti';

// I ritardi finti (fino a 800 ms) rallenterebbero i test:
// con i "fake timers" Jest fa scorrere il tempo all'istante.
beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

// Avvia la promessa e fa scattare subito tutti i timer.
async function risolvi<T>(promessa: Promise<T>): Promise<T> {
  await jest.runAllTimersAsync();
  return promessa;
}

describe('servizioUtenti', () => {
  test('credenziali giuste: utente SENZA password', async () => {
    const utente = await risolvi(accedi('diego@farmacorsi.it', 'password123'));
    expect(utente).toEqual({
      id: 'u1',
      nome: 'Diego',
      email: 'diego@farmacorsi.it',
    });
    expect(utente).not.toHaveProperty('password');
  });

  test('credenziali sbagliate: null', async () => {
    expect(await risolvi(accedi('diego@farmacorsi.it', 'sbagliata'))).toBeNull();
  });

  test("l'email ignora le maiuscole", async () => {
    const utente = await risolvi(accedi('Diego@FarmaCorsi.it', 'password123'));
    expect(utente?.nome).toBe('Diego');
  });
});

describe('servizioSessione', () => {
  test('salva, rilegge e cancella; la password non viene mai salvata', async () => {
    const conPassword = {
      id: 'u1',
      nome: 'Diego',
      email: 'diego@farmacorsi.it',
      password: 'password123',
    };
    await salvaSessione(conPassword);

    const testoSalvato = await AsyncStorage.getItem('farmacorsi:sessione');
    expect(testoSalvato).not.toContain('password');
    expect(await leggiSessione()).toEqual({
      id: 'u1',
      nome: 'Diego',
      email: 'diego@farmacorsi.it',
    });

    await cancellaSessione();
    expect(await leggiSessione()).toBeNull();
  });
});

describe('servizioFarmacie', () => {
  test('farmacie ordinate dalla più vicina', async () => {
    const farmacie = await risolvi(ottieniFarmacieVicine());
    const distanze = farmacie.map(f => f.distanzaKm);
    expect(distanze).toEqual([...distanze].sort((a, b) => a - b));
    expect(farmacie[0].nome).toBe('Farmacia Centrale');
  });
});

describe('servizioProdotti', () => {
  test('ricerca per nome ignorando maiuscole', async () => {
    const trovati = await risolvi(cercaProdotti('TACHIPIRINA'));
    expect(trovati.map(p => p.id)).toContain('p01');
  });

  test('ricerca per marca con accento', async () => {
    const trovati = await risolvi(cercaProdotti('dompe'));
    expect(trovati.map(p => p.nome)).toContain('OKi 80 mg');
  });

  test('filtro per categoria', async () => {
    const trovati = await risolvi(cercaProdotti('', 'igiene'));
    expect(trovati).toHaveLength(4);
    expect(trovati.every(p => p.categoria === 'igiene')).toBe(true);
  });

  test('prezzo minimo fra le farmacie', async () => {
    const [tachipirina] = await risolvi(cercaProdotti('tachipirina'));
    expect(tachipirina.prezzoMinimo).toBe(4.75);
  });

  test('più cercati', async () => {
    const piuCercati = await risolvi(ottieniPiuCercati());
    expect(piuCercati.every(p => p.piuCercato)).toBe(true);
  });

  test('farmacie di un prodotto: ordinate per distanza, esaurite escluse', async () => {
    // Tachifludec (p08) è esaurito nella farmacia f4
    const farmacie = await risolvi(ottieniFarmacieConProdotto('p08'));
    expect(farmacie.map(f => f.id)).not.toContain('f4');
    expect(farmacie).toHaveLength(3);
    const distanze = farmacie.map(f => f.distanzaKm);
    expect(distanze).toEqual([...distanze].sort((a, b) => a - b));
  });
});
