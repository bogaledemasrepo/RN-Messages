export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp?: number;
}

export interface ChatRoom {
  id: string;
  name: string;
  participants: string[];
  lastMessage?: Message;
}

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

