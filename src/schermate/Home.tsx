import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import SchedaProdotto from '../componenti/SchedaProdotto';
import { useUtente } from '../contesti/ContestoUtente';
import IconaLogo from '../icone/IconaLogo';
import IconaPosizione from '../icone/IconaPosizione';
import { ottieniFarmacieVicine } from '../servizi/servizioFarmacie';
import { ottieniPosizioneUtente } from '../servizi/servizioPosizione';
import { ottieniProdotti } from '../servizi/servizioProdotti';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { FarmaciaVicina, ProdottoConPrezzo } from '../tipi';
import { formattaTempoConsegna } from '../utilita/consegna';
import { formattaDistanza } from '../utilita/distanza';
import { salutaUtente } from '../utilita/saluto';

// Home provvisoria del punto 1: saluto con il nome dell'utente loggato.
// Ricerca, categorie e "Più cercati" arrivano al punto 2.
function Home() {
  // Il nome arriva dal contesto: nessuna prop da passare a mano.
  const { utente } = useUtente();
  const bordiSicuri = useSafeAreaInsets();

  // useState: i dati partono vuoti e arrivano dopo, dai servizi.
  const [prodotti, setProdotti] = useState<ProdottoConPrezzo[]>([]);
  const [farmacie, setFarmacie] = useState<FarmaciaVicina[]>([]);
  const [citta, setCitta] = useState('');
  const [caricamento, setCaricamento] = useState(true);

  // useEffect con lista di dipendenze vuota: gira una volta sola,
  // quando la schermata compare.
  useEffect(() => {
    async function caricaDati() {
      const [elencoProdotti, elencoFarmacie, posizione] = await Promise.all([
        ottieniProdotti(),
        ottieniFarmacieVicine(),
        ottieniPosizioneUtente(),
      ]);
      setProdotti(elencoProdotti);
      setFarmacie(elencoFarmacie);
      setCitta(posizione.citta);
      setCaricamento(false);
    }

    caricaDati();
  }, []);

  if (caricamento) {
    return (
      <View style={styles.centrato}>
        <ActivityIndicator size="large" color={colori.primario} />
        <Text style={styles.testoSecondario}>Carico i prodotti...</Text>
      </View>
    );
  }

  // Intestazione della lista: logo, saluto, posizione e farmacie vicine.
  const intestazione = (
    <View>
      <View style={styles.rigaLogo}>
        <IconaLogo dimensione={36} />
        <Text style={styles.titolo}>FarmaCorsi</Text>
      </View>

      <Text style={styles.saluto}>{salutaUtente(utente?.nome ?? '')}</Text>

      <View style={styles.riga}>
        <IconaPosizione dimensione={18} colore={colori.testoSecondario} />
        <Text style={styles.testoSecondario}>Consegna a: {citta}</Text>
      </View>

      <Text style={styles.sottotitolo}>Farmacie vicino a te</Text>
      {farmacie.slice(0, 3).map(farmacia => (
        <View key={farmacia.id} style={styles.rigaFarmacia}>
          <Text style={styles.nomeFarmacia}>{farmacia.nome}</Text>
          <Text style={styles.testoSecondario}>
            {formattaDistanza(farmacia.distanzaKm)} ·{' '}
            {formattaTempoConsegna(farmacia.minutiConsegna)}
          </Text>
        </View>
      ))}

      <Text style={styles.sottotitolo}>Tutti i prodotti ({prodotti.length})</Text>
    </View>
  );

  // FlatList: disegna solo le righe visibili, meglio di .map() su liste lunghe.
  return (
    <FlatList
      style={styles.lista}
      contentContainerStyle={[
        styles.contenutoLista,
        { paddingTop: bordiSicuri.top + spaziature.grande },
      ]}
      data={prodotti}
      keyExtractor={prodotto => prodotto.id}
      ListHeaderComponent={intestazione}
      renderItem={({ item }) => <SchedaProdotto prodotto={item} />}
    />
  );
}

const styles = StyleSheet.create({
  lista: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenutoLista: {
    padding: spaziature.grande,
  },
  centrato: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colori.sfondo,
    gap: spaziature.media,
  },
  rigaLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
  },
  titolo: {
    fontSize: dimensioniTesto.titolo,
    fontWeight: pesi.grassetto,
    color: colori.primario,
  },
  saluto: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.medio,
    color: colori.testo,
    marginTop: spaziature.grande,
  },
  riga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
    marginTop: spaziature.piccolissima,
  },
  testoSecondario: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
  },
  sottotitolo: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.grandissima,
    marginBottom: spaziature.piccola,
  },
  rigaFarmacia: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.media,
    marginBottom: spaziature.piccola,
  },
  nomeFarmacia: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
});

export default Home;
