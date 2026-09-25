/**
 * @format
 */
// Bug corretto: dal carrello vuoto "Cerca un prodotto" riportava all'ultima
// schermata aperta nella tab Home (es. il dettaglio della Tachipirina)
// invece che alla Home.
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import App from '../App';

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

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

test('"Cerca un prodotto" dal carrello vuoto torna alla Home, non al dettaglio', async () => {
  await AsyncStorage.setItem(
    'farmacorsi:sessione',
    JSON.stringify({ id: 'u1', nome: 'Diego', email: 'diego@farmacorsi.it' }),
  );

  let app: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    app = ReactTestRenderer.create(<App />);
  });
  // prima gli effetti partono, poi facciamo scattare i ritardi finti
  await ReactTestRenderer.act(async () => {
    await jest.runAllTimersAsync();
  });
  const radice = app!.root;

  // 1. Dalla Home apro il dettaglio della Tachipirina
  await premi(radice, n =>
    String(n.props.accessibilityLabel ?? '').startsWith('Tachipirina'),
  );
  expect(testiAschermo(radice)).toContain('Informazioni sul prodotto');

  // 2. Vado sulla tab Carrello (vuoto)
  await premi(radice, n => n.props.testID === 'tab-carrello');
  expect(testiAschermo(radice)).toContain('Il carrello è vuoto');

  // 3. "Cerca un prodotto": il dettaglio deve essere chiuso
  await premi(radice, n => n.props.accessibilityLabel === undefined &&
    testiAschermo(n).includes('Cerca un prodotto'));
  expect(testiAschermo(radice)).not.toContain('Informazioni sul prodotto');
  expect(testiAschermo(radice)).toContain('Più cercati');
});
