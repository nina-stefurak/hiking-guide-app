import React, { useState } from 'react'; 
import { ScrollView, Modal, StyleSheet } from 'react-native';
import { Button, TextInput, Text, useTheme } from 'react-native-paper';
import CustomImagePicker from './CustomImagePicker';
import CustomDateTimePicker from './CustomDateTimePicker';

const AddTripModal = ({ visible, onClose, onSubmit }) => {
  const [tripData, setTripData] = useState({
    photo: '',
    name: '',
    description: '',
    requirements: '',
    equipment: '',
    advice: '',
    date: new Date(),
    time: new Date(),
    difficulty: '',
    spots: '',
    price: '',
  });

  const theme = useTheme();

  const handleInputChange = (name: string, value: string) => {
    setTripData({ ...tripData, [name]: value });
  };

  const handleDateChange = (selectedDate: Date) => {
    setTripData({ ...tripData, date: selectedDate });
  };

  const handleTimeChange = (selectedTime: Date) => {
    setTripData({ ...tripData, time: selectedTime });
  };

  const handleImagePicked = (uri: string) => {
    setTripData({ ...tripData, photo: uri });
  };

  const handleSubmit = () => {
    onSubmit(tripData);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" onRequestClose={onClose}>
      <ScrollView style={styles.modalContainer}>
        <Text style={styles.modalTitle}>Dodaj nową wycieczkę</Text>

        {/* Custom Image Picker */}
        <CustomImagePicker onImagePicked={handleImagePicked} />

        {/* Pola formularza */}
        <TextInput
          label="Nazwa"
          mode="outlined"
          value={tripData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
        />
        <TextInput
          label="Krótki opis"
          mode="outlined"
          value={tripData.description}
          onChangeText={(value) => handleInputChange('description', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
        />
        <TextInput
          label="Wymagania"
          mode="outlined"
          value={tripData.requirements}
          onChangeText={(value) => handleInputChange('requirements', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
        />
        <TextInput
          label="Potrzebny sprzęt"
          mode="outlined"
          value={tripData.equipment}
          onChangeText={(value) => handleInputChange('equipment', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
        />

        {/* Custom DateTimePicker */}
        <CustomDateTimePicker
          label="Data"
          mode="date"
          value={tripData.date}
          onChange={handleDateChange}
        />
        <CustomDateTimePicker
          label="Czas"
          mode="time"
          value={tripData.time}
          onChange={handleTimeChange}
        />

        <TextInput
          label="Trudność"
          mode="outlined"
          value={tripData.difficulty}
          onChangeText={(value) => handleInputChange('difficulty', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
        />
        <TextInput
          label="Ilość miejsc"
          mode="outlined"
          value={tripData.spots}
          onChangeText={(value) => handleInputChange('spots', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
          keyboardType="numeric"
        />
        <TextInput
          label="Cena"
          mode="outlined"
          value={tripData.price}
          onChangeText={(value) => handleInputChange('price', value)}
          style={styles.input}
          theme={{ colors: { primary: '#247991' } }}
          keyboardType="numeric"
        />

        <Button mode="contained" onPress={handleSubmit} style={styles.submitButton}>
          Dodaj wycieczkę
        </Button>
        <Button mode="text" onPress={onClose}>
          <Text style={styles.cancelButtonText}>Anuluj</Text>
        </Button>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#FAFAFA',
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    color: '#01313D',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
  submitButton: {
    backgroundColor: '#247991',
    marginVertical: 12,
    borderRadius: 8,
  },
  cancelButtonText: {
    color: '#01313D',
    textAlign: 'center',
  },  
});

export default AddTripModal;
