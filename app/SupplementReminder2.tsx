import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

interface RouteParams {
    cropName: string;
}
export default function ReminderHistoryScreen({ route }: { route: { params: RouteParams } }) {
  const { cropName } = route.params;
  const reminders = [
    { id: '1', name: 'Supplement reminder history 4', time: '1 hour ago', text: '', image: null },
    { id: '2', name: 'Supplement reminder history 3', time: '1 day ago', text: '', image: null },
    { id: '3', name: 'Supplement reminder history 2', time: '2 days ago', text: '',  image: null },
    { id: '4', name: 'Supplement reminder history 1', time: '7 days ago', text: '',  image: null },
  ];

  const renderItem = ({ item }: { item: { id: string, text: string, time: string, image: any } }) => (
    <View style={styles.historyCard}>
      <Text style={styles.reminderText}>{item.text}</Text>
      <Text style={styles.reminderTime}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{cropName}</Text>
      <FlatList data={reminders} keyExtractor={(item) => item.id} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5FFF5', padding: 16 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  historyCard: { backgroundColor: '#DFFFD6', borderRadius: 10, marginBottom: 10, padding: 10 },
  reminderText: { fontSize: 16, fontWeight: 'bold' },
  reminderTime: { color: '#555' },
});
