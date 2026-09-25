import Svg, { Path, Rect } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaCartaProps = PropsIcona;

// Carta di pagamento: metodo "Carta".
function IconaCarta({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaCartaProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Rect
        x={3}
        y={5.5}
        width={18}
        height={13}
        rx={2}
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
      />
      <Path
        d="M3 10h18M6.5 15h4"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaCarta;
