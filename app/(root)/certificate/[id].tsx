import {router, useLocalSearchParams} from "expo-router";
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";
import React, {useState} from "react";
import {createGuide, createTrip} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";


const CertificateForm = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [certificateNumber, setCertificateNumber] = useState("");
    const {user} = useGlobalContext();
    const [certificateFile, setCertificateFile] = useState("");

    const handleSave = async () => {
        if (!certificateNumber) {
            Alert.alert("Error", "Please fill out all required fields.");
            return;
        }

        try {
            const guideData = {
                id: id,
                name: user!!.name,
                email: user!!.email,
                avatar: user!!.avatar,
                certificateNumber: certificateNumber
            };

            const response = await createGuide(guideData);

            if (response) {
                Alert.alert("Success", "Guide information saved successfully!");
                router.push("/profile"); // Navigate back to profile page
            }
        } catch (error) {
            console.error("Failed to save guide information:", error);
            Alert.alert(
                "Error",
                "An error occurred while saving guide information. Please try again."
            );
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
                    <TouchableOpacity onPress={() => router.push(`/profile`)}
                                      className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                        <Image source={icons.backArrow} className="size-5"/>
                    </TouchableOpacity>
                    <Text className="text-xl mr-2 text-center font-rubik-medium text-black-300">Your
                        Certification</Text>
                    <Image source={icons.bell} className="w-6 h-6"/>
                </View>

                <View className="w-full border-t border-primary-200 pt-7 mt-5">
                    <Text className="text-black-300 text-base font-rubik-bold">
                        Guide identification number
                    </Text>
                    <TextInput
                        onChangeText={setCertificateNumber}
                        placeholder="Enter your identification number"
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-4 mt-2"
                    />
                </View>
                <View className="w-full border-t border-primary-200 pt-7 mt-5">
                    <Text className="text-black-300 text-base font-rubik-bold">
                        Guide certificate
                    </Text>
                    <Text className="text-black-200 text-sm font-rubik-bold mb-4 mt-2">UserId: {id}</Text>
                </View>

                <TouchableOpacity onPress={handleSave}
                                  className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
                    <Text className="text-white text-lg text-center font-rubik-bold">
                        Submit & Publish
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default CertificateForm;