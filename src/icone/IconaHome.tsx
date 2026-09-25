import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaHomeProps = PropsIcona;

// Casetta: tab Home.
function IconaHome({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaHomeProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M3.5 10.5 12 3.5l8.5 7v9a1 1 0 0 1-1 1h-15a1 1 0 0 1-1-1v-9Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Path
        d="M9.5 20.5v-6h5v6"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconaHome;
