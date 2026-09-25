import { Pressable, StyleSheet, Text, View } from 'react-native';
import IconaMeno from '../icone/IconaMeno';
import IconaPiu from '../icone/IconaPiu';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

// Componente "controllato": non ha uno stato suo. La quantità la tiene
// chi lo usa, che riceve il nuovo valore tramite onCambia.
type SelettoreQuantitaProps = {
  quantita: number;
  onCambia: (nuovaQuantita: number) => void;
  minimo?: number;
  massimo?: number;
};

function SelettoreQuantita({
  quantita,
  onCambia,
  minimo = 1,
  massimo = 99,
}: SelettoreQuantitaProps) {
  const puoDiminuire = quantita > minimo;
  const puoAumentare = quantita < massimo;

  return (
    <View style={styles.contenitore}>
      <Pressable
        onPress={() => onCambia(quantita - 1)}
        disabled={!puoDiminuire}
        accessibilityRole="button"
        accessibilityLabel="Diminuisci quantità"
        style={styles.tasto}
      >
        <IconaMeno
          dimensione={20}
          colore={puoDiminuire ? colori.primario : colori.bordo}
        />
      </Pressable>

      <Text style={styles.numero} accessibilityLabel={`Quantità ${quantita}`}>
        {quantita}
      </Text>

      <Pressable
        onPress={() => onCambia(quantita + 1)}
        disabled={!puoAumentare}
        accessibilityRole="button"
        accessibilityLabel="Aumenta quantità"
        style={styles.tasto}
      >
        <IconaPiu
          dimensione={20}
          colore={puoAumentare ? colori.primario : colori.bordo}
        />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  contenitore: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.tondo,
    backgroundColor: colori.superficie,
  },
  tasto: {
    padding: spaziature.media,
  },
  numero: {
    minWidth: 28,
    textAlign: 'center',
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
});

export default SelettoreQuantita;
