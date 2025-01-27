import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import axios from "axios";

const API_KEY = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
const BASE_URL = "https://api.openweathermap.org/data/2.5";

const WeatherForecasting = () => {
  const [currentWeather, setCurrentWeather]: any = useState(null);
  const [forecast, setForecast]: any = useState([]);
  const [loading, setLoading]: any = useState(true);

  // Fetch weather data
  const fetchWeatherData = async () => {
    try {
      const location = "Colombo"; // You can make it dynamic or use device location
      const response: any = await axios.get(
        `${BASE_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
      setCurrentWeather(response.data);

      const forecastResponse: any = await axios.get(
        `${BASE_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`
      );
      setForecast(forecastResponse.data.list.slice(0, 5)); // Get next 5 forecasts
      setLoading(false);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Loading weather data...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome5 name="arrow-left" size={20} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Weather Forecasting</Text>
      </View>

      {/* Location */}
      <View style={styles.locationContainer}>
        <FontAwesome5 name="map-marker-alt" size={18} color="black" />
        <Text style={styles.locationText}>
          {currentWeather.name}, {currentWeather.sys.country}
        </Text>
      </View>

      {/* Weather Today */}
      <View style={styles.weatherToday}>
        <Image
          source={{
            uri: `http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@4x.png`,
          }}
          style={styles.weatherIcon}
        />
        <View style={styles.weatherDetails}>
          <Text style={styles.date}>Today</Text>
          <Text style={styles.temperature}>
            {Math.round(currentWeather.main.temp)}°
          </Text>
          <Text style={styles.weatherType}>
            {currentWeather.weather[0].description}
          </Text>
          <View style={styles.weatherInfo}>
            <Text style={styles.infoText}>
              Wind | {currentWeather.wind.speed} km/h
            </Text>
            <Text style={styles.infoText}>
              Hum | {currentWeather.main.humidity}%
            </Text>
          </View>
        </View>
      </View>

      {/* Next Forecast */}
      <Text style={styles.nextForecastTitle}>Next Forecast</Text>
      <View style={styles.forecastContainer}>
        {forecast.map((item, index)=> (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.forecastDay}>
              {new Date(item.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </Text>
            <Image
              source={{
                uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}.png`,
              }}
              style={styles.forecastIcon}
            />
            <Text style={styles.forecastTemp}>
              {Math.round(item.main.temp)}°
            </Text>
          </View>
        ))}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/home.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/disease_navbar.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/price_navbar.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image
              source={require("../assets/icons/profile.png")}
              style={styles.navIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 16 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 8,
  },
  headerTitle: { fontSize: 20, fontWeight: "bold", marginLeft: 8 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  locationText: { marginLeft: 8, fontSize: 16 },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Optional: Set a background color
  },  
  weatherToday: {
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 16,
    borderRadius: 12,
  },
  weatherIcon: { width: 100, height: 100 },
  weatherDetails: { alignItems: "center", marginTop: 8 },
  date: { fontSize: 16, color: "#555" },
  temperature: { fontSize: 48, fontWeight: "bold", marginVertical: 8 },
  weatherType: { fontSize: 20, fontWeight: "600" },
  weatherInfo: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  infoText: { fontSize: 14, color: "#555" },
  nextForecastTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  forecastContainer: {
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    padding: 16,
  },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  forecastDay: { fontSize: 16 },
  forecastIcon: { width: 30, height: 30 },
  forecastTemp: { fontSize: 16, fontWeight: "bold" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    backgroundColor: "#f8f8f8",
    borderRadius: 16,
    marginTop: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // for Android shadow
  },
  navIcon: {
    width: 28,
    height: 28,
    marginBottom: 4,
  },
  navLabel: {
    fontSize: 12,
    textAlign: "center",
    color: "#555",
  },
});

export default WeatherForecasting;
