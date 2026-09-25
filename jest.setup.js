/* eslint-env jest */
// Preparazione dei test: Jest gira sul computer, non sul telefono,
// quindi i moduli nativi vanno sostituiti con versioni finte (mock).

// AsyncStorage finto: salva i dati in memoria invece che sul telefono.
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest'),
);
