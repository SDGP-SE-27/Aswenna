import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Welcome: React.FC = () => {
  // Use state
  const [progress, setProgress] = useState<number>(0);
  const [progressText, setProgressText] = useState<string>("Loading... 0%");

  // Simulate the progress increment (Logic)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = Math.min(prevProgress + 0.01, 1); // Cap at 1
        setProgressText(`Loading... ${(newProgress * 100).toFixed(0)}%`);

        if (newProgress >= 1) {
          clearInterval(interval); // Stop the interval at 100%
        }
        return newProgress;
      });
    }, 50); // Updates every 50ms

    return () => clearInterval(interval);
  }, []);

  // UI Part
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../assets/images/logo.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>ASWENNA</Text>

      {/* Progress Bar */}
      <Text style={styles.loadingText}>{progressText}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* Farmer Image */}
      <Image
        source={require("../assets/images/farmer.jpg")}
        style={styles.farmerImage}
        resizeMode="contain"
      />

      {/* Footer */}
      <Text style={styles.footerText}>Powered By Innovatech.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 55,
  },
  logo: {
    width: 140,
    height: 140,
    marginBottom: 10,
    top: -27,
  },
  title: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6A994E",
    marginBottom: 10,
  },
  progressBarContainer: {
    width: "80%",
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 6,
    overflow: "hidden",
    marginBottom: 30,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#6A994E",
  },
  farmerImage: {
    width: "84%",
    height: 400,
    marginBottom: 21,
  },
  footerText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#000",
    position: "absolute",
    bottom: 20,
  },
});

export default Welcome;
