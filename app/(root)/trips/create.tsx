import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import {createTrip, getGuideById, uploadFile} from "@/lib/appwrite";
import icons from "@/constants/icons";
import {router} from "expo-router";
import * as DocumentPicker from "expo-document-picker";
import {useGlobalContext} from "@/lib/global-provider";
import {RadioButton} from 'react-native-paper';

const CreateTrip = () => {
    const [name, setName] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [description, setDescription] = useState("");
    const [equipments, setEquipments] = useState("");
    const [price, setPrice] = useState("");
    const [distance, setDistance] = useState("");
    const [geolocation, setGeolocation] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const [showStartPicker, setShowStartPicker] = useState(false);
    const [showEndPicker, setShowEndPicker] = useState(false);
    const [image, setImage] = useState(null)


    const {user} = useGlobalContext();

    useEffect(() => {
        const fetchGuide = async () => {
            let existingGuide = await getGuideById({id: user!!.$id});

        };

        fetchGuide();
    }, [user]);

    const handleImagePicker = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: ["image/png", "image/jpg", "image/jpeg"],
        });
        if (!result.canceled) {
            // @ts-ignore
            setImage(result.assets[0])
        }
    };

    const handleSave = async () => {
        if (!name || !difficulty || !description || !price || !distance || !start || !end || !image || !geolocation) {
            Alert.alert("Error", "Please fill out all required fields.");
            return;
        }

        let uploadedImage = await uploadFile(
            // @ts-ignore
            {...image, mimeType: image.mimeType},
            "image");

        function resetForm() {
            setName("");
            setDifficulty("");
            setDescription("");
            setEquipments("");
            setPrice("");
            setDistance("");
            setGeolocation("");
            setStart(new Date());
            setEnd(new Date());
            setImage(null);
        }

        try {
            let existingGuide = await getGuideById({id: user!!.$id});
            console.log("Found existing giude:" + JSON.stringify(existingGuide));
            await createTrip({
                name,
                difficulty,
                description,
                equipments,
                price: parseInt(price),
                distance: parseFloat(distance),
                image: uploadedImage!!,
                geolocation,
                start,
                end,
                guideId: (existingGuide as any).id,
            });
            resetForm();
            router.back();
            Alert.alert("Success", "Trip created successfully!");
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Failed to create the trip.");
        }
    };

    return (
        <View className="bg-white h-full ">
            <ScrollView
                className="px-5 my-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 32}}
                keyboardShouldPersistTaps="handled"
            >

                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity onPress={() => router.back()}
                                      className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                        <Image source={icons.backArrow} className="size-5"/>
                    </TouchableOpacity>
                    <Text className="text-xl mr-2 text-center font-rubik-medium text-black-300">Create Trip</Text>
                    <Image source={icons.bell} className="w-6 h-6"/>
                </View>

                {/* Image */}
                <View className="mt-4 space-y-2">
                    <Text className="text-black-200 font-rubik-medium mb-1">Image</Text>
                    <TouchableOpacity onPress={handleImagePicker}>
                        {(image !== null) ? (
                            <Image source={{uri: (image!! as any).uri}}
                                   resizeMode="cover"
                                   className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View
                                className="w-full h-16 px-4 border-2 border-gray-300 rounded-lg mb-4 flex justify-center items-center flex-row space-x-2">
                                <Image
                                    source={icons.upload}
                                    resizeMode="contain"
                                    alt="upload"
                                    className="w-5 h-5"
                                />
                                <Text className="text-sm text-black-200 font-rubik-light">
                                    Choose a photo
                                </Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                {/* Name */}
                <Text className="text-black-200 font-rubik-medium mb-1">Name</Text>
                <TextInput
                    value={name}
                    onChangeText={setName}
                    placeholder="Enter trip name"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />

                {/* Difficulty */}
                <Text className="text-black-200 font-rubik-medium mb-1">Difficulty</Text>
                <RadioButton.Group
                    onValueChange={value => setDifficulty(value)}
                    value={difficulty}
                >
                    <View className="flex flex-row items-center justify-between mb-4">
                        <View className="flex flex-row items-center space-x-2">
                            <RadioButton value="Easy"/>
                            <Text className="text-black-200">Easy</Text>
                        </View>
                        <View className="flex flex-row items-center space-x-2">
                            <RadioButton value="Medium"/>
                            <Text className="text-black-200">Medium</Text>
                        </View>
                        <View className="flex flex-row items-center space-x-2">
                            <RadioButton value="Hard"/>
                            <Text className="text-black-200">Hard</Text>
                        </View>
                    </View>
                </RadioButton.Group>


                {/* Description */}
                <Text className="text-black-200 font-rubik-medium mb-1">Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Enter description"
                    multiline
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />
                {/* Equipment */}
                <Text className="text-black-200 font-rubik-medium mb-1">Required equipment</Text>
                <TextInput
                    value={equipments}
                    onChangeText={setEquipments}
                    placeholder="Enter equipments"
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

                {/* Geolocation */}
                <Text className="text-black-200 font-rubik-medium mb-1">Geolocation</Text>
                <TextInput
                    value={geolocation}
                    onChangeText={setGeolocation}
                    placeholder="Enter Google Maps link"
                    className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                />
                {/* Start - end */}
                <View className="flex flex-row items-center justify-between">
                    <Text className="text-black-200 font-rubik-medium mb-1">Start</Text>
                    <TouchableOpacity onPress={() => setShowStartPicker(true)}
                                      className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                    >
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
                    <Text className="text-black-200 font-rubik-medium mb-1">End</Text>
                    <TouchableOpacity onPress={() => setShowEndPicker(true)}
                                      className="border border-gray-300 rounded-lg px-3 py-2 mb-4"
                    >
                        <Text>{start.toDateString()}</Text>
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
                </View>

                {/* Submit and post Button */}
                <View className="flex flex-row items-center justify-between gap-10 mb-6">
                    <View className="flex flex-col items-start mb-1 ">
                        <TouchableOpacity>
                            <Text className="text-black-200 text-xs font-rubik-medium">
                                Save
                            </Text>
                            <Image source={icons.save} className="size-6"/>
                        </TouchableOpacity>

                    </View>

                    <TouchableOpacity onPress={handleSave}
                                      className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
                        <Text className="text-white text-lg text-center font-rubik-bold">
                            Submit & Publish
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

export default CreateTrip;
