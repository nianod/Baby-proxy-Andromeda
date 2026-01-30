//app/(public)/index.tsx
import { View, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import AntDesign from "react-native-vector-icons/AntDesign";

const App = () => {
  return (
    <View style={styles.container} className="gap-10">
      <Text style={styles.text} className="text-7xl mt-20">
        Welcome to Andromeda
      </Text>
      <View>
        <Text className="text-5xl text-blue-500 ">Continue to login</Text>
      </View>
      <View >
        <Link className="text-xl flex items-center gap-6" href="/login">
          Login here <AntDesign name="login" color="#000" size={24} />
        </Link>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", justifyContent: "center" },
  text: { color: "green", fontWeight: "800" },
  
});

export default App;
