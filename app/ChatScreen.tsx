import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

import axios from "axios";

export default function ChatScreen() {
  const [messages, setMessages] = useState<any[]>([]); // Array to hold messages
  const [inputText, setInputText] = useState(""); // Input message text
  const [userId] = useState("farmer_123"); // Farmer's user ID (example)

  // Backend API endpoint
  const BACKEND_URL = "https://your-backend-domain.com/api/chat";

  // Fetch existing chat messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/messages`, {
          params: { farmerId: userId, instructorId: "instructor_456" },
        });
        if (response.data && response.data as { messages: any[] }) {
          setMessages((response.data as { messages: any[] }).messages);
        }
      } catch (error) {
        console.error("Failed to fetch messages:", error);
      }
    };
    fetchMessages();
  }, []);

  // Function to send a new message
  const handleSendMessage = async () => {
    if (inputText.trim() === "") return;

    const newMessage = {
      senderId: userId, // Farmer's ID
      receiverId: "instructor_456", // Agricultural Instructor's ID
      text: inputText,
    };

    try {
      // Send the message to the backend
      const response = await axios.post(`${BACKEND_URL}/send`, newMessage);

      if (response.data && (response.data as { message: any }).message) {
        // Add the new message to the state
        setMessages((prevMessages) => [
          ...prevMessages,
          (response.data as { message: any }).message, // Ensure this matches the backend response format
        ]);
      }
      setInputText(""); // Clear the input field
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  // Render each message
  const renderMessageItem = ({ item }: { item: any }) => (
    <View
      style={[
        styles.messageContainer,
        item.senderId === userId ? styles.sentMessage : styles.receivedMessage,
      ]}
    >
      <Text style={styles.messageText}>{item.text}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Text style={styles.backText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat Section</Text>
      </View>

      {/* Chat Messages */}
      <FlatList
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.messageList}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Input Field */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Send a message..."
          value={inputText}
          onChangeText={(text) => setInputText(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F0FFF0" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#DDD",
  },
  backButton: { marginRight: 10, borderColor: "#DDD", borderWidth: 2, borderRadius: 20, paddingLeft: 10, paddingRight: 12,paddingBottom: 5, textAlign: "center" },
  backText: { fontSize: 20, fontWeight: "bold" },
  headerTitle: { fontSize: 20, fontWeight: "bold", flex: 1, textAlign: "center" },
  messageList: { flex: 1, paddingHorizontal: 10 },
  messageContainer: { padding: 10, borderRadius: 10, marginVertical: 5, maxWidth: "70%" },
  sentMessage: { alignSelf: "flex-end", backgroundColor: "#DCF8C6" },
  receivedMessage: { alignSelf: "flex-start", backgroundColor: "#EAEAEA" },
  messageText: { fontSize: 14, color: "#000" },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#DDD",
    backgroundColor: "#FFFFFF",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
    backgroundColor: "#FFF",
  },
  sendButton: {
    backgroundColor: "#32CD32",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: { color: "#FFF", fontSize: 20, fontWeight: "bold" },
});
