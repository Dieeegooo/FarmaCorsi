import { Pressable, StyleSheet, Text, View } from 'react-native';
import IconaCestino from '../icone/IconaCestino';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { RigaCarrello } from '../tipi';
import { arrotondaEuro, formattaPrezzo } from '../utilita/prezzo';
import IllustrazioneProdotto from './IllustrazioneProdotto';
import SelettoreQuantita from './SelettoreQuantita';

// Una riga del carrello: immagine, nome, prezzo unitario, quantità (− / +),
// totale della riga e cestino per rimuoverla.
type RigaElementoCarrelloProps = {
  riga: RigaCarrello;
  onCambiaQuantita: (quantita: number) => void;
  onRimuovi: () => void;
};

function RigaElementoCarrello({
  riga,
  onCambiaQuantita,
  onRimuovi,
}: RigaElementoCarrelloProps) {
  const totaleRiga = arrotondaEuro(riga.prezzo * riga.quantita);

  return (
    <View style={styles.riga}>
      <View style={styles.riquadroImmagine}>
        <IllustrazioneProdotto prodotto={riga.prodotto} dimensione={64} />
      </View>

      <View style={styles.contenuto}>
        <View style={styles.rigaTitolo}>
          <View style={styles.testi}>
            <Text style={styles.nome} numberOfLines={2}>
              {riga.prodotto.nome}
            </Text>
            <Text style={styles.dettaglio}>
              {formattaPrezzo(riga.prezzo)} cad. · {riga.prodotto.formato}
            </Text>
          </View>
          <Pressable
            onPress={onRimuovi}
            hitSlop={spaziature.piccola}
            accessibilityRole="button"
            accessibilityLabel={`Rimuovi ${riga.prodotto.nome}`}
          >
            <IconaCestino dimensione={22} colore={colori.testoSecondario} />
          </Pressable>
        </View>

        <View style={styles.rigaQuantita}>
          {/* minimo 0: portando la quantità a 0 la riga viene rimossa */}
          <SelettoreQuantita
            quantita={riga.quantita}
            onCambia={onCambiaQuantita}
            minimo={0}
            massimo={riga.quantitaMassima}
          />
          <Text style={styles.totaleRiga}>{formattaPrezzo(totaleRiga)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  riga: {
    flexDirection: 'row',
    gap: spaziature.media,
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.media,
    marginBottom: spaziature.media,
  },
  riquadroImmagine: {
    alignSelf: 'flex-start',
    backgroundColor: colori.sfondo,
    borderRadius: raggi.piccolo,
    padding: spaziature.piccolissima,
  },
  contenuto: {
    flex: 1,
    justifyContent: 'space-between',
    gap: spaziature.piccola,
  },
  rigaTitolo: {
    flexDirection: 'row',
    gap: spaziature.piccola,
  },
  testi: {
    flex: 1,
  },
  nome: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.medio,
    color: colori.testo,
  },
  dettaglio: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
  rigaQuantita: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totaleRiga: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
});

export default RigaElementoCarrello;
