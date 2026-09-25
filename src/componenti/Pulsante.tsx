import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';

type PulsanteProps = {
  titolo: string;
  onPremi: () => void;
  disattivato?: boolean;
  caricamento?: boolean; // mostra la rotellina e blocca il tocco
  variante?: 'pieno' | 'contorno';
};

function Pulsante({
  titolo,
  onPremi,
  disattivato = false,
  caricamento = false,
  variante = 'pieno',
}: PulsanteProps) {
  // Durante il caricamento il pulsante non si può premere due volte.
  const bloccato = disattivato || caricamento;
  const contorno = variante === 'contorno';

  return (
    <Pressable
      onPress={onPremi}
      disabled={bloccato}
      accessibilityRole="button"
      accessibilityState={{ disabled: bloccato, busy: caricamento }}
      // style può essere una funzione: riceve "pressed" e cambia aspetto al tocco
      style={({ pressed }) => [
        styles.pulsante,
        contorno ? styles.contorno : styles.pieno,
        bloccato && !contorno && styles.pienoDisattivato,
        pressed && styles.premuto,
      ]}
    >
      {caricamento ? (
        <ActivityIndicator
          color={contorno ? colori.primario : colori.testoSuPrimario}
        />
      ) : (
        <Text style={[styles.testo, contorno && styles.testoContorno]}>
          {titolo}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  pulsante: {
    minHeight: 50,
    borderRadius: raggi.medio,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spaziature.grande,
  },
  pieno: {
    backgroundColor: colori.primario,
  },
  pienoDisattivato: {
    backgroundColor: colori.primarioDisattivato,
  },
  contorno: {
    backgroundColor: colori.superficie,
    borderWidth: 1,
    borderColor: colori.primario,
  },
  premuto: {
    opacity: 0.8,
  },
  testo: {
    fontSize: dimensioniTesto.medio,
    fontWeight: pesi.grassetto,
    color: colori.testoSuPrimario,
  },
  testoContorno: {
    color: colori.primario,
  },
});

export default Pulsante;
