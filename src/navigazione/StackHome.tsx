import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DettaglioProdotto from '../schermate/DettaglioProdotto';
import Home from '../schermate/Home';
import RisultatiRicerca from '../schermate/RisultatiRicerca';
import { colori, pesi } from '../tema';
import { ParametriStackHome } from './tipiNavigazione';

const Stack = createNativeStackNavigator<ParametriStackHome>();

// Stack della tab Home: Vetrina → RisultatiRicerca → DettaglioProdotto.
// La freccia "indietro" nella barra in alto la aggiunge React Navigation.
function StackHome() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: colori.primario, // colore della freccia indietro
        headerStyle: { backgroundColor: colori.superficie },
        headerTitleStyle: { color: colori.testo, fontWeight: pesi.grassetto },
      }}
    >
      <Stack.Screen
        name="Vetrina"
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RisultatiRicerca"
        component={RisultatiRicerca}
        options={{ title: 'Risultati' }}
      />
      <Stack.Screen
        name="DettaglioProdotto"
        component={DettaglioProdotto}
        options={{ title: 'Prodotto' }}
      />
    </Stack.Navigator>
  );
}

export default StackHome;
