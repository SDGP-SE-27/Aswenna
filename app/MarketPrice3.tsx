import React from "react";
import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { LineChart as RNLineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
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
} from "react-native";
import { LineChart as RNLineChart } from "react-native-chart-kit";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useRoute, RouteProp } from "@react-navigation/native";
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

type MarketPrice3ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MarketPrice3"
  "MarketPrice3"
>;

const MarketPrice3 = () => {
const MarketPrice3 = () => {
  const navigation = useNavigation<MarketPrice3ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "MarketPrice3">>();

  // Sample data for the chart (replace with your actual data)
  // const chartData = {
  //   labels: ["0", "1", "2", "3", "4", "5"],
  //   datasets: [
  //     {
  //       data: [
  //         100, 200, 150, 250, 200, 300, 250, 350, 300, 400, 350, 450, 400, 500,
  //         450, 550, 500, 450, 400, 350, 300, 250, 200, 150, 200, 250, 300, 350,
  //         400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 850, 800, 750,
  //         700, 650, 600, 550, 500, 450, 400,
  //       ],
  //       color: (opacity = 1) => rgba(134, 65, 244, ${opacity}), // optional
  //       strokeWidth: 2, // optional
  //     },
  //   ],
  // };

  const data = [
    {
      date: "2014-01-01",
      retail_price: 93.59,
      predicted_price: null,
    },
    {
      date: "2014-02-01",
      retail_price: 91.75,
      predicted_price: null,
    },
    {
      date: "2014-03-01",
      retail_price: 88.47,
      predicted_price: null,
    },
    {
      date: "2014-04-01",
      retail_price: 85.06,
      predicted_price: null,
    },
    {
      date: "2014-05-01",
      retail_price: 119.51,
      predicted_price: null,
    },
    {
      date: "2014-06-01",
      retail_price: 139.89,
      predicted_price: null,
    },
    {
      date: "2014-07-01",
      retail_price: 140.55,
      predicted_price: null,
    },
    {
      date: "2014-08-01",
      retail_price: 104.24,
      predicted_price: null,
    },
    {
      date: "2014-09-01",
      retail_price: 95.42,
      predicted_price: null,
    },
    {
      date: "2014-10-01",
      retail_price: 125.3,
      predicted_price: null,
    },
    {
      date: "2014-11-01",
      retail_price: 141.77,
      predicted_price: null,
    },
    {
      date: "2014-12-01",
      retail_price: 166.62,
      predicted_price: null,
    },
    {
      date: "2015-01-01",
      retail_price: 220.5,
      predicted_price: null,
    },
    {
      date: "2015-02-01",
      retail_price: 165.97,
      predicted_price: null,
    },
    {
      date: "2015-03-01",
      retail_price: 137.29,
      predicted_price: null,
    },
    {
      date: "2015-04-01",
      retail_price: 110.15,
      predicted_price: null,
    },
    {
      date: "2015-05-01",
      retail_price: 117.25,
      predicted_price: null,
    },
    {
      date: "2015-06-01",
      retail_price: 135.96,
      predicted_price: null,
    },
    {
      date: "2015-07-01",
      retail_price: 128.66,
      predicted_price: null,
    },
    {
      date: "2015-08-01",
      retail_price: 119.86,
      predicted_price: null,
    },
    {
      date: "2015-09-01",
      retail_price: 108.7,
      predicted_price: null,
    },
    {
      date: "2015-10-01",
      retail_price: 121.43,
      predicted_price: null,
    },
    {
      date: "2015-11-01",
      retail_price: 197.09,
      predicted_price: null,
    },
    {
      date: "2015-12-01",
      retail_price: 207.3,
      predicted_price: null,
    },
    {
      date: "2016-01-01",
      retail_price: 144.78,
      predicted_price: null,
    },
    {
      date: "2016-02-01",
      retail_price: 125.94,
      predicted_price: null,
    },
    {
      date: "2016-03-01",
      retail_price: 119.94,
      predicted_price: null,
    },
  ];



  // State to manage the selected view (daily, weekly, monthly)
  const [selectedView, setSelectedView] = React.useState("daily");
  const [selectedView, setSelectedView] = React.useState("daily");

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketPrice2")}
      ></TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("MarketPrice2")}
      ></TouchableOpacity>

      {/* Product Information */}
      <View style={styles.productInfo}>
        <Text style={styles.priceText}>Todays' s price = 93.00 LKR</Text>
        <Text style={styles.priceText}>Yesterday' s price = 87.50 LKR</Text>
        <Text style={styles.priceText}>Price difference =5.50 LKR</Text>
      </View>

      <View style={styles.chart}>
        <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
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
      <View style={styles.chart}>
        <ResponsiveContainer width="100%" aspect={4.0 / 3.0}>
          <LineChart data={data}>
            <XAxis dataKey="date" />
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

      {/* View Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "daily" && styles.activeButton,
            selectedView === "daily" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("daily")}
        >
          onPress={() => setSelectedView("daily")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "daily" && styles.activeButtonText,
            ]}
          >
              selectedView === "daily" && styles.activeButtonText,
            ]}
          >
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "weekly" && styles.activeButton,
            selectedView === "weekly" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("weekly")}
        >
          onPress={() => setSelectedView("weekly")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "weekly" && styles.activeButtonText,
            ]}
          >
              selectedView === "weekly" && styles.activeButtonText,
            ]}
          >
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === "monthly" && styles.activeButton,
            selectedView === "monthly" && styles.activeButton,
          ]}
          onPress={() => setSelectedView("monthly")}
        >
          onPress={() => setSelectedView("monthly")}
        >
          <Text
            style={[
              styles.buttonText,
              selectedView === "monthly" && styles.activeButtonText,
            ]}
          >
              selectedView === "monthly" && styles.activeButtonText,
            ]}
          >
            Monthly
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
            // source={require("../../assets/images/farmer.png")}
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
            source={require("../assets/images/farmer.jpg")}
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
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    fontWeight: "bold",
    color: "#000000",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    fontWeight: "bold",
    color: "#000000",
  },
  productInfo: {
    backgroundColor: "#DCDCDC",
    backgroundColor: "#DCDCDC",
    padding: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000000",
    fontWeight: "bold",
    color: "#000000",
  },
  priceText: {
    fontSize: 18,
    color: "#000000",
    color: "#000000",
    marginTop: 5,
  },
  chartContainer: {
    alignItems: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  chartImage: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    resizeMode: "contain",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#F5F5F5",
    backgroundColor: "#F5F5F5",
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#000",
    borderColor: "#000",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    fontWeight: "bold",
    color: "#000000",
  },
  activeButton: {
    backgroundColor: "#FFDEAD",
    backgroundColor: "#FFDEAD",
  },
  activeButtonText: {
    color: "#000000",
    color: "#000000",
  },
  description: {
    textAlign: "center",
    textAlign: "center",
    marginBottom: 20,
    color: "#000000",
    color: "#000000",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#90EE90",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#90EE90",
    padding: 10,
    marginTop: 160,
    marginBottom: 0,
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
    margin: "auto",
    width: "100%",
    height: 400,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    paddingRight: 30,
  },
  chart: {
    marginTop: 10,
    margin: "auto",
    width: "100%",
    height: 400,
    backgroundColor: "white",
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: "#000",
    paddingRight: 30,
  },
});

export default MarketPrice3;

function rgba(arg0: number, arg1: number, arg2: number, $: any, arg4: { opacity: number; }) {
    throw new Error("Function not implemented.");
}
