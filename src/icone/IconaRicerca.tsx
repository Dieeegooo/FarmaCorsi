import Svg, { Circle, Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaRicercaProps = PropsIcona;

// Lente di ingrandimento: barra di ricerca.
function IconaRicerca({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaRicercaProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Circle cx={11} cy={11} r={6.5} stroke={colore} strokeWidth={SPESSORE_LINEA} />
      <Path
        d="m16 16 4.5 4.5"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaRicerca;
