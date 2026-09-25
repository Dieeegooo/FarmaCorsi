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

// Stack dentro la tab Home: dall'elenco si apre la pagina del prodotto.
// DettaglioProdotto riceve l'id del prodotto da mostrare.
export type ParametriStackHome = {
  Vetrina: undefined;
  DettaglioProdotto: { idProdotto: string };
};

// Tipi delle props che ogni schermata riceve dal navigatore
// (navigation per spostarsi, route per leggere i parametri).
export type PropsLogin = NativeStackScreenProps<ParametriStackRadice, 'Login'>;
export type PropsHome = NativeStackScreenProps<ParametriStackHome, 'Vetrina'>;
export type PropsDettaglioProdotto = NativeStackScreenProps<
  ParametriStackHome,
  'DettaglioProdotto'
>;
export type PropsCarrello = BottomTabScreenProps<ParametriTab, 'Carrello'>;
export type PropsProfilo = BottomTabScreenProps<ParametriTab, 'Profilo'>;
