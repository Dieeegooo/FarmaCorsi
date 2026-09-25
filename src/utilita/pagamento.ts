import { MetodoPagamento } from '../tipi';

// Testo da mostrare per ogni metodo di pagamento (finto).
// Record obbliga ad avere un'etichetta per ogni metodo.
const ETICHETTE_PAGAMENTO: Record<MetodoPagamento, string> = {
  carta: 'Carta',
  contanti: 'Contanti alla consegna',
};

export function etichettaPagamento(metodo: MetodoPagamento): string {
  return ETICHETTE_PAGAMENTO[metodo];
}
