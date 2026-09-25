import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconaCarrello from '../icone/IconaCarrello';
import IconaHome from '../icone/IconaHome';
import IconaProfilo from '../icone/IconaProfilo';
import Carrello from '../schermate/Carrello';
import Home from '../schermate/Home';
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
        component={Home}
        options={{ tabBarIcon: iconaHome, headerShown: false }}
      />
      <Tab.Screen
        name="Carrello"
        component={Carrello}
        options={{ tabBarIcon: iconaCarrello }}
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
