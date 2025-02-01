import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useState } from "react";
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Image } from "react-native";
import { RootStackParamList } from "./types";
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import commonregistration1 from "./commonregistration1";


type ChooseroleScreenProp = NativeStackNavigationProp<
  RootStackParamList,
  'Chooserole'
>;

const Chooserole = () =>{
    const navigation = useNavigation<ChooseroleScreenProp>();
    const [selectedRole, setSelectedRole] = useState("");
    const route = useRoute<RouteProp<RootStackParamList, "commonregistration1">>();
    const { username, phoneNumber, address, district } = route.params; 

    function registerToRole () {
        if (selectedRole === "seller") {
            console.log("You are now registering as a seller");
        } else if (selectedRole === "farmer") {
            console.log("You are now registering as a farmer");
            navigation.navigate("commonregistration1" , {
                username, 
                phoneNumber, 
                address,
                district, 
            });
        } else {
            console.log("No role specified");
        }
    }


    return (
        <View style={styles.container}>

            {/* Back button */}
            <View style={styles.backButtonContainer}>
                <TouchableOpacity style={styles.backButton}>  
                        <Text>&lt;</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.text}> Select your role: </Text>

            {/* Roles Container */}
            <View style={styles.listContainer}>
                {/* Farmer role */}
                <TouchableOpacity style={[
                    styles.roleButton, 
                    selectedRole === "farmer" ? styles.selected : styles.default,
                ]}
                onPress={() => setSelectedRole("farmer")}
                >
                    <Text style={styles.list}> Farmer </Text>
                </TouchableOpacity>

                {/* Seller role */}
                <TouchableOpacity style={[
                    styles.roleButton, 
                    selectedRole === "seller" ? styles.selected : styles.default,
                ]}
                onPress={() => setSelectedRole("seller")}>
                    <Text style={styles.list}> Seller </Text>
                </TouchableOpacity>

                {/* Next button */}
                <Pressable style={styles.nextButton}
                onPress={() => registerToRole()}>
                    <Text style={styles.next}> Next </Text>
                </Pressable>
            </View>

            {/* Image */}
            <Image source={require("../assets/images/role_selection_img.png")} style={styles.image}/>

            {/* Footer */}
            <View style={styles.footer}>
            <Image source={require("../assets/images/login-aswenna-logo.png")} style={styles.logo}/>
            <Text> POWERED BY INNOVATECH </Text>
            </View>
        </View>
    );

}


const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: "center",
    },
    
    text: {
        color: "#32902B",
        fontWeight: "bold",
        fontSize: 30,
        textAlign: "center",
        marginTop: 100,
        marginBottom: 10
    },

    listContainer: {
        borderColor: "#dcd5d5eb",
        shadowColor: "#dcd5d5eb",
        borderRadius: 10,
        flexDirection: "column",
        borderWidth: 1,
        borderBottomWidth: 7,
        margin: 5,
        alignItems: "center",
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
        paddingTop: 30,
    },

    list: {
        fontWeight: "bold",
    },

    roleButton: {
        backgroundColor: "#D0FB94",
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 49,
        fontSize: 19,
        borderColor: "#51B936",
        borderWidth: 3,
        margin: 10,
    },

    next: {
        color: "white",
        fontWeight: "bold",
        
    },

    nextButton: {
        backgroundColor: "#51B936",
        paddingLeft: 70,
        paddingRight: 70,
        paddingTop: 20,
        paddingBottom: 20,
        margin: 10,
        borderRadius: 10,
        marginTop: 20
    },

    backButton: {
        borderColor: "#dcd5d5eb",
        shadowColor: "#dcd5d5eb",
        borderWidth: 3,
        padding: 10,
        margin: 10,
        fontSize: 18,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 50,
        left: 20,
    },
 
    backButtonContainer: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingHorizontal: 20,
        marginTop: 20,
    },

    selected: {
        backgroundColor: "#b8fd56",
    },

    default: {
        backgroundColor: "#D0FB94",
    },

    image: {
        marginTop: 10,
        maxHeight: "70%",
        maxWidth: "70%",
        resizeMode: "contain",
    },

    logo: {
        height: 60,
        width: 60,
        resizeMode: "contain",
        marginRight: 10, 
    },

    footer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        padding: 20,
        height: 100,
        width: "100%",
    }
});


export default Chooserole; 