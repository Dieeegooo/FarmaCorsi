import Svg, { Path, Rect } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaSaponeProps = PropsIcona;

// Flacone con dosatore: categoria Igiene.
function IconaSapone({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaSaponeProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M10 3.5h4M12 3.5v4M14 3.5h2.5"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
      <Rect x={10} y={7.5} width={4} height={2.5} stroke={colore} strokeWidth={SPESSORE_LINEA} />
      <Rect
        x={6.5}
        y={10}
        width={11}
        height={10.5}
        rx={2.5}
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
      />
    </Svg>
  );
}

export default IconaSapone;
