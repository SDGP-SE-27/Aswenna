import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp } from "@react-navigation/native";
import axios from "axios";
import { LineChart } from "react-native-chart-kit";

type MarketPrice3ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MarketPrice3"
>;

interface PriceEntry {
  date: string; // e.g., "2024-01"
  retail_price: number | null;
  predicted_price: number | null;
}

const MarketPrice3 = () => {
  const navigation = useNavigation<MarketPrice3ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "MarketPrice3">>();
  const cropName = route.params?.cropName; // Optional chaining to avoid undefined error
  console.log("Received params:", route.params);
  console.log(cropName);
  const [prices, setPrices] = useState<PriceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("lastYear");
  const screenWidth = Dimensions.get("window").width;
  const [plotSize, setPlotSize] = useState(1);
  const extendedWidth = screenWidth * plotSize;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const getFuturePredictions = () => {
    if (!prices.length) return [];
    
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    
    return prices.filter(entry => {
      const [year, month] = entry.date.split('-').map(Number);
      return (year > currentYear || (year === currentYear && month > currentMonth)) && entry.predicted_price !== null;
    }).map(entry => ({
      date: entry.date,
      price: entry.predicted_price
    }));
  };

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
      .get<{ prices: PriceEntry[] }>(
        `http://127.0.0.1:8000/marketPrice/${encodeURIComponent(
          formattedCropName
        )}/`
      )
      .then((response) => {
        setPrices(response.data.prices); // Extract the "prices" array
        console.log("Data fetched:", response.data.prices);
        console.log("Prices fetched:", prices);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        console.log("Error here");
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

  // Ensure we don't pass invalid data to the chart
  const validPrices = getSelectedData().map((entry) => {
    return {
      date: entry.date.slice(0, 7), // format "YYYY-MM"
      retail_price: entry.retail_price ?? 0, // Replace null with 0 for invalid prices
    };
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketPrice2")}
      ></TouchableOpacity>

      {/* Product Information */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate("MarketPrice1")}
        >
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
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
        <Text style={styles.priceText}>Predicted Prices:</Text>
        {getFuturePredictions().length > 0 ? (
          getFuturePredictions().map((prediction, index) => (
            <Text key={index} style={styles.predictionText}>
              {prediction.date}: {prediction.price && prediction.price > 0 ? `${prediction.price.toFixed(2)} LKR` : "No prediction yet."}
            </Text>
          ))
        ) : (
          <Text style={styles.predictionText}>No predictions yet.</Text>
        )}
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ flexGrow: 1 }}>
        <ScrollView horizontal={true}>
          <View style={[styles.chart, { minHeight: 500 }]}>
            <LineChart
              data={{
                labels: validPrices.map((entry) => entry.date),
                datasets: [
                  {
                    data: validPrices.map((entry) => entry.retail_price),
                    color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                    strokeWidth: 3,
                  },
                ],
              }}
              width={extendedWidth}
              height={400}
              yAxisLabel="LKR "
              yAxisInterval={1}
              chartConfig={{
                backgroundGradientFrom: "#f9f9f9",
                backgroundGradientTo: "#ffffff",
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 16,
                },
                propsForDots: {
                  r: "6",
                  strokeWidth: "2",
                  stroke: "#ffa726",
                },
              }}
              bezier
              style={{
                marginVertical: 10,
                borderRadius: 16,
              }}
            />
          </View>
        </ScrollView>
      </ScrollView>

      <ScrollView>
        {/* View Selection Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedView === "lastYear" && styles.activeButton,
            ]}
            onPress={() => [setPlotSize(2), setSelectedView("lastYear")]}
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
            onPress={() => [setPlotSize(5), setSelectedView("lastThreeYears")]}
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
            onPress={() => [setPlotSize(15), setSelectedView("prices")]}
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
          Click the buttons above to view daily, weekly and monthly prices !
        </Text>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => navigation.navigate("Homepage")}>
          <Image
            source={require("../assets/images/home_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("DiseaseIdentification2")}
        >
          <Image
            source={require("../assets/images/disease_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("PersonalTrackerMain")}
        >
          <Image
            source={require("../assets/images/finance_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("UserProfile")}>
          <Image
            source={require("../assets/images/profile_icon.png")}
            style={styles.footerIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  backButton: {
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 50,
    marginRight: 10,
  },
  backText: {
    fontSize: 18,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  productInfo: {
    marginTop: 20,
  },
  priceText: {
    fontSize: 16,
    marginVertical: 5,
    color: "#333",
  },
  predictionText: {
    fontSize: 14,
    marginLeft: 20,
    marginVertical: 2,
    color: "#666",
  },
  chart: {
    marginTop: 20,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 5,
  },
  activeButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    fontSize: 16,
  },
  activeButtonText: {
    color: "#fff",
  },
  description: {
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  footerIcon: {
    width: 30,
    height: 30,
  },
});

export default MarketPrice3;
