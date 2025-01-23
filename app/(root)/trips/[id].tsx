import {Alert, Dimensions, FlatList, Image, Platform, ScrollView, Text, TouchableOpacity, View,} from "react-native";
import {router, useLocalSearchParams} from "expo-router";
import icons from "@/constants/icons";
import images from "@/constants/images";
import Comment from "@/components/Comment";
import {useAppwrite} from "@/lib/useAppwrite";
import {avatar, bookTrip, cancelBooking, deleteTripById, getTripById} from "@/lib/appwrite";
import {useGlobalContext} from "@/lib/global-provider";

const Trip = () => {
    const {id} = useLocalSearchParams<{ id?: string }>();
    const {user} = useGlobalContext();


    const windowHeight = Dimensions.get("window").height;

    const {data: trip, refetch} = useAppwrite({
        fn: getTripById,
        params: {
            id: id!,
        },
    });

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
    };

    const deleteTrip = (tripId: string) => {
        Alert.alert(
            "Delete Trip",
            "Are you sure you want to delete this trip?",
            [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: async () => {
                        try {
                            await deleteTripById({id: tripId});
                            router.back();
                            Alert.alert("Success", `Trip "${trip?.name}" has been deleted.`);
                        } catch (error) {
                            Alert.alert("Error", "Failed to delete the trip. Please try again.");
                            console.error("Delete Trip Error:", error);
                        }
                    },
                },
            ],
            {cancelable: true}
        );
    };

    const bookTripNow = async (tripId: string) => {
        try {
            await bookTrip(tripId, user);
            Alert.alert(`You booked the trip "${trip?.name}"`);
            await refetch({id: tripId});
        } catch (error) {
            Alert.alert("Error", "Failed to book the trip. Please try again.");
            console.error("Book Trip Error:", error);
        }
    };

    const cancelTripBooking = async (tripId: string) => {
        const currentUserId = user!!.$id;
        try {
            await cancelBooking(tripId, currentUserId);
            Alert.alert(`You have canceled your booking for "${trip?.name}"`);
            await refetch({id: tripId});
        } catch (error) {
            Alert.alert("Error", "Failed to cancel the booking. Please try again.");
            console.error("Cancel Booking Error:", error);
        }
    };

    const isUserBooked = trip?.bookings?.includes(user?.$id || "");

    return (
        <View>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerClassName="pb-32 bg-white"
            >
                <View className="relative w-full" style={{height: windowHeight / 2}}>
                    <Image
                        source={{uri: trip?.image}}
                        className="size-full"
                        resizeMode="cover"
                    />
                    <Image
                        source={images.whiteGradient}
                        className="absolute top-0 w-full z-40"
                    />

                    <View
                        className="z-50 absolute inset-x-7"
                        style={{
                            top: Platform.OS === "ios" ? 70 : 20,
                        }}
                    >
                        <View className="flex flex-row items-center w-full justify-between">
                            <TouchableOpacity
                                onPress={() => router.back()}
                                className="flex flex-row bg-primary-200 rounded-full size-11 items-center justify-center"
                            >
                                <Image source={icons.backArrow} className="size-5"/>
                            </TouchableOpacity>

                            <View className="flex flex-row items-center gap-3">
                                <Image
                                    source={icons.heart}
                                    className="size-7"
                                    tintColor={"#191D31"}
                                />
                                <Image source={icons.send} className="size-7"/>
                            </View>
                        </View>
                    </View>
                </View>

                <View className="px-5 mt-7 flex gap-2">
                    <Text className="text-2xl font-rubik-extrabold">
                        {trip?.name}
                    </Text>
                    <View className="flex flex-row items-center gap-3">
                        <View className="flex flex-row items-center px-4 py-2 bg-primary-100 rounded-full">
                            <Text className="text-xs font-rubik-bold text-primary-300">
                                {trip?.difficulty}
                            </Text>
                        </View>

                        <View className="flex flex-row items-center gap-2">
                            <Image source={icons.star} className="size-5"/>
                            <Text className="text-black-200 text-sm mt-1 font-rubik-medium">
                                {trip?.rating} ({trip?.reviews.length} reviews)
                            </Text>
                        </View>

                        <View
                            className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.area} className="size-4"/>
                        </View>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            {trip?.distance}
                        </Text>
                    </View>

                    <View className="flex flex-row items-center mt-5">
                        <Text className="text-black-300 text-sm font-rubik-bold ml-2">Data:</Text>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            {formatDate(trip?.start)} - {formatDate(trip?.end)}
                        </Text>
                        <View
                            className="flex flex-row items-center justify-center bg-primary-100 rounded-full size-10 ml-7">
                            <Image source={icons.time} className="size-4"/>
                        </View>
                        <Text className="text-black-300 text-sm font-rubik-medium ml-2">
                            Duration
                        </Text>
                    </View>

                    <View className="w-full border-t border-primary-200 pt-7 mt-5">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Guide
                        </Text>

                        <View className="flex flex-row items-center justify-between mt-4">
                            <View className="flex flex-row items-center">
                                <Image
                                    source={{uri: trip?.guide.avatar}}
                                    className="size-14 rounded-full"
                                />

                                <View className="flex flex-col items-start justify-center ml-3">
                                    <Text className="text-lg text-black-300 text-start font-rubik-bold">
                                        {trip?.guide.name}
                                    </Text>
                                    <Text className="text-sm text-black-200 text-start font-rubik-medium">
                                        {trip?.guide.email}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex flex-row items-center gap-3">
                                <Image source={icons.chat} className="size-7"/>
                                <Image source={icons.phone} className="size-7"/>
                            </View>
                        </View>
                    </View>

                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Overview
                        </Text>
                        <Text className="text-black-200 text-base font-rubik mt-2">
                            {trip?.description}
                        </Text>
                    </View>

                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Required equipments
                        </Text>
                        <Text className="text-black-200 text-base font-rubik mt-2">
                            {trip?.equipments}
                        </Text>
                    </View>

                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Bookings
                        </Text>
                        {trip?.bookings?.length > 0 && (
                            <FlatList
                                data={JSON.parse(trip?.bookings) as {userId: string, avatar: string, userName: string}[]}
                                keyExtractor={(booking) => booking.userId}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <View>
                                        <Image
                                            source={{uri: item.avatar}}
                                            className="size-7 rounded-full mr-2"
                                        />
                                        <Text className="text-black-200 text-xs font-rubik mr-2">{item.userName}</Text>
                                    </View>
                                )}
                                contentContainerStyle={{paddingVertical: 10}}
                            />
                        )}
                    </View>

                    {trip?.gallery.length > 0 && (
                        <View className="mt-7">
                            <Text className="text-black-300 text-xl font-rubik-bold">
                                Gallery
                            </Text>
                            <FlatList
                                contentContainerStyle={{paddingRight: 20}}
                                data={trip?.gallery}
                                keyExtractor={(item) => item.$id}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                renderItem={({item}) => (
                                    <Image
                                        source={{uri: item.image}}
                                        className="size-40 rounded-xl"
                                    />
                                )}
                                contentContainerClassName="flex gap-4 mt-3"
                            />
                        </View>
                    )}

                    <View className="mt-7">
                        <Text className="text-black-300 text-xl font-rubik-bold">
                            Location
                        </Text>
                        <View className="flex flex-row items-center justify-start mt-4 gap-2">
                            <Image source={icons.location} className="w-7 h-7"/>
                            <Text className="text-black-200 text-sm font-rubik-medium">
                                {trip?.address}
                            </Text>
                        </View>

                        <Image
                            source={images.map}
                            className="h-52 w-full mt-5 rounded-xl"
                        />
                    </View>

                    {trip?.reviews.length > 0 && (
                        <View className="mt-7">
                            <View className="flex flex-row items-center justify-between">
                                <View className="flex flex-row items-center">
                                    <Image source={icons.star} className="size-6"/>
                                    <Text className="text-black-300 text-xl font-rubik-bold ml-2">
                                        {trip?.rating} ({trip?.reviews.length} reviews)
                                    </Text>
                                </View>

                                <TouchableOpacity>
                                    <Text className="text-primary-300 text-base font-rubik-bold">
                                        View All
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <View className="mt-5">
                                <Comment item={trip?.reviews[0]}/>
                            </View>
                        </View>
                    )}
                </View>
            </ScrollView>

            <View
                className="absolute bg-white bottom-0 w-full rounded-t-2xl border-t border-r border-l border-primary-200 p-7">
                <View className="flex flex-row items-center justify-between gap-10">
                    <View className="flex flex-col items-start">
                        <Text className="text-black-200 text-xs font-rubik-medium">
                            Price
                        </Text>
                        <Text
                            numberOfLines={1}
                            className="text-primary-300 text-start text-2xl font-rubik-bold"
                        >
                            zł{trip?.price}
                        </Text>
                    </View>

                    {(user?.$id === trip?.guide.id) ? (
                        <TouchableOpacity
                            onPress={() => deleteTrip(trip!!.$id)}
                            className="flex-1 flex flex-row items-center justify-center bg-red-500 py-3 rounded-full shadow-md shadow-zinc-400">
                            <Text className="text-white text-lg text-center font-rubik-bold">
                                Delete
                            </Text>
                        </TouchableOpacity>
                    ) : isUserBooked ? (
                        <TouchableOpacity
                            onPress={() => cancelTripBooking(trip!!.$id)}
                            className="flex-1 flex flex-row items-center justify-center bg-gray-500 py-3 rounded-full shadow-md shadow-zinc-400">
                            <Text className="text-white text-lg text-center font-rubik-bold">
                                Cancel Booking
                            </Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            onPress={() => bookTripNow(trip!!.$id)}
                            className="flex-1 flex flex-row items-center justify-center bg-primary-300 py-3 rounded-full shadow-md shadow-zinc-400">
                            <Text className="text-white text-lg text-center font-rubik-bold">
                                Book Now
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </View>
    );
};

export default Trip;