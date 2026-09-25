import { Disponibilita } from '../tipi';

// Collega ogni prodotto alle farmacie che lo hanno, con il prezzo di quella
// farmacia. Ogni prodotto è presente in almeno due farmacie e i prezzi sono
// leggermente diversi: è quello che permette di mostrare "da X €".
// quantitaDisponibile a 0 significa esaurito: i servizi non lo mostrano.
const disponibilita: Disponibilita[] = [
  { idProdotto: 'p01', idFarmacia: 'f1', prezzo: 4.9, quantitaDisponibile: 24 },
  { idProdotto: 'p01', idFarmacia: 'f2', prezzo: 5.1, quantitaDisponibile: 12 },
  { idProdotto: 'p01', idFarmacia: 'f3', prezzo: 4.75, quantitaDisponibile: 8 },
  { idProdotto: 'p01', idFarmacia: 'f4', prezzo: 5.2, quantitaDisponibile: 15 },
  { idProdotto: 'p01', idFarmacia: 'f7', prezzo: 4.95, quantitaDisponibile: 6 },

  { idProdotto: 'p02', idFarmacia: 'f1', prezzo: 6.5, quantitaDisponibile: 18 },
  { idProdotto: 'p02', idFarmacia: 'f3', prezzo: 6.3, quantitaDisponibile: 9 },
  { idProdotto: 'p02', idFarmacia: 'f6', prezzo: 6.8, quantitaDisponibile: 4 },

  { idProdotto: 'p03', idFarmacia: 'f2', prezzo: 9.9, quantitaDisponibile: 10 },
  { idProdotto: 'p03', idFarmacia: 'f4', prezzo: 10.2, quantitaDisponibile: 7 },
  { idProdotto: 'p03', idFarmacia: 'f5', prezzo: 9.6, quantitaDisponibile: 5 },

  { idProdotto: 'p04', idFarmacia: 'f1', prezzo: 13.5, quantitaDisponibile: 11 },
  { idProdotto: 'p04', idFarmacia: 'f3', prezzo: 13.9, quantitaDisponibile: 6 },
  { idProdotto: 'p04', idFarmacia: 'f7', prezzo: 12.9, quantitaDisponibile: 3 },

  { idProdotto: 'p05', idFarmacia: 'f2', prezzo: 8.9, quantitaDisponibile: 14 },
  { idProdotto: 'p05', idFarmacia: 'f5', prezzo: 9.2, quantitaDisponibile: 8 },
  { idProdotto: 'p05', idFarmacia: 'f6', prezzo: 8.6, quantitaDisponibile: 5 },

  { idProdotto: 'p06', idFarmacia: 'f1', prezzo: 7.5, quantitaDisponibile: 20 },
  { idProdotto: 'p06', idFarmacia: 'f2', prezzo: 7.2, quantitaDisponibile: 13 },
  { idProdotto: 'p06', idFarmacia: 'f4', prezzo: 7.8, quantitaDisponibile: 9 },
  { idProdotto: 'p06', idFarmacia: 'f7', prezzo: 7.4, quantitaDisponibile: 7 },

  { idProdotto: 'p07', idFarmacia: 'f3', prezzo: 11.9, quantitaDisponibile: 10 },
  { idProdotto: 'p07', idFarmacia: 'f5', prezzo: 12.3, quantitaDisponibile: 6 },
  { idProdotto: 'p07', idFarmacia: 'f6', prezzo: 11.5, quantitaDisponibile: 4 },

  { idProdotto: 'p08', idFarmacia: 'f1', prezzo: 9.5, quantitaDisponibile: 16 },
  { idProdotto: 'p08', idFarmacia: 'f2', prezzo: 9.8, quantitaDisponibile: 11 },
  { idProdotto: 'p08', idFarmacia: 'f3', prezzo: 9.2, quantitaDisponibile: 7 },
  { idProdotto: 'p08', idFarmacia: 'f4', prezzo: 9.6, quantitaDisponibile: 0 },

  { idProdotto: 'p09', idFarmacia: 'f2', prezzo: 12.9, quantitaDisponibile: 9 },
  { idProdotto: 'p09', idFarmacia: 'f4', prezzo: 13.2, quantitaDisponibile: 6 },
  { idProdotto: 'p09', idFarmacia: 'f7', prezzo: 12.5, quantitaDisponibile: 4 },

  { idProdotto: 'p10', idFarmacia: 'f1', prezzo: 12.5, quantitaDisponibile: 15 },
  { idProdotto: 'p10', idFarmacia: 'f3', prezzo: 12.9, quantitaDisponibile: 8 },
  { idProdotto: 'p10', idFarmacia: 'f5', prezzo: 12.2, quantitaDisponibile: 6 },
  { idProdotto: 'p10', idFarmacia: 'f6', prezzo: 12.7, quantitaDisponibile: 3 },

  { idProdotto: 'p11', idFarmacia: 'f1', prezzo: 8.9, quantitaDisponibile: 12 },
  { idProdotto: 'p11', idFarmacia: 'f4', prezzo: 9.1, quantitaDisponibile: 7 },
  { idProdotto: 'p11', idFarmacia: 'f7', prezzo: 8.7, quantitaDisponibile: 5 },

  { idProdotto: 'p12', idFarmacia: 'f2', prezzo: 6.9, quantitaDisponibile: 13 },
  { idProdotto: 'p12', idFarmacia: 'f5', prezzo: 7.1, quantitaDisponibile: 9 },
  { idProdotto: 'p12', idFarmacia: 'f6', prezzo: 6.6, quantitaDisponibile: 4 },

  { idProdotto: 'p13', idFarmacia: 'f1', prezzo: 13.9, quantitaDisponibile: 17 },
  { idProdotto: 'p13', idFarmacia: 'f2', prezzo: 14.2, quantitaDisponibile: 10 },
  { idProdotto: 'p13', idFarmacia: 'f3', prezzo: 13.5, quantitaDisponibile: 8 },
  { idProdotto: 'p13', idFarmacia: 'f7', prezzo: 13.8, quantitaDisponibile: 5 },

  { idProdotto: 'p14', idFarmacia: 'f3', prezzo: 19.9, quantitaDisponibile: 9 },
  { idProdotto: 'p14', idFarmacia: 'f4', prezzo: 20.5, quantitaDisponibile: 6 },
  { idProdotto: 'p14', idFarmacia: 'f6', prezzo: 19.2, quantitaDisponibile: 4 },

  { idProdotto: 'p15', idFarmacia: 'f1', prezzo: 9.9, quantitaDisponibile: 14 },
  { idProdotto: 'p15', idFarmacia: 'f5', prezzo: 10.2, quantitaDisponibile: 7 },
  { idProdotto: 'p15', idFarmacia: 'f7', prezzo: 9.6, quantitaDisponibile: 5 },

  { idProdotto: 'p16', idFarmacia: 'f2', prezzo: 14.5, quantitaDisponibile: 8 },
  { idProdotto: 'p16', idFarmacia: 'f4', prezzo: 14.9, quantitaDisponibile: 6 },
  { idProdotto: 'p16', idFarmacia: 'f6', prezzo: 13.9, quantitaDisponibile: 3 },

  { idProdotto: 'p17', idFarmacia: 'f1', prezzo: 18.9, quantitaDisponibile: 12 },
  { idProdotto: 'p17', idFarmacia: 'f3', prezzo: 19.4, quantitaDisponibile: 9 },
  { idProdotto: 'p17', idFarmacia: 'f5', prezzo: 18.5, quantitaDisponibile: 6 },
  { idProdotto: 'p17', idFarmacia: 'f7', prezzo: 19.1, quantitaDisponibile: 4 },

  { idProdotto: 'p18', idFarmacia: 'f2', prezzo: 16.9, quantitaDisponibile: 10 },
  { idProdotto: 'p18', idFarmacia: 'f4', prezzo: 17.3, quantitaDisponibile: 7 },
  { idProdotto: 'p18', idFarmacia: 'f6', prezzo: 16.4, quantitaDisponibile: 5 },

  { idProdotto: 'p19', idFarmacia: 'f1', prezzo: 12.9, quantitaDisponibile: 11 },
  { idProdotto: 'p19', idFarmacia: 'f3', prezzo: 13.2, quantitaDisponibile: 8 },
  { idProdotto: 'p19', idFarmacia: 'f5', prezzo: 12.6, quantitaDisponibile: 6 },

  { idProdotto: 'p20', idFarmacia: 'f2', prezzo: 22.9, quantitaDisponibile: 7 },
  { idProdotto: 'p20', idFarmacia: 'f4', prezzo: 23.5, quantitaDisponibile: 5 },
  { idProdotto: 'p20', idFarmacia: 'f7', prezzo: 22.4, quantitaDisponibile: 3 },

  { idProdotto: 'p21', idFarmacia: 'f1', prezzo: 3.9, quantitaDisponibile: 30 },
  { idProdotto: 'p21', idFarmacia: 'f2', prezzo: 4.1, quantitaDisponibile: 22 },
  { idProdotto: 'p21', idFarmacia: 'f3', prezzo: 3.7, quantitaDisponibile: 18 },
  { idProdotto: 'p21', idFarmacia: 'f5', prezzo: 4.0, quantitaDisponibile: 12 },
  { idProdotto: 'p21', idFarmacia: 'f6', prezzo: 3.8, quantitaDisponibile: 9 },

  { idProdotto: 'p22', idFarmacia: 'f3', prezzo: 4.5, quantitaDisponibile: 16 },
  { idProdotto: 'p22', idFarmacia: 'f4', prezzo: 4.8, quantitaDisponibile: 10 },
  { idProdotto: 'p22', idFarmacia: 'f7', prezzo: 4.3, quantitaDisponibile: 6 },

  { idProdotto: 'p23', idFarmacia: 'f1', prezzo: 8.9, quantitaDisponibile: 13 },
  { idProdotto: 'p23', idFarmacia: 'f2', prezzo: 9.2, quantitaDisponibile: 9 },
  { idProdotto: 'p23', idFarmacia: 'f6', prezzo: 8.6, quantitaDisponibile: 4 },

  { idProdotto: 'p24', idFarmacia: 'f4', prezzo: 3.2, quantitaDisponibile: 20 },
  { idProdotto: 'p24', idFarmacia: 'f5', prezzo: 3.4, quantitaDisponibile: 14 },
  { idProdotto: 'p24', idFarmacia: 'f7', prezzo: 3.1, quantitaDisponibile: 8 },
];

export default disponibilita;
