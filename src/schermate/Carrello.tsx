import { StyleSheet, Text, View } from 'react-native';
import IconaCarrello from '../icone/IconaCarrello';
import { colori, dimensioniTesto, pesi, spaziature } from '../tema';

// Segnaposto: il carrello vero (Context, quantità, totale) arriva al punto 4.
function Carrello() {
  return (
    <View style={styles.schermo}>
      <IconaCarrello dimensione={56} colore={colori.testoSecondario} />
      <Text style={styles.titolo}>Il carrello è vuoto</Text>
      <Text style={styles.testo}>
        Cerca un prodotto dalla Home e aggiungilo da qui.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colori.sfondo,
    padding: spaziature.grandissima,
    gap: spaziature.piccola,
  },
  titolo: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.media,
  },
  testo: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    textAlign: 'center',
  },
});

export default Carrello;
