import { StyleSheet, Text, View } from 'react-native';

// 1. Descriviamo QUALI props accetta il componente e di che TIPO sono
type ProductCardProps = {
  name: string;
  price: number;
};

// 2. Il componente riceve le props e le usa
function ProductCard({ name, price }: ProductCardProps) {
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.price}>{price.toFixed(2)} €</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    fontSize: 16,
    color: '#1B7F3B',
    marginTop: 4,
  },
});

// 3. Lo esportiamo per poterlo usare in altri file
export default ProductCard;