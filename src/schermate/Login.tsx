import { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CampoTesto from '../componenti/CampoTesto';
import Pulsante from '../componenti/Pulsante';
import { useUtente } from '../contesti/ContestoUtente';
import IconaLogo from '../icone/IconaLogo';
import IconaOcchio from '../icone/IconaOcchio';
import IconaOcchioBarrato from '../icone/IconaOcchioBarrato';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { erroreEmail, errorePassword } from '../utilita/validazione';

function Login() {
  const { accedi } = useUtente();

  // Stato del form: ogni campo è "controllato" da uno useState.
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisibile, setPasswordVisibile] = useState(false);

  const [tentativoFatto, setTentativoFatto] = useState(false);
  const [erroreCredenziali, setErroreCredenziali] = useState<string | null>(
    null,
  );
  const [caricamento, setCaricamento] = useState(false);

  // Gli errori si calcolano dai valori attuali ("stato derivato"):
  // non servono altri useState. Li mostriamo solo dopo il primo tentativo.
  const messaggioEmail = tentativoFatto ? erroreEmail(email) : null;
  const messaggioPassword = tentativoFatto ? errorePassword(password) : null;

  async function gestisciAccesso() {
    setTentativoFatto(true);
    setErroreCredenziali(null);

    // Se un campo non è valido ci fermiamo: gli errori compaiono sotto i campi.
    if (erroreEmail(email) !== null || errorePassword(password) !== null) {
      return;
    }

    setCaricamento(true);
    const riuscito = await accedi(email.trim(), password);
    if (!riuscito) {
      setErroreCredenziali('Email o password non corretti');
      setCaricamento(false);
    }
    // Se riesce non serve altro: il contesto cambia utente e la
    // navigazione mostra da sola le tab. Questa schermata sparisce.
  }

  return (
    <KeyboardAvoidingView
      style={styles.schermo}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.contenuto}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.intestazione}>
          <IconaLogo dimensione={72} />
          <Text style={styles.titolo}>FarmaCorsi</Text>
          <Text style={styles.sottotitolo}>
            La tua farmacia, consegnata a casa
          </Text>
        </View>

        <CampoTesto
          etichetta="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="nome@esempio.it"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          errore={messaggioEmail}
          editable={!caricamento}
        />

        <CampoTesto
          etichetta="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Almeno 6 caratteri"
          secureTextEntry={!passwordVisibile}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="password"
          errore={messaggioPassword}
          editable={!caricamento}
          returnKeyType="go"
          onSubmitEditing={gestisciAccesso}
          iconaDestra={
            passwordVisibile ? (
              <IconaOcchioBarrato colore={colori.testoSecondario} />
            ) : (
              <IconaOcchio colore={colori.testoSecondario} />
            )
          }
          onPremiIcona={() => setPasswordVisibile(!passwordVisibile)}
          etichettaIcona={
            passwordVisibile ? 'Nascondi password' : 'Mostra password'
          }
        />

        {erroreCredenziali ? (
          <View style={styles.riquadroErrore}>
            <Text style={styles.testoErrore}>{erroreCredenziali}</Text>
          </View>
        ) : null}

        <Pulsante
          titolo="Accedi"
          onPremi={gestisciAccesso}
          caricamento={caricamento}
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
    flexGrow: 1,
    justifyContent: 'center',
    padding: spaziature.grandissima,
  },
  intestazione: {
    alignItems: 'center',
    marginBottom: spaziature.enorme,
  },
  titolo: {
    fontSize: dimensioniTesto.titoloGrande,
    fontWeight: pesi.grassetto,
    color: colori.primario,
    marginTop: spaziature.media,
  },
  sottotitolo: {
    fontSize: dimensioniTesto.normale,
    color: colori.testoSecondario,
    marginTop: spaziature.piccolissima,
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

export default Login;
