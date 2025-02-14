import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

interface WeatherData {
  temp: number;
  humidity: number;
  description: string;
  wind_speed: number;
  city: string;
}

interface WeatherResponse {
  weather: WeatherData[];
}

interface ForecastData {
  date: string;
  temp: number;
  weather: string;
}

const WeatherScreen = () => {
  const [location, setLocation] = useState<string>('Colombo');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null); // weatherData can be WeatherData or null
  const [forecastData, setForecastData] = useState<ForecastData[]>([]); // forecastData is an array of ForecastData

  useEffect(() => {
      fetchWeatherData(location);
      fetchForecastData(location);
  }, [location]);  // fetch data whenever location changes

  const fetchWeatherData = async (city: string) => {
    try {
      const response = await axios.get<WeatherResponse>(`http://127.0.0.1:8000/WeatherForecast/weather/${city}`, {
        headers: { 'Cache-Control': 'no-cache'},
      });
      const weatherData = response.data.weather[0];  // Get the first item in the array

    // Ensure we have valid data and set it to the state
      if (weatherData) {
        setWeatherData(weatherData);
      } else {
        console.error('No weather data found');
      }
    } catch (error) {
      console.error('Error fetching weather data', error);
    }
  };

  const fetchForecastData = async (city: string) => {
    try {
      const response = await axios.get<ForecastData[]>(`http://127.0.0.1:8000/WeatherForecast/forecast/${city}`, {
        headers: { 'Cache-Control': 'no-cache'},
      });
      setForecastData(response.data);
    } catch (error) {
      console.error('Error fetching forecast data', error);
    }
  };

  const renderWeatherImage = (description: string) => {
    switch (description) {
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

  return (

     <View style={styles.container}>
      {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton}>
              <Text style={styles.backText}>{"<"}</Text>
          </TouchableOpacity>
              <Text style={styles.headerTitle}>Weather Forecast</Text>
      </View>

      {/* Location Dropdown */}
      <View style={[styles.locationPicker]}>
        <TouchableOpacity onPress={() => {}}>
          <Image source={require('../assets/images/weather_location.png')} style={styles.locationIcon} />
        </TouchableOpacity>

        {/* Picker Dropdown for Locations */}
        <Picker
          selectedValue={location}
          onValueChange={(itemValue) => setLocation(itemValue)}
          style={styles.pickerDropdown}
        >
          <Picker.Item label="Colombo" value="Colombo" />
          <Picker.Item label="Gampaha" value="Gampaha" />
          <Picker.Item label="Kalutara" value="Kalutara" />
          <Picker.Item label="Negombo" value="Negombo" />
          <Picker.Item label="Galle" value="Galle" />
          <Picker.Item label="Hambantota" value="Hambantota" />
          <Picker.Item label="Ambalangoda" value="Ambalangoda"/>
          {/* Add more locations here */}
        </Picker>

      </View>

      {/* Weather Image */}
      {weatherData?.description &&(
        <Image
          source={renderWeatherImage(weatherData.description)}
          style={styles.weatherImage}
        />
      )}

      {/* Today's Weather Info */}
      {weatherData && (
        <View style={styles.weatherInfo}>
          <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
          <Text style={styles.temp}>{weatherData?.temp}°C</Text>
          <Text style={styles.wind}>Wind: {weatherData.wind_speed} km/h</Text>
          <Text style={styles.humidity}>Humidity: {weatherData.humidity}%</Text>
        </View>
      )}

      {/* 7-Day Forecast */}
      {forecastData.length > 0 && (
        <FlatList
          data={forecastData}
          keyExtractor={(item: ForecastData) => item.date}
          renderItem={({ item }) => (
            <View style={styles.forecastItem}>
              <Text>{item.date}</Text>
              <Image
                source={renderWeatherImage(item.weather)}
                style={styles.forecastImage}
              />
              <Text>{item.temp}°C</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#F0FFF0"
  },
  header: {
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
  label: {
    fontSize: 18,
    marginVertical: 10,
  },
  locationIcon: {
    width: 14, 
    height: 18,
    marginRight: 10
  },
  locationPicker: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', 
    borderColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 15,
    width: 220,  
    marginVertical: 10,
    paddingLeft: 200
  },
  pickerDropdown: {
    flex: 1,
  },
  weatherImage: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginVertical: 20,
  },
  weatherInfo: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#555',
  },
  temp: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  wind: {
    fontSize: 16,
    color: '#555',
  },
  humidity: {
    fontSize: 16,
    color: '#555',
  },
  forecastItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  forecastImage: {
    width: 40,
    height: 40,
  },
});

export default WeatherScreen;
