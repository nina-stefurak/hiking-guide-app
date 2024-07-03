import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <Text>Search</Text>
      <Link href="/details">View details</Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
