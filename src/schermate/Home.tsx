import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BarraRicerca from '../componenti/BarraRicerca';
import ChipCategoria from '../componenti/ChipCategoria';
import RigaFarmacia from '../componenti/RigaFarmacia';
import SchedaProdottoVerticale from '../componenti/SchedaProdottoVerticale';
import { useUtente } from '../contesti/ContestoUtente';
import IconaLogo from '../icone/IconaLogo';
import IconaPosizione from '../icone/IconaPosizione';
import { PropsHome } from '../navigazione/tipiNavigazione';
import { ottieniFarmacieVicine } from '../servizi/servizioFarmacie';
import { ottieniPosizioneUtente } from '../servizi/servizioPosizione';
import {
  ottieniCategorie,
  ottieniPiuCercati,
} from '../servizi/servizioProdotti';
import { colori, dimensioniTesto, pesi, spaziature } from '../tema';
import { FarmaciaVicina, ProdottoConPrezzo, VoceCategoria } from '../tipi';
import { salutaUtente } from '../utilita/saluto';

// Home: saluto, posizione, ricerca, categorie, più cercati e farmacie vicine.
function Home({ navigation }: PropsHome) {
  const { utente } = useUtente();
  const bordiSicuri = useSafeAreaInsets();

  const [testoRicerca, setTestoRicerca] = useState('');
  const [categorie, setCategorie] = useState<VoceCategoria[]>([]);
  const [piuCercati, setPiuCercati] = useState<ProdottoConPrezzo[]>([]);
  const [farmacie, setFarmacie] = useState<FarmaciaVicina[]>([]);
  const [citta, setCitta] = useState('');
  const [caricamento, setCaricamento] = useState(true);

  // Carica tutti i dati della Home insieme, una volta sola.
  useEffect(() => {
    async function caricaDati() {
      const [elencoCategorie, prodotti, farmacieVicine, posizione] =
        await Promise.all([
          ottieniCategorie(),
          ottieniPiuCercati(),
          ottieniFarmacieVicine(),
          ottieniPosizioneUtente(),
        ]);
      setCategorie(elencoCategorie);
      setPiuCercati(prodotti);
      setFarmacie(farmacieVicine);
      setCitta(posizione.citta);
      setCaricamento(false);
    }

    caricaDati();
  }, []);

  function cerca() {
    const testo = testoRicerca.trim();
    if (testo === '') {
      return; // barra vuota: non c'è niente da cercare
    }
    navigation.navigate('RisultatiRicerca', { testo });
  }

  if (caricamento) {
    return (
      <View style={styles.centrato}>
        <ActivityIndicator size="large" color={colori.primario} />
      </View>
    );
  }

  // Tutto quello che sta sopra la lista delle farmacie.
  const intestazione = (
    <View>
      {/* Saluto e posizione */}
      <View style={styles.rigaSaluto}>
        <View style={styles.testiSaluto}>
          <Text style={styles.saluto}>
            {salutaUtente(utente?.nome ?? '')}
          </Text>
          <View style={styles.rigaPosizione}>
            <IconaPosizione dimensione={16} colore={colori.primario} />
            <Text style={styles.testoPosizione}>Consegna a: {citta}</Text>
          </View>
        </View>
        <IconaLogo dimensione={40} />
      </View>

      {/* Ricerca: l'azione principale */}
      <View style={styles.sezioneRicerca}>
        <BarraRicerca
          valore={testoRicerca}
          onCambiaTesto={setTestoRicerca}
          onCerca={cerca}
        />
      </View>

      {/* Categorie: scorrimento orizzontale */}
      <Text style={styles.titoloSezione}>Categorie</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={categorie}
        keyExtractor={voce => voce.id}
        ItemSeparatorComponent={Separatore}
        renderItem={({ item }) => (
          <ChipCategoria
            categoria={item.id}
            etichetta={item.etichetta}
            onPremi={() =>
              navigation.navigate('RisultatiRicerca', { categoria: item.id })
            }
          />
        )}
      />

      {/* Più cercati: card a scorrimento orizzontale */}
      <Text style={styles.titoloSezione}>Più cercati</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={piuCercati}
        keyExtractor={prodotto => prodotto.id}
        ItemSeparatorComponent={Separatore}
        renderItem={({ item }) => (
          <SchedaProdottoVerticale
            prodotto={item}
            onPremi={() =>
              navigation.navigate('DettaglioProdotto', { idProdotto: item.id })
            }
          />
        )}
      />

      <Text style={styles.titoloSezione}>Farmacie vicino a te</Text>
    </View>
  );

  // La lista principale (verticale) è quella delle farmacie:
  // tutto il resto sta nella sua intestazione. Così c'è un solo
  // elemento che scorre in verticale.
  return (
    <FlatList
      style={styles.schermo}
      contentContainerStyle={[
        styles.contenuto,
        { paddingTop: bordiSicuri.top + spaziature.grande },
      ]}
      data={farmacie}
      keyExtractor={farmacia => farmacia.id}
      ListHeaderComponent={intestazione}
      keyboardShouldPersistTaps="handled"
      renderItem={({ item }) => <RigaFarmacia farmacia={item} />}
    />
  );
}

// Spazio fra gli elementi delle liste orizzontali.
function Separatore() {
  return <View style={styles.separatore} />;
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenuto: {
    padding: spaziature.grande,
  },
  centrato: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colori.sfondo,
  },
  rigaSaluto: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.media,
  },
  testiSaluto: {
    flex: 1,
  },
  saluto: {
    fontSize: dimensioniTesto.titolo,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  rigaPosizione: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccolissima,
    marginTop: spaziature.piccolissima,
  },
  testoPosizione: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
  },
  sezioneRicerca: {
    marginTop: spaziature.grande,
  },
  titoloSezione: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.grandissima,
    marginBottom: spaziature.media,
  },
  separatore: {
    width: spaziature.media,
  },
});

export default Home;
