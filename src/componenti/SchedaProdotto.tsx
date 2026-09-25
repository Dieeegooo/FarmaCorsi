import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { ProdottoConPrezzo } from '../tipi';
import { formattaPrezzoDa } from '../utilita/prezzo';

// 1. Le props: il prodotto da mostrare e cosa fare quando lo si tocca.
//    onPremi è opzionale: per ora la navigazione non c'è ancora.
type SchedaProdottoProps = {
  prodotto: ProdottoConPrezzo;
  onPremi?: () => void;
};

// 2. Il componente riceve le props e disegna la scheda.
function SchedaProdotto({ prodotto, onPremi }: SchedaProdottoProps) {
  return (
    <Pressable style={styles.scheda} onPress={onPremi}>
      <Text style={styles.nome}>{prodotto.nome}</Text>
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
    </Pressable>
  );
}

// 3. Gli stili: colori e spaziature arrivano sempre dal tema.
const styles = StyleSheet.create({
  scheda: {
    backgroundColor: colori.superficie,
    padding: spaziature.grande,
    marginBottom: spaziature.media,
    borderRadius: raggi.medio,
    borderWidth: 1,
    borderColor: colori.bordo,
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
