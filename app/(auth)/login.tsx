import { router } from "expo-router"
import { useState } from "react"
import { KeyboardAvoidingView, Platform, View, Text, TextInput } from "react-native"
import { ScrollView } from "react-native"
import { TouchableOpacity, ActivityIndicator } from "react-native"
import {supabase} from '../lib/supabase'

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
const  login = async () => {
    //basic validation
    if(!formData.email || !formData.password){
        setError( {email: formData.email ? "" : "Email is require" , password: formData.password ? "" : "Password is required"})
        return;
    }

    setLoading(true)
    setError({ email: "", password: ""})

    try{
        const {error: authError} = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })

        if(authError) {
            if(authError.message.includes("invalide login credential")) {
                setError({email: "", password: 'Invalid email or password'})
            } else{
                setError({ email: "", password: authError.message })
            }
            return
            
        }

        router.replace('../dashboard')

    } catch(err){
        setError({email: "", password: "login failed brother. Tyr again sir"})
    } finally{
        setLoading(false)
    }
} 

const Register = () => {
    router.push('/register')
}

  return (
    <KeyboardAvoidingView
        behavior={Platform.OS === "android" ? "height" : "padding"}
        className="flex-1 bg-gray-50 justify-center"
    >
        <ScrollView contentContainerStyle={{flexGrow: 1}} keyboardShouldPersistTaps="handled">
            <View className="px-6 pb-5 flex-1 pt-20">
                <View className="items-center mb-10">
                    <Text className="text-4xl font-semibold mb-2">
                        Welcome back
                    </Text>
                    <Text className="text-xl">
                        Login to your Account
                    </Text>

                    <View className="mt-10 w-full bg-gray-50 p-6 rounded-md shadow-xl">
                        <View>
                            <Text className="font-medium text-gray-700 mb-2">Email</Text>
                            <TextInput className={`border px-4 py-3 rounded-xl text-base ${
                                error.email ? "border-red-500" : "border-gray-300"
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
                        
                        <View className="mt-5">
                            <Text className="font-medium text-gray-700 mb-3">Password</Text>
                            <TextInput
                                className={`font-medium border rounded-xl text-base px-5 py-3 text-gray-700 mb-2 ${
                                    error.password ? "border-e-red-500" : "border-gray-300"
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
                        className={`bg-green-500 py-4 items-center mt-5 rounded-xl ${
                            loading ? "opacity-70" : ""
                        }`}
                            onPress={login}
                            disabled={loading}
                            activeOpacity={0.8}
                        >
                            {loading ? (
                                <ActivityIndicator/>
                            ): (
                                <Text className="font-bold text-xl text-white">Login</Text>
                            )}

                        </TouchableOpacity>
                                    <Text className="text-center text-gray-500 text-sm mt-6">
              By registering, you agree to our{" "}
              <Text className="text-blue-600">Terms of Service</Text> and{" "}
              <Text className="text-blue-600">Privacy Policy</Text>
            </Text>
                    </View>
                    
                </View>
                <View className="flex-row justify-center gap-1">
                    <Text>Don't have an account?</Text>
                    <TouchableOpacity>
                        <Text className="text-blue-500 font-semibold" onPress={Register}>Sign up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen