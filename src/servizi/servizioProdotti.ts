import prodotti from '../dati/prodotti';
import disponibilita from '../dati/disponibilita';
import farmacie from '../dati/farmacie';
import categorieFinte, { VoceCategoria } from '../dati/categorie';
import {
  Categoria,
  FarmaciaConProdotto,
  Prodotto,
  ProdottoConPrezzo,
} from '../tipi';
import { contiene } from '../utilita/testo';
import { aggiungiDistanza } from './servizioFarmacie';
import ritardoFinto from './ritardoFinto';

// Righe di disponibilità di un prodotto, escludendo le farmacie esaurite.
function disponibilitaDi(idProdotto: string) {
  return disponibilita.filter(
    riga => riga.idProdotto === idProdotto && riga.quantitaDisponibile > 0,
  );
}

// Aggiunge al prodotto il prezzo più basso e in quante farmacie si trova.
function aggiungiPrezzo(prodotto: Prodotto): ProdottoConPrezzo {
  const righe = disponibilitaDi(prodotto.id);
  const prezzi = righe.map(riga => riga.prezzo);

  return {
    ...prodotto,
    prezzoMinimo: prezzi.length > 0 ? Math.min(...prezzi) : 0,
    numeroFarmacie: righe.length,
  };
}

// Tutti i prodotti disponibili in almeno una farmacia.
export async function ottieniProdotti(): Promise<ProdottoConPrezzo[]> {
  await ritardoFinto();
  return prodotti.map(aggiungiPrezzo).filter(p => p.numeroFarmacie > 0);
}

// Sezione "Più cercati" della Home.
export async function ottieniPiuCercati(): Promise<ProdottoConPrezzo[]> {
  await ritardoFinto();
  return prodotti.filter(prodotto => prodotto.piuCercato).map(aggiungiPrezzo);
}

// Ricerca per nome o marca (ignorando maiuscole e accenti) e/o per categoria.
export async function cercaProdotti(
  testoCercato: string = '',
  categoria?: Categoria,
): Promise<ProdottoConPrezzo[]> {
  await ritardoFinto();

  const trovati = prodotti.filter(prodotto => {
    const corrispondeAlTesto =
      testoCercato.trim() === '' ||
      contiene(prodotto.nome, testoCercato) ||
      contiene(prodotto.marca, testoCercato);

    const corrispondeAllaCategoria =
      categoria === undefined || prodotto.categoria === categoria;

    return corrispondeAlTesto && corrispondeAllaCategoria;
  });

  return trovati.map(aggiungiPrezzo).filter(p => p.numeroFarmacie > 0);
}

// Un solo prodotto, per la schermata DettaglioProdotto.
export async function ottieniProdotto(
  idProdotto: string,
): Promise<ProdottoConPrezzo | null> {
  await ritardoFinto(150);
  const prodotto = prodotti.find(elemento => elemento.id === idProdotto);
  return prodotto ? aggiungiPrezzo(prodotto) : null;
}

// Il cuore dell'app: da un prodotto alle farmacie che ce l'hanno,
// ordinate dalla più vicina, con il prezzo di ciascuna.
export async function ottieniFarmacieConProdotto(
  idProdotto: string,
): Promise<FarmaciaConProdotto[]> {
  await ritardoFinto();

  const risultato: FarmaciaConProdotto[] = [];

  disponibilitaDi(idProdotto).forEach(riga => {
    const farmacia = farmacie.find(elemento => elemento.id === riga.idFarmacia);
    if (farmacia) {
      risultato.push({
        ...aggiungiDistanza(farmacia),
        prezzo: riga.prezzo,
        quantitaDisponibile: riga.quantitaDisponibile,
      });
    }
  });

  return risultato.sort((a, b) => a.distanzaKm - b.distanzaKm);
}

// Elenco delle categorie per la barra orizzontale della Home.
export async function ottieniCategorie(): Promise<VoceCategoria[]> {
  await ritardoFinto(100);
  return categorieFinte;
}
