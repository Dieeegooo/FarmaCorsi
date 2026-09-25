/**
 * @format
 */
// Test del flusso completo: carrello → checkout → ordine confermato → Home.
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import App from '../App';
import { RigaCarrello } from '../src/tipi';

type Istanza = ReactTestRenderer.ReactTestInstance;

function testiAschermo(radice: Istanza): string[] {
  return radice
    .findAllByType(Text)
    .map(nodo => [nodo.props.children].flat().join(''));
}

// Preme il primo elemento toccabile che soddisfa la condizione.
async function premi(radice: Istanza, condizione: (nodo: Istanza) => boolean) {
  const nodo = radice.find(
    n => typeof n.props.onPress === 'function' && condizione(n),
  );
  await ReactTestRenderer.act(async () => {
    nodo.props.onPress();
    await jest.runAllTimersAsync();
  });
}

// Preme il pulsante che contiene esattamente quel testo.
function conTesto(testo: string) {
  return (nodo: Istanza) =>
    nodo.props.accessibilityRole === 'button' &&
    testiAschermo(nodo).includes(testo);
}

const carrelloSalvato: RigaCarrello[] = [
  {
    idProdotto: 'p01',
    idFarmacia: 'f1',
    prezzo: 4.9,
    quantita: 2,
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
];

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

test('dal carrello si conferma l\'ordine e il carrello si svuota', async () => {
  await AsyncStorage.setItem(
    'farmacorsi:sessione',
    JSON.stringify({ id: 'u1', nome: 'Diego', email: 'diego@farmacorsi.it' }),
  );
  await AsyncStorage.setItem(
    'farmacorsi:carrello',
    JSON.stringify(carrelloSalvato),
  );

  let app: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    app = ReactTestRenderer.create(<App />);
  });
  await ReactTestRenderer.act(async () => {
    await jest.runAllTimersAsync();
  });
  const radice = app!.root;

  // 1. Carrello → Procedi all'ordine
  await premi(radice, n => n.props.testID === 'tab-carrello');
  await premi(radice, conTesto("Procedi all'ordine"));

  // 2. Checkout: indirizzo precompilato e totale
  const testiCheckout = testiAschermo(radice);
  expect(testiCheckout).toContain('Da Farmacia Centrale');
  expect(testiCheckout).toContain('2 × Tachipirina 500 mg');
  const campoIndirizzo = radice.find(
    n => n.props.placeholder === 'Via, numero civico, città' && n.props.onChangeText,
  );
  expect(campoIndirizzo.props.value).toBe('Piazza Matteotti 1, 19038 Sarzana SP');

  // 3. Conferma ordine (9,80 € + 2,99 € di consegna)
  await premi(radice, conTesto('Conferma ordine · 12,79 €'));

  const testiConferma = testiAschermo(radice);
  expect(testiConferma).toContain('Ordine confermato!');
  expect(testiConferma.some(t => /^FC-\d{6}$/.test(t))).toBe(true);
  expect(JSON.parse((await AsyncStorage.getItem('farmacorsi:carrello'))!)).toEqual(
    [],
  );

  // 4. Torna alla Home
  await premi(radice, conTesto('Torna alla Home'));
  const testiHome = testiAschermo(radice);
  expect(testiHome).not.toContain('Ordine confermato!');
  expect(testiHome).toContain('Più cercati');
});
