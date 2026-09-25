// Tipi condivisi da tutta l'app (modelli dati della SPEC, sezione 4).

// Utente autenticato. La password NON fa parte di questo tipo:
// in AsyncStorage salviamo solo questi tre campi.
export type Utente = {
  id: string;
  nome: string;
  email: string;
};

// Le categorie sono un elenco chiuso: TypeScript segnala subito
// se si scrive una categoria che non esiste.
export type Categoria =
  | 'dolore-febbre'
  | 'raffreddore'
  | 'digestione'
  | 'pelle-solari'
  | 'integratori'
  | 'igiene';

// Forme di confezione che IllustrazioneProdotto sa disegnare.
export type FormaConfezione = 'scatola' | 'tubo' | 'flacone' | 'cilindro';

// Come disegnare la confezione di un prodotto (al posto di una foto).
export type AspettoConfezione = {
  forma: FormaConfezione;
  coloreSfondo: string; // colore principale della confezione
  coloreFascia: string; // fascia colorata con il nome
  coloreAccento: string; // piccolo dettaglio decorativo
  scritta: string; // nome grande sulla confezione
  sottoscritta: string; // es. "500 mg"
};

export type Tipologia =
  | 'Farmaco senza obbligo di ricetta'
  | 'Integratore alimentare'
  | 'Cosmetico';

// Informazioni mostrate nella pagina del prodotto.
export type SpecificheProdotto = {
  tipologia: Tipologia;
  principioAttivo: string;
  indicazioni: string; // a cosa serve
  modoUso: string; // come si usa
  avvertenze: string;
};

// Una categoria con l'etichetta da mostrare a schermo.
export type VoceCategoria = {
  id: Categoria;
  etichetta: string;
};

export type Prodotto = {
  id: string;
  nome: string;
  marca: string;
  formato: string;
  descrizione: string;
  categoria: Categoria;
  piuCercato: boolean;
  // Facoltativi (il "?"): per la demo solo alcuni prodotti li hanno.
  // Con il backend arriverà qui anche l'URL della foto vera.
  aspetto?: AspettoConfezione;
  specifiche?: SpecificheProdotto;
};

export type Farmacia = {
  id: string;
  nome: string;
  indirizzo: string;
  citta: string;
  latitudine: number;
  longitudine: number;
};

// Collega un prodotto a una farmacia con il suo prezzo in quella farmacia.
export type Disponibilita = {
  idProdotto: string;
  idFarmacia: string;
  prezzo: number;
  quantitaDisponibile: number;
};

export type ElementoCarrello = {
  idProdotto: string;
  idFarmacia: string;
  prezzo: number;
  quantita: number;
};

// Una riga del carrello: l'ElementoCarrello della SPEC più i dati che
// servono per mostrarla (prodotto, farmacia, pezzi disponibili) senza
// doverli richiedere ogni volta ai servizi.
export type RigaCarrello = ElementoCarrello & {
  prodotto: Prodotto;
  nomeFarmacia: string;
  minutiConsegna: number;
  quantitaMassima: number; // pezzi disponibili in quella farmacia
};

export type MetodoPagamento = 'carta' | 'contanti';

export type Ordine = {
  id: string;
  elementi: ElementoCarrello[];
  subtotale: number;
  costoConsegna: number;
  totale: number;
  indirizzo: string;
  metodoPagamento: MetodoPagamento;
  dataOra: string;
};

// Tipi "compositi" che i servizi restituiscono alle schermate:
// uniscono i dati grezzi con i valori calcolati (distanza, tempo, prezzo).

// Una farmacia con distanza e tempo di consegna già calcolati.
export type FarmaciaVicina = Farmacia & {
  distanzaKm: number;
  minutiConsegna: number;
};

// Una farmacia che ha un certo prodotto: serve alla schermata DettaglioProdotto.
export type FarmaciaConProdotto = FarmaciaVicina & {
  prezzo: number;
  quantitaDisponibile: number;
};

// Un prodotto con il prezzo più basso fra le farmacie che lo hanno:
// è il "da X €" mostrato nelle liste.
export type ProdottoConPrezzo = Prodotto & {
  prezzoMinimo: number;
  numeroFarmacie: number;
};
