 
import React, { useState } from "react";
import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
  ScrollView,
  TextInput,
} from "react-native";
import greeting from "../util/greeting";
import { Ionicons } from "@expo/vector-icons";
import useUser from "../hooks/fetchUsers";
import { Link } from "expo-router";

const Dashboard = () => {
  const [task, setTask] = useState<string>("");
  const { loading, error, user } = useUser();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 bg-white"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 p-4 mt-20 bg-gray-200">
          <Text className="text-lg font-bold mb-4">
            {greeting()} {user?.name?.toUpperCase()}
           
          </Text>

          <View className="p-6">
            <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
               Manage your Task with Andromeda
            </Text>

            <Text className="text-lg text-gray-600 text-center mb-4">
              What do you wanna do this {greeting().split(" ")[1]}?
            </Text>

            <View className="mb-6">
              <Text className="text-base text-gray-500 mb-2">
                Enter your Tasks below
              </Text>
              <View className="flex-row items-center gap-3">
                <TextInput
                  className="flex-1 rounded-lg border-2 text-xl border-gray-300 p-4 bg-gray-50 text-gray-800"
                  placeholder="Type your task here..."
                  onChangeText={setTask}
                  value={task}
                />
                <TouchableOpacity className="bg-green-500 rounded-lg p-3 active:bg-blue-600">
                  <Ionicons name="add" size={26} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="flex-row justify-around py-12 bg-gray-50 border-t border-gray-200">
        <Link href="/pages/Dashboard" replace asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="home" size={20} color="gray" />
            <Text className="text-xs">Home</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/pages/Completed" replace asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="checkmark-done" size={20} color="gray" />
            <Text className="text-xs">Completed</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/pages/Pending" replace asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="time" size={20} color="gray" />
            <Text className="text-xs">Pending</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/pages/Aborted" replace asChild>
          <TouchableOpacity className="items-center">
            <Ionicons name="ban" size={20} color="gray" />
            <Text className="text-xs">Aborted</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
 