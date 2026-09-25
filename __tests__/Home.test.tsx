/**
 * @format
 */
// Test di integrazione: utente con sessione salvata → l'app apre la Home.
import AsyncStorage from '@react-native-async-storage/async-storage';
import ReactTestRenderer from 'react-test-renderer';
import { Text } from 'react-native';
import App from '../App';

// Raccoglie tutti i testi mostrati a schermo in un'unica lista.
function testiAschermo(radice: ReactTestRenderer.ReactTestInstance): string[] {
  return radice
    .findAllByType(Text)
    .map(nodo => [nodo.props.children].flat().join(''));
}

beforeEach(() => {
  jest.useFakeTimers();
});
afterEach(() => {
  jest.useRealTimers();
});

test('con una sessione salvata si entra in Home con tutte le sezioni', async () => {
  await AsyncStorage.setItem(
    'farmacorsi:sessione',
    JSON.stringify({ id: 'u1', nome: 'Diego', email: 'diego@farmacorsi.it' }),
  );

  let app: ReactTestRenderer.ReactTestRenderer | undefined;
  await ReactTestRenderer.act(async () => {
    app = ReactTestRenderer.create(<App />);
  });
  // fa scattare i ritardi finti dei servizi
  await ReactTestRenderer.act(async () => {
    await jest.runAllTimersAsync();
  });

  const testi = testiAschermo(app!.root);

  expect(testi.some(t => t.endsWith(' Diego'))).toBe(true); // saluto
  expect(testi).toContain('Consegna a: Sarzana');
  expect(testi).toContain('Categorie');
  expect(testi).toContain('Più cercati');
  expect(testi).toContain('Farmacie vicino a te');
  expect(testi).toContain('Dolore e febbre');
  expect(testi).toContain('Farmacia Centrale');
  // il Login non c'è
  expect(testi).not.toContain('Accedi');
});
