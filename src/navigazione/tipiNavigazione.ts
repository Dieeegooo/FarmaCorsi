import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Per ogni navigatore: nome della schermata → parametri che riceve.
// undefined = la schermata non riceve parametri.

// Stack principale dell'app. Le due schermate non esistono mai insieme:
// Login se l'utente NON è loggato, Principale (le tab) se è loggato.
export type ParametriStackRadice = {
  Login: undefined;
  Principale: undefined;
};

// Tab in basso, per l'utente loggato.
export type ParametriTab = {
  Home: undefined;
  Carrello: undefined;
  Profilo: undefined;
};

// Tipi delle props che ogni schermata riceve dal navigatore
// (navigation per spostarsi, route per leggere i parametri).
export type PropsLogin = NativeStackScreenProps<ParametriStackRadice, 'Login'>;
export type PropsHome = BottomTabScreenProps<ParametriTab, 'Home'>;
export type PropsCarrello = BottomTabScreenProps<ParametriTab, 'Carrello'>;
export type PropsProfilo = BottomTabScreenProps<ParametriTab, 'Profilo'>;
