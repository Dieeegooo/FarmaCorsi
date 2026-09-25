import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import BarraRicerca from '../componenti/BarraRicerca';
import SchedaProdotto from '../componenti/SchedaProdotto';
import IconaChiudi from '../icone/IconaChiudi';
import IconaRicerca from '../icone/IconaRicerca';
import { PropsRisultatiRicerca } from '../navigazione/tipiNavigazione';
import { cercaProdotti, ottieniCategorie } from '../servizi/servizioProdotti';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { Categoria, ProdottoConPrezzo } from '../tipi';

function RisultatiRicerca({ route, navigation }: PropsRisultatiRicerca) {
  // Valori iniziali dai parametri passati dalla Home.
  const [testoInBarra, setTestoInBarra] = useState(route.params.testo ?? '');
  const [testoCercato, setTestoCercato] = useState(route.params.testo ?? '');
  const [categoria, setCategoria] = useState<Categoria | undefined>(
    route.params.categoria,
  );
  const [etichettaCategoria, setEtichettaCategoria] = useState('');

  const [risultati, setRisultati] = useState<ProdottoConPrezzo[]>([]);
  const [caricamento, setCaricamento] = useState(true);

  // Rifà la ricerca ogni volta che cambiano testo cercato o categoria.
  useEffect(() => {
    // "attivo" evita di mostrare risultati vecchi se l'utente cerca di nuovo
    // prima che la ricerca precedente sia finita.
    let attivo = true;

    async function cerca() {
      setCaricamento(true);
      const [trovati, categorie] = await Promise.all([
        cercaProdotti(testoCercato, categoria),
        ottieniCategorie(),
      ]);
      if (!attivo) {
        return;
      }
      const voce = categorie.find(c => c.id === categoria);
      setEtichettaCategoria(voce?.etichetta ?? '');
      setRisultati(trovati);
      setCaricamento(false);
    }

    cerca();

    // Funzione di "pulizia": React la chiama prima della ricerca successiva.
    return () => {
      attivo = false;
    };
  }, [testoCercato, categoria]);

  // Titolo della barra in alto: la categoria, oppure il testo cercato.
  useEffect(() => {
    let titolo = 'Risultati';
    if (testoCercato.trim() !== '') {
      titolo = `"${testoCercato.trim()}"`;
    } else if (etichettaCategoria !== '') {
      titolo = etichettaCategoria;
    }
    navigation.setOptions({ title: titolo });
  }, [navigation, testoCercato, etichettaCategoria]);

  function apriProdotto(prodotto: ProdottoConPrezzo) {
    navigation.navigate('DettaglioProdotto', { idProdotto: prodotto.id });
  }

  // Intestazione della lista: barra, filtro attivo e numero di risultati.
  const intestazione = (
    <View style={styles.intestazione}>
      <BarraRicerca
        valore={testoInBarra}
        onCambiaTesto={setTestoInBarra}
        onCerca={() => setTestoCercato(testoInBarra)}
      />

      {categoria !== undefined && etichettaCategoria !== '' ? (
        <Pressable
          onPress={() => setCategoria(undefined)}
          accessibilityRole="button"
          accessibilityLabel={`Togli il filtro ${etichettaCategoria}`}
          style={styles.filtro}
        >
          <Text style={styles.testoFiltro}>{etichettaCategoria}</Text>
          <IconaChiudi dimensione={16} colore={colori.testoSuPrimario} />
        </Pressable>
      ) : null}

      {!caricamento ? (
        <Text style={styles.conteggio}>
          {risultati.length === 1
            ? '1 prodotto trovato'
            : `${risultati.length} prodotti trovati`}
        </Text>
      ) : null}
    </View>
  );

  // Cosa mostrare quando la lista è vuota: caricamento o nessun risultato.
  const listaVuota = caricamento ? (
    <ActivityIndicator
      size="large"
      color={colori.primario}
      style={styles.caricamento}
    />
  ) : (
    <View style={styles.vuoto}>
      <IconaRicerca dimensione={48} colore={colori.bordo} />
      <Text style={styles.titoloVuoto}>Nessun prodotto trovato</Text>
      <Text style={styles.testoVuoto}>
        Prova a cercare un altro nome o una marca, controlla come l'hai
        scritto oppure sfoglia le categorie dalla Home.
      </Text>
    </View>
  );

  return (
    <FlatList
      style={styles.schermo}
      contentContainerStyle={styles.contenuto}
      data={caricamento ? [] : risultati}
      keyExtractor={prodotto => prodotto.id}
      ListHeaderComponent={intestazione}
      ListEmptyComponent={listaVuota}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => (
        <SchedaProdotto prodotto={item} onPremi={() => apriProdotto(item)} />
      )}
    />
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenuto: {
    padding: spaziature.grande,
  },
  intestazione: {
    gap: spaziature.media,
    marginBottom: spaziature.media,
  },
  filtro: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spaziature.piccola,
    backgroundColor: colori.primario,
    borderRadius: raggi.tondo,
    paddingVertical: spaziature.piccolissima,
    paddingLeft: spaziature.media,
    paddingRight: spaziature.piccola,
  },
  testoFiltro: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testoSuPrimario,
  },
  conteggio: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
  },
  caricamento: {
    marginTop: spaziature.enorme,
  },
  vuoto: {
    alignItems: 'center',
    marginTop: spaziature.enorme,
    paddingHorizontal: spaziature.grandissima,
    gap: spaziature.piccola,
  },
  titoloVuoto: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.media,
  },
  testoVuoto: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    textAlign: 'center',
    lineHeight: dimensioniTesto.normale * 1.5,
  },
});

export default RisultatiRicerca;
