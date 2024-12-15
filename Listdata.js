import { View, Text, StyleSheet, TouchableOpacity, FlatList, Button, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

const Listdata = () => {
  const jsonUrl = 'http://192.168.100.13:3000/museum';
  const [isLoading, setLoading] = useState(true);
  const [dataUser, setDataUser] = useState([]); // Initialize as an array
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json); // Update with the fetched data
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  function refreshPage() {
    fetch(jsonUrl)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDataUser(json);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }

  function deleteData(id) {
    fetch(jsonUrl + '/' + id, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        alert('Data terhapus');
        // Update state to remove the deleted item from the UI
        setDataUser(prevData => prevData.filter(item => item.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting data:', error);
      });
  }

  return (
    <SafeAreaView>
      {isLoading ? (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
          <Text style={styles.cardtitle}>Loading...</Text>
        </View>
      ) : (
        <View>
          <FlatList
            style={{ marginBottom: 10 }}
            data={dataUser} // Use dataUser here instead of Datamuseum
            onRefresh={refreshPage}
            refreshing={refresh}
            keyExtractor={(item) => item.id ? item.id.toString() : String(item)}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity>
                  <View style={styles.card}>
                    <View style={styles.avatar}>
                      <FontAwesomeIcon icon={faBuilding} size={70} />
                    </View>
                    <View>
                      <Text style={[styles.cardtitle, { color: '#FFFFE0' }]}>{item["Museum"]}</Text>
                      <Text style={styles.cardText}>Hari Buka: {item["Hari"]}</Text>
                      <Text style={styles.cardText}>Jam Buka: {item["Jam"]}</Text>
                      <Text style={styles.cardText}>Harga Tiket: {item["Harga"]}</Text>
                      <Text style={styles.cardText}>Rating: {item["Rating"]}</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }} />
                  </View>
                </TouchableOpacity>
                <View style={styles.form}>
                  {/* Custom Delete button with styled text */}
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() =>
                      Alert.alert('Delete Data', 'Want to delete this data?', [
                        { text: 'No', onPress: () => console.log('button delete') },
                        { text: 'Yes', onPress: () => deleteData(item.id) },
                      ])
                    }
                  >
                    <Text style={styles.deleteButtonText}>Delete</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Listdata;

const styles = StyleSheet.create({
  title: {
    paddingVertical: 12,
    backgroundColor: '#4A6C76',
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  avatar: {
    borderRadius: 100,
    width: 80,
    marginRight: 10,
  },
  cardtitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#FFFFE0',
    marginBottom: 2,
  },
  cardText: {
    color: '#FFFFE0',
    fontSize: 12,
    marginBottom: 1,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#4A6C76',
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,
    elevation: 2,
    marginHorizontal: 20,
    marginVertical: 5, // Reduce marginVertical to reduce gap between cards
    maxHeight: 160,
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10, // Reduce paddingBottom for less space
  },
  deleteButton: {
    backgroundColor: '#000000',
    paddingVertical: 10, // Reduce padding to make the button smaller
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 5, // Reduce marginVertical to make the gap smaller between buttons
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#FFFFE0',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
