import Svg, { Circle, Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaOcchioProps = PropsIcona;

// Occhio aperto: mostra la password nel Login.
function IconaOcchio({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaOcchioProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M2.8 12S6.7 5.8 12 5.8 21.2 12 21.2 12 17.3 18.2 12 18.2 2.8 12 2.8 12Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Circle cx={12} cy={12} r={3} stroke={colore} strokeWidth={SPESSORE_LINEA} />
    </Svg>
  );
}

export default IconaOcchio;
