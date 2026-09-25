import { colori } from '../tema';

// Tutte le icone accettano le stesse due props: quanto sono grandi
// e di che colore. Così si usano tutte allo stesso modo:
// <IconaCarrello dimensione={28} colore={colori.primario} />
export type PropsIcona = {
  dimensione?: number;
  colore?: string;
};

// Valori usati quando le props non vengono passate.
export const DIMENSIONE_PREDEFINITA = 24;
export const COLORE_PREDEFINITO = colori.testo;

// Le icone sono disegnate in uno spazio 24x24 e hanno tutte lo stesso
// spessore di linea: è questo che le fa sembrare una famiglia sola.
export const SPESSORE_LINEA = 1.8;
export const RIQUADRO = '0 0 24 24';
