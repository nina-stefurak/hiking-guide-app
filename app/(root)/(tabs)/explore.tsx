import {ActivityIndicator, FlatList, Text, TouchableOpacity, Image, View} from "react-native";
import { router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import Search from "@/components/Search";
import {Card} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useAppwrite} from "@/lib/useAppwrite";
import {getTrips} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";
import icons from "@/constants/icons";

export default function Explore() {
    const params = useLocalSearchParams<{ query?: string; filter?: string; }>();

    const { data: trips, loading, refetch } = useAppwrite( {
        fn: getTrips,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        },
        skip: true,
    })

    // @ts-ignore
    const handleCardPress = (id: string) => router.push(`/trips/${id}`);

    //recall function to show the latest data (250)
    useEffect( () => {
        refetch({
            filter: params.filter!,
            query: params.query!,
            limit: 20,
        })
    }, [params.filter, params.query])

    return (
        <SafeAreaView className="bg-white h-full">
            <FlatList
                data={trips}
                renderItem={({ item }) =>
                    <Card item={item} onPress={() => handleCardPress(item.$id)} />
                }
                keyExtractor={(item) => item.$id}
                numColumns={2}
                contentContainerClassName="pb-32"
                columnWrapperClassName="flex gap-5 px-5"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    loading ? (
                        <ActivityIndicator size="large" className="text-primary-300 mt-5" />
                    ) : (
                        <NoResults />
                    )
                }
                ListHeaderComponent={
                <View className="px-5" >
                    <View className="flex flex-row items-center justify-between mt-5">
                        <TouchableOpacity onPress={() => router.back()}
                                          className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center">
                            <Image source={icons.backArrow} className="size-5" />
                        </TouchableOpacity>
                        <Text className="text-base mr-2 text-center font-rubik-medium text-black-300">Search for Your Ideal Trip</Text>
                        <Image source={icons.bell} className="w-6 h-6" />
                    </View>

                    <Search />

                    <View className="mt-5">
                        <Filters />

                        <Text className="text-xl font-rubik-bold text-black-300 mt-5">
                            Found {trips?.length} Trips
                        </Text>
                    </View>
                </View>
                }
            />


        </SafeAreaView>
    );
}
