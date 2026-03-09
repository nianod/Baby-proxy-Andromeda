import React, { useState } from "react";
import { View, Text, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import greeting from "../util/greeting";

const Dashboard = () => {

  const [task, setTask] = useState<string>('')
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      className="justify-center flex-1 bg-gray-50"
    >
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled" 
      >
        <View>
          <Text>{greeting()}</Text>
          <View>
            <Text>What do you wanna do this morning</Text>
          </View>
          <View>
            <Text>Enter your Tasks below</Text>
            <View className="flex gap-3">
              <TextInput 
                autoCorrect={false}
                autoCapitalize="none"
                className=""
                onChangeText={(e) => setTask(e.target.value)}
                value={task}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Dashboard;
