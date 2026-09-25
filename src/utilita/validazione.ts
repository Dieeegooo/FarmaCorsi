// Validazione dei campi del Login.
// Ogni funzione restituisce il messaggio di errore da mostrare sotto il campo,
// oppure null se il valore va bene.

const LUNGHEZZA_MINIMA_PASSWORD = 6;

// Formato semplice: qualcosa@qualcosa.qualcosa, senza spazi.
const FORMATO_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function erroreEmail(email: string): string | null {
  if (email.trim() === '') {
    return "Inserisci l'email";
  }
  if (!FORMATO_EMAIL.test(email.trim())) {
    return 'Email non valida';
  }
  return null;
}

export function errorePassword(password: string): string | null {
  if (password === '') {
    return 'Inserisci la password';
  }
  if (password.length < LUNGHEZZA_MINIMA_PASSWORD) {
    return `La password deve avere almeno ${LUNGHEZZA_MINIMA_PASSWORD} caratteri`;
  }
  return null;
}
