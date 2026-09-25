import Svg, { Circle, Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaPosizioneProps = PropsIcona;

// Segnaposto della mappa: indirizzo di consegna e distanza delle farmacie.
function IconaPosizione({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaPosizioneProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M12 21.2c4.1-4 6.2-7.1 6.2-9.9a6.2 6.2 0 1 0-12.4 0c0 2.8 2.1 5.9 6.2 9.9Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={11} r={2.4} stroke={colore} strokeWidth={SPESSORE_LINEA} />
    </Svg>
  );
}

export default IconaPosizione;
