import { BlurView } from "expo-blur";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
  ScrollView,
} from "react-native";
import ProductPage from "./product";
import { Link } from "expo-router";

function SellerDashBoard() {
  const [addFarmerModalVisible, setAddFarmerModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Record<
    number,
    { name: string; description: string }
  > | null>(null);
  const [productList, setProductList] = useState<
    Record<number, { name: string; description: string }>
  >({
    123: { name: "Product A", description: "Description for Product A" },
    456: { name: "Product B", description: "Description for Product B" },
    789: { name: "Product C", description: "Description for Product C" },
  });
  const [groupedProductList, setGroupedProductList] = useState<string[][]>([]);
  const [tempProductList, setTempProductList] = useState<string[]>([]);

  const fetchProductById = (id: number) => {
    const product = productList[id]; // Access the product by its ID
    if (product) {
      setSelectedProduct({ [id]: product }); // Assign the entire product object with its ID as the key
    } else {
      console.log("Product not found");
    }
  };

  const ProductDetails = () => {
    return Object.entries(productList).map(([id, product]) => (
      <Link
        href={{
          pathname: "/product",
          params: {
            product: JSON.stringify(product), // Pass the whole product object as a string
          },
        }}
        key={id}
      >
        <View
          style={[styles.newProduct, { borderColor: "green", borderWidth: 4 }]}
        >
          <View key={id}>
            <Image
              source={require("../assets/images/apple_icon.png")}
              style={styles.product_img}
            />

            <Text style={{ fontSize: 20 }}> {product.name} </Text>
          </View>
        </View>
      </Link>
    ));
  };

  // const DisplayPopUp = (productId: number) => {
  //   fetchProductById(productId);
  // };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Dashboard</Text>
        <Image
          source={require("../assets/icons/farmer_2.png")}
          style={styles.user_icon}
        />
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.mainPage}>
        <ProductDetails />

        <TouchableOpacity
          style={styles.newProduct}
          onPress={() => setAddFarmerModalVisible(true)}
        >
          <Image
            source={require("../assets/images/apple_icon.png")}
            style={styles.add_icon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default SellerDashBoard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },

  header: {
    backgroundColor: "white",
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },

  title: {
    fontWeight: "bold",
    fontSize: 20,
    borderColor: "black",
    borderWidth: 1,
    position: "absolute",
    left: "45%",
    transform: [{ translateX: -50 }],
  },

  user_icon: {
    width: 50,
    height: 50,
    marginLeft: "auto",
  },

  horizontalLine: {
    borderBottomColor: "black",
    borderBottomWidth: 1,
    marginVertical: 10,
    width: "100%",
  },

  newProduct: {
    width: "40%",
    height: 250,
    margin: 7,
    padding: 5,
    alignItems: "center",
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 7,
    borderBottomWidth: 4,
    borderLeftWidth: 2,
    borderRightWidth: 2,
  },

  add_icon: {
    width: 20,
    height: 20,
    marginLeft: "auto",
    marginRight: "auto",
    marginBottom: "auto",
    marginTop: "auto",
  },

  product_img: {
    // width: "100%",
    // height: "90%",
    borderColor: "red",
    borderWidth: 2,
    resizeMode: "contain",
    width: 150,
    height: 150,
  },

  mainPage: {
    flex: 1,
    borderColor: "black",
    borderWidth: 1,
    margin: 5,
    // flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
});
