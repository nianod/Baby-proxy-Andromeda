import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, TouchableOpacity, Platform, ScrollView, TextInput } from "react-native";
import greeting from "../util/greeting";
import { Ionicons } from "@expo/vector-icons";

const Dashboard = () => {
  const [task, setTask] = useState<string>('');

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      className="flex-1 bg-gradient-to-b from-blue-50 to-gray-100"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center', paddingHorizontal: 20 }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="bg-white rounded-lg shadow-lg p-6 mx-4">
          <Text className="text-2xl font-bold text-gray-800 text-center mb-4">
            {greeting()}
          </Text>
          <View className="mb-4">
            <Text className="text-lg text-gray-600 text-center">
              What do you wanna do this morning?
            </Text>
          </View>
          <View className="mb-6">
            <Text className="text-base text-gray-500 mb-2">Enter your Tasks below</Text>
            <View className="flex-row items-center gap-3">
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                className="flex-1 rounded-lg border-2 text-xl border-gray-300 p-4 bg-gray-50 text-gray-800"
                placeholder="Type your task here..."
                onChangeText={(task) => setTask(task)}
                value={task}
              />
              <TouchableOpacity className="bg-green-500 flex rounded-lg p-3 active:bg-blue-600">
                <Ionicons name="add" size={26} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;