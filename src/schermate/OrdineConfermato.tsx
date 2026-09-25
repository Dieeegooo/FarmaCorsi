import { useEffect } from 'react';
import { BackHandler, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Pulsante from '../componenti/Pulsante';
import RigaSpecifica from '../componenti/RigaSpecifica';
import { useUtente } from '../contesti/ContestoUtente';
import IconaSpunta from '../icone/IconaSpunta';
import { PropsOrdineConfermato } from '../navigazione/tipiNavigazione';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { formattaTempoConsegna } from '../utilita/consegna';
import { orarioArrivo } from '../utilita/orario';
import { etichettaPagamento } from '../utilita/pagamento';
import { formattaPrezzo } from '../utilita/prezzo';

const DIAMETRO_CERCHIO = 96;

function OrdineConfermato({ route, navigation }: PropsOrdineConfermato) {
  const { ordine } = route.params;
  const { utente } = useUtente();
  const bordiSicuri = useSafeAreaInsets();

  // Arrivo previsto: ora dell'ordine + minuti di consegna.
  const arrivo = orarioArrivo(ordine.minutiConsegna, new Date(ordine.dataOra));

  // Torna alle tab, sulla Home. popTo chiude questa schermata e torna a
  // "Principale" (già aperta sotto), invece di aprirne una nuova.
  function tornaAllaHome() {
    navigation.popTo('Principale', {
      screen: 'Home',
      params: { screen: 'Vetrina' },
    });
  }

  // Tasto "indietro" di Android: invece di tornare al carrello (ormai vuoto)
  // portiamo alla Home. return true = "l'ho gestito io".
  useEffect(() => {
    const iscrizione = BackHandler.addEventListener('hardwareBackPress', () => {
      tornaAllaHome();
      return true;
    });
    // pulizia: quando la schermata si chiude smettiamo di ascoltare
    return () => iscrizione.remove();
  });

  return (
    <ScrollView
      style={styles.schermo}
      contentContainerStyle={[
        styles.contenuto,
        {
          paddingTop: bordiSicuri.top + spaziature.enorme,
          paddingBottom: bordiSicuri.bottom + spaziature.grandissima,
        },
      ]}
    >
      <View style={styles.cerchio}>
        <IconaSpunta dimensione={56} colore={colori.testoSuPrimario} />
      </View>

      <Text style={styles.titolo}>Ordine confermato!</Text>
      <Text style={styles.sottotitolo}>
        Grazie {utente?.nome}, {ordine.nomeFarmacia} sta preparando il tuo
        ordine.
      </Text>

      <View style={styles.riquadroArrivo}>
        <Text style={styles.etichettaArrivo}>Arrivo previsto</Text>
        <Text style={styles.orarioArrivo}>entro le {arrivo}</Text>
        <Text style={styles.tempoArrivo}>
          {formattaTempoConsegna(ordine.minutiConsegna)}
        </Text>
      </View>

      <View style={styles.riquadro}>
        <RigaSpecifica etichetta="Numero ordine" valore={ordine.id} />
        <RigaSpecifica etichetta="Farmacia" valore={ordine.nomeFarmacia} />
        <RigaSpecifica etichetta="Consegna a" valore={ordine.indirizzo} />
        {ordine.note !== '' ? (
          <RigaSpecifica etichetta="Note per il rider" valore={ordine.note} />
        ) : null}
        <RigaSpecifica
          etichetta="Pagamento"
          valore={etichettaPagamento(ordine.metodoPagamento)}
        />
        <RigaSpecifica
          etichetta="Totale"
          valore={formattaPrezzo(ordine.totale)}
          ultima
        />
      </View>

      <Pulsante titolo="Torna alla Home" onPremi={tornaAllaHome} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenuto: {
    paddingHorizontal: spaziature.grandissima,
    alignItems: 'stretch',
  },
  cerchio: {
    alignSelf: 'center',
    width: DIAMETRO_CERCHIO,
    height: DIAMETRO_CERCHIO,
    borderRadius: raggi.tondo,
    backgroundColor: colori.primario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titolo: {
    fontSize: dimensioniTesto.titolo,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    textAlign: 'center',
    marginTop: spaziature.grandissima,
  },
  sottotitolo: {
    fontSize: dimensioniTesto.medio,
    color: colori.testoSecondario,
    textAlign: 'center',
    marginTop: spaziature.piccola,
  },
  riquadroArrivo: {
    alignItems: 'center',
    backgroundColor: colori.primarioChiaro,
    borderRadius: raggi.medio,
    padding: spaziature.grande,
    marginTop: spaziature.grandissima,
  },
  etichettaArrivo: {
    fontSize: dimensioniTesto.normale,
    color: colori.primario,
  },
  orarioArrivo: {
    fontSize: dimensioniTesto.titoloGrande,
    fontWeight: pesi.grassetto,
    color: colori.primario,
  },
  tempoArrivo: {
    fontSize: dimensioniTesto.normale,
    color: colori.primario,
  },
  riquadro: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    paddingHorizontal: spaziature.grande,
    marginVertical: spaziature.grandissima,
  },
});

export default OrdineConfermato;
