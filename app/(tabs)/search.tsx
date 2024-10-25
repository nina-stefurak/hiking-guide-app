import { Link } from 'expo-router';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import CardComponent from '../../components/TripCard';

export default function ExploreScreen() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <CardComponent></CardComponent>
      <CardComponent></CardComponent>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
});
