import { StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, spaziature } from '../tema';

// Una riga della tabella "Informazioni sul prodotto": etichetta a sinistra,
// valore a destra. ultima=true toglie la linea di separazione in fondo.
type RigaSpecificaProps = {
  etichetta: string;
  valore: string;
  ultima?: boolean;
};

function RigaSpecifica({ etichetta, valore, ultima = false }: RigaSpecificaProps) {
  return (
    <View style={[styles.riga, !ultima && styles.separatore]}>
      <Text style={styles.etichetta}>{etichetta}</Text>
      <Text style={styles.valore}>{valore}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  riga: {
    flexDirection: 'row',
    paddingVertical: spaziature.media,
    gap: spaziature.media,
  },
  separatore: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colori.bordo,
  },
  etichetta: {
    flex: 2,
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testoSecondario,
  },
  valore: {
    flex: 3,
    fontSize: dimensioniTesto.normale,
    color: colori.testo,
  },
});

export default RigaSpecifica;
