import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import yelp from '../api/yelp';

const ResultsShowScreen = ({ navigation }) => {
    const [result, setResult] = useState(null);
    const id = navigation.getParam('id');

    const getResult = async (id) => {
        const response = await yelp.get(`/${id}`);
        setResult(response.data);
    };

    useEffect(() => {
        getResult(id);
    }, []);

    if (!result) {
        return null;
    }

    const getHeader = () => {
        return (
            <View>
            <Text style={styles.text} >{result.name}</Text>
            <Text style={styles.moreText}>Phone: {result.display_phone}</Text>
            <Text style={styles.moreText}>Reviews: {result.review_count}</Text>
            <Text style={styles.moreText}>Rating: {result.rating}</Text>
            <Text style={styles.moreText}>Address: {result.location.address1}, {result.location.address2}</Text>
            <Text style={styles.moreText}>{result.location.city}, {result.location.state} {result.location.zip_code}</Text>
            </View>
        );
    };

    return (
        <View>
            <FlatList
            data={result.photos}
            keyExtractor={(photo) => photo}
            renderItem={({ item }) => {
                return <Image style={styles.image} source={{ uri: item }}/>
            }}
            ListHeaderComponent={getHeader}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    text: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    moreText:{
        fontSize: 20
    },
    image: {
        height: 200,
        width: 300,
        alignSelf: 'center',
        marginVertical: 10
    }
});

export default ResultsShowScreen;