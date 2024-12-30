import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import auth from '@react-native-firebase/auth';

export default function ProfileScreen() {
    const handleSignOut = async () => {
        try {
            await auth().signOut();
            console.log('User signed out successfully!');
        } catch (error) {
            console.error('Sign out error:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={handleSignOut}>
                <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: '#247991',
        padding: 10,
        borderRadius: 5,
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

