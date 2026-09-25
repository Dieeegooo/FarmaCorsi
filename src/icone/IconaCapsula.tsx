import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaCapsulaProps = PropsIcona;

// Capsula: categoria Integratori.
function IconaCapsula({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaCapsulaProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M4.9 19.1a4 4 0 0 1 0-5.7l8.5-8.5a4 4 0 0 1 5.7 5.7l-8.5 8.5a4 4 0 0 1-5.7 0Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Path
        d="m9.2 9.2 5.6 5.6"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaCapsula;
