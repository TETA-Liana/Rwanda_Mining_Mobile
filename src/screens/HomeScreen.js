import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="flex-1 justify-center items-center px-6">
        {/* Header */}
        <View className="items-center mb-12">
          <View className="w-24 h-24 bg-rwanda-green rounded-full items-center justify-center mb-6">
            <Ionicons name="business" size={48} color="#f4c430" />
          </View>
          <Text className="text-3xl font-bold text-rwanda-green text-center mb-2">
            Rwanda Mining Week
          </Text>
          <Text className="text-xl font-semibold text-gray-600 text-center">
            Check-In System
          </Text>
        </View>

        {/* Welcome Message */}
        <View className="bg-white rounded-2xl p-6 mb-8 w-full shadow-lg">
          <Text className="text-lg text-gray-700 text-center leading-6">
            Welcome to Rwanda Mining Week 2024! Please scan QR codes or IDs to
            verify attendee eligibility.
          </Text>
        </View>

        {/* Start Scanning Button */}
        <TouchableOpacity
          className="bg-rwanda-green w-full py-4 rounded-2xl shadow-lg"
          onPress={() => navigation.navigate("Scanner")}
          activeOpacity={0.8}
        >
          <View className="flex-row items-center justify-center">
            <Ionicons name="qr-code" size={24} color="white" className="mr-2" />
            <Text className="text-white text-xl font-bold ml-2">
              Start Scanning
            </Text>
          </View>
        </TouchableOpacity>

        {/* Info Cards */}
        <View className="flex-row justify-between w-full mt-8">
          <TouchableOpacity 
            className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm"
            onPress={() => navigation.navigate("Attendees")}
            activeOpacity={0.7}
          >
            <View className="items-center">
              <Ionicons name="people" size={24} color="#1a5f3c" />
              <Text className="text-sm text-gray-600 mt-1">Attendees</Text>
              <Text className="text-lg font-bold text-rwanda-green">5</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm"
            onPress={() => navigation.navigate("Sponsors")}
            activeOpacity={0.7}
          >
            <View className="items-center">
              <Ionicons name="star" size={24} color="#f4c430" />
              <Text className="text-sm text-gray-600 mt-1">Sponsors</Text>
              <Text className="text-lg font-bold text-rwanda-gold">4</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity 
            className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm"
            onPress={() => navigation.navigate("Exhibitors")}
            activeOpacity={0.7}
          >
            <View className="items-center">
              <Ionicons name="grid" size={24} color="#0066cc" />
              <Text className="text-sm text-gray-600 mt-1">Exhibitors</Text>
              <Text className="text-lg font-bold text-rwanda-blue">5</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <View className="mt-8">
          <Text className="text-gray-500 text-center text-sm">
            Tap the Dashboard tab to view statistics
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
