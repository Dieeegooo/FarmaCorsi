import { Categoria } from '../tipi';

// Elenco delle categorie con l'etichetta da mostrare a schermo.
export type VoceCategoria = {
  id: Categoria;
  etichetta: string;
};

const categorie: VoceCategoria[] = [
  { id: 'dolore-febbre', etichetta: 'Dolore e febbre' },
  { id: 'raffreddore', etichetta: 'Raffreddore e tosse' },
  { id: 'digestione', etichetta: 'Digestione' },
  { id: 'pelle-solari', etichetta: 'Pelle e solari' },
  { id: 'integratori', etichetta: 'Integratori' },
  { id: 'igiene', etichetta: 'Igiene' },
];

export default categorie;
