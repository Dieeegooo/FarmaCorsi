import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FornitoreUtente from './src/contesti/ContestoUtente';
import Navigatore from './src/navigazione/Navigatore';

// Punto di partenza dell'app. L'ordine dei "fornitori" conta:
// 1. SafeAreaProvider: misura i bordi del telefono (notch, barre di sistema)
// 2. FornitoreUtente: rende l'utente disponibile a tutte le schermate
// 3. Navigatore: sceglie Login oppure tab in base all'utente
function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <FornitoreUtente>
        <Navigatore />
      </FornitoreUtente>
    </SafeAreaProvider>
  );
}

export default App;
