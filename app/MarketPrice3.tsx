import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { LineChart as RNLineChart } from "react-native-chart-kit";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import {
  LineChart,
  CartesianGrid,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import axios from "axios";

type MarketPrice3ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MarketPrice3"
>;

interface PriceEntry {
  date: string; // e.g., "2024-01"
  retail_price: number;
  predicted_price: number;
}

const MarketPrice3 = () => {
  const navigation = useNavigation<MarketPrice3ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "MarketPrice3">>();
  const cropName = route.params?.cropName; // Optional chaining to avoid undefined error
  console.log("Received params:", route.params);
  console.log(cropName);
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("prices");
  const formattedCropName = String(cropName);
  const nameMapping = {
    long_beans: "Long Beans",
    bitter_gourd: "Bitter Gourd",
    snake_gourd: "Snake Gourd",
    brinjals: "Brinjals",
    lady_finger_okra: "Lady Finger Okra",
    pineapple: "Pineapple",
    papaya: "Papaya",
  };
  const [lastYear, setLastYear] = useState<PriceEntry[]>([]);
  const [lastThreeYears, setLastThreeYears] = useState<PriceEntry[]>([]);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:8000/marketPrice/${encodeURIComponent(
          formattedCropName
        )}/`
      ) // Replace with your actual API endpoint
      .then((response) => {
        setPrices(response.data.prices); // Extract the "prices" array
        // console.log("Data fetched:", response.data.prices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, [formattedCropName]);

  useEffect(() => {
    setFiltering();
  }, [prices]);

  const setFiltering = () => {
    if (!prices.length) return;

    const currentDate = new Date(); // Get today's date

    // Convert string dates to Date objects and filter
    const filteredLastYear = prices.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diffInMonths =
        (currentDate.getFullYear() - entryDate.getFullYear()) * 12 +
        (currentDate.getMonth() - entryDate.getMonth());
      return diffInMonths >= 0 && diffInMonths < 12;
    });

    const filteredLastThreeYears = prices.filter((entry) => {
      const entryDate = new Date(entry.date);
      const diffInMonths =
        (currentDate.getFullYear() - entryDate.getFullYear()) * 12 +
        (currentDate.getMonth() - entryDate.getMonth());
      return diffInMonths >= 0 && diffInMonths < 36;
    });

    setLastYear(filteredLastYear);
    setLastThreeYears(filteredLastThreeYears);
    console.log("Data has been filtered");
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const getSelectedData = () => {
    switch (selectedView) {
      case "lastYear":
        return lastYear;
      case "lastThreeYears":
        return lastThreeYears;
      default:
        return prices;
    }
  };

  const getCurrentAndLastMonthPrices = () => {
    if (!prices.length)
      return { currentMonthPrice: null, lastMonthPrice: null };

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1; // JS months are 0-based

    const lastMonthYear = currentMonth === 1 ? currentYear - 1 : currentYear;
    const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;

    // Convert to "YYYY-MM" format for comparison
    const currentMonthStr = `${currentYear}-${String(currentMonth).padStart(
      2,
      "0"
    )}`;
    const lastMonthStr = `${lastMonthYear}-${String(lastMonth).padStart(
      2,
      "0"
    )}`;

    const currentMonthEntry = prices.find((entry) =>
      entry.date.startsWith(currentMonthStr)
    );
    const lastMonthEntry = prices.find((entry) =>
      entry.date.startsWith(lastMonthStr)
    );

    return {
      currentMonthPrice: currentMonthEntry?.retail_price || null,
      lastMonthPrice: lastMonthEntry?.retail_price || null,
    };
  };

  const { currentMonthPrice, lastMonthPrice } = getCurrentAndLastMonthPrices();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketPrice2")}
      ></TouchableOpacity>

      {/* Product Information */}
      <View>
        <Text style={styles.productName}>
          {nameMapping[formattedCropName as keyof typeof nameMapping]}
        </Text>
      </View>

      <View style={styles.productInfo}>
        <Text style={styles.priceText}>
          This Month's Price ={" "}
          {currentMonthPrice ? `${currentMonthPrice} LKR` : "N/A"}
        </Text>
        <Text style={styles.priceText}>
          Last Month's Price ={" "}
          {lastMonthPrice ? `${lastMonthPrice} LKR` : "N/A"}
        </Text>
        <Text style={styles.priceText}>
          Price Difference ={" "}
          {currentMonthPrice && lastMonthPrice
            ? `${(currentMonthPrice - lastMonthPrice).toFixed(2)} LKR`
            : "N/A"}
        </Text>
      </View>

      <ScrollView horizontal={true}>
        <View style={styles.chart}>
          <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
            <LineChart data={getSelectedData()}>
              <XAxis
                dataKey="date"
                tickFormatter={(date) => date.slice(0, 7)}
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="retail_price"
                stroke="#8884d8"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </View>
      </ScrollView>

      {/* View Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "lastYear" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("lastYear")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "lastYear" && styles.activeButtonText,
            ]}
          >
            1 Yrs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "lastThreeYears" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("lastThreeYears")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "lastThreeYears" && styles.activeButtonText,
            ]}
          >
            3 Yrs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "prices" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("prices")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "prices" && styles.activeButtonText,
            ]}
          >
            All Time
          </Text>
        </TouchableOpacity>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        click buttons above to view daily, weekly and monthly prices
      </Text>

      {/* Bottom Navigation (Placeholder) */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../../assets/images/farmer.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            //source={require('../assets/images/capsicum.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            //source={require('./assets/images/dollar.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require("../../assets/images/farmer.png")}
            style={styles.navIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  productInfo: {
    backgroundColor: "#DCDCDC",
    padding: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
  },
  priceText: {
    fontSize: 18,
    color: "#000000",
    marginTop: 5,
  },
  chartContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  chartImage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
  },
  activeButton: {
    backgroundColor: "#FFDEAD",
  },
  activeButtonText: {
    color: "#000000",
  },
  description: {
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#90EE90",
    padding: 10,
    marginTop: 160,
    marginBottom: 0,
  },
  navButton: {
    // Add styling for navigation buttons
  },
  navIcon: {
    width: 30,
    height: 30,
  },
  chart: {
    marginTop: 10,
    margin: 2,
    width: "100%",
    height: 400,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    paddingRight: 5,
  },
});

export default MarketPrice3;
