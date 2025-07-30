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

const SponsorsScreen = ({ navigation }) => {
  const [sponsors, setSponsors] = useState([]);
  const [filteredSponsors, setFilteredSponsors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set your backend base URL here
  const BASE_URL = 'http://172.20.48.69:8080';

  // Mock data - this will be replaced with API call
  // const mockSponsors = [
  //   {
  //     id: "SPO001",
  //     name: "Dr. Sarah Johnson",
  //     company: "Mining Solutions Inc.",
  //     email: "sarah.johnson@miningsolutions.com",
  //     phone: "+1234567890",
  //     status: "eligible",
  //     sponsorshipLevel: "Platinum",
  //     registrationDate: "2024-01-10",
  //   },
  //   {
  //     id: "SPO002",
  //     name: "Michael Chen",
  //     company: "Global Mining Technologies",
  //     email: "michael.chen@gmt.com",
  //     phone: "+1234567891",
  //     status: "eligible",
  //     sponsorshipLevel: "Gold",
  //     registrationDate: "2024-01-12",
  //   },
  //   {
  //     id: "SPO003",
  //     name: "Fatima Al-Zahra",
  //     company: "African Mining Consortium",
  //     email: "fatima.alzahra@amc.africa",
  //     phone: "+1234567892",
  //     status: "eligible",
  //     sponsorshipLevel: "Silver",
  //     registrationDate: "2024-01-15",
  //   },
  //   {
  //     id: "SPO004",
  //     name: "Robert Williams",
  //     company: "Sustainable Mining Partners",
  //     email: "robert.williams@smp.com",
  //     phone: "+1234567893",
  //     status: "eligible",
  //     sponsorshipLevel: "Bronze",
  //     registrationDate: "2024-01-18",
  //   },
  // ];

  const sponsorshipLevels = ["All", "Platinum", "Gold", "Silver", "Bronze"];

  useEffect(() => {
    loadSponsors();
  }, []);

  useEffect(() => {
    filterSponsors();
  }, [searchQuery, selectedLevel, sponsors]);

  const loadSponsors = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/sponsors`);
      const data = await response.json();
      setSponsors(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading sponsors:", error);
      setIsLoading(false);
    }
  };

  const filterSponsors = () => {
    let filtered = sponsors;

    // Filter by sponsorship level
    if (selectedLevel !== "All") {
      filtered = filtered.filter(
        (sponsor) => sponsor.sponsorshipLevel === selectedLevel
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (sponsor) =>
          sponsor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sponsor.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sponsor.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sponsor.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          sponsor.sponsorshipLevel.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredSponsors(filtered);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadSponsors().finally(() => setRefreshing(false));
  }, []);

  const getLevelColor = (level) => {
    switch (level) {
      case "Platinum":
        return "#E5E4E2";
      case "Gold":
        return "#FFD700";
      case "Silver":
        return "#C0C0C0";
      case "Bronze":
        return "#CD7F32";
      default:
        return "#666";
    }
  };

  const renderSponsor = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons name="star" size={20} color="#f4c430" />
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
          <Ionicons name="trophy" size={14} color={getLevelColor(item.sponsorshipLevel)} />
          <Text className="text-sm font-semibold text-rwanda-gold ml-1">
            {item.sponsorshipLevel}
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

  const renderLevelFilter = ({ item }) => (
    <TouchableOpacity
      className={`px-4 py-2 rounded-full mr-2 ${
        selectedLevel === item
          ? "bg-rwanda-gold"
          : "bg-gray-200"
      }`}
      onPress={() => setSelectedLevel(item)}
    >
      <Text
        className={`text-sm font-semibold ${
          selectedLevel === item ? "text-white" : "text-gray-600"
        }`}
      >
        {item}
      </Text>
    </TouchableOpacity>
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
          <Text className="text-xl font-bold text-gray-800">Sponsors</Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="bg-white rounded-xl flex-row items-center px-4 py-3 shadow-sm">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search sponsors..."
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

      {/* Level Filter */}
      <View className="px-6 mb-4">
        <FlatList
          data={sponsorshipLevels}
          renderItem={renderLevelFilter}
          keyExtractor={(item) => item}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Content */}
      <View className="flex-1 px-6">
        {isLoading ? (
          <View className="flex-1 justify-center items-center">
            <View className="w-12 h-12 border-4 border-rwanda-gold border-t-transparent rounded-full animate-spin mb-4"></View>
            <Text className="text-gray-600">Loading sponsors...</Text>
          </View>
        ) : (
          <>
            {/* Summary */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
                  Total Sponsors
                </Text>
                <Text className="text-2xl font-bold text-rwanda-gold">
                  {sponsors.length}
                </Text>
              </View>
              <Text className="text-sm text-gray-600 mt-1">
                {filteredSponsors.length} showing
                {selectedLevel !== "All" && ` (${selectedLevel})`}
                {searchQuery && ` for "${searchQuery}"`}
              </Text>
            </View>

            {/* Sponsors List */}
            <FlatList
              data={filteredSponsors}
              renderItem={renderSponsor}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View className="items-center py-8">
                  <Ionicons name="star" size={48} color="#ccc" />
                  <Text className="text-gray-500 mt-2">No sponsors found</Text>
                  {(searchQuery || selectedLevel !== "All") && (
                    <Text className="text-gray-400 text-sm text-center mt-1">
                      Try adjusting your filters
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

export default SponsorsScreen; 