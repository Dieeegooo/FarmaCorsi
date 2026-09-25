import { ReactNode } from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

// Prendiamo tutte le props normali di TextInput (keyboardType,
// secureTextEntry, onChangeText...) e ne aggiungiamo tre nostre.
type CampoTestoProps = TextInputProps & {
  etichetta: string;
  errore?: string | null;
  iconaDestra?: ReactNode; // es. l'occhio per mostrare la password
  onPremiIcona?: () => void;
  etichettaIcona?: string; // descrizione per l'accessibilità
};

function CampoTesto({
  etichetta,
  errore,
  iconaDestra,
  onPremiIcona,
  etichettaIcona,
  ...propsInput // tutte le altre props passano direttamente al TextInput
}: CampoTestoProps) {
  const haErrore = Boolean(errore);

  return (
    <View style={styles.contenitore}>
      <Text style={styles.etichetta}>{etichetta}</Text>

      <View style={[styles.riquadro, haErrore && styles.riquadroErrore]}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colori.testoSecondario}
          {...propsInput}
        />
        {iconaDestra ? (
          <Pressable
            onPress={onPremiIcona}
            hitSlop={spaziature.piccola}
            accessibilityRole="button"
            accessibilityLabel={etichettaIcona}
            style={styles.icona}
          >
            {iconaDestra}
          </Pressable>
        ) : null}
      </View>

      {haErrore ? <Text style={styles.errore}>{errore}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  contenitore: {
    marginBottom: spaziature.grande,
  },
  etichetta: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testo,
    marginBottom: spaziature.piccola,
  },
  riquadro: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    paddingHorizontal: spaziature.media,
  },
  riquadroErrore: {
    borderColor: colori.errore,
  },
  input: {
    flex: 1,
    fontSize: dimensioniTesto.medio,
    color: colori.testo,
    paddingVertical: spaziature.media,
  },
  icona: {
    paddingLeft: spaziature.piccola,
  },
  errore: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.errore,
    marginTop: spaziature.piccolissima,
  },
});

export default CampoTesto;
