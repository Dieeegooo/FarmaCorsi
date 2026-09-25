# FarmaCorsi — Specifica MVP

Riferimento per lo sviluppo. Regole e convenzioni sono in CLAUDE.md.

## 0. Identità dell'app
- Nome visualizzato sotto l'icona: **FarmaCorsi**
  (android/app/src/main/res/values/strings.xml → app_name)
- Icona: croce da farmacia + sacchetto stile take-away, disegno semplice e
  leggibile a dimensione piccola, niente testo.
  Colore principale verde #1B7F3B su sfondo bianco.
  Deve sostituire l'icona di default in tutte le cartelle mipmap-* e come
  adaptive icon (livelli foreground + background).
  Procedura suggerita: disegnare il logo in SVG → generare i PNG per ogni
  densità (mdpi 48, hdpi 72, xhdpi 96, xxhdpi 144, xxxhdpi 192) + adaptive icon.
  Qualsiasi strumento da installare va prima spiegato e approvato (vedi CLAUDE.md).
- Palette di base (in src/tema/):
  primario #1B7F3B · sfondo #F5F5F5 · superficie #FFFFFF ·
  testo #1A1A1A · testo secondario #666666 · errore #D32F2F

## 1. Navigazione
- Utente NON loggato → solo schermata Login.
- Utente loggato → tab in basso: **Home · Carrello · Profilo**.
  Dalla Home si aprono (stack): RisultatiRicerca → DettaglioProdotto → Checkout → OrdineConfermato.
- All'avvio: se c'è una sessione salvata in AsyncStorage si entra direttamente
  in Home, altrimenti si va al Login.

## 2. Schermate

### Login
- Campi: email, password (testo nascosto, icona per mostrarla).
- Validazione: email in formato valido; password di almeno 6 caratteri.
  Errori mostrati sotto il campo.
- Credenziali sbagliate → messaggio "Email o password non corretti".
- Pulsante disattivato + indicatore di caricamento durante il login
  (ritardo finto di ~800 ms, per simulare la rete).
- Utenti finti in src/dati/utenti.ts, per esempio:
  diego@farmacorsi.it / password123 → nome "Diego".
- In AsyncStorage si salvano solo id, nome ed email. MAI la password.

### Home
- In alto: saluto in base all'ora del telefono
  05:00–12:59 "Buongiorno" · 13:00–17:59 "Buon pomeriggio" · 18:00–04:59 "Buonasera"
  → es. "Buongiorno Diego"
- Sotto: posizione di consegna simulata ("📍 Consegna a: Sarzana").
- Barra di ricerca grande (azione principale). Toccandola/inviando si va a RisultatiRicerca.
- Categorie a scorrimento orizzontale (toccando una categoria si vedono i
  risultati filtrati).
- Sezione "Più cercati": card prodotto a scorrimento orizzontale.
- Sezione "Farmacie vicino a te": lista verticale con nome, distanza, tempo di consegna.

### RisultatiRicerca
- Filtra i prodotti per nome o marca (ignorando maiuscole e accenti),
  oppure per categoria.
- Lista di SchedaProdotto (nome, marca, formato, prezzo "da X €").
- Nessun risultato → messaggio chiaro + suggerimento di cambiare ricerca.

### DettaglioProdotto  (cuore dell'app: prodotto → farmacie)
- Dati del prodotto: nome, marca, formato, descrizione, categoria.
- Elenco delle farmacie che lo hanno disponibile, **ordinate per distanza**:
  nome farmacia, distanza (km, 1 decimale), tempo stimato, prezzo in quella farmacia.
- Farmacie senza disponibilità: non mostrate.
- Per ogni farmacia: pulsante "Aggiungi al carrello".

### Carrello
- Elenco elementi: prodotto, farmacia, prezzo unitario, quantità (− / +),
  rimozione. A quantità 0 l'elemento viene rimosso.
- Riepilogo: subtotale, costo di consegna, totale.
- Carrello vuoto → messaggio + pulsante "Cerca un prodotto".
- Numero di elementi mostrato come badge sulla tab Carrello.
- (da confermare) **Un ordine = una sola farmacia**, come su Deliveroo.
  Se si aggiunge un prodotto di un'altra farmacia, si chiede:
  "Il carrello contiene prodotti di <farmacia>. Vuoi svuotarlo?"

### Checkout
- Indirizzo di consegna (campo precompilato modificabile), note per il rider.
- Metodo di pagamento finto: "Carta" / "Contanti alla consegna".
- Riepilogo con totale e tempo stimato.
- "Conferma ordine" → ritardo finto → OrdineConfermato; il carrello si svuota.

### OrdineConfermato
- Messaggio di conferma, numero ordine generato, tempo stimato di consegna,
  pulsante "Torna alla Home".

### Profilo
- Nome ed email dell'utente, pulsante **Esci** (cancella la sessione → Login).

## 3. Regole di calcolo (da confermare)
- Posizione utente simulata: centro di Sarzana (44.1113, 9.9596).
- Distanza: formula di Haversine (in src/utilita/).
- Tempo di consegna stimato: 15 min + 4 min per km, arrotondato ai 5 minuti.
- Costo di consegna: 2,99 €; gratis sopra i 30 € di subtotale.
- Prezzi mostrati sempre con 2 decimali e virgola: "4,90 €".

## 4. Modelli dati (src/tipi/)
- Utente: id, nome, email
- Categoria: 'dolore-febbre' | 'raffreddore' | 'digestione' | 'pelle-solari' |
  'integratori' | 'igiene'
- Prodotto: id, nome, marca, formato (es. "20 compresse"), descrizione,
  categoria, piuCercato (boolean)
- Farmacia: id, nome, indirizzo, citta, latitudine, longitudine
- Disponibilita: idProdotto, idFarmacia, prezzo, quantitaDisponibile
- ElementoCarrello: idProdotto, idFarmacia, prezzo, quantita
- Ordine: id, elementi, subtotale, costoConsegna, totale, indirizzo,
  metodoPagamento, dataOra

## 5. Dati finti (src/dati/)
- 6–8 farmacie di fantasia nella zona Sarzana / La Spezia / Val di Magra,
  con coordinate plausibili.
- 20–30 prodotti da banco (OTC/SOP) e parafarmacia distribuiti sulle categorie.
- Ogni prodotto disponibile in almeno 2 farmacie, con prezzi leggermente diversi.
- Tutto letto tramite src/servizi/ (funzioni asincrone, come se fosse un'API).

## 6. Ordine di sviluppo
0. Setup: struttura cartelle, tema, tipi, dati finti, servizi, icona e nome app
1. Login + sessione + navigazione autenticato/non autenticato
2. Home (saluto, ricerca, categorie, più cercati, farmacie vicine)
3. RisultatiRicerca + DettaglioProdotto (prodotto → farmacie ordinate per distanza)
4. Carrello (Context globale + badge sulla tab)
5. Checkout + OrdineConfermato
6. Profilo + logout

Ogni punto è "finito" solo se: funziona sul telefono, `npx tsc --noEmit` e
`npm run lint` non danno errori, e c'è la spiegazione a fine funzionalità.

## 7. Fuori dall'MVP (idee per dopo)
- Backend vero (Django/DRF o altro) al posto dei dati finti
- Posizione GPS reale con permessi
- Mappa delle farmacie e tracking del rider
- Registrazione utente e storico ordini