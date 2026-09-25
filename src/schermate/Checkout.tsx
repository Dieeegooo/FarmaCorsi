import { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CampoTesto from '../componenti/CampoTesto';
import OpzioneSelezionabile from '../componenti/OpzioneSelezionabile';
import Pulsante from '../componenti/Pulsante';
import { useCarrello } from '../contesti/ContestoCarrello';
import IconaCarta from '../icone/IconaCarta';
import IconaContanti from '../icone/IconaContanti';
import IconaOrologio from '../icone/IconaOrologio';
import { PropsCheckout } from '../navigazione/tipiNavigazione';
import { inviaOrdine } from '../servizi/servizioOrdini';
import { ottieniPosizioneUtente } from '../servizi/servizioPosizione';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { MetodoPagamento } from '../tipi';
import { formattaTempoConsegna } from '../utilita/consegna';
import { orarioArrivo } from '../utilita/orario';
import { etichettaPagamento } from '../utilita/pagamento';
import { arrotondaEuro, formattaPrezzo } from '../utilita/prezzo';
import { erroreIndirizzo } from '../utilita/validazione';

const LUNGHEZZA_MASSIMA_NOTE = 200;

function Checkout({ navigation }: PropsCheckout) {
  const bordiSicuri = useSafeAreaInsets();
  const { righe, nomeFarmacia, subtotale, costoConsegna, totale, svuota } =
    useCarrello();

  // Stato del form
  const [indirizzo, setIndirizzo] = useState('');
  const [note, setNote] = useState('');
  const [metodo, setMetodo] = useState<MetodoPagamento>('carta');
  const [tentativoFatto, setTentativoFatto] = useState(false);
  const [inInvio, setInInvio] = useState(false);
  const [erroreInvio, setErroreInvio] = useState<string | null>(null);

  // Indirizzo precompilato con la posizione (simulata) dell'utente.
  useEffect(() => {
    async function precompila() {
      const posizione = await ottieniPosizioneUtente();
      // se l'utente ha già iniziato a scrivere non sovrascriviamo
      setIndirizzo(attuale => (attuale === '' ? posizione.indirizzo : attuale));
    }
    precompila();
  }, []);

  // Carrello vuoto (es. svuotato da un'altra parte): niente da ordinare.
  // Durante l'invio no: il carrello si svuota apposta dopo la conferma.
  if (righe.length === 0 && !inInvio) {
    return (
      <View style={styles.centrato}>
        <Text style={styles.testoSecondario}>Il carrello è vuoto.</Text>
        <Pulsante titolo="Torna indietro" onPremi={() => navigation.goBack()} />
      </View>
    );
  }

  const messaggioIndirizzo = tentativoFatto ? erroreIndirizzo(indirizzo) : null;
  const minutiConsegna = righe[0]?.minutiConsegna ?? 0;

  async function confermaOrdine() {
    setTentativoFatto(true);
    setErroreInvio(null);
    if (erroreIndirizzo(indirizzo) !== null) {
      return;
    }

    setInInvio(true);
    try {
      const ordine = await inviaOrdine({
        righe,
        indirizzo,
        note,
        metodoPagamento: metodo,
      });
      // replace: il Checkout viene SOSTITUITO dalla conferma, così con
      // "indietro" non si torna a un ordine già inviato.
      navigation.replace('OrdineConfermato', { ordine });
      svuota();
    } catch {
      setErroreInvio("Non è stato possibile inviare l'ordine. Riprova.");
      setInInvio(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.schermo}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={[
          styles.contenuto,
          { paddingBottom: bordiSicuri.bottom + spaziature.grandissima },
        ]}
        keyboardShouldPersistTaps="handled"
      >
        {/* 1. Consegna */}
        <Text style={styles.titoloSezione}>Consegna</Text>
        <CampoTesto
          etichetta="Indirizzo di consegna"
          value={indirizzo}
          onChangeText={setIndirizzo}
          placeholder="Via, numero civico, città"
          autoComplete="street-address"
          errore={messaggioIndirizzo}
          editable={!inInvio}
        />
        <CampoTesto
          etichetta={`Note per il rider (facoltative) · ${note.length}/${LUNGHEZZA_MASSIMA_NOTE}`}
          value={note}
          onChangeText={setNote}
          placeholder="Es. citofono Rossi, secondo piano"
          multiline
          numberOfLines={3}
          textAlignVertical="top"
          maxLength={LUNGHEZZA_MASSIMA_NOTE}
          editable={!inInvio}
        />

        {/* 2. Pagamento (finto) */}
        <Text style={styles.titoloSezione}>Pagamento</Text>
        <OpzioneSelezionabile
          titolo={etichettaPagamento('carta')}
          descrizione="Pagamento simulato: nessun addebito"
          icona={<IconaCarta colore={colori.primario} />}
          selezionata={metodo === 'carta'}
          onSeleziona={() => setMetodo('carta')}
        />
        <OpzioneSelezionabile
          titolo={etichettaPagamento('contanti')}
          descrizione="Paghi il rider quando arriva"
          icona={<IconaContanti colore={colori.primario} />}
          selezionata={metodo === 'contanti'}
          onSeleziona={() => setMetodo('contanti')}
        />

        {/* 3. Riepilogo */}
        <Text style={styles.titoloSezione}>Riepilogo</Text>
        <View style={styles.riquadro}>
          <Text style={styles.farmacia}>Da {nomeFarmacia}</Text>

          {/* Pochi prodotti dentro uno ScrollView: qui .map() va bene */}
          {righe.map(riga => (
            <View
              key={`${riga.idFarmacia}-${riga.idProdotto}`}
              style={styles.rigaProdotto}
            >
              <Text style={styles.nomeProdotto}>
                {riga.quantita} × {riga.prodotto.nome}
              </Text>
              <Text style={styles.voce}>
                {formattaPrezzo(arrotondaEuro(riga.prezzo * riga.quantita))}
              </Text>
            </View>
          ))}

          <View style={styles.separatore} />
          <View style={styles.rigaRiepilogo}>
            <Text style={styles.voce}>Subtotale</Text>
            <Text style={styles.voce}>{formattaPrezzo(subtotale)}</Text>
          </View>
          <View style={styles.rigaRiepilogo}>
            <Text style={styles.voce}>Consegna</Text>
            <Text style={[styles.voce, costoConsegna === 0 && styles.gratis]}>
              {costoConsegna === 0 ? 'Gratis' : formattaPrezzo(costoConsegna)}
            </Text>
          </View>
          <View style={styles.rigaRiepilogo}>
            <Text style={styles.totale}>Totale</Text>
            <Text style={styles.totale}>{formattaPrezzo(totale)}</Text>
          </View>

          <View style={styles.rigaArrivo}>
            <IconaOrologio dimensione={18} colore={colori.primario} />
            <Text style={styles.testoArrivo}>
              Arrivo previsto alle {orarioArrivo(minutiConsegna)} (
              {formattaTempoConsegna(minutiConsegna)})
            </Text>
          </View>
        </View>

        {erroreInvio ? (
          <View style={styles.riquadroErrore}>
            <Text style={styles.testoErrore}>{erroreInvio}</Text>
          </View>
        ) : null}

        <Pulsante
          titolo={`Conferma ordine · ${formattaPrezzo(totale)}`}
          onPremi={confermaOrdine}
          caricamento={inInvio}
        />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenuto: {
    padding: spaziature.grande,
  },
  centrato: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spaziature.grande,
    padding: spaziature.grandissima,
    backgroundColor: colori.sfondo,
  },
  testoSecondario: {
    fontSize: dimensioniTesto.medio,
    color: colori.testoSecondario,
  },
  titoloSezione: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.media,
    marginBottom: spaziature.media,
  },
  riquadro: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.grande,
    gap: spaziature.piccola,
    marginBottom: spaziature.grandissima,
  },
  farmacia: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginBottom: spaziature.piccolissima,
  },
  rigaProdotto: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spaziature.media,
  },
  nomeProdotto: {
    flex: 1,
    fontSize: dimensioniTesto.normale,
    color: colori.testo,
  },
  separatore: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: colori.bordo,
    marginVertical: spaziature.piccolissima,
  },
  rigaRiepilogo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  voce: {
    fontSize: dimensioniTesto.normale,
    color: colori.testo,
  },
  gratis: {
    color: colori.primario,
    fontWeight: pesi.grassetto,
  },
  totale: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  rigaArrivo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
    backgroundColor: colori.primarioChiaro,
    borderRadius: raggi.piccolo,
    padding: spaziature.media,
    marginTop: spaziature.piccola,
  },
  testoArrivo: {
    flex: 1,
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.primario,
  },
  riquadroErrore: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.errore,
    borderRadius: raggi.piccolo,
    padding: spaziature.media,
    marginBottom: spaziature.grande,
  },
  testoErrore: {
    color: colori.errore,
    fontSize: dimensioniTesto.normale,
    textAlign: 'center',
  },
});

export default Checkout;
