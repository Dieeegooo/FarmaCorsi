import { FlatList, StyleSheet, Text, View } from 'react-native';
import Pulsante from '../componenti/Pulsante';
import RigaElementoCarrello from '../componenti/RigaElementoCarrello';
import { useCarrello } from '../contesti/ContestoCarrello';
import IconaCarrello from '../icone/IconaCarrello';
import IconaOrologio from '../icone/IconaOrologio';
import { PropsCarrello } from '../navigazione/tipiNavigazione';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { formattaTempoConsegna, SOGLIA_CONSEGNA_GRATIS } from '../utilita/consegna';
import { arrotondaEuro, formattaPrezzo } from '../utilita/prezzo';

function Carrello({ navigation }: PropsCarrello) {
  // Tutto arriva dal contesto: righe, riepilogo e funzioni per modificarlo.
  const {
    righe,
    nomeFarmacia,
    subtotale,
    costoConsegna,
    totale,
    cambiaQuantita,
    rimuovi,
  } = useCarrello();

  // Carrello vuoto: messaggio e pulsante per tornare a cercare.
  if (righe.length === 0) {
    return (
      <View style={styles.vuoto}>
        <IconaCarrello dimensione={64} colore={colori.bordo} />
        <Text style={styles.titoloVuoto}>Il carrello è vuoto</Text>
        <Text style={styles.testoVuoto}>
          Cerca un prodotto e scegli la farmacia da cui fartelo consegnare.
        </Text>
        <View style={styles.pulsanteVuoto}>
          {/* Solo 'Home' riaprirebbe l'ultima schermata della tab (es. un
              dettaglio prodotto). Chiediamo la Vetrina, e con pop: true le
              schermate sopra vengono chiuse: in React Navigation 7 navigate
              altrimenti ne aggiungerebbe una nuova in cima. */}
          <Pulsante
            titolo="Cerca un prodotto"
            onPremi={() =>
              navigation.navigate('Home', { screen: 'Vetrina', pop: true })
            }
          />
        </View>
      </View>
    );
  }

  // Tutte le righe sono della stessa farmacia (un ordine = una farmacia).
  const minutiConsegna = righe[0].minutiConsegna;
  const mancaPerGratis = arrotondaEuro(SOGLIA_CONSEGNA_GRATIS - subtotale);

  const intestazione = (
    <View style={styles.farmacia}>
      <Text style={styles.etichettaFarmacia}>Il tuo ordine da</Text>
      <Text style={styles.nomeFarmacia}>{nomeFarmacia}</Text>
      <View style={styles.rigaConsegna}>
        <IconaOrologio dimensione={16} colore={colori.primario} />
        <Text style={styles.testoConsegna}>
          Consegna {formattaTempoConsegna(minutiConsegna)}
        </Text>
      </View>
    </View>
  );

  const riepilogo = (
    <View style={styles.riepilogo}>
      <View style={styles.rigaRiepilogo}>
        <Text style={styles.voce}>Subtotale</Text>
        <Text style={styles.voce}>{formattaPrezzo(subtotale)}</Text>
      </View>
      <View style={styles.rigaRiepilogo}>
        <Text style={styles.voce}>Consegna</Text>
        <Text style={[styles.voce, costoConsegna === 0 && styles.gratis]}>
          {costoConsegna === 0 ? 'Gratis' : formattaPrezzo(costoConsegna)}
        </Text>
      </View>
      {mancaPerGratis > 0 ? (
        <Text style={styles.suggerimento}>
          Aggiungi ancora {formattaPrezzo(mancaPerGratis)} per la consegna
          gratuita
        </Text>
      ) : null}
      <View style={[styles.rigaRiepilogo, styles.rigaTotale]}>
        <Text style={styles.totale}>Totale</Text>
        <Text style={styles.totale}>{formattaPrezzo(totale)}</Text>
      </View>

      {/* Il checkout è il punto 5: per ora il pulsante è disattivato. */}
      <Pulsante titolo="Procedi all'ordine" onPremi={() => {}} disattivato />
      <Text style={styles.nota}>Il pagamento sarà disponibile a breve.</Text>
    </View>
  );

  return (
    <FlatList
      style={styles.schermo}
      contentContainerStyle={styles.contenuto}
      data={righe}
      keyExtractor={riga => `${riga.idFarmacia}-${riga.idProdotto}`}
      ListHeaderComponent={intestazione}
      ListFooterComponent={riepilogo}
      renderItem={({ item }) => (
        <RigaElementoCarrello
          riga={item}
          onCambiaQuantita={quantita =>
            cambiaQuantita(item.idProdotto, item.idFarmacia, quantita)
          }
          onRimuovi={() => rimuovi(item.idProdotto, item.idFarmacia)}
        />
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
  vuoto: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colori.sfondo,
    padding: spaziature.grandissima,
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
  },
  pulsanteVuoto: {
    alignSelf: 'stretch',
    marginTop: spaziature.grande,
  },
  farmacia: {
    marginBottom: spaziature.grande,
  },
  etichettaFarmacia: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
  },
  nomeFarmacia: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  rigaConsegna: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccolissima,
    marginTop: spaziature.piccolissima,
  },
  testoConsegna: {
    fontSize: dimensioniTesto.normale,
    color: colori.primario,
    fontWeight: pesi.medio,
  },
  riepilogo: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.grande,
    gap: spaziature.piccola,
    marginTop: spaziature.piccola,
  },
  rigaRiepilogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voce: {
    fontSize: dimensioniTesto.medio,
    color: colori.testo,
  },
  gratis: {
    color: colori.primario,
    fontWeight: pesi.grassetto,
  },
  suggerimento: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
  },
  rigaTotale: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colori.bordo,
    paddingTop: spaziature.media,
    marginTop: spaziature.piccolissima,
    marginBottom: spaziature.media,
  },
  totale: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  nota: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
    textAlign: 'center',
  },
});

export default Carrello;
