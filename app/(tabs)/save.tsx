import { Link } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';

export default function SavedScreen() {
  return (
    <View style={styles.container}>
      <Text>saved</Text>
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
