import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, View, Text, TextInput } from "react-native"
import { ScrollView } from "react-native"
import { TouchableOpacity, ActivityIndicator } from "react-native"
const LoginScreen = () => {
    const [formData, setFormData] = useState<{email: string, password: string}>({ 
        email: "",
        password:""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<{email?: string, password?: string}>({})
  const handleChange = (field: "email" | "password", value: string) => {
  setFormData(prev => ({ ...prev, [field]: value }))
  if (error[field]) {
    setError(prev => ({ ...prev, [field]: "" }))
  }
}
const login = () => {

} 

const Register = () => {
    router.push('/register')
}

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        className="flex-1 bg-gray-50"
    >
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
            <View className="px-6 pb-9 flex-1 pt-20">
                <View className="items-center mb-10">
                    <Text className="text-4xl font-semibold mb-2">
                        Welcom back
                    </Text>
                    <Text className="text-xl">
                        Login to your Account
                    </Text>

                    <View className="bg-gray-50 p-6 rounded-md shadow-lg">
                        <View>
                            <Text className="font-medium text-gray-700 mb-2">Email</Text>
                            <TextInput className={`border px-4 py-3 rounded-xl text-base ${
                                error ? "border-red-500" : "border-gray-300"
                            }`}
                             placeholder="Enter your email address"
                             autoCapitalize="none"
                             autoCorrect={false}
                             keyboardType="email-address"
                             onChangeText={(value) => handleChange("email", value)}
                             value={formData.email}
                            />
                               {error.email && (
                                <Text className="text-sm mt-1 text-red-500">{error.email}</Text>
                               )}
                            
                        </View>
                        <View>
                            <Text className="font-medium text-gray-700 mb-2">Password</Text>
                            <TextInput
                                className={`font-medium border text-gray-700 mb-2 ${
                                    error ? "border-e-red-500" : "border-gray-300"
                                }`}
                                secureTextEntry
                                placeholder="Type your password here"
                                value={formData.password}
                                onChangeText={(value) => handleChange("password", value)}
                            />
                            {error.password && (
                               <Text className="text-red-500 text-sm mt-1">{error.password}</Text>
                             )}    
                        </View>
                        <TouchableOpacity 
                        className={`bg-green-500 py-4 items-center rounded-xl ${
                            loading ? "opacity-70" : ""
                        }`}
                            onPress={login}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator/>
                            ): (
                                <Text className="font-bold text-xl">Register</Text>
                            )}

                        </TouchableOpacity>
                    </View>
                    
                </View>
                <View>
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text onPress={Register}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen