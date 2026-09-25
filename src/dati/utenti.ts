import { Utente } from '../tipi';

// Utenti finti per il login. La password sta SOLO qui, nei dati di prova:
// non viene mai salvata in AsyncStorage né mostrata a schermo.
export type UtenteConPassword = Utente & {
  password: string;
};

const utenti: UtenteConPassword[] = [
  {
    id: 'u1',
    nome: 'Diego',
    email: 'diego@farmacorsi.it',
    password: 'password123',
  },
  {
    id: 'u2',
    nome: 'Giulia',
    email: 'giulia@farmacorsi.it',
    password: 'password123',
  },
];

export default utenti;
