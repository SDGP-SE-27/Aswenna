import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';

export default function Call() {
    const [selectedCrop, setSelectedCrop] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [scheduleHistory, setScheduleHistory] = useState([]);

    const crops = ['Bitter Gourd', 'Papaya', 'Pineapple', 'Brinjal', 'Ladies Fingers', 'Long Beans', 'Snake Gourd'];

    const fetchScheduleHistory = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/callScheduler/get-schedule-history/');
            setScheduleHistory(response.data.history);
            console.log('Schedule History:', response.data.history);
        } catch (error) {
            console.error('Error fetching schedule history:', error);
            setMessage('Error fetching schedule history. 😔');
        }
    };

    useEffect(() => {
        fetchScheduleHistory();
    }, []);

    const sendSchedule = async () => {
        if (!selectedCrop) {
            setMessage('Please select a crop. 🧑‍🌾');
            return;
        }

        setLoading(true);
        setMessage('');

        const apiUrl = 'http://127.0.0.1:8000/api/callScheduler/receive-schedule/';
        try {
            const response = await axios.post(apiUrl, {
                cropType: selectedCrop,
            });
            setMessage(`Schedule received and reminders set! ✅`);
            console.log('Response from server:', response.data);
            fetchScheduleHistory();
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred. ❌');
            console.error('Error sending schedule:', error);
        } finally {
            setLoading(false);
        }
    };

    const emulateCall = async (scheduleId) => {
        try {
            const response = await axios.get(`http://127.0.0.1:8000/api/callScheduler/emulate-call/${scheduleId}/`);
            setMessage(response.data.message);  // Display success or error message
            fetchScheduleHistory(); // Refresh history to see updated call_made status

        } catch (error) {
            console.error('Error emulating call:', error);
            setMessage('Failed to emulate call. 📞❌');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Fertilizer Reminder 🔔</Text>

            <Text style={styles.label}>Select Crop: 🌱</Text>
            <Picker
                selectedValue={selectedCrop}
                style={styles.picker}
                onValueChange={(itemValue) => setSelectedCrop(itemValue)}
            >
                <Picker.Item label="Select Crop" value="" />
                {crops.map((crop) => (
                    <Picker.Item key={crop} label={crop} value={crop} />
                ))}
            </Picker>

            <Button
                title="Set Reminder"
                onPress={sendSchedule}
                disabled={loading}
            />
            {loading && <Text>Loading...</Text>}
            {message ? <Text style={message.includes('error') ? styles.errorText : styles.successText}>{message}</Text> : null}

            <Text style={styles.historyTitle}>Schedule History: 🗓️</Text>
            <FlatList
                data={scheduleHistory}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <Text>🌱 Crop: {item.crop_type}</Text>
                        <Text>💊 Fertilizer: {item.fertilizer_type || 'N/A'}</Text>
                        <Text>📅 Date: {item.application_date}</Text>
                        <Text>📞 Call Made: {item.call_made ? 'Yes 📞✅' : 'No 📞'}</Text>
                        {/* Button to emulate call */}
                        <TouchableOpacity
                            style={styles.emulateButton}
                            onPress={() => emulateCall(item.id)}
                            disabled={item.call_made} // Disable if call already made
                        >
                            <Text style={styles.emulateButtonText}>
                                Emulate Call {item.call_made ? '📞 (Made)' : '📞'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyHistory}>No history available. 🤷‍♀️</Text>}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    picker: {
        height: 50,
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    },
    successText: {
        color: 'green',
        marginTop: 10,
    },
    historyTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    historyItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 10,
    },
    emptyHistory: {
        textAlign: 'center',
        marginTop: 10,
        fontStyle: 'italic',
    },
    emulateButton: {
        backgroundColor: '#007bff',
        padding: 8,
        borderRadius: 5,
        marginTop: 5,
    },
    emulateButtonText: {
        color: '#fff',
        textAlign: 'center',
    },
});