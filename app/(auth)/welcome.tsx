//onboarding
import { Text, StatusBar, } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

const Onboarding = () => {
    // @ts-ignore
    return (
        // <Text>Onboarding</Text>
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <Text>Open up App.js to start working on your app!</Text>

        </SafeAreaView>
    );
};

export default Onboarding;