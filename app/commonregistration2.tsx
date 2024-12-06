import React, { ChangeEventHandler, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ScrollView, TouchableOpacity , Image} from 'react-native';
import { useFonts } from 'expo-font';

const RegisterScreen2: React.FC = () => {
    const [Email, setEmail] = useState<string>('');
    const [Password, setPassword] = useState<string>('');
    const [ConfirmPassword, setConfirmPassword] = useState<string>('');

    const[fontsLoaded] = useFonts({'Poppins-Bold': require('../assets/fonts/Poppins/Poppins-Bold.ttf'),});
    const[fontsLoaded2] = useFonts({'Poppins-Regular': require('../assets/fonts/Poppins/Poppins-Regular.ttf'),});
    const[fontsLoaded3] = useFonts({'Poppins-SemiBold': require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),});

    const[emailError , setEmailError] = useState<string>(''); 
    const[passwordError, setPasswordError] = useState<string>('');

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      };

    const validatePasswords = () : boolean =>{
        return Password == ConfirmPassword
    }; 

    const handleSubmit = (): void => {
        if (!Email || !Password || !ConfirmPassword) {
          Alert.alert('Error', 'Please fill in all fields');
          return;
        }
        if(!validateEmail(Email)){
            setEmailError("Invalid email address"); 
            return;
        }else{
            setEmailError('');
        }

        if(!validatePasswords()){
            setPasswordError('Passwords do not match'); 
            return;
        }else{
            setPasswordError('');
        }
        Alert.alert('Registration Success', `Email: ${Email}\nPassword: ${Password}\nConfirmPassword: ${ConfirmPassword}`);
      };

      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.formContainer}>
            <Text style={[styles.title, {fontFamily: 'Poppins-Bold'}]}>Registration</Text>
    
          
            <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Email*</Text>
            <View >
                <Image
                    source={require("../assets/icons/email.png")}
                    style={styles.icon}
                />
                <TextInput
                    style={[styles.input,{fontFamily: 'Poppins-Regular'}]} 
                    placeholder='email'
                    value={Email}
                    onChangeText={setEmail}
                />    

            </View>
              
            
            {emailError && <Text style={styles.errorText}>{emailError}</Text>}
    
          
            <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Password*</Text>
            <TextInput
              style= {[styles.input,{fontFamily:'Poppins-Regular'}]}
              placeholder="password"
              value={Password}
              onChangeText={setPassword}
              secureTextEntry
            />
    

            <Text style={[styles.label,{fontFamily: 'Poppins-Bold'}]}>Confirm Password*</Text>
            <TextInput
              style= {[styles.input,{fontFamily:'Poppins-Regular'}]}
              placeholder="password"
              value={Password}
              onChangeText={setPassword}
              secureTextEntry
            />

            {passwordError && <Text style={styles.errorText}>{passwordError}</Text>}
    
    
            {/* Submit Button */}
            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
              <Text style={[styles.button ,{fontFamily: 'Poppins-SemiBold'}]}>Next</Text>
            </TouchableOpacity>  
          </View>
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#ffff',
      },

      formContainer: {
        width: '100%',
        maxWidth: 400,
        backgroundColor: '#CFFFC2',
        padding: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        fontFamily: 'poppins',
        fontSize: 20,
      },

      title: {
        fontSize: 32,
        fontWeight: 'heavy',
        marginBottom: 20,
        textAlign: 'center',
        fontFamily: 'poppins',
        
      },

      label: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily: 'poppins',
        color: 'F5F5F5'
        
      },
        input: {
        flex: 1,
        paddingLeft: 40,  // space for the icon on the left side
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
        backgroundColor: '#F5F5F5'
      },
    
      picker: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 20,
        marginBottom: 15,
        backgroundColor: '#F5F5F5',
        padding: 10,
        fontFamily: 'poppins',
      },
    
      button: {
        backgroundColor: '#51B936', 
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
        padding: 5,
        color: '#ffff',
        fontFamily: 'poppins',
        fontSize: 18,
      },

      errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
      }, 

    icon: {
        position: 'relative',
        left: 300,
        top: '95%',
        transform: [{ translateY: -50 }] ,
        width: 20,
        height: 20,
    }
    
    });
    
    export default RegisterScreen2;