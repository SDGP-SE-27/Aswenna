import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from './types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useRoute, RouteProp } from '@react-navigation/native';


type SupplementReminder2ScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'SupplementReminder2'
>;

interface RouteParams {
    cropName: string;
}

const SupplementReminder2 = () => {
  const navigation = useNavigation<SupplementReminder2ScreenProp>();
  const route = useRoute<RouteProp<RootStackParamList, "SupplementReminder2">>();

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
      <Text style={styles.title}>{"cropName"}</Text>
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
export default SupplementReminder2;
