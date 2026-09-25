import Svg, { Circle, Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaProfiloProps = PropsIcona;

// Sagoma di persona: tab Profilo.
function IconaProfilo({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaProfiloProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Circle cx={12} cy={8} r={3.5} stroke={colore} strokeWidth={SPESSORE_LINEA} />
      <Path
        d="M4.8 20.5c0-3.6 3.2-5.6 7.2-5.6s7.2 2 7.2 5.6"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaProfilo;
