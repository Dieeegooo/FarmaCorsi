import { ElementoCarrello, MetodoPagamento, Ordine, RigaCarrello } from '../tipi';
import { calcolaRiepilogo } from '../utilita/riepilogoCarrello';
import ritardoFinto from './ritardoFinto';

// Dati che il Checkout manda per creare l'ordine.
export type DatiOrdine = {
  righe: RigaCarrello[];
  indirizzo: string;
  note: string;
  metodoPagamento: MetodoPagamento;
};

// Numero d'ordine finto: "FC-" + 6 cifre casuali, es. "FC-482913".
function generaNumeroOrdine(): string {
  const cifre = Math.floor(100000 + Math.random() * 900000);
  return `FC-${cifre}`;
}

// Invio finto dell'ordine, come se chiamassimo un server.
// Il pagamento è simulato: nessun dato di carta, nessun addebito.
export async function inviaOrdine(dati: DatiOrdine): Promise<Ordine> {
  if (dati.righe.length === 0) {
    throw new Error('Il carrello è vuoto');
  }

  await ritardoFinto(1200);

  const riepilogo = calcolaRiepilogo(dati.righe);

  // Nell'ordine teniamo solo i campi dell'ElementoCarrello della SPEC.
  const elementi: ElementoCarrello[] = dati.righe.map(riga => ({
    idProdotto: riga.idProdotto,
    idFarmacia: riga.idFarmacia,
    prezzo: riga.prezzo,
    quantita: riga.quantita,
  }));

  return {
    id: generaNumeroOrdine(),
    elementi,
    subtotale: riepilogo.subtotale,
    costoConsegna: riepilogo.costoConsegna,
    totale: riepilogo.totale,
    indirizzo: dati.indirizzo.trim(),
    note: dati.note.trim(),
    metodoPagamento: dati.metodoPagamento,
    dataOra: new Date().toISOString(),
    nomeFarmacia: dati.righe[0].nomeFarmacia,
    minutiConsegna: dati.righe[0].minutiConsegna,
  };
}
