import { BlurView } from "expo-blur";
import { useSearchParams } from "expo-router/build/hooks";
import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  FlatList,
  Touchable,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";

function ProductPage() {
  const params = useSearchParams();
  //  const product = params.product ? JSON.parse(params.product) : null;
  const [viewImageVisible, setViewImageVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [images, setImages] = useState([
    require("../assets/images/apple-icon.png"),
    require("../assets/images/apple-icon.png"),
    require("../assets/images/apple-icon.png"),
  ]);

  // console.log("Product received:", product);

  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      onPress={() => {
        console.log({ item });
        setViewImageVisible(true);
        setSelectedImage(item);
      }}
    >
      <View style={styles.slide}>
        <Image source={item} style={styles.product_img} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Product</Text>
        <Image
          source={require("../assets/icons/farmer_2.png")}
          style={styles.user_icon}
        />
      </View>

      <View style={styles.horizontalLine} />

      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
      />

      <View style={styles.horizontalLine} />

      <View style={{ padding: 10 }}>
        {/* <Text style={{ fontSize: 20 }}> Product name: {val[0]}</Text> */}
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={viewImageVisible}
        onRequestClose={() => {
          setViewImageVisible(false);
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => setViewImageVisible(false)} // Close the modal when tapping outside
        >
          <View style={styles.modalContainer}>
            <BlurView style={styles.absoluteBlur} intensity={30} tint="light" />
            <View style={styles.modalView}>
              {selectedImage && ( // Render the selected image
                <Image source={selectedImage} />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </ScrollView>
  );
}

export default ProductPage;

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

  product_img: {
    width: 300,
    height: 350,
  },

  images: {
    margin: "auto",
    maxWidth: "80%",
    padding: 10,
    alignItems: "center",
  },

  slide: {
    margin: "auto",
    maxWidth: "80%",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },

  modalView: {
    // width: "80%",
    backgroundColor: "transparent",
    alignItems: "center",
    overflow: "hidden",
  },

  closeButton: {
    position: "absolute",
    right: 0,
    top: 0,
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: "rgba(255, 0, 0, 0.88)",
  },

  absoluteBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
