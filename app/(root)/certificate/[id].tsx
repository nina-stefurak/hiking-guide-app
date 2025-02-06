import {router, useLocalSearchParams} from "expo-router";
import {Alert, Image, ScrollView, Text, TextInput, TouchableOpacity, View} from "react-native";
import icons from "@/constants/icons";
import React, {useEffect, useState} from "react";
import * as DocumentPicker from "expo-document-picker";
import {createGuide, getGuideById, uploadFile} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";

const CertificateForm = () => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const [certificateNumber, setCertificateNumber] = useState("");
    const {user} = useGlobalContext();
    const [certificateFile, setCertificateFile] = useState(null);
    const [certificateNumberError, setCertificateNumberError] = useState("");
    const [existingCertificateUrl, setExistingCertificateUrl] = useState<URL>();
    const [uploading, setUploading] = useState(false);

    // Fetch existing guide data
    useEffect(() => {
        const fetchGuide = async () => {
            try {
                const guide = await getGuideById({id});
                if (guide) {
                    setCertificateNumber(guide.certificateNumber || "");
                    setExistingCertificateUrl(guide.certificateFileUrl || null);
                }
            } catch (error) {
                console.error("Failed to fetch guide data:", error);
            }
        };

        fetchGuide();
    }, [id]);

    const openPicker = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ["image/png", "image/jpg", "image/jpeg"],
            });

            if (!result.canceled) {
                // @ts-ignore
                setCertificateFile(result.assets[0]);
            } else {
                Alert.alert("Cancelled", "No file selected.");
            }
        } catch (error) {
            console.error("Error picking document: ", error);
            Alert.alert("Error", "Failed to open file picker. Please try again.");
        }
    };

    // format identyfikatora: PG-YYYY-NNNN
    const validateCertificateNumber = (number: string): boolean => {
        const regex = /^PG-\d{4}-\d{4}$/;
        return regex.test(number);
    };
    const handleCertificateNumberChange = (value: string) => {
        setCertificateNumber(value);
        if (value && !validateCertificateNumber(value)) {
            setCertificateNumberError("Nieprawidłowy format identyfikatora. Poprawny format: PG-YYYY-NNNN");
        } else {
            setCertificateNumberError("");
        }
    };

    const handleSave = async () => {
        if (!certificateNumber || (!certificateFile && !existingCertificateUrl)) {
            Alert.alert("Error", "Please fill out all required fields.");
            return;
        }
        // Sprawdzenie poprawności formatu identyfikatora
        if (!validateCertificateNumber(certificateNumber)) {
            Alert.alert("Błąd", "Nieprawidłowy format identyfikatora. Poprawny format: PG-YYYY-NNNN");
            return;
        }

        setUploading(true);
        try {
            let uploadedFileUrl = existingCertificateUrl;

            if (certificateFile) {
                console.log("Uploaded certificate: " + JSON.stringify(certificateFile))
                // @ts-ignore
                uploadedFileUrl = await uploadFile(
                    // @ts-ignore
                    {...certificateFile, mimeType: certificateFile.mimeType},
                    "image"
                );
            }

            const guideData = {
                id: id,
                name: user!!.name,
                email: user!!.email,
                avatar: user!!.avatar,
                certificateNumber: certificateNumber,
                certificateFileUrl: uploadedFileUrl!!,
            };

            const response = await createGuide(guideData);

            if (response) {
                Alert.alert("Sukces", "Jesteś przewodnikiem górskim! Teraz możesz tworzyć własne wycieczki.");
                router.push("/profile");
            }
        } catch (error) {
            console.error("Failed to save guide information:", error);
            Alert.alert("Błąd", "Wystąpił błąd podczas zapisywania informacji. Proszę spróbować ponownie.");
        } finally {
            setUploading(false);
        }
    };

    return (
        <View className="bg-white h-full">
            <ScrollView
                className="px-5 my-6"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{paddingBottom: 32}}
                keyboardShouldPersistTaps="handled"
            >
                <View className="flex flex-row items-center justify-between">
                    <TouchableOpacity
                        onPress={() => router.push(`/profile`)}
                        className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                    >
                        <Image source={icons.backArrow} className="size-5"/>
                    </TouchableOpacity>
                    <Text className="text-xl mr-2 text-center font-rubik-medium text-black-300">
                        Potwierdzenie Kwalifikacji
                    </Text>
                    <Image source={icons.bell} className="w-6 h-6"/>
                </View>

                <View className="w-full border-t border-primary-200 pt-7 mt-5">
                    <Text className="text-black-300 text-base font-rubik-bold">Numer identyfikatora</Text>
                    {!!existingCertificateUrl ? (
                        <Text>{certificateNumber}</Text>
                    ) : (
                        <>
                            <TextInput
                                onChangeText={handleCertificateNumberChange}
                                value={certificateNumber}
                                placeholder="PG-YYYY-NNNN"
                                className="border border-gray-300 rounded-lg px-3 py-2 mb-2 mt-2"
                            />
                            {certificateNumberError ? (
                                <Text className="text-red-500 text-sm">{certificateNumberError}</Text>
                            ) : null}
                        </>
                    )}
                </View>

                <View className="w-full border-t border-primary-200 pt-7 mt-5">
                    <Text className="text-black-300 text-base font-rubik-bold">
                        Twój certyfikat przewodnika
                    </Text>
                    <TouchableOpacity disabled={!!existingCertificateUrl} onPress={openPicker} className="mt-2">
                        {certificateFile ? (
                            <Image
                                source={{uri: (certificateFile as any).uri}}
                                resizeMode="cover"
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : existingCertificateUrl ? (
                            <Image
                                source={{uri: existingCertificateUrl as any}}
                                resizeMode="cover"
                                className="w-full h-64 rounded-2xl"
                            />
                        ) : (
                            <View className="w-full h-16 px-4 bg-gray-200 rounded-lg flex justify-center items-center">
                                <Text className="text-gray-500">Wybierz plik</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>
                {existingCertificateUrl ?
                    (<Text></Text>):
                        (
                            <TouchableOpacity
                        onPress={handleSave}
                        disabled={uploading}
                        className={`flex-1 flex flex-row items-center justify-center ${
                            uploading ? "bg-gray-400" : "bg-primary-300"
                        } py-3 rounded-full shadow-md shadow-zinc-400 mt-7`}
                    >
                        <Text className="text-white text-lg text-center font-rubik-bold">
                            {uploading ? "Przesyłanie..." : "Zatwierdź i opublikuj"}
                        </Text>
                    </TouchableOpacity>
                    )
                }

            </ScrollView>
        </View>
    );
};

export default CertificateForm;
