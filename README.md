<p align="center">
  <img src="docs/logo-farmacorsi.svg" alt="Logo FarmaCorsi" width="96" height="96">
</p>

<h1 align="center">FarmaCorsi</h1>

<p align="center">
  App mobile per ordinare prodotti da farmacia con consegna a domicilio.<br>
  Progetto per l'UF16 "React Native" dell'ITS Prodigi.
</p>

---

L'utente cerca un prodotto, vede quali farmacie ce l'hanno ordinate per
distanza, con prezzo e tempo di consegna, lo mette nel carrello e conferma
l'ordine. Il funzionamento è simile a Deliveroo o Glovo.

Sono disponibili solo prodotti senza obbligo di ricetta (OTC/SOP) e
parafarmacia. I dati sono finti e il pagamento è simulato.

## Funzionalità

- **Login** con utenti di prova, validazione dei campi e sessione salvata:
  riaprendo l'app si entra direttamente. La password non viene mai salvata.
- **Home** con saluto in base all'ora, barra di ricerca, categorie,
  prodotti più cercati e farmacie vicine.
- **Ricerca** per nome o marca (senza badare a maiuscole e accenti) oppure
  per categoria.
- **Pagina prodotto** con illustrazione, specifiche, farmacie ordinate per
  distanza, scelta della farmacia e della quantità.
- **Carrello** globale con badge sulla tab, salvato sul telefono:
  - una sola farmacia per ordine;
  - consegna gratuita sopra i 30 €.
- **Checkout** con indirizzo di consegna, note per il rider, pagamento
  simulato (carta o contanti) e conferma con numero d'ordine.
- **Profilo** con i dati dell'utente e uscita con conferma.

## Tecnologie

| Cosa | Scelta |
|---|---|
| Framework | React Native 0.87 (CLI, senza Expo) + TypeScript |
| Navigazione | React Navigation 7: stack nativo e tab in basso |
| Persistenza locale | AsyncStorage (sessione e carrello) |
| Grafica | `StyleSheet` di React Native; icone e illustrazioni SVG con `react-native-svg` |
| Test | Jest + react-test-renderer |

Non usa librerie di componenti grafici: colori, spaziature e dimensioni del
testo sono definiti in `src/tema/`.

## Avvio

### Requisiti

- Node.js 22.11 o superiore
- Ambiente React Native per Android (JDK e Android SDK), come descritto nella
  [guida ufficiale](https://reactnative.dev/docs/set-up-your-environment)
- Un telefono Android collegato via USB con il debug USB attivo, oppure un
  emulatore

### Installazione

```sh
git clone https://github.com/Dieeegooo/FarmaCorsi.git
cd FarmaCorsi
npm install
```

### Esecuzione su telefono Android

```sh
adb devices                       # il telefono deve comparire nell'elenco
adb reverse tcp:8081 tcp:8081     # collega il telefono a Metro
npm start                         # avvia Metro (lasciarlo aperto)
npm run android                   # in un secondo terminale: compila e installa
```

Con Metro aperto, premi `r` nel terminale per ricaricare l'app dopo una
modifica al codice. Dopo aver aggiunto una libreria con codice nativo va
rilanciato `npm run android`.

Android è la piattaforma principale. iOS non è stato testato.

### Utenti di prova

| Email | Password |
|---|---|
| `diego@farmacorsi.it` | `password123` |
| `giulia@farmacorsi.it` | `password123` |

## Comandi

| Comando | A cosa serve |
|---|---|
| `npm start` | Avvia Metro |
| `npm run android` | Compila e installa l'app sul telefono |
| `npx tsc --noEmit` | Controllo dei tipi TypeScript |
| `npm run lint` | Controllo del codice con ESLint |
| `npm test` | Esegue i test Jest |

## Struttura del progetto

```
src/
├── componenti/     componenti riutilizzabili (SchedaProdotto, CampoTesto, Pulsante...)
├── contesti/       stato globale: utente e carrello (Context, useReducer)
├── dati/           dati finti: farmacie, prodotti, disponibilità, utenti
├── icone/          icone SVG, un componente per icona
├── navigazione/    stack principale, tab, stack della Home e tipi delle rotte
├── schermate/      Login, Home, RisultatiRicerca, DettaglioProdotto,
│                   Carrello, Checkout, OrdineConfermato, Profilo
├── servizi/        funzioni asincrone che leggono i dati: unico punto da
│                   cambiare quando arriverà un'API vera
├── tema/           colori, spaziature, dimensioni del testo
├── tipi/           tipi TypeScript condivisi (Prodotto, Farmacia, Ordine...)
└── utilita/        calcoli puri: distanza, consegna, prezzi, saluto, validazione
__tests__/          test unitari e di integrazione
docs/               specifica (SPEC.md) e logo dell'app
```

### Come sono collegati i livelli

```
schermate  →  componenti / icone
    ↓
contesti   (utente, carrello)
    ↓
servizi    (funzioni async, come un'API)
    ↓
dati       (finti)
```

Le schermate non importano mai direttamente da `src/dati/`: passano sempre da
`src/servizi/`. Per collegare un backend vero basterà riscrivere l'interno dei
servizi, senza toccare schermate e componenti.

## Regole di calcolo

- **Posizione dell'utente:** simulata, al centro di Sarzana (44.1113, 9.9596).
- **Distanza:** in linea d'aria, con la formula di Haversine.
- **Tempo di consegna:** 15 minuti + 4 minuti per km, arrotondato ai 5 minuti.
- **Costo di consegna:** 2,99 €, gratis da 30 € di subtotale.
- **Prezzi:** sempre con due decimali e la virgola (es. "4,90 €").

## Test

```sh
npm test
```

I test coprono:

- **funzioni di calcolo:** saluto, distanza, consegna, prezzi, ricerca,
  validazione;
- **servizi:** login, sessione (compreso il controllo che la password non venga
  salvata), prodotti, farmacie, ordini;
- **carrello:** il reducer;
- **flussi completi**, montando l'app intera:
  - ingresso in Home con la sessione salvata;
  - ordine dal carrello alla conferma;
  - logout;
  - ritorno alla Home dalle tab.

## Documentazione

- [`docs/SPEC.md`](docs/SPEC.md): specifica dell'MVP (schermate, regole,
  modelli dati).
- [`CLAUDE.md`](CLAUDE.md): convenzioni del progetto: tutto in italiano,
  niente emoji, stili solo dal tema, un componente per file.

## Fuori dall'MVP

Idee per le prossime versioni:

- backend vero al posto dei dati finti;
- posizione GPS reale;
- mappa delle farmacie e tracking del rider;
- registrazione e storico degli ordini.

## Autore

Diego Barbagallo, ITS Prodigi, UF16 React Native.
