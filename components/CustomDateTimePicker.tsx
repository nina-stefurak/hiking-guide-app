import React, { useState } from 'react';
import { TouchableOpacity, StyleSheet, View, Platform } from 'react-native';
import { TextInput, Text, useTheme } from 'react-native-paper';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';

interface CustomDateTimePickerProps {
  label: string;
  mode: 'date' | 'time';
  value: Date;
  onChange: (selectedDate: Date) => void;
}

const CustomDateTimePicker: React.FC<CustomDateTimePickerProps> = ({ label, mode, value, onChange }) => {
  const [showPicker, setShowPicker] = useState(false);
  const theme = useTheme();

  const handlePress = () => setShowPicker(true);

  const handleDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // Na iOS picker pozostaje widoczny, na Androidzie znika po wyborze
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <TextInput
          label={label}
          mode="outlined"
          value={mode === 'date' ? value.toLocaleDateString() : value.toLocaleTimeString()}
          style={styles.input}
          editable={false}
          pointerEvents="none"
          theme={{ colors: { primary: theme.colors.primary } }}
        />
      </TouchableOpacity>
      {showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={handleDateChange}
          accentColor={theme.colors.primary}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 12,
    backgroundColor: '#FAFAFA',
  },
});

export default CustomDateTimePicker;
