import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaStomacoProps = PropsIcona;

// Stomaco stilizzato: categoria Digestione.
function IconaStomaco({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaStomacoProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M9 3v3.5C9 9 5.5 10 5.5 14.5c0 4 3 6 7 6s6.5-2.5 6.5-6c0-3.5-2.5-5-5-4-1.5.6-2-1-2-2.5V3"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconaStomaco;
