import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './types';

type WeatherScreenScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "WeatherForecast"
>;

interface WeatherResponse {
  current: any; 
  forecast: any; 
  weather: any;
}

interface WeatherData {
  description: string;
  temperature: number;
  wind_speed: number;
  humidity: number;
}

interface ForecastData {
  date: string;
  temp: number;
  weather: string;
}

const WeatherScreen = () => {
  const navigation = useNavigation<WeatherScreenScreenProp>();
  const [city, setCity] = useState("Colombo");
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  // List of available locations
  const locations = [
    { label: 'Colombo', value: 'Colombo' },
    { label: 'Galle', value: 'Galle' },
    { label: 'Matara', value: 'Matara' },
    { label: 'Negombo', value: 'Negombo' },
    { label: 'Kandy', value: 'Kandy' },
  ];

  // Function to fetch weather data including forecast
  const fetchWeatherData = async (city: string) => {
    try {
      const response = await axios.get<WeatherResponse>(`http://127.0.0.1:8000/WeatherForecast/weather/${city}/`);
      console.log('Full API Response:', response.data); // Log the full response
      
      if (response.status === 200) {
        const weather = response.data.weather.weather; // Nested structure: weather.weather
        const forecast = response.data.weather.forecast; // Nested structure: weather.forecast

        setWeatherData(weather);  // Update weather data state
        setForecastData(forecast);  // Update forecast data state
      } else {
        console.error('Error: Invalid response status');
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  // Function to determine the weather icon
  const getWeatherImage = (condition: string) => {
    console.log(condition);
    switch (condition) {
      case 'Sunny':
        return require('../assets/images/sunny.png');
      case 'Cloudy':
        return require('../assets/images/cloudy.png');
      case 'Partly Cloudy':
        return require('../assets/images/partly_cloudy.png');
      case 'Clear Day':
        return require('../assets/images/clear_day.png');
      case 'Heavy Showers':
        return require('../assets/images/heavy_showers.png');
      case 'Thunderstorm':
        return require('../assets/images/thunderstorm.png');
      default:
        return require('../assets/images/sunny.png');
    }
  };

  // Fetch weather data when the component mounts or city changes
  useEffect(() => {
    fetchWeatherData(city);
  }, [city]);
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Forecast</Text>
      </View>

      {/* Location Selector */}
      <View style={[styles.locationPicker]}>
        <Image source={require('../assets/images/weather_location.png')} style={styles.locationIcon} />
        <DropDownPicker
          open={open}
          value={city}
          items={locations}
          setOpen={setOpen}
          setValue={setCity}
          placeholder="Select Location"
          style={styles.dropdown}
          containerStyle={{ width: '100%' }}
        />
      </View>

      {/* Current Weather */}
      {weatherData ? (
        <View style={styles.weatherSection}>
          <Image source={getWeatherImage(weatherData.description)} style={styles.weatherImage} />
          <Text style={styles.date}>{`Today, ${new Date().toLocaleDateString()}`}</Text>
          <Text style={styles.temp}>{`${weatherData.temperature}°C`}</Text>
          <Text style={styles.condition}>{weatherData.description}</Text>
          <Text style={styles.details}>
      {`Wind: ${weatherData.wind_speed || 'Data not available'} km/h | Humidity: ${weatherData.humidity || 'Data not available'}%`}
    </Text>
  </View>
  ) : (
    <ActivityIndicator size="large" color="green" />
  )}

      {/* 7-Day Forecast */}
      {forecastData.length > 0 ? (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.forecastContainer}>
          {forecastData.map((day, index) => (
            <View key={index} style={styles.forecastItem}>
              <Text style={styles.forecastDate}>{new Date(day.date).toLocaleDateString()}</Text>
              <Image source={getWeatherImage(day.weather)} style={styles.forecastImage} />
              <Text style={styles.forecastTemp}>{`${day.temp}°C`}</Text>
            </View>
          ))}
        </ScrollView>
      ) : (
        <ActivityIndicator size="large" color="green" />
      )}

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image source={require("../assets/images/home-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate("DiseaseIdentification2")} >
          <Image source={require("../assets/images/disease-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate("PersonalTrackerMain")}>
          <Image source={require("../assets/images/finance-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
      
        <TouchableOpacity onPress={() => navigation.navigate("MarketPrice1")}>
          <Image source={require("../assets/images/profile-icon.png")} style={styles.footerIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0FFF0',
  },
  header: {
    fontSize: 24,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  backButton: { 
    marginRight: 10,
    borderColor: "#DDD", 
    borderWidth: 2, 
    borderRadius: 15, 
    paddingLeft: 13, 
    paddingRight: 15,
    paddingBottom: 5, 
    textAlign: "center" 
  },
    backText: { 
    fontSize: 25, 
    fontWeight: "bold" 
  },
    headerTitle: { 
    fontSize: 20, 
    fontWeight: "bold", 
    flex: 1, 
    paddingLeft: 50 
  },
  locationIcon: {
    width: 20, 
    height: 24,
    marginRight: 10,
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 15,  
    marginVertical: 10,
    width: '50%',
    alignSelf: 'center',
    height: 'auto',
    position: 'relative',  
    zIndex: 10,
  },
  dropdown: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 10,
    width: '100%',  
    borderColor: '#ddd',  
    borderWidth: 1,  
    maxHeight: 500,
    zIndex: 10,
    position: 'absolute',
    top: -25, 
  },
  weatherSection: {
    backgroundColor: '#F0FFF0',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 5,
  },
  weatherImage: {
    width: 200,
    height: 220,
  },
  date: {
    fontSize: 18,
    marginVertical: 5,
  },
  temp: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  condition: {
    fontSize: 16,
    color: '#888',
  },
  details: {
    fontSize: 18,
    color: '#555',
    marginTop: 5,
  },
  forecastScroll: {
    marginTop: 20,
  },
  forecastContainer: {
    flexDirection: 'row', // Ensure items are aligned horizontally
    alignItems: 'center', // Align items vertically to the center
    paddingLeft: 10, // Add padding to the left
  },
  forecastItem: {
    width: 120, // Set width for each item
    height: 150, // Set height for each item
    marginRight: 10, // Add space between forecast items
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  forecastDate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  forecastImage: {
    width: 50, // Size of the icon
    height: 50, // Size of the icon
    marginBottom: 10, // Space between the image and temperature
  },
  forecastTemp: {
    fontSize: 16,
    color: '#000',
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 15,
    backgroundColor: "#E0F8E0",
    borderTopWidth: 1,
    borderTopColor: "#d3d3d3",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#DFFFD8",
    position: "absolute",
    width: "90%",
    bottom: 15,
    alignSelf: "center",
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default WeatherScreen;
