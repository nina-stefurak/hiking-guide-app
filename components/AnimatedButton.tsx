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
    },
})

export default CustomButton;