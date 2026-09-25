import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useCarrello } from '../contesti/ContestoCarrello';
import IconaCarrello from '../icone/IconaCarrello';
import IconaHome from '../icone/IconaHome';
import IconaProfilo from '../icone/IconaProfilo';
import Carrello from '../schermate/Carrello';
import StackHome from './StackHome';
import Profilo from '../schermate/Profilo';
import { colori, dimensioniTesto, pesi } from '../tema';
import { ParametriTab } from './tipiNavigazione';

const Tab = createBottomTabNavigator<ParametriTab>();

// Props che React Navigation passa a tabBarIcon: il colore cambia
// da solo in base alla tab attiva (tabBarActiveTintColor / Inactive).
type PropsIconaTab = {
  color: string;
  size: number;
};

// Definite fuori dal componente: così non vengono ricreate a ogni render.
function iconaHome({ color, size }: PropsIconaTab) {
  return <IconaHome colore={color} dimensione={size} />;
}

function iconaCarrello({ color, size }: PropsIconaTab) {
  return <IconaCarrello colore={color} dimensione={size} />;
}

function iconaProfilo({ color, size }: PropsIconaTab) {
  return <IconaProfilo colore={color} dimensione={size} />;
}

function TabPrincipali() {
  // Numero sul badge della tab Carrello: si aggiorna da solo quando il
  // carrello cambia, perché il contesto fa ridisegnare questo componente.
  const { numeroElementi } = useCarrello();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: colori.primario,
        tabBarInactiveTintColor: colori.testoSecondario,
        tabBarStyle: { backgroundColor: colori.superficie },
        tabBarLabelStyle: { fontSize: dimensioniTesto.piccolo },
        headerStyle: { backgroundColor: colori.superficie },
        headerTitleStyle: { color: colori.testo, fontWeight: pesi.grassetto },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StackHome}
        options={{ tabBarIcon: iconaHome, headerShown: false }}
      />
      <Tab.Screen
        name="Carrello"
        component={Carrello}
        options={{
          tabBarIcon: iconaCarrello,
          // undefined = nessun badge (carrello vuoto)
          tabBarBadge: numeroElementi > 0 ? numeroElementi : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colori.primario,
            color: colori.testoSuPrimario,
            fontSize: dimensioniTesto.piccolo,
          },
        }}
      />
      <Tab.Screen
        name="Profilo"
        component={Profilo}
        options={{ tabBarIcon: iconaProfilo }}
      />
    </Tab.Navigator>
  );
}

export default TabPrincipali;
