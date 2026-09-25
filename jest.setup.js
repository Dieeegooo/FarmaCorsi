/* eslint-env jest */
// Preparazione dei test: Jest gira sul computer, non sul telefono,
// quindi i moduli nativi vanno sostituiti con versioni finte (mock).

// AsyncStorage finto: salva i dati in memoria invece che sul telefono.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);

// SafeAreaProvider disegna i figli solo quando conosce le misure dello
// schermo, che in Jest non esiste: il mock ufficiale fornisce misure finte.
// (il mock esporta tutto dentro "default")
jest.mock(
  'react-native-safe-area-context',
  () => require('react-native-safe-area-context/jest/mock').default,
);
