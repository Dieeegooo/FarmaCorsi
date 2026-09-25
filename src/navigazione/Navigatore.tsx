import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { useUtente } from '../contesti/ContestoUtente';
import IconaLogo from '../icone/IconaLogo';
import Login from '../schermate/Login';
import { colori, spaziature } from '../tema';
import TabPrincipali from './TabPrincipali';
import { ParametriStackRadice } from './tipiNavigazione';

const Stack = createNativeStackNavigator<ParametriStackRadice>();

function Navigatore() {
  const { utente, caricamentoIniziale } = useUtente();

  // Finché non sappiamo se c'è una sessione salvata, non mostriamo né
  // il Login né la Home: così chi è già dentro non vede un "lampo" del Login.
  if (caricamentoIniziale) {
    return (
      <View style={styles.avvio}>
        <IconaLogo dimensione={72} />
        <ActivityIndicator color={colori.primario} />
      </View>
    );
  }

  // Navigazione condizionale: in base a "utente" registriamo schermate
  // diverse. Quando utente cambia (login o logout) React Navigation
  // passa da solo all'altra schermata.
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {utente === null ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <Stack.Screen name="Principale" component={TabPrincipali} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  avvio: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaziature.grandissima,
    backgroundColor: colori.sfondo,
  },
});

export default Navigatore;
