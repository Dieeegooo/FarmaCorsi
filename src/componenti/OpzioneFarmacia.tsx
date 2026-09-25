import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { FarmaciaConProdotto } from '../tipi';
import { formattaTempoConsegna } from '../utilita/consegna';
import { formattaDistanza } from '../utilita/distanza';
import { formattaPrezzo } from '../utilita/prezzo';

// Una farmacia fra cui scegliere, come un "radio button":
// il pallino pieno indica quella selezionata.
type OpzioneFarmaciaProps = {
  farmacia: FarmaciaConProdotto;
  selezionata: boolean;
  prezzoMigliore: boolean; // mostra l'etichetta "Prezzo migliore"
  onSeleziona: () => void;
};

function OpzioneFarmacia({
  farmacia,
  selezionata,
  prezzoMigliore,
  onSeleziona,
}: OpzioneFarmaciaProps) {
  return (
    <Pressable
      onPress={onSeleziona}
      accessibilityRole="radio"
      accessibilityState={{ selected: selezionata }}
      style={[styles.riga, selezionata && styles.rigaSelezionata]}
    >
      <View style={[styles.pallino, selezionata && styles.pallinoSelezionato]}>
        {selezionata ? <View style={styles.pallinoInterno} /> : null}
      </View>

      <View style={styles.testi}>
        <Text style={styles.nome}>{farmacia.nome}</Text>
        <Text style={styles.dettagli}>
          {formattaDistanza(farmacia.distanzaKm)} ·{' '}
          {formattaTempoConsegna(farmacia.minutiConsegna)}
        </Text>
        {prezzoMigliore ? (
          <Text style={styles.etichetta}>Prezzo migliore</Text>
        ) : null}
      </View>

      <Text style={styles.prezzo}>{formattaPrezzo(farmacia.prezzo)}</Text>
    </Pressable>
  );
}

const DIAMETRO_PALLINO = 20;

const styles = StyleSheet.create({
  riga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.media,
    padding: spaziature.media,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    backgroundColor: colori.superficie,
    marginBottom: spaziature.piccola,
  },
  rigaSelezionata: {
    borderColor: colori.primario,
    backgroundColor: colori.primarioChiaro,
  },
  pallino: {
    width: DIAMETRO_PALLINO,
    height: DIAMETRO_PALLINO,
    borderRadius: raggi.tondo,
    borderWidth: 2,
    borderColor: colori.testoSecondario,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pallinoSelezionato: {
    borderColor: colori.primario,
  },
  pallinoInterno: {
    width: DIAMETRO_PALLINO / 2,
    height: DIAMETRO_PALLINO / 2,
    borderRadius: raggi.tondo,
    backgroundColor: colori.primario,
  },
  testi: {
    flex: 1,
  },
  nome: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
  dettagli: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
  etichetta: {
    alignSelf: 'flex-start',
    fontSize: dimensioniTesto.piccolo,
    fontWeight: pesi.grassetto,
    color: colori.testoSuPrimario,
    backgroundColor: colori.primario,
    borderRadius: raggi.piccolo,
    paddingHorizontal: spaziature.piccola,
    marginTop: spaziature.piccolissima,
    overflow: 'hidden',
  },
  prezzo: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
});

export default OpzioneFarmacia;
