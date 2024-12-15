import React, { useState } from 'react';
import { SafeAreaView, View, ScrollView, TextInput, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Createdata = () => {
    const jsonUrl = 'http://192.168.100.13:3000/museum';
    const [Museum, setNamaMuseum] = useState('');
    const [Hari, setHariBuka] = useState('');
    const [Jam, setJamBuka] = useState('');
    const [Harga, setHargaTiket] = useState('');
    const [Rating, setRating] = useState('');

    const handleHargaChange = (value) => {
        // Menghapus karakter selain angka dan "Rp"
        const formattedValue = value.replace(/[^0-9Rp]/g, '');
        if (formattedValue.startsWith('Rp')) {
            setHargaTiket(formattedValue); // Simpan nilai yang sudah diformat
        } else {
            setHargaTiket('Rp' + formattedValue); // Tambahkan simbol Rp jika tidak ada
        }
    };

    const submit = () => {
        const data = {
            Museum: String(Museum),
            Hari: String(Hari),
            Jam: String(Jam),
            Harga: Harga.replace('Rp', '').replace('.', ''), // Menghapus simbol "Rp" dan titik sebelum disimpan
            Rating: parseFloat(Rating),
        };

        fetch(jsonUrl, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                alert('Data saved');
                setNamaMuseum('');
                setHariBuka('');
                setJamBuka('');
                setHargaTiket('');
                setRating('');
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Terjadi kesalahan saat menyimpan data.');
            });
    };

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={[styles.title, { color: '#FFFFE0' }]}>Add Data Museum</Text>
                <ScrollView>
                    <TextInput
                        style={styles.input}
                        placeholder="Museum Name"
                        value={Museum}
                        onChangeText={(value) => setNamaMuseum(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Opening Days"
                        value={Hari}
                        onChangeText={(value) => setHariBuka(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Opening Hours"
                        value={Jam}
                        onChangeText={(value) => setJamBuka(value)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Ticket Price (e.g. Rp10.000)"
                        value={Harga}
                        onChangeText={handleHargaChange}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Rating"
                        value={Rating}
                        onChangeText={(value) => setRating(value)}
                        keyboardType="numeric"
                    />
                    {/* Menggunakan TouchableOpacity agar teks bisa diberi warna */}
                    <TouchableOpacity style={styles.button} onPress={submit}>
                        <Text style={styles.buttonText}>Add</Text>
                    </TouchableOpacity>
                </ScrollView>
            </View>
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
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
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
        color: '#FFFFE0', // Warna teks yang diinginkan
        fontSize: 16,
        fontWeight: 'bold',
    },
});
