import { useEffect, useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import Pulsante from '../componenti/Pulsante';
import RigaSpecifica from '../componenti/RigaSpecifica';
import { useCarrello } from '../contesti/ContestoCarrello';
import { useUtente } from '../contesti/ContestoUtente';
import IconaPosizione from '../icone/IconaPosizione';
import { ottieniPosizioneUtente } from '../servizi/servizioPosizione';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

const DIAMETRO_AVATAR = 80;

// Profilo: dati dell'utente, indirizzo di consegna e pulsante Esci.
function Profilo() {
  const { utente, esci } = useUtente();
  const { numeroElementi } = useCarrello();
  const [indirizzo, setIndirizzo] = useState('');
  const [uscitaInCorso, setUscitaInCorso] = useState(false);

  // Indirizzo di consegna (simulato), letto dal servizio.
  useEffect(() => {
    async function caricaIndirizzo() {
      const posizione = await ottieniPosizioneUtente();
      setIndirizzo(posizione.indirizzo);
    }
    caricaIndirizzo();
  }, []);

  const nome = utente?.nome ?? '';
  // Iniziale del nome per l'avatar: "Diego" → "D"
  const iniziale = nome.charAt(0).toUpperCase();

  async function esciDavvero() {
    setUscitaInCorso(true);
    // esci() cancella la sessione e mette utente a null:
    // il navigatore mostra da solo il Login (e il carrello si svuota).
    await esci();
  }

  // Prima di uscire chiediamo conferma, avvisando se il carrello si svuota.
  function chiediConfermaUscita() {
    const avvisoCarrello =
      numeroElementi > 0 ? ' Il carrello verrà svuotato.' : '';

    Alert.alert('Esci', `Vuoi uscire da FarmaCorsi?${avvisoCarrello}`, [
      { text: 'Annulla', style: 'cancel' },
      { text: 'Esci', style: 'destructive', onPress: esciDavvero },
    ]);
  }

  return (
    <ScrollView style={styles.schermo} contentContainerStyle={styles.contenuto}>
      {/* Intestazione con avatar */}
      <View style={styles.intestazione}>
        <View style={styles.avatar}>
          <Text style={styles.iniziale}>{iniziale}</Text>
        </View>
        <Text style={styles.nome}>{nome}</Text>
        <Text style={styles.email}>{utente?.email}</Text>
      </View>

      {/* Dati dell'account */}
      <Text style={styles.titoloSezione}>Account</Text>
      <View style={styles.riquadro}>
        <RigaSpecifica etichetta="Nome" valore={nome} />
        <RigaSpecifica etichetta="Email" valore={utente?.email ?? ''} ultima />
      </View>

      {/* Consegna */}
      <Text style={styles.titoloSezione}>Consegna</Text>
      <View style={[styles.riquadro, styles.rigaIndirizzo]}>
        <IconaPosizione dimensione={20} colore={colori.primario} />
        <Text style={styles.indirizzo}>{indirizzo}</Text>
      </View>

      <View style={styles.pulsanteEsci}>
        <Pulsante
          titolo="Esci"
          variante="contorno"
          onPremi={chiediConfermaUscita}
          caricamento={uscitaInCorso}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
  },
  contenuto: {
    padding: spaziature.grandissima,
  },
  intestazione: {
    alignItems: 'center',
    marginBottom: spaziature.media,
  },
  avatar: {
    width: DIAMETRO_AVATAR,
    height: DIAMETRO_AVATAR,
    borderRadius: raggi.tondo,
    backgroundColor: colori.primario,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spaziature.media,
  },
  iniziale: {
    fontSize: dimensioniTesto.titoloGrande,
    fontWeight: pesi.grassetto,
    color: colori.testoSuPrimario,
  },
  nome: {
    fontSize: dimensioniTesto.titolo,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  email: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
  titoloSezione: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testo,
    marginTop: spaziature.grandissima,
    marginBottom: spaziature.piccola,
  },
  riquadro: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    paddingHorizontal: spaziature.grande,
  },
  rigaIndirizzo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.media,
    paddingVertical: spaziature.grande,
  },
  indirizzo: {
    flex: 1,
    fontSize: dimensioniTesto.normale,
    color: colori.testo,
  },
  pulsanteEsci: {
    marginTop: spaziature.enorme,
  },
});

export default Profilo;
