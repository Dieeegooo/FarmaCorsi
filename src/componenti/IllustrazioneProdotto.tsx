import Svg, {
  Ellipse,
  Path,
  Polygon,
  Rect,
  Text as TestoSvg,
} from 'react-native-svg';
import { colori } from '../tema';
import { AspettoConfezione, Prodotto } from '../tipi';

// Disegna la confezione di un prodotto al posto di una foto.
// Tutte le forme sono disegnate in uno spazio 120x120 (viewBox):
// la prop dimensione le ingrandisce o rimpicciolisce senza perdere nitidezza.

type IllustrazioneProdottoProps = {
  prodotto: Prodotto;
  dimensione: number;
};

// Prodotti senza "aspetto" nei dati: scatola generica con i colori dell'app.
function aspettoGenerico(prodotto: Prodotto): AspettoConfezione {
  return {
    forma: 'scatola',
    coloreSfondo: colori.superficie,
    coloreFascia: colori.primario,
    coloreAccento: colori.primarioChiaro,
    scritta: prodotto.marca,
    sottoscritta: '',
  };
}

// Rimpicciolisce il testo se è lungo, per farlo stare nella larghezza data.
// 0.6 è circa la larghezza media di una lettera rispetto alla sua altezza.
function dimensioneScritta(testo: string, larghezza: number, massimo: number) {
  return Math.min(massimo, larghezza / (testo.length * 0.6));
}

// Velo scuro trasparente: dà profondità alle facce laterali.
const OMBRA_LEGGERA = 0.07;
const OMBRA_FORTE = 0.18;

// Funzioni di disegno: ricevono l'aspetto e restituiscono le forme SVG.
// Sono semplici funzioni (non componenti): le chiama IllustrazioneProdotto.

function disegnaScatola(aspetto: AspettoConfezione) {
  return (
    <>
      {/* faccia superiore e laterale: stesso colore + velo scuro */}
      <Polygon points="22,34 36,22 100,22 86,34" fill={aspetto.coloreSfondo} />
      <Polygon
        points="22,34 36,22 100,22 86,34"
        fill={colori.ombra}
        fillOpacity={OMBRA_LEGGERA}
      />
      <Polygon points="86,34 100,22 100,88 86,100" fill={aspetto.coloreSfondo} />
      <Polygon
        points="86,34 100,22 100,88 86,100"
        fill={colori.ombra}
        fillOpacity={OMBRA_FORTE}
      />
      <Polygon points="86,52 100,40 100,64 86,76" fill={aspetto.coloreFascia} />
      <Polygon
        points="86,52 100,40 100,64 86,76"
        fill={colori.ombra}
        fillOpacity={OMBRA_FORTE}
      />

      {/* faccia frontale */}
      <Rect
        x={22}
        y={34}
        width={64}
        height={66}
        fill={aspetto.coloreSfondo}
        stroke={colori.ombra}
        strokeOpacity={0.12}
      />
      <Rect x={28} y={40} width={16} height={5} rx={2.5} fill={aspetto.coloreAccento} />
      <Rect x={22} y={52} width={64} height={24} fill={aspetto.coloreFascia} />
      <TestoSvg
        x={54}
        y={68}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.scritta, 58, 13)}
        fill={colori.superficie}
      >
        {aspetto.scritta}
      </TestoSvg>
      {aspetto.sottoscritta !== '' ? (
        <TestoSvg
          x={54}
          y={90}
          textAnchor="middle"
          fontWeight="bold"
          fontSize={9}
          fill={aspetto.coloreFascia}
        >
          {aspetto.sottoscritta}
        </TestoSvg>
      ) : (
        // confezione generica: piccola croce da farmacia al posto del testo
        <Path
          d="M52 80h4v4h4v4h-4v4h-4v-4h-4v-4h4z"
          fill={aspetto.coloreFascia}
        />
      )}
    </>
  );
}

function disegnaTubo(aspetto: AspettoConfezione) {
  return (
    <>
      {/* chiusura schiacciata in alto */}
      <Rect x={36} y={12} width={48} height={8} rx={1} fill={aspetto.coloreSfondo} />
      <Rect
        x={36}
        y={12}
        width={48}
        height={8}
        rx={1}
        fill={colori.ombra}
        fillOpacity={OMBRA_FORTE}
      />
      {/* corpo che si stringe verso il tappo */}
      <Path
        d="M38,20 H82 L78,90 Q60,94 42,90 Z"
        fill={aspetto.coloreSfondo}
        stroke={colori.ombra}
        strokeOpacity={0.12}
      />
      <Rect x={46} y={28} width={28} height={4} rx={2} fill={aspetto.coloreAccento} />
      <Polygon points="39.4,42 80.6,42 79.4,64 40.6,64" fill={aspetto.coloreFascia} />
      <TestoSvg
        x={60}
        y={57}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.scritta, 36, 11)}
        fill={colori.superficie}
      >
        {aspetto.scritta}
      </TestoSvg>
      <TestoSvg
        x={60}
        y={78}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.sottoscritta, 32, 8)}
        fill={aspetto.coloreFascia}
      >
        {aspetto.sottoscritta}
      </TestoSvg>
      {/* tappo */}
      <Rect x={49} y={90} width={22} height={16} rx={3} fill={aspetto.coloreFascia} />
    </>
  );
}

function disegnaFlacone(aspetto: AspettoConfezione) {
  return (
    <>
      {/* tappo e collo */}
      <Rect x={46} y={12} width={28} height={14} rx={3} fill={aspetto.coloreFascia} />
      <Rect x={50} y={26} width={20} height={9} fill={aspetto.coloreSfondo} />
      <Rect
        x={50}
        y={26}
        width={20}
        height={9}
        fill={colori.ombra}
        fillOpacity={OMBRA_FORTE}
      />
      {/* corpo */}
      <Rect
        x={32}
        y={34}
        width={56}
        height={72}
        rx={12}
        fill={aspetto.coloreSfondo}
        stroke={colori.ombra}
        strokeOpacity={0.12}
      />
      <Ellipse cx={60} cy={45} rx={5} ry={5} fill={aspetto.coloreAccento} />
      <Rect x={32} y={54} width={56} height={30} fill={aspetto.coloreFascia} />
      <TestoSvg
        x={60}
        y={73}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.scritta, 50, 12)}
        fill={colori.superficie}
      >
        {aspetto.scritta}
      </TestoSvg>
      <TestoSvg
        x={60}
        y={97}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={8}
        fill={aspetto.coloreFascia}
      >
        {aspetto.sottoscritta}
      </TestoSvg>
    </>
  );
}

function disegnaCilindro(aspetto: AspettoConfezione) {
  return (
    <>
      {/* corpo del tubo delle compresse effervescenti */}
      <Rect x={36} y={24} width={48} height={84} rx={6} fill={aspetto.coloreSfondo} />
      {/* riflesso di luce sul lato sinistro */}
      <Rect
        x={41}
        y={30}
        width={4}
        height={72}
        rx={2}
        fill={colori.superficie}
        fillOpacity={0.35}
      />
      <Rect x={36} y={50} width={48} height={24} fill={aspetto.coloreFascia} />
      <TestoSvg
        x={60}
        y={66}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.scritta, 42, 11)}
        fill={colori.superficie}
      >
        {aspetto.scritta}
      </TestoSvg>
      <TestoSvg
        x={60}
        y={88}
        textAnchor="middle"
        fontWeight="bold"
        fontSize={dimensioneScritta(aspetto.sottoscritta, 40, 9)}
        fill={aspetto.coloreAccento}
      >
        {aspetto.sottoscritta}
      </TestoSvg>
      {/* tappo */}
      <Rect x={34} y={10} width={52} height={16} rx={4} fill={aspetto.coloreFascia} />
      <Rect
        x={34}
        y={10}
        width={52}
        height={16}
        rx={4}
        fill={colori.ombra}
        fillOpacity={OMBRA_LEGGERA}
      />
    </>
  );
}

function IllustrazioneProdotto({
  prodotto,
  dimensione,
}: IllustrazioneProdottoProps) {
  const aspetto = prodotto.aspetto ?? aspettoGenerico(prodotto);

  // Sceglie quale forma disegnare in base ai dati.
  function disegnaForma() {
    switch (aspetto.forma) {
      case 'tubo':
        return disegnaTubo(aspetto);
      case 'flacone':
        return disegnaFlacone(aspetto);
      case 'cilindro':
        return disegnaCilindro(aspetto);
      case 'scatola':
        return disegnaScatola(aspetto);
    }
  }

  return (
    <Svg width={dimensione} height={dimensione} viewBox="0 0 120 120">
      {/* ombra sul "pavimento" */}
      <Ellipse
        cx={60}
        cy={111}
        rx={36}
        ry={4}
        fill={colori.ombra}
        fillOpacity={0.1}
      />
      {disegnaForma()}
    </Svg>
  );
}

export default IllustrazioneProdotto;
