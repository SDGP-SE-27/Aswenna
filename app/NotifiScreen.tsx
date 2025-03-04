import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from "./types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type NotificationScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  "MonthlyReport"
>;

const NotifiScreen = () => {
    const navigation = useNavigation<NotificationScreenProp>();
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        navigation.setOptions({ headerShown: false }); 
    }, [navigation]);
    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get('https://api.aswenna.site/api/callScheduler/get-schedule-history/');
            setReminders(response.data.history);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Homepage')}>
                <Text style={styles.backText}>{"<"}</Text>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Fertilizer Reminders</Text>
        </View>
            {loading ? (
                <ActivityIndicator size="large" color="green" />
            ) : reminders.length === 0 ? (
                <Text style={styles.noData}>No reminders available.</Text>
            ) : (
                <FlatList
                    data={reminders}
                    keyExtractor={(item: any, index) => index.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.reminderItem}>
                            <Text style={styles.cropName}>🌱 Crop: {item.crop_type}</Text>
                            <Text>Fertilizer: {item.fertilizer_type || 'N/A'}</Text>
                            <Text>Date: {item.application_date}</Text>
                            <Text>SMS Sent: {item.sms_sent ? 'Yes' : 'No'}</Text>
                        </View>
                    )}
                />
            )}
        </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#FFFFFF",
        borderBottomWidth: 1,
        borderBottomColor: "#d3d3d3",
        fontSize: 25,
      },
      headerTitle: { 
        fontSize: 20, 
        fontWeight: "bold", 
        flex: 1, 
        paddingLeft: 50, 
      },
      backButton: { 
        marginRight: 10,
        backgroundColor: "#fff", 
        borderRadius: 15, 
        borderWidth: 2, 
        borderColor: "#DDD", 
        shadowColor: "#000", 
        shadowOffset: { width: 2, height: 4 }, 
        shadowOpacity: 0.15, 
        shadowRadius: 6, 
        elevation: 6,
        paddingLeft: 13, 
        paddingRight: 15,
        paddingBottom: 5, 
        textAlign: "center", 
      },
        backText: { 
        fontSize: 25, 
        fontWeight: "bold"
      },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
    reminderItem: { padding: 15, marginVertical: 5, backgroundColor: '#eaf7ea', borderRadius: 5 },
    cropName: { fontWeight: 'bold', fontSize: 16 },
    noData: { textAlign: 'center', marginTop: 20, fontSize: 16, fontStyle: 'italic' },
});

export default NotifiScreen;