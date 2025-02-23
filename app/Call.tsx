import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, TextInput, ScrollView, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

export default function Call() {
    const [selectedCrop, setSelectedCrop] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date()); // New state for date
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [scheduleHistory, setScheduleHistory] = useState([]);

    const crops = ['Bitter Gourd', 'Papaya', 'Pineapple'];

    // Fetch schedule history from the backend
    const fetchScheduleHistory = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/api/callScheduler/get-schedule-history/');
            setScheduleHistory(response.data.history);
            console.log('Schedule History:', response.data.history);
        } catch (error) {
            console.error('Error fetching schedule history:', error);
            setMessage('Error fetching schedule history.');
        }
    };

    useEffect(() => {
        fetchScheduleHistory();
    }, []);

    const sendSchedule = async () => {
        if (!selectedCrop) {
            setMessage('Please select a crop.');
            return;
        }

        setLoading(true);
        setMessage('');

        const apiUrl = 'http://127.0.0.1:8000/api/callScheduler/receive-schedule/';
        try {
            const response = await axios.post(apiUrl, {
                cropType: selectedCrop,
                applicationDate: selectedDate.toISOString().split('T')[0], // Format YYYY-MM-DD
            });
            setMessage(response.data.message);
            console.log('Response from server:', response.data);
            fetchScheduleHistory();
        } catch (error) {
            setMessage(error.response?.data?.message || 'An error occurred.');
            console.error('Error sending schedule:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Fertilizer Reminder</Text>

            {/* Crop Picker */}
            <Text style={styles.label}>Select Crop:</Text>
            <Picker selectedValue={selectedCrop} style={styles.picker} onValueChange={(itemValue) => setSelectedCrop(itemValue)}>
                <Picker.Item label="Select Crop" value="" />
                {crops.map((crop) => (
                    <Picker.Item key={crop} label={crop} value={crop} />
                ))}
            </Picker>

            {/* Date Picker */}
            <Text style={styles.label}>Select Date:</Text>
            <Button title="Pick a Date" onPress={() => setShowDatePicker(true)} />
            {showDatePicker && (
                <DateTimePicker value={selectedDate} mode="date" display="default" onChange={onDateChange} />
            )}
            <Text style={styles.selectedDateText}>📅 Selected Date: {selectedDate.toDateString()}</Text>

            {/* Set Reminder Button */}
            <Button title="Set Reminder" onPress={sendSchedule} disabled={loading} />
            {loading && <Text>Loading...</Text>}
            {message ? <Text style={message.includes('error') ? styles.errorText : styles.successText}>{message}</Text> : null}

            {/* Schedule History */}
            <Text style={styles.historyTitle}>📜 Schedule History:</Text>
            <FlatList
                data={scheduleHistory}
                keyExtractor={(item: any, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.historyItem}>
                        <Text>🌱 Crop: {item.crop_type}</Text>
                        <Text>💊 Fertilizer: {item.fertilizer_type || 'N/A'}</Text>
                        <Text>📅 Date: {item.application_date}</Text>
                        <Text>📨 SMS Sent: {item.sms_sent ? '✅ Yes' : '❌ No'}</Text>
                    </View>
                )}
                ListEmptyComponent={<Text style={styles.emptyHistory}>No history available.</Text>}
            />
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#fff' },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
    label: { fontSize: 16, marginBottom: 5 },
    picker: { height: 50, marginBottom: 10 },
    selectedDateText: { marginTop: 10, fontSize: 16, fontWeight: 'bold' },
    errorText: { color: 'red', marginTop: 10 },
    successText: { color: 'green', marginTop: 10 },
    historyTitle: { fontSize: 20, fontWeight: 'bold', marginTop: 20, marginBottom: 10 },
    historyItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ccc' },
    emptyHistory: { textAlign: 'center', marginTop: 10, fontStyle: 'italic' },
});
