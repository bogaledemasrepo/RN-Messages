import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="index" options={{ title: 'Chat Rooms' }} />
    <Stack.Screen name="[roomId]" options={{ title: 'Chat Room' }} />
  </Stack>
}
