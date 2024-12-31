import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';

const crops = [
  { id: '1', name: 'Salad Cucumber', time: '1 hour ago', image: require('../assets/images/salad-cucumber.png') },
  { id: '2', name: 'Naimiris', time: '7 days ago', image: require('../assets/images/naimiris.png') },
];

export default function CropListScreen({ navigation }: any) {
  const renderItem = ({ item }: { item: { id: string, name: string, time: string, image: any } }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.cropName}>{item.name}</Text>
        <Text style={styles.lastReminder}>Last reminder {item.time}</Text>
      </View>
      <TouchableOpacity style={styles.readMore} onPress={() => navigation.navigate('ReminderHistory', { cropName: item.name })}>
        <Text style={styles.readMoreText}>Read more &gt;</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={crops}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListFooterComponent={
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Click to add new crop</Text>
          </TouchableOpacity>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5FFF5', padding: 16 },
  card: { backgroundColor: '#DFFFD6', borderRadius: 10, marginBottom: 16, flexDirection: 'row', alignItems: 'center', padding: 10 },
  image: { width: 50, height: 50, borderRadius: 10, marginRight: 10 },
  textContainer: { flex: 1 },
  cropName: { fontSize: 16, fontWeight: 'bold' },
  lastReminder: { color: '#555' },
  readMore: { backgroundColor: '#4CAF50', borderRadius: 5, padding: 5 },
  readMoreText: { color: '#FFF', fontSize: 12 },
  addButton: { backgroundColor: '#DFFFD6', borderRadius: 10, padding: 16, alignItems: 'center' },
  addButtonText: { fontSize: 16, fontWeight: 'bold', color: '#555' },
});
