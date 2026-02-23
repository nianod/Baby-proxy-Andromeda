
import '../global.css'
import { Stack } from "expo-router";

export default function PublicLayout() {   
  return (                                 
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" options={{title: "Home"}}/> 
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="pages/dashboard" />
    </Stack>
  );                                         
}

