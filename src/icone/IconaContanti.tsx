import Svg, { Circle, Path, Rect } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaContantiProps = PropsIcona;

// Banconota: metodo "Contanti alla consegna".
function IconaContanti({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaContantiProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Rect
        x={2.5}
        y={6}
        width={19}
        height={12}
        rx={2}
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
      />
      <Circle cx={12} cy={12} r={2.6} stroke={colore} strokeWidth={SPESSORE_LINEA} />
      <Path
        d="M6 9.5v5M18 9.5v5"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaContanti;
