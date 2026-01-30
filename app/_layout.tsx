 import '../global.css'
 //app/(public)/_layout.tsx
import { Stack } from "expo-router";

export default function PublicLayout() {  // ← 1. Add "export default function"
  return (                                 // ← 2. Add "return"
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{title: "Home"}}/> 
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
    </Stack>
  );                                         
}
