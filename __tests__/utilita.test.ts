// Test delle funzioni di supporto: controllano le regole della SPEC.
import { calcolaCostoConsegna, calcolaMinutiConsegna } from '../src/utilita/consegna';
import { calcolaDistanzaKm, formattaDistanza } from '../src/utilita/distanza';
import { arrotondaEuro, formattaPrezzo, formattaPrezzoDa } from '../src/utilita/prezzo';
import { salutaUtente, salutoPerOra } from '../src/utilita/saluto';
import { contiene, normalizza } from '../src/utilita/testo';
import { erroreEmail, errorePassword } from '../src/utilita/validazione';

describe('saluto in base all\'ora', () => {
  test('mattina: dalle 5:00 alle 12:59', () => {
    expect(salutoPerOra(5)).toBe('Buongiorno');
    expect(salutoPerOra(12)).toBe('Buongiorno');
  });

  test('pomeriggio: dalle 13:00 alle 17:59', () => {
    expect(salutoPerOra(13)).toBe('Buon pomeriggio');
    expect(salutoPerOra(17)).toBe('Buon pomeriggio');
  });

  test('sera e notte: dalle 18:00 alle 4:59', () => {
    expect(salutoPerOra(18)).toBe('Buonasera');
    expect(salutoPerOra(0)).toBe('Buonasera');
    expect(salutoPerOra(4)).toBe('Buonasera');
  });

  test('aggiunge il nome', () => {
    expect(salutaUtente('Diego', 9)).toBe('Buongiorno Diego');
  });
});

describe('distanza', () => {
  test('stesso punto: 0 km', () => {
    expect(calcolaDistanzaKm(44.1113, 9.9596, 44.1113, 9.9596)).toBe(0);
  });

  test('Sarzana - La Spezia: circa 10,5 km in linea d\'aria', () => {
    const km = calcolaDistanzaKm(44.1113, 9.9596, 44.1027, 9.8281);
    expect(km).toBeGreaterThan(10);
    expect(km).toBeLessThan(11);
  });

  test('formato con la virgola e un decimale', () => {
    expect(formattaDistanza(1.25)).toBe('1,3 km');
    expect(formattaDistanza(3)).toBe('3,0 km');
  });
});

describe('consegna', () => {
  test('15 min + 4 min per km, arrotondato ai 5 minuti', () => {
    expect(calcolaMinutiConsegna(0)).toBe(15);
    expect(calcolaMinutiConsegna(2)).toBe(25); // 23 → 25
    expect(calcolaMinutiConsegna(10.5)).toBe(55); // 57 → 55
  });

  test('2,99 € sotto i 30 €, gratis da 30 € in su', () => {
    expect(calcolaCostoConsegna(29.99)).toBe(2.99);
    expect(calcolaCostoConsegna(30)).toBe(0);
  });
});

describe('prezzi', () => {
  test('due decimali e virgola', () => {
    expect(formattaPrezzo(4.9)).toBe('4,90 €');
    expect(formattaPrezzoDa(12)).toBe('da 12,00 €');
  });

  test('arrotonda ai centesimi', () => {
    expect(arrotondaEuro(0.1 + 0.2)).toBe(0.3);
  });
});

describe('ricerca senza accenti e maiuscole', () => {
  test('normalizza', () => {
    expect(normalizza('  Dompé ')).toBe('dompe');
  });

  test('contiene', () => {
    expect(contiene('Tachipirina 500 mg', 'TACHI')).toBe(true);
    expect(contiene('Avène', 'avene')).toBe(true);
    expect(contiene('Moment', 'tachi')).toBe(false);
  });
});

describe('validazione del login', () => {
  test('email', () => {
    expect(erroreEmail('')).toBe("Inserisci l'email");
    expect(erroreEmail('diego@')).toBe('Email non valida');
    expect(erroreEmail('diego@farmacorsi.it')).toBeNull();
  });

  test('password di almeno 6 caratteri', () => {
    expect(errorePassword('')).toBe('Inserisci la password');
    expect(errorePassword('12345')).not.toBeNull();
    expect(errorePassword('123456')).toBeNull();
  });
});
