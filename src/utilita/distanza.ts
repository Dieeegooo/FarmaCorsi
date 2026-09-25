// Calcolo della distanza in linea d'aria fra due punti sulla Terra
// con la formula di Haversine.

const RAGGIO_TERRA_KM = 6371;

function inRadianti(gradi: number): number {
  return (gradi * Math.PI) / 180;
}

export function calcolaDistanzaKm(
  latitudine1: number,
  longitudine1: number,
  latitudine2: number,
  longitudine2: number,
): number {
  const differenzaLatitudine = inRadianti(latitudine2 - latitudine1);
  const differenzaLongitudine = inRadianti(longitudine2 - longitudine1);

  const a =
    Math.sin(differenzaLatitudine / 2) * Math.sin(differenzaLatitudine / 2) +
    Math.cos(inRadianti(latitudine1)) *
      Math.cos(inRadianti(latitudine2)) *
      Math.sin(differenzaLongitudine / 2) *
      Math.sin(differenzaLongitudine / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Arrotondiamo a un decimale, che è come mostriamo la distanza a schermo.
  return Math.round(RAGGIO_TERRA_KM * c * 10) / 10;
}

// "1,2 km": distanza pronta da mostrare, con la virgola come in italiano.
export function formattaDistanza(distanzaKm: number): string {
  return `${distanzaKm.toFixed(1).replace('.', ',')} km`;
}
