import React, { useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const NotifiScreen = () => {
    const [reminders, setReminders] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchReminders();
    }, []);

    const fetchReminders = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/callScheduler/get-schedule-history/');
            setReminders(response.data.history);
        } catch (error) {
            console.error('Error fetching reminders:', error);
        } finally {
            setLoading(false);
        }
    };

  return (
    <View style={styles.container}>
            <Text style={styles.title}>Fertilizer Reminders</Text>
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
                            <Text>💊 Fertilizer: {item.fertilizer_type || 'N/A'}</Text>
                            <Text>📅 Date: {item.application_date}</Text>
                            <Text>📨 SMS Sent: {item.sms_sent ? 'Yes' : 'No'}</Text>
                        </View>
                    )}
                />
            )}
        </View>
  )
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', marginBottom: 15 },
    reminderItem: { padding: 15, marginVertical: 5, backgroundColor: '#eaf7ea', borderRadius: 5 },
    cropName: { fontWeight: 'bold', fontSize: 16 },
    noData: { textAlign: 'center', marginTop: 20, fontSize: 16, fontStyle: 'italic' },
});

export default NotifiScreen;