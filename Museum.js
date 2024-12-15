import React from 'react'
import Datamuseum from "./data/museum.json" // Ganti dengan path file JSON yang sesuai
import { FlatList, Text, View, TouchableOpacity, Linking, StyleSheet } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faBuilding } from '@fortawesome/free-solid-svg-icons'

const Museum = () => {
    return (
        <FlatList
            data={Datamuseum}
            renderItem={({ item }) => (
                <TouchableOpacity
                    onPress={() =>
                        Linking.openURL('google.navigation:q=' + item.latitude + ',' + item.longitude)} >
                    <View style={styles.card}>
                        <View>
                            {/* Menambahkan icon gedung */}
                            <FontAwesomeIcon icon={faBuilding} size={50} />
                        </View>
                        <View>
                            {/* Menampilkan informasi museum */}
                            <Text style={styles.cardtitle}>{item["Museum"]}</Text>
                            <Text>Opening Days: {item["Hari"]}</Text>
                            <Text>Opening Hours: {item["Jam"]}</Text>
                            <Text>Price: {item["Harga"]}</Text>
                            <Text>Rating: {item["Rating"]}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )}
        />
    );
};

export default Museum;

const styles = StyleSheet.create({
    cardtitle: {
      fontSize: 18,
      fontWeight: 'bold',
    },
    card: {
      flexDirection: 'row',
      padding: 20,
      borderRadius: 10,
      backgroundColor: 'white',
      shadowColor: '#000',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
      marginHorizontal: 20,
      marginVertical: 7
    },
});
