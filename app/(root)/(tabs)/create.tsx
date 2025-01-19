import {Alert, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import * as ImagePicker from 'expo-image-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createTrip} from "@/lib/appwrite";

const CreateTrip = () => {

    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [distance, setDistance] = useState("");
    const [rating, setRating] = useState("");
    const [equipment, setEquipment] = useState([]);
    const [image, setImage] = useState<string | null>(null);
    const [geolocation, setGeolocation] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);

    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images'],
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        if (!name || !difficulty || !description || !price || !distance || !start || !end || !image) {
            Alert.alert("Error", "Please fill out all required fields.");
            return;
        }

        try {
            await createTrip({
                name,
                difficulty,
                description,
                price: parseInt(price),
                distance: parseFloat(distance),
                rating: parseFloat(rating) || 0,
                equipment,
                image,
                geolocation,
                start,
                end,
            });
            Alert.alert("Success", "Trip created successfully!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to create the trip.");
        }
    };


    return (
        <View className="bg-white h-full">
            <ScrollView className="px-4 my-6" showsVerticalScrollIndicator={false}
                        contentContainerClassName="pb-32 bg-white">
                <Text className="text-black-300 text-xl font-rubik-bold">Create Trip</Text>
                {/* Trip Name */}
                <Text className="text-black-200 font-rubik-medium mb-1">Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter trip name"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Difficulty */}
                <Text className="text-black-200 font-rubik-medium mb-1">Difficulty</Text>
                <TextInput
                    value={difficulty}
                    onChangeText={setDifficulty}
                    placeholder="Enter difficulty (e.g., Easy, Medium, Hard)"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Description */}
                <Text className="text-black-200 font-rubik-medium mb-1">Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    multiline
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Price */}
                <Text className="text-black-200 font-rubik-medium mb-1">Price</Text>
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Enter price (e.g., 100)"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Distance */}
                <Text className="text-black-200 font-rubik-medium mb-1">Distance</Text>
                <TextInput
                    value={distance}
                    onChangeText={setDistance}
                    placeholder="Enter distance (e.g., 10.5)"
                    keyboardType="numeric"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Start Date */}
                <Text className="text-black-200 font-rubik-medium mb-1">Start Date</Text>
                <TouchableOpacity onPress={() => setShowStartPicker(true)}
                                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4">
                    <Text>{start.toDateString()}</Text>
                </TouchableOpacity>
                {showStartPicker && (
                    <DateTimePicker
                        value={start}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowStartPicker(false);
                            if (selectedDate) setStart(selectedDate);
                        }}
                    />
                )}

                {/* End Date */}
                <Text className="text-black-200 font-rubik-medium mb-1">End Date</Text>
                <TouchableOpacity onPress={() => setShowEndPicker(true)}
                                  className="border border-gray-300 rounded-lg px-3 py-2 mb-4">
                    <Text>{end.toDateString()}</Text>
                </TouchableOpacity>
                {showEndPicker && (
                    <DateTimePicker
                        value={end}
                        mode="date"
                        display="default"
                        onChange={(event, selectedDate) => {
                            setShowEndPicker(false);
                            if (selectedDate) setEnd(selectedDate);
                        }}
                    />
                )}

                {/* Image */}
                <Text className="text-black-200 font-rubik-medium mb-1">Image</Text>
                <TouchableOpacity
                    onPress={handleImagePicker}
                    className="bg-blue-500 rounded-lg px-3 py-2 mb-4"
                >
                    <Text className="text-white text-center">
                        {image ? "Change Image" : "Pick an Image"}
                    </Text>
                </TouchableOpacity>

                {/* Save Button */}
                <TouchableOpacity
                    onPress={handleSave}
                    className="bg-green-500 rounded-lg px-3 py-2"
                >
                    <Text className="text-white text-center font-rubik-bold">Save Trip</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}
export default CreateTrip
