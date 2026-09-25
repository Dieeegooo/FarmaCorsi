import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import IllustrazioneProdotto from '../componenti/IllustrazioneProdotto';
import OpzioneFarmacia from '../componenti/OpzioneFarmacia';
import Pulsante from '../componenti/Pulsante';
import RigaSpecifica from '../componenti/RigaSpecifica';
import SelettoreQuantita from '../componenti/SelettoreQuantita';
import IconaOrologio from '../icone/IconaOrologio';
import IconaPosizione from '../icone/IconaPosizione';
import IconaSpunta from '../icone/IconaSpunta';
import { PropsDettaglioProdotto } from '../navigazione/tipiNavigazione';
import {
  ottieniCategorie,
  ottieniFarmacieConProdotto,
  ottieniProdotto,
} from '../servizi/servizioProdotti';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { FarmaciaConProdotto, ProdottoConPrezzo } from '../tipi';
import { formattaTempoConsegna } from '../utilita/consegna';
import { formattaDistanza } from '../utilita/distanza';
import { arrotondaEuro, formattaPrezzo } from '../utilita/prezzo';

// Sotto questa quantità mostriamo "Solo N rimasti", come fa Amazon.
const SOGLIA_POCHI_PEZZI = 5;

// Pagina del prodotto in stile Amazon: immagine, prezzo, riquadro di
// acquisto (farmacia, quantità, carrello) e informazioni sul prodotto.
function DettaglioProdotto({ route }: PropsDettaglioProdotto) {
  // L'id arriva dalla Home tramite navigate('DettaglioProdotto', { idProdotto })
  const { idProdotto } = route.params;

  const [prodotto, setProdotto] = useState<ProdottoConPrezzo | null>(null);
  const [farmacie, setFarmacie] = useState<FarmaciaConProdotto[]>([]);
  const [etichettaCategoria, setEtichettaCategoria] = useState('');
  const [caricamento, setCaricamento] = useState(true);

  // Scelte dell'utente nel riquadro di acquisto.
  const [idFarmaciaScelta, setIdFarmaciaScelta] = useState<string | null>(null);
  const [quantita, setQuantita] = useState(1);
  const [aggiunto, setAggiunto] = useState(false);

  // Si ricarica ogni volta che cambia idProdotto (la dipendenza fra []).
  useEffect(() => {
    async function caricaDati() {
      setCaricamento(true);
      const [datiProdotto, farmacieVicine, categorie] = await Promise.all([
        ottieniProdotto(idProdotto),
        ottieniFarmacieConProdotto(idProdotto),
        ottieniCategorie(),
      ]);
      setProdotto(datiProdotto);
      setFarmacie(farmacieVicine);
      const categoria = categorie.find(c => c.id === datiProdotto?.categoria);
      setEtichettaCategoria(categoria?.etichetta ?? '');
      // Scelta iniziale: la farmacia più vicina (la lista è già ordinata).
      setIdFarmaciaScelta(farmacieVicine[0]?.id ?? null);
      setCaricamento(false);
    }

    caricaDati();
  }, [idProdotto]);

  if (caricamento) {
    return (
      <View style={styles.centrato}>
        <ActivityIndicator size="large" color={colori.primario} />
      </View>
    );
  }

  if (prodotto === null || farmacie.length === 0) {
    return (
      <View style={styles.centrato}>
        <Text style={styles.testoSecondario}>
          Prodotto non disponibile al momento.
        </Text>
      </View>
    );
  }

  // --- Stato derivato: si calcola dai dati, non serve un altro useState ---
  const farmaciaScelta =
    farmacie.find(f => f.id === idFarmaciaScelta) ?? farmacie[0];
  const prezzoMigliore = Math.min(...farmacie.map(f => f.prezzo));
  const totale = arrotondaEuro(farmaciaScelta.prezzo * quantita);
  const pochiPezzi = farmaciaScelta.quantitaDisponibile <= SOGLIA_POCHI_PEZZI;
  const specifiche = prodotto.specifiche;

  function scegliFarmacia(farmacia: FarmaciaConProdotto) {
    setIdFarmaciaScelta(farmacia.id);
    // la nuova farmacia potrebbe averne meno pezzi: non superiamo il massimo
    setQuantita(Math.min(quantita, farmacia.quantitaDisponibile));
    setAggiunto(false);
  }

  function cambiaQuantita(nuovaQuantita: number) {
    setQuantita(nuovaQuantita);
    setAggiunto(false);
  }

  function aggiungiAlCarrello() {
    // Il carrello vero (Context globale) arriva al punto 4:
    // per ora mostriamo solo la conferma.
    setAggiunto(true);
  }

  return (
    <ScrollView
      style={styles.schermo}
      contentContainerStyle={styles.contenuto}
    >
      {/* 1. Intestazione */}
      <Text style={styles.marca}>Marca: {prodotto.marca}</Text>
      <Text style={styles.nome}>{prodotto.nome}</Text>
      <Text style={styles.testoSecondario}>{prodotto.formato}</Text>

      <View style={styles.rigaEtichette}>
        <Text style={styles.etichetta}>{etichettaCategoria}</Text>
        {prodotto.piuCercato ? (
          <Text style={[styles.etichetta, styles.etichettaEvidenziata]}>
            Più cercato
          </Text>
        ) : null}
      </View>

      {/* 2. Immagine grande */}
      <View style={styles.riquadroImmagine}>
        <IllustrazioneProdotto prodotto={prodotto} dimensione={220} />
      </View>

      {/* 3. Prezzo */}
      <Text style={styles.prezzoGrande}>
        {formattaPrezzo(farmaciaScelta.prezzo)}
      </Text>
      {farmaciaScelta.prezzo > prezzoMigliore ? (
        <Text style={styles.testoSecondario}>
          Prezzo più basso: {formattaPrezzo(prezzoMigliore)} in un'altra farmacia
        </Text>
      ) : (
        <Text style={styles.testoPrimario}>
          Il prezzo più basso fra {farmacie.length} farmacie
        </Text>
      )}

      {/* 4. Riquadro di acquisto */}
      <View style={styles.riquadroAcquisto}>
        <View style={styles.rigaIcona}>
          <IconaOrologio dimensione={18} colore={colori.primario} />
          <Text style={styles.testoForte}>
            Consegna {formattaTempoConsegna(farmaciaScelta.minutiConsegna)}
          </Text>
        </View>
        <View style={styles.rigaIcona}>
          <IconaPosizione dimensione={18} colore={colori.testoSecondario} />
          <Text style={styles.testoSecondario}>
            Da {farmaciaScelta.nome} ·{' '}
            {formattaDistanza(farmaciaScelta.distanzaKm)}
          </Text>
        </View>

        <Text style={[styles.disponibilita, pochiPezzi && styles.pochiPezzi]}>
          {pochiPezzi
            ? `Solo ${farmaciaScelta.quantitaDisponibile} rimasti in questa farmacia`
            : 'Disponibile'}
        </Text>

        <Text style={styles.titoloSezioneAcquisto}>
          Scegli la farmacia ({farmacie.length})
        </Text>
        {/* Poche farmacie dentro uno ScrollView: qui .map() va bene,
            FlatList serve per le liste lunghe. */}
        {farmacie.map(farmacia => (
          <OpzioneFarmacia
            key={farmacia.id}
            farmacia={farmacia}
            selezionata={farmacia.id === farmaciaScelta.id}
            prezzoMigliore={farmacia.prezzo === prezzoMigliore}
            onSeleziona={() => scegliFarmacia(farmacia)}
          />
        ))}

        <View style={styles.rigaQuantita}>
          <Text style={styles.testoForte}>Quantità</Text>
          <SelettoreQuantita
            quantita={quantita}
            onCambia={cambiaQuantita}
            massimo={farmaciaScelta.quantitaDisponibile}
          />
        </View>

        <View style={styles.rigaTotale}>
          <Text style={styles.testoForte}>Totale</Text>
          <Text style={styles.totale}>{formattaPrezzo(totale)}</Text>
        </View>

        <Pulsante titolo="Aggiungi al carrello" onPremi={aggiungiAlCarrello} />

        {aggiunto ? (
          <View style={styles.conferma}>
            <IconaSpunta dimensione={22} colore={colori.primario} />
            <Text style={styles.testoConferma}>
              Aggiunto al carrello: {quantita} × {prodotto.nome} da{' '}
              {farmaciaScelta.nome}
            </Text>
          </View>
        ) : null}
      </View>

      {/* 5. Informazioni sul prodotto */}
      <Text style={styles.titoloSezione}>Informazioni sul prodotto</Text>
      <View style={styles.riquadro}>
        <RigaSpecifica etichetta="Marca" valore={prodotto.marca} />
        <RigaSpecifica etichetta="Formato" valore={prodotto.formato} />
        <RigaSpecifica
          etichetta="Categoria"
          valore={etichettaCategoria}
          ultima={specifiche === undefined}
        />
        {specifiche ? (
          <>
            <RigaSpecifica etichetta="Tipologia" valore={specifiche.tipologia} />
            <RigaSpecifica
              etichetta="Principio attivo"
              valore={specifiche.principioAttivo}
              ultima
            />
          </>
        ) : null}
      </View>

      <Text style={styles.titoloSezione}>Descrizione</Text>
      <Text style={styles.paragrafo}>{prodotto.descrizione}</Text>

      {specifiche ? (
        <>
          <Text style={styles.titoloSezione}>A cosa serve</Text>
          <Text style={styles.paragrafo}>{specifiche.indicazioni}</Text>

          <Text style={styles.titoloSezione}>Come si usa</Text>
          <Text style={styles.paragrafo}>{specifiche.modoUso}</Text>

          <Text style={styles.titoloSezione}>Avvertenze</Text>
          <Text style={styles.paragrafo}>{specifiche.avvertenze}</Text>

          {specifiche.tipologia === 'Farmaco senza obbligo di ricetta' ? (
            <View style={styles.avviso}>
              <Text style={styles.testoAvviso}>
                È un medicinale. Leggere attentamente il foglio illustrativo.
              </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.superficie,
  },
  contenuto: {
    padding: spaziature.grande,
    paddingBottom: spaziature.enorme,
  },
  centrato: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colori.superficie,
    padding: spaziature.grandissima,
  },
  marca: {
    fontSize: dimensioniTesto.normale,
    color: colori.primario,
    fontWeight: pesi.medio,
  },
  nome: {
    fontSize: dimensioniTesto.titolo,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.piccolissima,
  },
  testoSecondario: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
  },
  testoPrimario: {
    fontSize: dimensioniTesto.normale,
    color: colori.primario,
    fontWeight: pesi.medio,
  },
  testoForte: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  rigaEtichette: {
    flexDirection: 'row',
    gap: spaziature.piccola,
    marginTop: spaziature.media,
  },
  etichetta: {
    fontSize: dimensioniTesto.piccolo,
    color: colori.primario,
    backgroundColor: colori.primarioChiaro,
    borderRadius: raggi.tondo,
    paddingHorizontal: spaziature.media,
    paddingVertical: spaziature.piccolissima,
    overflow: 'hidden',
  },
  etichettaEvidenziata: {
    color: colori.testoSuPrimario,
    backgroundColor: colori.primario,
  },
  riquadroImmagine: {
    alignItems: 'center',
    backgroundColor: colori.sfondo,
    borderRadius: raggi.grande,
    paddingVertical: spaziature.grandissima,
    marginVertical: spaziature.grande,
  },
  prezzoGrande: {
    fontSize: dimensioniTesto.titoloGrande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  riquadroAcquisto: {
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.grande,
    marginTop: spaziature.grande,
    gap: spaziature.piccola,
  },
  rigaIcona: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
  },
  disponibilita: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.primario,
    marginTop: spaziature.piccolissima,
  },
  pochiPezzi: {
    color: colori.attenzione,
  },
  titoloSezioneAcquisto: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.media,
  },
  rigaQuantita: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spaziature.piccola,
  },
  rigaTotale: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: spaziature.piccola,
  },
  totale: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  conferma: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
    backgroundColor: colori.primarioChiaro,
    borderRadius: raggi.piccolo,
    padding: spaziature.media,
  },
  testoConferma: {
    flex: 1,
    fontSize: dimensioniTesto.normale,
    color: colori.testo,
  },
  titoloSezione: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.grandissima,
    marginBottom: spaziature.piccola,
  },
  riquadro: {
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    paddingHorizontal: spaziature.grande,
  },
  paragrafo: {
    fontSize: dimensioniTesto.medio,
    lineHeight: dimensioniTesto.medio * 1.5,
    color: colori.testo,
  },
  avviso: {
    backgroundColor: colori.sfondo,
    borderRadius: raggi.piccolo,
    padding: spaziature.media,
    marginTop: spaziature.grandissima,
  },
  testoAvviso: {
    fontSize: dimensioniTesto.normale,
    fontStyle: 'italic',
    color: colori.testoSecondario,
    textAlign: 'center',
  },
});

export default DettaglioProdotto;
