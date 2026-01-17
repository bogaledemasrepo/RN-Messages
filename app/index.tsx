import { ChatRoom } from '@/types';
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChatRoomList = () => {
  const [messages, setMessages] = useState<ChatRoom[]>([{
    id: '1',
    name: 'General',
    participants: ['user1', 'user2'],
    lastMessage: {
      id: 'm1',
      senderId: 'user1',
      receiverId: 'user2',
      text: 'Hello there!',
      timestamp: Date.now(),
    },
  }]);



  const renderItem = ({ item }: { item: ChatRoom }) => (
    <TouchableOpacity onPress={() => router.navigate(`/${item.id}`)} style={[
      styles.bubble,styles.theirBubble
    ]}>
      <Text style={styles.theirText}>
        {item.lastMessage?.text}
      </Text>
    </TouchableOpacity>
  );

  return (<SafeAreaView style={{ flex: 1 }}>
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listPadding}
      />
    </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  listPadding: { paddingHorizontal: 10, paddingVertical: 8 },
  bubble: {
    padding: 16,
    borderRadius: 3,
    marginVertical: 4,
    width: '100%',
    elevation: 3,
  },
  theirBubble: {
    width: '100%',
    alignSelf: 'flex-start',
    backgroundColor: '#E5E5EA',
  },
  myText: { color: '#fff' },
  theirText: { color: '#000' }
});

export default ChatRoomList;