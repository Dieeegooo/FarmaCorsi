import Svg, { Path } from 'react-native-svg';
import {
  COLORE_PREDEFINITO,
  DIMENSIONE_PREDEFINITA,
  PropsIcona,
  RIQUADRO,
  SPESSORE_LINEA,
} from './tipiIcona';

type IconaCarrelloProps = PropsIcona;

// Sacchetto della farmacia con il manico: tab Carrello.
function IconaCarrello({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = COLORE_PREDEFINITO,
}: IconaCarrelloProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      <Path
        d="M5.5 7.5h13l-1 12.1a1 1 0 0 1-1 .9H7.5a1 1 0 0 1-1-.9l-1-12.1Z"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinejoin="round"
      />
      <Path
        d="M9 9V6.5a3 3 0 0 1 6 0V9"
        stroke={colore}
        strokeWidth={SPESSORE_LINEA}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export default IconaCarrello;
