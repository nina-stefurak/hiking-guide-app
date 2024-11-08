import React, { useState } from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

interface CustomImagePickerProps {
  onImagePicked: (uri: string) => void;
}

const CustomImagePicker: React.FC<CustomImagePickerProps> = ({ onImagePicked }) => {
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      onImagePicked(uri); // Przekazanie URI do komponentu nadrzędnego
    }
  };

  return (
    <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.imagePickerText}>Dodaj zdjęcie</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imagePicker: {
    backgroundColor: '#D4E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    height: 100,
    marginBottom: 16,
    borderRadius: 8,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  imagePickerText: {
    color: '#247991',
  },
});

export default CustomImagePicker;
