import { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

// Riga "radio" generica: una fra poche opzioni (es. metodo di pagamento).
// Il pallino pieno indica l'opzione selezionata.
type OpzioneSelezionabileProps = {
  titolo: string;
  descrizione?: string;
  icona?: ReactNode;
  selezionata: boolean;
  onSeleziona: () => void;
};

function OpzioneSelezionabile({
  titolo,
  descrizione,
  icona,
  selezionata,
  onSeleziona,
}: OpzioneSelezionabileProps) {
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
      {icona}
      <View style={styles.testi}>
        <Text style={styles.titolo}>{titolo}</Text>
        {descrizione ? (
          <Text style={styles.descrizione}>{descrizione}</Text>
        ) : null}
      </View>
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
  titolo: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
  descrizione: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
});

export default OpzioneSelezionabile;
