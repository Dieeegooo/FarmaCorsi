import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaFrecciaIndietroProps = PropsIcona;

// Freccia verso sinistra: pulsante "indietro" nelle schermate a stack.
function IconaFrecciaIndietro({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaFrecciaIndietroProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M19 12H5.5M11 5.5 4.5 12l6.5 6.5"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default IconaFrecciaIndietro;
