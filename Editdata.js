import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPenToSquare, faBuilding } from '@fortawesome/free-solid-svg-icons';

const Createdata = () => {
    const jsonUrl = 'http://192.168.100.13:3000/museum';
    const [Museum, setNamaMuseum] = useState('');
    const [Hari, setHariBuka] = useState('');
    const [Jam, setJamBuka] = useState('');
    const [Harga, setHargaTiket] = useState('');
    const [Rating, setRating] = useState('');

    const [selectedUser, setSelectedUser] = useState(null); // Untuk menyimpan user yang dipilih
    const [isLoading, setLoading] = useState(true);
    const [dataUser, setDataUser] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => {
                setDataUser(json);
            })
            .catch((error) => console.error(error))
            .finally(() => setLoading(false));
    }, []);

    const refreshPage = () => {
        setRefresh(true);
        fetch(jsonUrl)
            .then((response) => response.json())
            .then((json) => setDataUser(json))
            .catch((error) => console.error(error))
            .finally(() => setRefresh(false));
    };

    const selectItem = (item) => {
        setSelectedUser(item);
        setNamaMuseum(item["Museum"]);
        setHariBuka(item["Hari"]);
        setJamBuka(item["Jam"]);
        setHargaTiket(item["Harga"]);
        setRating(item["Rating"]);
    };

    // Fungsi untuk memformat harga tiket dengan simbol "Rp"
    const handleHargaChange = (value) => {
        const formattedValue = value.replace(/[^0-9Rp]/g, ''); // Menghapus karakter selain angka dan "Rp"
        if (formattedValue.startsWith('Rp')) {
            setHargaTiket(formattedValue); // Simpan nilai yang sudah diformat
        } else {
            setHargaTiket('Rp' + formattedValue); // Tambahkan simbol Rp jika belum ada
        }
    };

    const submit = () => {
        if (!selectedUser) {
            alert("Silakan pilih data museum terlebih dahulu untuk diedit!");
            return;
        }

        const data = {
            Museum: String(Museum),
            Hari: String(Hari),
            Jam: String(Jam),
            Harga: Harga.replace('Rp', '').replace('.', ''), // Menghapus simbol "Rp" dan titik sebelum disimpan
            Rating: parseFloat(Rating),
        };

        // Mengirim data untuk update
        fetch(`http://192.168.100.13:3000/museum/${selectedUser.id}`, {
            method: 'PATCH',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log('Response from server:', json);
                alert('Data updated');
                setNamaMuseum('');
                setHariBuka('');
                setJamBuka('');
                setHargaTiket('');
                setRating('');
                setSelectedUser(null); // Reset form after successful update
                refreshPage(); // Refresh the data list after editing
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Gagal memperbarui data');
            });
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={[styles.title, { color: '#FFFFE0' }]}>Edit Data Museum</Text>
                <ScrollView>
                    <TextInput style={styles.input} placeholder="Museum Name" value={Museum} onChangeText={(value) => setNamaMuseum(value)} />
                    <TextInput style={styles.input} placeholder="Opening Days" value={Hari} onChangeText={(value) => setHariBuka(value)} />
                    <TextInput style={styles.input} placeholder="Opening Hours" value={Jam} onChangeText={(value) => setJamBuka(value)} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Ticket Price (e.g. Rp10.000)" 
                        value={Harga} 
                        onChangeText={handleHargaChange} // Menggunakan handleHargaChange
                    />
                    <TextInput style={styles.input} placeholder="Rating" value={Rating} onChangeText={(value) => setRating(value)} />
                    {/* Tombol Edit menggunakan TouchableOpacity */}
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>Edit</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>

            <FlatList
                style={{ marginBottom: 10 }}
                data={dataUser}
                onRefresh={refreshPage}
                refreshing={refresh}
                keyExtractor={({ id }) => id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => selectItem(item)}>
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
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                <FontAwesomeIcon icon={faPenToSquare} size={30} />
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    );
};

export default Createdata;

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
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
        marginHorizontal: 20,
        marginVertical: 5,
        maxHeight: 160,
    },
    container: {
        paddingHorizontal: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: '#777',
        borderRadius: 8,
        padding: 10,
        width: '100%',
        marginVertical: 5,
    },
    button: {
        backgroundColor: '#000000',
        paddingVertical: 12,
        paddingHorizontal: 50,
        borderRadius: 8,
        marginVertical: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#FFFFE0', // Warna teks tombol Edit
        fontSize: 16,
        fontWeight: 'bold',
    },
});
