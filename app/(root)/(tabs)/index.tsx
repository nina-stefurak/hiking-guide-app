import {ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import { router, useLocalSearchParams} from "expo-router";
import {SafeAreaView} from "react-native-safe-area-context";
import icons from "@/constants/icons";
import Search from "@/components/Search";
import {Card, FeaturedCard} from "@/components/Cards";
import Filters from "@/components/Filters";
import {useGlobalContext} from "@/lib/global-provider";
import {useAppwrite} from "@/lib/useAppwrite";
import {getLatestTrips, getTrips} from "@/lib/appwrite";
import {useEffect} from "react";
import NoResults from "@/components/NoResults";
import CustomButton from "@/components/AnimatedButton";
import { PaperProvider } from "react-native-paper";
// import seed from "@/lib/seed";

export default function Index() {
    const { user } = useGlobalContext();
    const params = useLocalSearchParams<{ query?: string; filter?: string; }>();

    const  { data: latestTrips, loading: latestTripLoading } = useAppwrite( {
        fn: getLatestTrips,
    });

    const { data: trips, loading, refetch } = useAppwrite( {
        fn: getTrips,
        params: {
            filter: params.filter!,
            query: params.query!,
            limit: 6,
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
            limit: 6,
        })
    }, [params.filter, params.query])


    return (
        <PaperProvider>
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
                <View className="px-5">
                    <View className="flex flex-row items-center justify-between mt-5">
                        <View className="flex flex-row items-center">
                            <Image source={{ uri: user?.avatar}} className="size-12 rounded-full"/>
                            <View className="flex flex-col items-start ml-2 justify-center">
                                <Text className="text-xs font-rubik text-black-100">Hello</Text>
                                <Text className="text-base font-rubik-medium text-black-300">{user?.name}</Text>
                            </View>
                        </View>
                        <Image source={icons.bell} className="size-6"/>
                    </View>
                    <Search/>
                    <View className="my-5">
                        <View className="flex flex-row items-center justify-between">
                            <Text className="text-xl font-rubik-bold text-black-300">Featured</Text>
                            <TouchableOpacity onPress={() => router.push("/explore")}>
                                <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                            </TouchableOpacity>
                        </View>

                        {latestTripLoading ?
                            <ActivityIndicator size="large" className="text-primary-300" />
                             : !latestTrips || latestTrips.length === 0 ?
                            <NoResults /> : (
                        <FlatList
                            data={latestTrips}
                            renderItem={({ item }) =>
                                <FeaturedCard
                                    item={item}
                                    onPress={() => handleCardPress(item.$id)}
                                />
                            }
                            keyExtractor={(item) => item.$id}
                            horizontal
                            bounces={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerClassName="flex gap-5 mt-5"
                        />
                        )}
                    </View>
                    <View className="flex flex-row items-center justify-between">
                        <Text className="text-xl font-rubik-bold text-black-300">Our Recommendation</Text>
                        <TouchableOpacity onPress={() => router.push("/explore")}>
                            <Text className="text-base font-rubik-bold text-primary-300">See All</Text>
                        </TouchableOpacity>
                    </View>

                    <Filters/>
                </View>}
            />
            <CustomButton
            />
        </SafeAreaView>
        </PaperProvider>
    );
}
