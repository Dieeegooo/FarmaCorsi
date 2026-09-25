import Svg, { Path, Rect } from 'react-native-svg';
import { colori } from '../tema';
import { DIMENSIONE_PREDEFINITA, PropsIcona, RIQUADRO } from './tipiIcona';

type IconaLogoProps = PropsIcona;

// Logo di FarmaCorsi: sacchetto da consegna con la croce della farmacia.
// È lo stesso disegno dell'icona dell'app, così il marchio è coerente.
function IconaLogo({
  dimensione = DIMENSIONE_PREDEFINITA,
  colore = colori.primario,
}: IconaLogoProps) {
  return (
    <Svg width={dimensione} height={dimensione} viewBox={RIQUADRO} fill="none">
      {/* manico del sacchetto */}
      <Path
        d="M8.6 7.5V6.2a3.4 3.4 0 0 1 6.8 0v1.3"
        stroke={colore}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
      {/* corpo del sacchetto */}
      <Path
        d="M4.8 7.5h14.4l-1.1 12.6a1.6 1.6 0 0 1-1.6 1.4H7.5a1.6 1.6 0 0 1-1.6-1.4L4.8 7.5Z"
        fill={colore}
      />
      {/* croce bianca al centro */}
      <Rect x={10.8} y={10.4} width={2.4} height={7.4} rx={0.6} fill={colori.superficie} />
      <Rect x={8.3} y={12.9} width={7.4} height={2.4} rx={0.6} fill={colori.superficie} />
    </Svg>
  );
}

export default IconaLogo;
