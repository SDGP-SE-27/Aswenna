import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import DropDownPicker from 'react-native-dropdown-picker';

interface WeatherResponse {
  current: any; // Define the type of current property
  forecast: any; // Define the type of forecast property
  weather: any;
}

interface WeatherData {
  condition: string;
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
  const [city, setCity] = useState("Colombo");
  const [weatherData, setWeatherData] = useState(null);
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

  // Function to fetch weather data
  const fetchWeatherData = async (city: string) => {
    try {
      const response = await axios.get<WeatherResponse>(`http://127.0.0.1:8000/WeatherForecast/weather/${city}/`);
      console.log('API Response:', response.data); // Log the full response
      if (response.status === 200) {
        setWeatherData(response.data.weather); // Assuming 'weather' is the key in response
      } else {
        console.error('Error: Invalid response status');
      }
    } catch (error) {
      console.error("Error fetching weather data:");
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
        <TouchableOpacity style={styles.backButton}>
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
      {weatherData && (
        <View style={styles.weatherSection}>
          <Image source={getWeatherImage((weatherData as WeatherData).condition)} style={styles.weatherImage} />
          <Text style={styles.date}>{`Today, ${new Date().toLocaleDateString()}`}</Text>
          <Text style={styles.temp}>{`${((weatherData as WeatherData).temperature)}°C`}</Text>
          <Text style={styles.condition}>{((weatherData as WeatherData).condition)}</Text>
          <Text style={styles.details}>{`Wind: ${((weatherData as WeatherData).wind_speed ?? 'Data not available')} km/h | Humidity: ${((weatherData as WeatherData).humidity)}%`}</Text>
        </View>
      )}

      {/* 7-Day Forecast */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {forecastData.map((day, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.forecastDate}>{day.date}</Text>
            <Image source={getWeatherImage(day.weather)} style={styles.forecastImage} />
            <Text style={styles.forecastTemp}>{`${day.temp}°C`}</Text>
          </View>
        ))}
      </ScrollView>
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
    marginBottom: 20,
  },
  weatherImage: {
    width: 150,
    height: 170,
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
  forecastItem: {
    marginHorizontal: 10,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  forecastDate: {
    fontSize: 14,
    marginBottom: 5,
  },
  forecastImage: {
    width: 50,
    height: 50,
  },
  forecastTemp: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WeatherScreen;
