module.exports = {
  preset: '@react-native/jest-preset',
  setupFiles: ['<rootDir>/jest.setup.js'],
  // Queste librerie sono pubblicate con import/export moderni:
  // Jest deve trasformarle come il nostro codice.
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native(-community)?|@react-native-async-storage|@react-navigation|react-native-screens|react-native-safe-area-context|react-native-svg)/)',
  ],
};
