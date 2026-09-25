import { ComponentType } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';
import IconaCapsula from '../icone/IconaCapsula';
import IconaGoccia from '../icone/IconaGoccia';
import IconaSapone from '../icone/IconaSapone';
import IconaSole from '../icone/IconaSole';
import IconaStomaco from '../icone/IconaStomaco';
import IconaTermometro from '../icone/IconaTermometro';
import { PropsIcona } from '../icone/tipiIcona';
import { colori, dimensioniTesto, pesi, raggi, spaziature } from '../tema';
import { Categoria } from '../tipi';

// Un'icona per ogni categoria. Record<Categoria, ...> obbliga TypeScript
// a controllare che non ne manchi nessuna.
const ICONE_CATEGORIE: Record<Categoria, ComponentType<PropsIcona>> = {
  'dolore-febbre': IconaTermometro,
  raffreddore: IconaGoccia,
  digestione: IconaStomaco,
  'pelle-solari': IconaSole,
  integratori: IconaCapsula,
  igiene: IconaSapone,
};

type ChipCategoriaProps = {
  categoria: Categoria;
  etichetta: string;
  onPremi: () => void;
};

function ChipCategoria({ categoria, etichetta, onPremi }: ChipCategoriaProps) {
  // Una variabile con la maiuscola si può usare come componente JSX.
  const Icona = ICONE_CATEGORIE[categoria];

  return (
    <Pressable
      onPress={onPremi}
      accessibilityRole="button"
      accessibilityLabel={`Categoria ${etichetta}`}
      style={({ pressed }) => [styles.chip, pressed && styles.premuto]}
    >
      <Icona dimensione={20} colore={colori.primario} />
      <Text style={styles.etichetta}>{etichetta}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spaziature.piccola,
    backgroundColor: colori.primarioChiaro,
    borderRadius: raggi.tondo,
    paddingVertical: spaziature.piccola,
    paddingHorizontal: spaziature.grande,
  },
  premuto: {
    opacity: 0.7,
  },
  etichetta: {
    fontSize: dimensioniTesto.normale,
    fontWeight: pesi.medio,
    color: colori.primario,
  },
});

export default ChipCategoria;
