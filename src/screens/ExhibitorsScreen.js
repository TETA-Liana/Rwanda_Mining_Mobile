import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ExhibitorsScreen = ({ navigation }) => {
  const [exhibitors, setExhibitors] = useState([]);
  const [filteredExhibitors, setFilteredExhibitors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set your backend base URL here
  const BASE_URL = 'http://172.20.48.69:8080';

  // Mock data - this will be replaced with API call
  // const mockExhibitors = [
  //   {
  //     id: "EXH001",
  //     name: "Lisa Thompson",
  //     company: "Mining Equipment Pro",
  //     email: "lisa.thompson@miningequipment.com",
  //     phone: "+1234567894",
  //     status: "eligible",
  //     boothNumber: "A1",
  //     registrationDate: "2024-01-08",
  //   },
  //   {
  //     id: "EXH002",
  //     name: "Ahmed Hassan",
  //     company: "Safety First Mining Gear",
  //     email: "ahmed.hassan@safetyfirst.com",
  //     phone: "+1234567895",
  //     status: "eligible",
  //     boothNumber: "A2",
  //     registrationDate: "2024-01-09",
  //   },
  //   {
  //     id: "EXH003",
  //     name: "Elena Rodriguez",
  //     company: "Green Mining Solutions",
  //     email: "elena.rodriguez@greenmining.com",
  //     phone: "+1234567896",
  //     status: "eligible",
  //     boothNumber: "B1",
  //     registrationDate: "2024-01-11",
  //   },
  //   {
  //     id: "EXH004",
  //     name: "James O'Connor",
  //     company: "Mining Analytics Corp",
  //     email: "james.oconnor@mininganalytics.com",
  //     phone: "+1234567897",
  //     status: "eligible",
  //     boothNumber: "B2",
  //     registrationDate: "2024-01-13",
  //   },
  //   {
  //     id: "EXH005",
  //     name: "Yuki Tanaka",
  //     company: "Precision Mining Tools",
  //     email: "yuki.tanaka@precisionmining.com",
  //     phone: "+1234567898",
  //     status: "eligible",
  //     boothNumber: "C1",
  //     registrationDate: "2024-01-16",
  //   },
  // ];

  useEffect(() => {
    loadExhibitors();
  }, []);

  useEffect(() => {
    filterExhibitors();
  }, [searchQuery, exhibitors]);

  const loadExhibitors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/exhibitors`);
      const data = await response.json();
      setExhibitors(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading exhibitors:", error);
      setIsLoading(false);
    }
  };

  const filterExhibitors = () => {
    if (!searchQuery.trim()) {
      setFilteredExhibitors(exhibitors);
      return;
    }

    const filtered = exhibitors.filter(
      (exhibitor) =>
        exhibitor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibitor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibitor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibitor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exhibitor.boothNumber.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExhibitors(filtered);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadExhibitors().finally(() => setRefreshing(false));
  }, []);

  const renderExhibitor = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons name="grid" size={20} color="#0066cc" />
          <Text className="text-lg font-bold text-gray-800 ml-2">
            {item.name}
          </Text>
        </View>
        <View className="bg-green-100 px-2 py-1 rounded-full">
          <Text className="text-xs font-semibold text-green-600">
            {item.status}
          </Text>
        </View>
      </View>

      <View className="mb-2">
        <Text className="text-gray-600 font-semibold">{item.company}</Text>
      </View>

      <View className="flex-row items-center mb-1">
        <Ionicons name="mail" size={14} color="#666" />
        <Text className="text-sm text-gray-600 ml-1">{item.email}</Text>
      </View>

      <View className="flex-row items-center mb-2">
        <Ionicons name="call" size={14} color="#666" />
        <Text className="text-sm text-gray-600 ml-1">{item.phone}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center">
          <Ionicons name="card" size={14} color="#666" />
          <Text className="text-sm text-gray-500 ml-1">ID: {item.id}</Text>
        </View>
        <View className="flex-row items-center">
          <Ionicons name="location" size={14} color="#0066cc" />
          <Text className="text-sm font-semibold text-rwanda-blue ml-1">
            Booth {item.boothNumber}
          </Text>
        </View>
      </View>

      <View className="flex-row items-center mt-2">
        <Ionicons name="calendar" size={14} color="#666" />
        <Text className="text-sm text-gray-500 ml-1">
          Registered: {new Date(item.registrationDate).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-4 shadow-sm">
        <View className="flex-row items-center justify-between">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#1a5f3c" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-gray-800">Exhibitors</Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="bg-white rounded-xl flex-row items-center px-4 py-3 shadow-sm">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search exhibitors..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Ionicons name="close-circle" size={20} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <View className="w-12 h-12 border-4 border-rwanda-blue border-t-transparent rounded-full animate-spin mb-4"></View>
            <Text className="text-gray-600">Loading exhibitors...</Text>
          </View>
        ) : (
          <>
            {/* Summary */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
                  Total Exhibitors
                </Text>
                <Text className="text-2xl font-bold text-rwanda-blue">
                  {exhibitors.length}
                </Text>
              </View>
              <Text className="text-sm text-gray-600 mt-1">
                {filteredExhibitors.length} showing
                {searchQuery && ` for "${searchQuery}"`}
              </Text>
            </View>

            {/* Exhibitors List */}
            <FlatList
              data={filteredExhibitors}
              renderItem={renderExhibitor}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View className="items-center py-8">
                  <Ionicons name="grid" size={48} color="#ccc" />
                  <Text className="text-gray-500 mt-2">No exhibitors found</Text>
                  {searchQuery && (
                    <Text className="text-gray-400 text-sm text-center mt-1">
                      Try adjusting your search terms
                    </Text>
                  )}
                </View>
              }
            />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default ExhibitorsScreen; 