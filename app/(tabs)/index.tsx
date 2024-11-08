import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, ImageBackground } from 'react-native';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CardComponent from '../../components/TripCard';
import Greeting from '../../components/Greeting';
import NewTripModal from '../../components/NewTripModal';



const HomeScreen: React.FC = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => setModalVisible(true);
  const handleCloseModal = () => setModalVisible(false);

  const handleAddTrip = (tripData) => {
    // Obsługa danych wycieczki (zapis do stanu, wysyłanie do backendu)
    console.log('Dodano wycieczkę:', tripData);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Greeting></Greeting>
      <Button 
        mode="outlined" 
        icon={() => <Icon name="plus" color="#A09CAB" size={24} />} 
        style={styles.createButton} 
        labelStyle={styles.createButtonLabel}
        onPress={handleOpenModal} // handleOpenModal po kliknięciu
      >
        Utwórz nową wycieczkę
      </Button>

      <View style={styles.tripSection}>
        <Text style={styles.sectionTitle}>Moje wycieczki</Text>
        <View style={styles.tabs}>
          <Button mode="contained" style={[styles.tabButton, styles.activeTabButton]} labelStyle={styles.buttonLabel}>Udostępnione</Button>
          <Button mode="contained" style={[styles.tabButton, styles.inactiveTabButton]} labelStyle={styles.inactiveButtonLabel}>Wersja robocza</Button>
        </View>

        {/* <Card style={styles.tripCard}>
          <ImageBackground source={require('../../assets/góry.png')} style={styles.cardImage}>
            <Card.Content>
              <Text style={styles.cardTitle}>Rysy, Polska</Text>
              <Text style={styles.cardSubtitle}>2 dni</Text>
            </Card.Content>
          </ImageBackground>
        </Card> */}
        <CardComponent></CardComponent>

        <NewTripModal 
          visible={modalVisible} 
          onClose={handleCloseModal} 
          onSubmit={handleAddTrip} 
        />

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#FAFAFA',
  },
  header: {
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

export default HomeScreen;
