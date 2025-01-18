import {Text, ScrollView, TouchableOpacity} from 'react-native'
import React, {useState} from 'react'
import {router, useLocalSearchParams} from "expo-router";
import {difficulties} from "@/constants/data";

const Filters = () => {
    const params = useLocalSearchParams<{filter?: string}>();
    const [selectedDifficulty, setSelectedDifficulty] = useState(params.filter || 'All')

    const handleDifficulty = (difficulty: string)=> {
        if (selectedDifficulty === difficulty) {
            setSelectedDifficulty('All');
            router.setParams({filter: 'All'});
            return;
        }

        setSelectedDifficulty(difficulty);
        router.setParams({ filter: difficulty });
    };


    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-3 mb-2">
            {difficulties.map((item, index) => (
                <TouchableOpacity
                    onPress={() => handleDifficulty(item.difficulty)}
                    key={index}
                    className={`flex flex-col items-start mr-4 px-4 py-2 rounded-full ${
                        selectedDifficulty === item.difficulty
                            ? "bg-primary-300"
                            : "bg-primary-100 border border-primary-200"
                    }`}
                >
                    <Text className={`text-sm ${selectedDifficulty === item.difficulty ? 'text-white font-rubik-bold mt-0.5' : 'text-black-300 font-rubik'}`}>{item.title}</Text>
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
};
export default Filters

