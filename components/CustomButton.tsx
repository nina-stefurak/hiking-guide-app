import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import {router} from "expo-router";

const CustomButton = () => (
    <FAB
        icon="plus"
        style={styles.fab}
        onPress={()=> router.push("/trips/create")}
    />
);

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 24,
        right: 0,
        bottom: 50,
        backgroundColor: "#D4E8F0",
        opacity: 0.9,
    },
})

export default CustomButton;