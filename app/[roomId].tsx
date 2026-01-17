import { Message } from "@/types";
import React, { useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChatRoomList = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    senderId: 'user1',
    receiverId: 'user2',
    text: 'Hello! This is a sample message.',
    timestamp: Date.now(),
  }]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;

    // Add new message to the start of the array because the list is inverted
    const newMessage = {
      id: Date.now().toString(),
      senderId: "me",
      receiverId: "user2",
      text: message,
      timestamp: Date.now(),
    };

    setMessages([newMessage, ...messages]);
    setMessage("");
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.bubble,
        item.senderId === "me" ? styles.myBubble : styles.theirBubble,
      ]}
    >
      <Text style={item.senderId === "me" ? styles.myText : styles.theirText}>
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <FlatList
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          inverted // This flips the list to start from the bottom
          contentContainerStyle={styles.listPadding}
        />

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={90} // Adjust based on your header height
        >
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              value={message}
              onChangeText={setMessage}
              placeholder="Type a message..."
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Text style={styles.sendButtonText}>Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  listPadding: { paddingHorizontal: 10, paddingVertical: 20 },
  bubble: {
    padding: 12,
    borderRadius: 6,
    marginVertical: 5,
    maxWidth: "80%",
  },
  myBubble: {
    alignSelf: "flex-end",
    backgroundColor: "#007AFF",
  },
  theirBubble: {
    alignSelf: "flex-start",
    backgroundColor: "#E5E5EA",
  },
  myText: { color: "#fff" },
  theirText: { color: "#000" },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: { backgroundColor: "#007AFF", padding: 10, borderRadius: 20 },
  sendButtonText: { color: "#fff", fontWeight: "bold" },
});

export default ChatRoomList;
