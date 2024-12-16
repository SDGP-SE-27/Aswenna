
        import React from 'react';
        import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
        
        const categories = [
          { 
            icon: require('../assets/icons/disease identification.png'), 
            label: 'Disease Identification' 
          },
          { 
            icon: require('../assets/icons/priceprediction.png'), 
            label: 'Price Prediction' 
          },
          { 
            icon: require('../assets/icons/fertilizer sellers.png'), 
            label: 'Fertilizer Sellers' 
          },
          { 
            icon: require('../assets/icons/supplement reminder.png'), 
            label: 'Supplement Reminder' 
          },
          { 
            icon: require('../assets/icons/personal finance tracker.png'), 
            label: 'Personal Finance Tracker' 
          },
          { 
            icon: require('../assets/icons/weather alerts.png'), 
            label: 'Weather Alerts' 
          },

          
        ];

        const Homepage: React.FC = () => {
          return (
            <View style={styles.container}>
              {/* Header Section */}
              <View style={styles.header}>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/menu.png')} style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/reminder.png')} style={styles.remindericon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/farmer 2.png')} style={styles.profileIcon} />
                </TouchableOpacity>
              </View>

        
              {/* Search Bar */}
              <View style={styles.searchBar}>
                <Image source={require('../assets/icons/search.png')} style={styles.searchIcon} />
                <TextInput
                  placeholder="Search any categories"
                  placeholderTextColor="#000"
                  style={[styles.searchInput, {fontFamily: 'Poppins-Regular'}]}
                />
              </View>
              
              {/* Categories Section */}
             <View style={styles.categories}>
              {categories.map((item, index) => (
              <View key={index} style={styles.categoryContainer}>

             {/* Box with Icon */}
             <TouchableOpacity style={styles.categoryBox}>
              <Image source={item.icon} style={styles.categoryIcon} />
             </TouchableOpacity>

            {/* Label Below the Box */}
            <Text style={[styles.categoryLabel,{fontFamily: 'Poppins-SemiBold'}]}>{item.label}</Text>
            </View>
            
          ))}
          </View>
        
              {/* Bottom Navigation */}
              <View style={styles.bottomNav}>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/home.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/disease_navbar.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/price_navbar.png')} style={styles.navIcon} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={require('../assets/icons/profile.png')} style={styles.navIcon} />
                </TouchableOpacity>
              </View>
            </View>
          );
        };
        
      
        
        // Styles
        const styles = StyleSheet.create({
          container: {
            flex: 1,
            backgroundColor: '#ffff',
          },
          header: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 15,
          },

          icon: {
            width: 25,
            height: 25,
            tintColor: '#000',
          },

          remindericon: {
            width: 25,
            height: 25,
            tintColor: '#000',
            left:90,
            top:5,
          },

          profileIcon: {
            width: 35,
            height: 35,
            borderRadius: 50,
          },
          searchBar: {
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#d4ffb6',
            margin: 15,
            borderRadius: 30,
            paddingHorizontal: 15,
          },
          searchIcon: {
            width: 20,
            height: 20,
            tintColor: '#333',
            marginRight: 10,
          },
          searchInput: {
            flex: 1,
            fontSize: 16,
            color: '#0000',
          },
          categories: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginHorizontal: 15,
          },
          categoryBox: {
            width: '60%',
            alignItems: 'center',
            marginVertical: 10,
            backgroundColor: '#ffff',
            paddingVertical: 15,
            borderRadius: 20,
            borderColor: "#51b936",
            borderWidth: 7,
            
          },

          categoryContainer: {
            alignItems: 'center',
            marginVertical: 10,
            width: '45%',
          },

          categoryIcon: {
            width: 50,
            height: 50,
            marginBottom: 10,
            tintColor: 'green',
            
          },
          categoryLabel: {
            marginTop: 5,
            fontSize: 12,
            fontWeight: '600',
            color: '#000',
            textAlign: 'center',
          },

          bottomNav: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            backgroundColor: '#d4ffb6',
            paddingVertical: 15,
          },
          navIcon: {
            width: 25,
            height: 25,
            tintColor: 'green',
          },
        });
        
        export default Homepage;
        