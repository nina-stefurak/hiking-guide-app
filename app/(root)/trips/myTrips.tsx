import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {router} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import {Card} from "@/components/Cards";
import {useAppwrite} from "@/lib/useAppwrite";
import {getTrips, getTripsForGuide} from "@/lib/appwrite";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";
import {useGlobalContext} from "@/lib/global-provider";
import {useEffect} from "react";


export default function MyTrips() {

    const {user} = useGlobalContext();

    const {data: trips, loading, refetch} = useAppwrite({
        params: {filter: {guideId: user!!.$id}},
        fn: getTripsForGuide,
        skip: true,
    })

    // @ts-ignore
    const handleCardPress = (id: string) => router.push(`/trips/${id}`);

    useEffect(() => {
        refetch({
            filter: {guideId: user!!.$id},
            limit: 20,
        });
    }, [])

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={trips}
                renderItem={({item}) =>
                    <Card item={item} onPress={() => handleCardPress(item.$id)}/>
                }
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" className="text-primary-300 mt-5"/>
                    ) : (
                        <NoResults/>
                    )
                }
                ListHeaderComponent={
                    <View className="px-5">
                        <View className="flex flex-row items-center justify-between mt-5">
                            <TouchableOpacity onPress={() => router.push(`/profile`)}
                                              className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                                <Image source={icons.backArrow} className="size-5"/>
                            </TouchableOpacity>
                            <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Your Custom Trips</Text>
                            <Image source={icons.bell} className="w-6 h-6"/>
                        </View>
                    </View>
                }
            />
        </SafeAreaView>
    );
}
