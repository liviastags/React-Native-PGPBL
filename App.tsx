import React from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, View, Image, Linking } from 'react-native';

type SectionProps = {
  title: string;
  children: React.ReactNode;
};

function Section({ children, title }: SectionProps): React.JSX.Element {
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <Text style={styles.sectionDescription}>{children}</Text>
    </View>
  );
}

function LearMoreLink() {
  return (
    <View style={styles.linkContainer}>
      <Text
        style={styles.linkText}
        onPress={() => Linking.openURL('https://wkmdisbuddiy.jogjaprov.go.id/museum')}
      >
        Museum Lists
      </Text>
    </View>
  );
}

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://media.suara.com/pictures/653x366/2022/11/01/86848-ilustrasi-museum-terbaik-di-jogja-unsplashfakhri-labib.webp' }}
          style={styles.headerImage}
        />
        <Text style={styles.headerText}>
           Muse in Yogyakarta
        </Text>
      </View>
      {/* Content */}
      <ScrollView contentInsetAdjustmentBehavior="automatic" style={styles.scrollView}>
        <View style={styles.contentContainer}>
          <Section title="Discover Yogyakarta's Museums">
            Yogyakarta is home to a rich cultural heritage, with numerous museums showcasing Indonesia's history, art, and culture. This app helps you
            easily discover museum details such as opening hours, ticket prices, and collections available, making it easier for visitors to plan
            their trips.
          </Section>
          <Section title="Explore Yogyakarta's Cultural Heritage">
            Yogyakarta is home to numerous museums that showcase its rich cultural and historical legacy. Visitors can explore a variety of collections,
            from traditional art and artifacts that reflect Javanese heritage to exhibitions featuring historical figures and their contributions.
          </Section>
          <Section title="Detail About The Museums">
          <LearMoreLink />
          </Section>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#4A6C76', // Biru tua dengan campuran abu-abu
  },
  scrollView: {
    backgroundColor: '#f4f4f4', // Abu-abu muda sebagai latar belakang utama
  },
  header: {
    backgroundColor: '#2E3D3C', // Warna abu-abu gelap untuk header
    padding: 16,
    flexDirection: 'column', // Atur ke column untuk menempatkan teks di bawah gambar
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 16, // Memberi jarak antara gambar dan teks
  },
  headerText: {
    fontSize: 36, // Ukuran font lebih besar
    fontWeight: 'bold',
    color: '#FFFFE0', // Warna putih
    textAlign: 'center', // Teks rata tengah
    fontFamily: 'Lobster-Regular', // Nama font kustom (pastikan font sudah diatur)
  },

  contentContainer: {
    padding: 20,
    backgroundColor: '#f4f4f4', // Abu-abu muda untuk membuat tampilan lebih cerah
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionContainer: {
    marginTop: 20,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2E3D3C', // Warna abu-abu gelap untuk judul
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '400',
    color: '#4A6C76', // Warna biru tua untuk deskripsi
  },
  linkContainer: {
    alignItems: 'center',
    marginTop: 20, // Memberikan jarak antara konten dan link
    paddingVertical: 10,
  },
  linkText: {
    color: '#1E90FF', // Biru terang untuk teks link
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline', // Menambahkan garis bawah untuk link
    textAlign: 'center', // Menyelaraskan teks ke tengah
  }
});

export default App;
