
import React from 'react'
import MapView, {PROVIDER_DEFAULT, PROVIDER_GOOGLE} from "react-native-maps";
import {View} from "react-native";

const Map = () => {
    return (
        <View style={{ width: '100%', height: '100%', borderRadius: 20, overflow: 'hidden' }}>
            <MapView
                provider={PROVIDER_GOOGLE}
                style={{ width: '100%', height: '100%' }}
                initialRegion={{
                    latitude: 49.2992,
                    longitude: 19.9496,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            />
        </View>
    );
};

export default Map;
