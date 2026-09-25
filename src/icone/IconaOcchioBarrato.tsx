import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaOcchioBarratoProps = PropsIcona;

// Occhio sbarrato: nasconde di nuovo la password nel Login.
function IconaOcchioBarrato({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaOcchioBarratoProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M5 6.6C3.7 7.9 2.8 9.4 2.8 12c0 0 3.9 6.2 9.2 6.2 2 0 3.7-.9 5-1.9M18.4 15c1.6-1.4 2.8-3 2.8-3S17.3 5.8 12 5.8c-1 0-1.9.2-2.7.5"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M9.9 9.9a3 3 0 0 0 4.2 4.2"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
      <Path
        d="m4.5 4.5 15 15"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaOcchioBarrato;
