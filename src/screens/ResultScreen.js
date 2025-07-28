import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ResultScreen = ({ navigation, route }) => {
  const { person, success } = route.params;

  const getStatusColor = () => {
    if (person.status === "eligible") {
      return "bg-green-100 border-green-500";
    }
    return "bg-red-100 border-red-500";
  };

  const getStatusIcon = () => {
    if (person.status === "eligible") {
      return "checkmark-circle";
    }
    return "close-circle";
  };

  const getStatusText = () => {
    if (person.status === "eligible") {
      return "✅ Eligible";
    }
    return "❌ Not Registered";
  };

  const getRoleColor = () => {
    switch (person.role) {
      case "Attendee":
        return "text-rwanda-green";
      case "Sponsor":
        return "text-rwanda-gold";
      case "Exhibitor":
        return "text-rwanda-blue";
      default:
        return "text-gray-600";
    }
  };

  const getRoleIcon = () => {
    switch (person.role) {
      case "Attendee":
        return "people";
      case "Sponsor":
        return "star";
      case "Exhibitor":
        return "grid";
      default:
        return "person";
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 px-6">
        {/* Status Card */}
        <View
          className={`mt-6 p-6 rounded-2xl border-2 ${getStatusColor()} shadow-lg`}
        >
          <View className="items-center">
            <Ionicons
              name={getStatusIcon()}
              size={48}
              color={person.status === "eligible" ? "#10b981" : "#ef4444"}
            />
            <Text className="text-2xl font-bold text-gray-800 mt-4 mb-2">
              {getStatusText()}
            </Text>
            <Text className="text-gray-600 text-center">
              {person.status === "eligible"
                ? "This person is registered and eligible to attend"
                : "This person is not registered in our system"}
            </Text>
          </View>
        </View>

        {/* Person Details */}
        {person.status === "eligible" && (
          <View className="bg-white rounded-2xl p-6 mt-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Attendee Information
            </Text>

            {/* Name */}
            <View className="flex-row items-center mb-4">
              <Ionicons name="person" size={20} color="#1a5f3c" />
              <Text className="text-lg font-semibold text-gray-700 ml-3">
                {person.name}
              </Text>
            </View>

            {/* Role */}
            <View className="flex-row items-center mb-4">
              <Ionicons name={getRoleIcon()} size={20} color="#1a5f3c" />
              <Text className={`text-lg font-semibold ml-3 ${getRoleColor()}`}>
                {person.role}
              </Text>
            </View>

            {/* Company */}
            <View className="flex-row items-center mb-4">
              <Ionicons name="business" size={20} color="#1a5f3c" />
              <Text className="text-lg font-semibold text-gray-700 ml-3">
                {person.company}
              </Text>
            </View>

            {/* ID */}
            <View className="flex-row items-center mb-4">
              <Ionicons name="card" size={20} color="#1a5f3c" />
              <Text className="text-lg font-semibold text-gray-700 ml-3">
                ID: {person.id}
              </Text>
            </View>

            {/* Email */}
            {person.email && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="mail" size={20} color="#1a5f3c" />
                <Text className="text-lg font-semibold text-gray-700 ml-3">
                  {person.email}
                </Text>
              </View>
            )}

            {/* Phone */}
            {person.phone && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="call" size={20} color="#1a5f3c" />
                <Text className="text-lg font-semibold text-gray-700 ml-3">
                  {person.phone}
                </Text>
              </View>
            )}

            {/* Additional Info */}
            {person.sponsorshipLevel && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="trophy" size={20} color="#f4c430" />
                <Text className="text-lg font-semibold text-rwanda-gold ml-3">
                  {person.sponsorshipLevel} Sponsor
                </Text>
              </View>
            )}

            {person.boothNumber && (
              <View className="flex-row items-center mb-4">
                <Ionicons name="location" size={20} color="#0066cc" />
                <Text className="text-lg font-semibold text-rwanda-blue ml-3">
                  Booth {person.boothNumber}
                </Text>
              </View>
            )}

            {/* Registration Date */}
            {person.registrationDate && (
              <View className="flex-row items-center">
                <Ionicons name="calendar" size={20} color="#1a5f3c" />
                <Text className="text-lg font-semibold text-gray-700 ml-3">
                  Registered:{" "}
                  {new Date(person.registrationDate).toLocaleDateString()}
                </Text>
              </View>
            )}
          </View>
        )}

        {/* Not Registered Details */}
        {person.status !== "eligible" && (
          <View className="bg-white rounded-2xl p-6 mt-6 shadow-lg">
            <Text className="text-xl font-bold text-gray-800 mb-4">
              Scan Information
            </Text>

            <View className="flex-row items-center mb-4">
              <Ionicons name="qr-code" size={20} color="#666" />
              <Text className="text-lg font-semibold text-gray-700 ml-3">
                Scanned ID: {person.id}
              </Text>
            </View>

            <Text className="text-gray-600 text-center mt-4">
              This ID was not found in our registration database. Please verify
              the QR code or contact the registration desk.
            </Text>
          </View>
        )}

        {/* Action Buttons */}
        <View className="mt-8 mb-8">
          <TouchableOpacity
            className="bg-rwanda-green w-full py-4 rounded-2xl shadow-lg mb-4"
            onPress={() => navigation.navigate("Scanner")}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="qr-code" size={24} color="white" />
              <Text className="text-white text-xl font-bold ml-2">
                Scan Another
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-gray-200 w-full py-4 rounded-2xl"
            onPress={() => navigation.navigate("Home")}
            activeOpacity={0.8}
          >
            <View className="flex-row items-center justify-center">
              <Ionicons name="home" size={24} color="#666" />
              <Text className="text-gray-600 text-xl font-bold ml-2">
                Back to Home
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ResultScreen;
