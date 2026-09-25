import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Categoria, Ordine } from '../tipi';

// Per ogni navigatore: nome della schermata → parametri che riceve.
// undefined = la schermata non riceve parametri.

// Stack principale dell'app.
// Utente NON loggato: solo Login.
// Utente loggato: Principale (le tab) e, sopra, Checkout e OrdineConfermato
// (a tutto schermo, senza la barra delle tab).
export type ParametriStackRadice = {
  Login: undefined;
  Principale: NavigatorScreenParams<ParametriTab> | undefined;
  Checkout: undefined;
  OrdineConfermato: { ordine: Ordine };
};

// Tab in basso, per l'utente loggato.
// Home contiene uno stack: NavigatorScreenParams permette di dire quale
// schermata aprire DENTRO la tab (es. { screen: 'Vetrina' }).
export type ParametriTab = {
  Home: NavigatorScreenParams<ParametriStackHome> | undefined;
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
// Il Carrello è una tab, ma deve aprire il Checkout dello stack principale.
export type PropsCarrello = CompositeScreenProps<
  BottomTabScreenProps<ParametriTab, 'Carrello'>,
  NativeStackScreenProps<ParametriStackRadice>
>;
export type PropsCheckout = NativeStackScreenProps<
  ParametriStackRadice,
  'Checkout'
>;
export type PropsOrdineConfermato = NativeStackScreenProps<
  ParametriStackRadice,
  'OrdineConfermato'
>;
export type PropsProfilo = BottomTabScreenProps<ParametriTab, 'Profilo'>;
