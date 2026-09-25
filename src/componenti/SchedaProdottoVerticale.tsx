import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { ProdottoConPrezzo } from '../tipi';
import { formattaPrezzoDa } from '../utilita/prezzo';
import IllustrazioneProdotto from './IllustrazioneProdotto';

// Card piccola e stretta, per il carosello orizzontale "Più cercati".
type SchedaProdottoVerticaleProps = {
  prodotto: ProdottoConPrezzo;
  onPremi: () => void;
};

const LARGHEZZA_SCHEDA = 140;

function SchedaProdottoVerticale({
  prodotto,
  onPremi,
}: SchedaProdottoVerticaleProps) {
  return (
    <Pressable
      onPress={onPremi}
      accessibilityRole="button"
      accessibilityLabel={`${prodotto.nome}, ${formattaPrezzoDa(
        prodotto.prezzoMinimo,
      )}`}
      style={({ pressed }) => [styles.scheda, pressed && styles.premuta]}
    >
      <View style={styles.riquadroImmagine}>
        <IllustrazioneProdotto prodotto={prodotto} dimensione={96} />
      </View>
      {/* numberOfLines: i nomi lunghi vengono tagliati con "..." */}
      <Text style={styles.nome} numberOfLines={2}>
        {prodotto.nome}
      </Text>
      <Text style={styles.prezzo}>{formattaPrezzoDa(prodotto.prezzoMinimo)}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  scheda: {
    width: LARGHEZZA_SCHEDA,
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.piccola,
  },
  premuta: {
    opacity: 0.7,
  },
  riquadroImmagine: {
    alignItems: 'center',
    backgroundColor: colori.sfondo,
    borderRadius: raggi.piccolo,
    paddingVertical: spaziature.piccola,
  },
  nome: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.testo,
    marginTop: spaziature.piccola,
    // altezza fissa di due righe: così tutte le card sono alte uguali
    minHeight: dimensioniTesto.normale * 2.6,
  },
  prezzo: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.grassetto,
    color: colori.primario,
    marginTop: spaziature.piccolissima,
  },
});

export default SchedaProdottoVerticale;
