import { TextStyle } from 'react-native';

// Dimensioni del testo usate nell'app.
const dimensioniTesto = {
  piccolo: 12,
  normale: 14,
  medio: 16,
  grande: 20,
  titolo: 24,
  titoloGrande: 32,
};

// Pesi del carattere. Il tipo TextStyle['fontWeight'] di React Native
// evita di scrivere valori non validi.
export const pesi: Record<'normale' | 'medio' | 'grassetto', TextStyle['fontWeight']> = {
  normale: '400',
  medio: '600',
  grassetto: '700',
};

export default dimensioniTesto;
