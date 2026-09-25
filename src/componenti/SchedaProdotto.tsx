import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { ProdottoConPrezzo } from '../tipi';
import { formattaPrezzoDa } from '../utilita/prezzo';
import IllustrazioneProdotto from './IllustrazioneProdotto';

// 1. Le props: il prodotto da mostrare e cosa fare quando lo si tocca.
type SchedaProdottoProps = {
  prodotto: ProdottoConPrezzo;
  onPremi?: () => void;
};

// 2. Il componente riceve le props e disegna la scheda:
//    immagine a sinistra, testi a destra.
function SchedaProdotto({ prodotto, onPremi }: SchedaProdottoProps) {
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
        <IllustrazioneProdotto prodotto={prodotto} dimensione={72} />
      </View>

      <View style={styles.testi}>
        <Text style={styles.nome} numberOfLines={2}>
          {prodotto.nome}
        </Text>
        <Text style={styles.marca}>
          {prodotto.marca} · {prodotto.formato}
        </Text>

        <View style={styles.riga}>
          <Text style={styles.prezzo}>
            {formattaPrezzoDa(prodotto.prezzoMinimo)}
          </Text>
          <Text style={styles.farmacie}>
            {prodotto.numeroFarmacie} farmacie
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

// 3. Gli stili: colori e spaziature arrivano sempre dal tema.
const styles = StyleSheet.create({
  scheda: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.media,
    backgroundColor: colori.superficie,
    padding: spaziature.media,
    marginBottom: spaziature.media,
    borderRadius: raggi.medio,
    borderWidth: 1,
    borderColor: colori.bordo,
  },
  premuta: {
    opacity: 0.7,
  },
  riquadroImmagine: {
    backgroundColor: colori.sfondo,
    borderRadius: raggi.piccolo,
    padding: spaziature.piccolissima,
  },
  testi: {
    flex: 1,
  },
  nome: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
  marca: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
  riga: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spaziature.piccola,
  },
  prezzo: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.primario,
  },
  farmacie: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
  },
});

// 4. Export default: un componente per file.
export default SchedaProdotto;
