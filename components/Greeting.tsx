import { LinearGradient } from 'expo-linear-gradient';
import * as React from 'react';
import UserPhoto from './UserPhoto';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';

const Greeting = () => (
    <LinearGradient
    colors={['rgba(36, 121, 145, 0.20)', 'rgba(212, 232, 240, 0.27)']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={styles.header}
  >
    <View style={styles.headerTextContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.greeting}>Cześć, Ada 👋</Text>
        <Text style={styles.secondGreeting}>Zaczynamy przygodę</Text>
        <Text style={styles.thirdGreeting}>Twórz wycieczki i zarządzaj</Text>
      </View>
      <UserPhoto />
    </View>
  </LinearGradient>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  header: {
    marginTop: 16,
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 8,
  },
  secondGreeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#888888',
    marginBottom: 4,
  },
  thirdGreeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#888888',
  },
  createButton: {
    fontSize: 16,
    marginVertical: 20,
    borderRadius: 12,
    borderColor: '#D2D2D2',
    borderWidth: 2,
  },
  createButtonLabel: {
    color: '#A09CAB',
  },
  createButtonIcon: {
    color: '#A09CAB',
  },
  buttonLabel: {
    color: '#FFFFFF',
  },
  tripSection: {
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F2F2F',
    marginBottom: 16,
  },
  tabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tabButton: {
    flex: 1,
    marginHorizontal: 5,
    borderRadius: 12,
  },
  activeTabButton: {
    backgroundColor: '#247991',
  },
  inactiveTabButton: {
    backgroundColor: '#D4E8F0',
  },
  inactiveButtonLabel: {
    color: '#045569',
  },
  tripCard: {
    marginBottom: 20,
    
  },
  cardImage: {
    height: 200,
    justifyContent: 'flex-end',
    
  },
  cardTitle: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  cardSubtitle: {
    fontSize: 14,
    color: 'white',
  },
});

export default Greeting;