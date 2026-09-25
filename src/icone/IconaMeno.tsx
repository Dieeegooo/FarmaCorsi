import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaMenoProps = PropsIcona;

// Segno meno: diminuisce la quantità nel carrello.
function IconaMeno({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaMenoProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M5.5 12h13"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaMeno;
