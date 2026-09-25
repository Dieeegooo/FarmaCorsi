import { Farmacia } from '../tipi';

// Farmacie di fantasia nella zona di Sarzana, Val di Magra e La Spezia.
// Le coordinate sono plausibili e servono a calcolare la distanza.
const farmacie: Farmacia[] = [
  {
    id: 'f1',
    nome: 'Farmacia Centrale',
    indirizzo: 'Piazza Matteotti 8',
    citta: 'Sarzana',
    latitudine: 44.1119,
    longitudine: 9.9601,
  },
  {
    id: 'f2',
    nome: 'Farmacia della Fortezza',
    indirizzo: 'Via Firmafede 24',
    citta: 'Sarzana',
    latitudine: 44.1147,
    longitudine: 9.9645,
  },
  {
    id: 'f3',
    nome: 'Farmacia San Martino',
    indirizzo: 'Via Variante Aurelia 112',
    citta: 'Sarzana',
    latitudine: 44.1051,
    longitudine: 9.9703,
  },
  {
    id: 'f4',
    nome: 'Farmacia Val di Magra',
    indirizzo: 'Via Provinciale 45',
    citta: 'Castelnuovo Magra',
    latitudine: 44.0974,
    longitudine: 10.0157,
  },
  {
    id: 'f5',
    nome: 'Farmacia del Ponte',
    indirizzo: 'Via Cisa 210',
    citta: 'Santo Stefano di Magra',
    latitudine: 44.1638,
    longitudine: 9.9192,
  },
  {
    id: 'f6',
    nome: 'Farmacia Marinella',
    indirizzo: 'Via XXV Aprile 3',
    citta: 'Ameglia',
    latitudine: 44.0672,
    longitudine: 9.9931,
  },
  {
    id: 'f7',
    nome: 'Farmacia del Golfo',
    indirizzo: 'Corso Cavour 130',
    citta: 'La Spezia',
    latitudine: 44.1027,
    longitudine: 9.8281,
  },
];

export default farmacie;
