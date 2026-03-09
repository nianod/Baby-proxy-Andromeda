import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View,} from "react-native";
import { supabase } from "../lib/supabase";
 
interface FormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterScreen = () => {
  const [formData, setFormData] = useState<{
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
  }>({
    email: "",
    password: "",
    confirmPassword: "",
    name: ""
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
    confirmPassword?: string;
    name?: string;
  }>({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const register = async () => {
    if (!validateForm()) {
      return;
    }
    setError("");
    setLoading(true);
    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name
          }
        }
      });
      if (authError) {
        setError(authError.message);
        return;
      }
      await new Promise((resolve) => setTimeout(resolve, 1000));

      Alert.alert("success", "Registration successful", [{ text: "OK" }]);

      router.replace("/pages/Dashboard");

      if (authError)
        setFormData({
          email: "",
          name: "",
          password: "",
          confirmPassword: "",
        });
      setErrors({});
    } catch (error) {
      setError("Error occures");
      Alert.alert("Error", "Registration failed. Please try again.", [
        { text: "OK" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    field: "email" |"name" | "password" | "confirmPassword",
    value: String,
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const Login = () => {
    router.push("/(auth)/login");
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 px-6 pt-20 pb-10">
          <View className="items-center mb-10">
            <Text className="text-4xl font-bold text-gray-800 mb-2">
              Welcome
            </Text>
            <Text className="text-lg text-gray-600">Create your account</Text>
          </View>

          <View className="bg-white rounded-2xl shadow-lg p-6">
            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2 ">
                Email Address
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base ${
                  errors.email ? "border-red-500" : "border-green-500"
                }`}
                onChangeText={(value) => handleChange("email", value)}
                value={formData.email}
                placeholder="Enter your email"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.email && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.email}
                </Text>
              )}
            </View>

             <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2 ">
                Custom Name
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base ${
                  errors.name ? "border-red-500" : "border-green-500"
                }`}
                onChangeText={(value) => handleChange("name", value)}
                value={formData.name}
                placeholder="Enter your name"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />
              {errors.name && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.name}
                </Text>
              )}
            </View>

            <View className="mb-6">
              <Text className="text-gray-700 font-medium mb-2 text-base">
                Password
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base ${
                  errors.password ? "border-red-500" : "border-green-500"
                }`}
                onChangeText={(value) => handleChange("password", value)}
                value={formData.password}
                placeholder="Create a password"
                secureTextEntry
              />
              {errors.password && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.password}
                </Text>
              )}
            </View>

            <View className="mb-8">
              <Text className="text-gray-700 font-medium mb-2 text-base">
                Confirm Password
              </Text>
              <TextInput
                className={`border rounded-xl px-4 py-3 text-base ${
                  errors.confirmPassword ? "border-red-500" : "border-green-600"
                }`}
                onChangeText={(value) => handleChange("confirmPassword", value)}
                value={formData.confirmPassword}
                placeholder="Confirm your password"
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword}
                </Text>
              )}
            </View>
            <View>
              <TouchableOpacity
                className={`bg-green-600  rounded-xl py-4 items-center justify-center ${
                  loading ? "opacity-70" : ""
                }`}
                onPress={register}
                disabled={loading}
                activeOpacity={0.8}
              >
                {loading ? (
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Text className="text-white font-semibold text-lg">
                    Register
                  </Text>
                )}
              </TouchableOpacity>
              {error && (
                <Text className="text-red-500 text-sm mt-2 text-center">
                  {error}
                </Text>
              )}
            </View>
              <Text className="text-center mt-3 font-bold text-xl">OR</Text>

              <View className=" flex flex-row justify-center gap-3 mt-5">
                <TouchableOpacity className="">
                    <Image
                      source={require('../../assets/download.png')}
                      style={{width: 40, height: 40}} 
                      resizeMode="contain"
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/github.png')}
                    style={{width: 40, height: 40}} 
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
            <Text className="text-center text-gray-500 text-sm mt-6">
              By registering, you agree to our{" "}
              <Text className="text-blue-600">Terms of Service</Text> and{" "}
              <Text className="text-blue-600">Privacy Policy</Text>
            </Text>
          </View>

          <View className="flex-row justify-center mt-8">
            <Text className="text-gray-600">Already have an account? </Text>
            <TouchableOpacity>
              <Text className="text-blue-600 font-semibold" onPress={Login}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
