import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const App = () => {
  // Sample data for the chart (replace with your actual data)
  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        data: [
          100, 200, 150, 250, 200, 300, 250, 350, 300, 400, 350, 450, 400, 500,
          450, 550, 500, 450, 400, 350, 300, 250, 200, 150, 200, 250, 300, 350,
          400, 450, 500, 550, 600, 650, 700, 750, 800, 850, 900, 850, 800, 750,
          700, 650, 600, 550, 500, 450, 400,
        ],
        color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

  // State to manage the selected view (daily, weekly, monthly)
  const [selectedView, setSelectedView] = React.useState('daily');

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          {/* Replace with your back button icon */}
          <Text style={styles.backButtonText}>{'<'}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Market Price Prediction</Text>
      </View>

      {/* Product Information */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Capsicum 1 kg</Text>
        <Text style={styles.priceText}>Todays' s price = 93.00 LKR</Text>
        <Text style={styles.priceText}>Yesterday' s price = 87.50 LKR</Text>
        <Text style={styles.priceText}>Price difference =5.50 LKR</Text>
      </View>

      {/* Chart */}
      <View style={styles.chartContainer}>
        <Image
          source={require('./assets/chart.png')}
          style={styles.chartImage}
        />
      </View>

      {/* View Selection Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === 'daily' && styles.activeButton,
          ]}
          onPress={() => setSelectedView('daily')}>
          <Text
            style={[
              styles.buttonText,
              selectedView === 'daily' && styles.activeButtonText,
            ]}>
            Daily
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === 'weekly' && styles.activeButton,
          ]}
          onPress={() => setSelectedView('weekly')}>
          <Text
            style={[
              styles.buttonText,
              selectedView === 'weekly' && styles.activeButtonText,
            ]}>
            Weekly
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.button,
            selectedView === 'monthly' && styles.activeButton,
          ]}
          onPress={() => setSelectedView('monthly')}>
          <Text
            style={[
              styles.buttonText,
              selectedView === 'monthly' && styles.activeButtonText,
            ]}>
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
            source={require('./assets/home.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require('./assets/capsicum.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require('./assets/dollar.png')}
            style={styles.navIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Image
            source={require('./assets/profile.png')}
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
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  backButton: {
    marginRight: 20,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  productInfo: {
    backgroundColor: '#DCDCDC',
    padding: 20,
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
  priceText: {
    fontSize: 18,
    color: '#000000',
    marginTop: 5,
  },
  chartContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  chartImage: {
    width: 350,
    height: 350,
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 10,
    width: 100,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#000',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000',
  },
  activeButton: {
    backgroundColor: '#FFDEAD',
  },
  activeButtonText: {
    color: '#000000',
  },
  description: {
    textAlign: 'center',
    marginBottom: 20,
    color: '#000000',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#90EE90',
    padding: 10,
  },
  navButton: {
    // Add styling for navigation buttons
  },
  navIcon: {
    width: 30,
    height: 30,
  },
});

export default App;