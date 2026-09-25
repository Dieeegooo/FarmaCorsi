import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaTermometroProps = PropsIcona;

// Termometro: categoria Dolore e febbre.
function IconaTermometro({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaTermometroProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      {/* contorno del termometro: tubo e bulbo in un solo tratto */}
      <Path
        d="M10 14.3V5a2 2 0 1 1 4 0v9.3a3.8 3.8 0 1 1-4 0Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Path
        d="M12 9v8"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaTermometro;
