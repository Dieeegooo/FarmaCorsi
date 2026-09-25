import Svg, { Circle, Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaOrologioProps = PropsIcona;

// Orologio: tempo stimato di consegna.
function IconaOrologio({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaOrologioProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Circle cx={12} cy={12} r={8.5} stroke={colore} strokeWidth={SPESSORE_LINEA} />
      <Path
        d="M12 7.2V12l3.2 2"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconaOrologio;
