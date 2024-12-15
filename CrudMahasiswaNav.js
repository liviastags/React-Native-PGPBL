import * as React from 'react';
import { Text, View, TouchableOpacity, Image, ImageBackground, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faPlusCircle, faBuilding, faPen, faMap, faLandmark } from '@fortawesome/free-solid-svg-icons';
import Createdata from './Createdata'; // Untuk menambah museum
import Datamuseum from './Listdata'; // Untuk menampilkan daftar museum
import Editdata from './Editdata'; // Untuk mengedit data museum
import WebView from 'react-native-webview';
import Profile from './App';

// Landing Page Component
function LandingPage({ onGetStarted }) {
  return (
    <ImageBackground
      source={{
        uri: 'https://i.pinimg.com/1200x/91/c3/6a/91c36a118a36abe03158ea0015704bcd.jpg',
      }}
      style={styles.landingContainer}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://img.okezone.com/content/2023/11/15/406/2920513/mengandung-unsur-magis-dan-simbolis-begini-sejarah-pendirian-tugu-jogja-7dq0yci2o4.JPG' }}
          style={styles.logo}
        />
        <Text style={styles.landingTitle}>
          Welcome to Muse in Yogyakarta
        </Text>
        <Text style={styles.landingSubtitle}>
          Explore, learn, and manage the cultural heritage data from various museums with ease.
        </Text>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={onGetStarted}
        >
          <Text style={styles.getStartedButtonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

function HomeScreen() {
  return <Profile />;
}

function DataMuseumScreen() {
  return <Datamuseum />;  // Menggunakan komponen Listdata untuk menampilkan daftar museum
}

function CreateMuseumScreen() {
  return <Createdata />; // Menambah museum baru
}

function EditScreen() {
  return <Editdata />;  // Untuk mengedit data museum
}

function LayarWeb() {
  return (
    <WebView
      source={{ uri: 'https://leaflet-ionic6.vercel.app/home' }}
    />
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLandingPageVisible, setLandingPageVisible] = React.useState(true);

  const handleGetStarted = () => {
    setLandingPageVisible(false);
  };

  return (
    <NavigationContainer>
      {isLandingPageVisible ? (
        <LandingPage onGetStarted={handleGetStarted} />
      ) : (
        <Tab.Navigator>
          <Tab.Screen
            name="About"
            component={HomeScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faLandmark} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Add Museum"
            component={CreateMuseumScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faPlusCircle} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Data Museum"
            component={DataMuseumScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faBuilding} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Edit Museum"
            component={EditScreen}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faPen} color={color} size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Map"
            component={LayarWeb}
            options={{
              headerShown: false,
              tabBarIcon: ({ color }) => (
                <FontAwesomeIcon icon={faMap} color={color} size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  landingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  card: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 15,
  },
  landingTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A6C76',
    marginBottom: 10,
    textAlign: 'center',
  },
  landingSubtitle: {
    fontSize: 14,
    color: '#4A6C76',
    textAlign: 'center',
    marginBottom: 20,
  },
  getStartedButton: {
    backgroundColor: '#4A6C76',
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 30,
  },
  getStartedButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
