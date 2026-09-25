/**
 * @format
 */
// Test del Profilo: dati dell'utente, conferma di uscita e logout.
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';
import { Alert, AlertButton, Text } from 'react-native';
import App from '../App';

type Istanza = ReactTestRenderer.ReactTestInstance;

function testiAschermo(radice: Istanza): string[] {
  return radice
    .findAllByType(Text)
    .map(nodo => [nodo.props.children].flat().join(''));
}

async function premi(radice: Istanza, condizione: (nodo: Istanza) => boolean) {
  const nodo = radice.find(
    n => typeof n.props.onPress === 'function' && condizione(n),
  );
  await ReactTestRenderer.act(async () => {
    nodo.props.onPress();
    await jest.runAllTimersAsync();
  });
}

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
  jest.restoreAllMocks();
});

test('Esci chiede conferma, poi cancella sessione e carrello e mostra il Login', async () => {
  await AsyncStorage.setItem(
    'farmacorsi:sessione',
    JSON.stringify({ id: 'u1', nome: 'Diego', email: 'diego@farmacorsi.it' }),
  );
  // un carrello con qualcosa dentro, per controllare l'avviso
  await AsyncStorage.setItem(
    'farmacorsi:carrello',
    JSON.stringify([
      {
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
        quantitaMassima: 24,
      },
    ]),
  );

  // "Spiamo" Alert.alert: nei test non c'è una vera finestra di dialogo.
  const spiaAlert = jest.spyOn(Alert, 'alert');

  let app: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    app = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(async () => {
    await jest.runAllTimersAsync();
  });
  const radice = app!.root;

  // 1. Profilo: iniziale, nome, email e indirizzo
  await premi(radice, n => n.props.testID === 'tab-profilo');
  const testi = testiAschermo(radice);
  expect(testi).toContain('D');
  expect(testi).toContain('diego@farmacorsi.it');
  expect(testi).toContain('Piazza Matteotti 1, 19038 Sarzana SP');

  // 2. Esci: compare la conferma con l'avviso sul carrello
  await premi(
    radice,
    n =>
      n.props.accessibilityRole === 'button' &&
      testiAschermo(n).includes('Esci'),
  );
  expect(spiaAlert).toHaveBeenCalledTimes(1);
  const [titolo, messaggio, pulsanti] = spiaAlert.mock.calls[0];
  expect(titolo).toBe('Esci');
  expect(messaggio).toContain('Il carrello verrà svuotato');

  // 3. Premiamo "Esci" nella finestra di conferma
  const pulsanteEsci = (pulsanti as AlertButton[]).find(p => p.text === 'Esci');
  await ReactTestRenderer.act(async () => {
    pulsanteEsci?.onPress?.();
    await jest.runAllTimersAsync();
  });

  // 4. Siamo sul Login, sessione e carrello cancellati
  expect(testiAschermo(radice)).toContain('Accedi');
  expect(await AsyncStorage.getItem('farmacorsi:sessione')).toBeNull();
  expect(JSON.parse((await AsyncStorage.getItem('farmacorsi:carrello'))!)).toEqual(
    [],
  );
});
