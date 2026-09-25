import { StyleSheet, TextInput, View } from 'react-native';
import IconaRicerca from '../icone/IconaRicerca';
import { colori, dimensioniTesto, raggi, spaziature } from '../tema';

// Barra di ricerca grande della Home. È "controllata": il testo lo tiene
// chi la usa (value + onCambiaTesto), qui lo mostriamo soltanto.
type BarraRicercaProps = {
  valore: string;
  onCambiaTesto: (testo: string) => void;
  onCerca: () => void; // premuto il tasto "Cerca" sulla tastiera
  segnaposto?: string;
};

function BarraRicerca({
  valore,
  onCambiaTesto,
  onCerca,
  segnaposto = 'Cerca un prodotto o una marca',
}: BarraRicercaProps) {
  return (
    <View style={styles.barra}>
      <IconaRicerca dimensione={22} colore={colori.primario} />
      <TextInput
        style={styles.input}
        value={valore}
        onChangeText={onCambiaTesto}
        onSubmitEditing={onCerca}
        placeholder={segnaposto}
        placeholderTextColor={colori.testoSecondario}
        returnKeyType="search" // la tastiera mostra il tasto "Cerca"
        autoCorrect={false}
        accessibilityLabel="Cerca un prodotto"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
    backgroundColor: colori.superficie,
    borderWidth: 1.5,
    borderColor: colori.primario,
    borderRadius: raggi.medio,
    paddingHorizontal: spaziature.grande,
  },
  input: {
    flex: 1,
    fontSize: dimensioniTesto.medio,
    color: colori.testo,
    paddingVertical: spaziature.grande,
  },
});

export default BarraRicerca;
