import { StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import ProductCard from './src/components/ProductCard';   // ← NUOVO: importi il tuo componente

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  const safeAreaInsets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: safeAreaInsets.top }]}>
      <Text style={styles.title}>FarmaCorsi</Text>
      <ProductCard name="Tachipirina 500mg" price={4.9} />   {/* ← NUOVO: lo usi */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',   // ← CAMBIATO: grigio chiaro, così le card bianche risaltano
    padding: 16,                  // ← CAMBIATO: niente più centratura, contenuto in alto
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#1B7F3B',
    marginBottom: 16,             // ← NUOVO: spazio tra titolo e card
  },
});

export default App;