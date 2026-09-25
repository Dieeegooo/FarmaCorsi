import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Pulsante from '../componenti/Pulsante';
import { useUtente } from '../contesti/ContestoUtente';
import IconaProfilo from '../icone/IconaProfilo';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

// Profilo minimo: nome, email e pulsante Esci (completato al punto 6).
function Profilo() {
  const { utente, esci } = useUtente();
  const [uscitaInCorso, setUscitaInCorso] = useState(false);

  async function gestisciUscita() {
    setUscitaInCorso(true);
    // esci() mette utente a null: il navigatore mostra da solo il Login.
    await esci();
  }

  return (
    <View style={styles.schermo}>
      <View style={styles.scheda}>
        <View style={styles.avatar}>
          <IconaProfilo dimensione={40} colore={colori.primario} />
        </View>
        <Text style={styles.nome}>{utente?.nome}</Text>
        <Text style={styles.email}>{utente?.email}</Text>
      </View>

      <Pulsante
        titolo="Esci"
        variante="contorno"
        onPremi={gestisciUscita}
        caricamento={uscitaInCorso}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  schermo: {
    flex: 1,
    backgroundColor: colori.sfondo,
    padding: spaziature.grandissima,
    gap: spaziature.grandissima,
  },
  scheda: {
    alignItems: 'center',
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.bordo,
    borderRadius: raggi.medio,
    padding: spaziature.grandissima,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: raggi.tondo,
    backgroundColor: colori.primarioChiaro,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spaziature.media,
  },
  nome: {
    fontSize: dimensioniTesto.grande,
    fontWeight: pesi.grassetto,
    color: colori.testo,
  },
  email: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
  },
});

export default Profilo;
