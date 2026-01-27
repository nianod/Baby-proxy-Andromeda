 //app/(public)/index.tsx
 import { View, Text, StyleSheet } from "react-native";
 
const fullName = (
    firstName: string,
    secondName: string,
    thirdName: string
) => {
    return firstName + ' ' + secondName + ' ' + thirdName;
}

const App = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text} className="text-7xl mt-20">
                Welcome to Andromeda
            </Text>
            <View>
                <Text className="text-5xl text-blue-500 ">Continue to login</Text>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { flex: 1, alignItems: "center"},
    text: {color: "green", fontWeight: "800", }
})

export default App;

