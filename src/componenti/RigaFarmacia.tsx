import { StyleSheet, Text, View } from 'react-native';
import IconaOrologio from '../icone/IconaOrologio';
import IconaPosizione from '../icone/IconaPosizione';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { FarmaciaVicina } from '../tipi';
import { formattaTempoConsegna } from '../utilita/consegna';
import { formattaDistanza } from '../utilita/distanza';

// Riga della sezione "Farmacie vicino a te":
// nome e indirizzo a sinistra, distanza e tempo di consegna a destra.
type RigaFarmaciaProps = {
  farmacia: FarmaciaVicina;
};

function RigaFarmacia({ farmacia }: RigaFarmaciaProps) {
  return (
    <View style={styles.riga}>
      <View style={styles.testi}>
        <Text style={styles.nome}>{farmacia.nome}</Text>
        <Text style={styles.indirizzo}>
          {farmacia.indirizzo}, {farmacia.citta}
        </Text>
      </View>

      <View style={styles.dati}>
        <View style={styles.rigaDato}>
          <IconaPosizione dimensione={14} colore={colori.testoSecondario} />
          <Text style={styles.dato}>{formattaDistanza(farmacia.distanzaKm)}</Text>
        </View>
        <View style={styles.rigaDato}>
          <IconaOrologio dimensione={14} colore={colori.primario} />
          <Text style={[styles.dato, styles.tempo]}>
            {formattaTempoConsegna(farmacia.minutiConsegna)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  riga: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.media,
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.media,
    marginBottom: spaziature.piccola,
  },
  testi: {
    flex: 1,
  },
  nome: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
  indirizzo: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
  dati: {
    alignItems: 'flex-end',
    gap: spaziature.piccolissima,
  },
  rigaDato: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccolissima,
  },
  dato: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
  },
  tempo: {
    color: colori.primario,
    fontWeight: pesi.grassetto,
  },
});

export default RigaFarmacia;
