import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Categoria } from '../tipi';

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

// Stack dentro la tab Home: Vetrina → RisultatiRicerca → DettaglioProdotto.
// RisultatiRicerca riceve il testo cercato OPPURE una categoria (per
// questo sono facoltativi); DettaglioProdotto l'id del prodotto.
export type ParametriStackHome = {
  Vetrina: undefined;
  RisultatiRicerca: { testo?: string; categoria?: Categoria };
  DettaglioProdotto: { idProdotto: string };
};

// Tipi delle props che ogni schermata riceve dal navigatore
// (navigation per spostarsi, route per leggere i parametri).
export type PropsLogin = NativeStackScreenProps<ParametriStackRadice, 'Login'>;
export type PropsHome = NativeStackScreenProps<ParametriStackHome, 'Vetrina'>;
export type PropsRisultatiRicerca = NativeStackScreenProps<
  ParametriStackHome,
  'RisultatiRicerca'
>;
// Composite = props dello stack + props delle tab che lo contengono:
// così dal dettaglio si può navigare anche alla tab "Carrello".
export type PropsDettaglioProdotto = CompositeScreenProps<
  NativeStackScreenProps<ParametriStackHome, 'DettaglioProdotto'>,
  BottomTabScreenProps<ParametriTab>
>;
export type PropsCarrello = BottomTabScreenProps<ParametriTab, 'Carrello'>;
export type PropsProfilo = BottomTabScreenProps<ParametriTab, 'Profilo'>;
