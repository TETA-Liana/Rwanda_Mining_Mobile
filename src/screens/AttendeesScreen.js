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

const AttendeesScreen = ({ navigation }) => {
  const [attendees, setAttendees] = useState([]);
  const [filteredAttendees, setFilteredAttendees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Set your backend base URL here
  const BASE_URL = 'http://172.20.48.69:8080';

  // Mock data - this will be replaced with API call
  // const mockAttendees = [
  //   {
  //     id: "ATT001",
  //     name: "Jean Pierre Uwimana",
  //     company: "Rwanda Mining Association",
  //     email: "jean.uwimana@rwandamining.rw",
  //     phone: "+250788123456",
  //     status: "eligible",
  //     registrationDate: "2024-01-15",
  //   },
  //   {
  //     id: "ATT002",
  //     name: "Marie Claire Niyonsaba",
  //     company: "Kigali Chamber of Commerce",
  //     email: "marie.niyonsaba@kcc.rw",
  //     phone: "+250789234567",
  //     status: "eligible",
  //     registrationDate: "2024-01-20",
  //   },
  //   {
  //     id: "ATT003",
  //     name: "Emmanuel Gasana",
  //     company: "Rwanda Development Board",
  //     email: "emmanuel.gasana@rdb.rw",
  //     phone: "+250790345678",
  //     status: "eligible",
  //     registrationDate: "2024-01-25",
  //   },
  //   {
  //     id: "ATT004",
  //     name: "Grace Mukamana",
  //     company: "University of Rwanda",
  //     email: "grace.mukamana@ur.ac.rw",
  //     phone: "+250791456789",
  //     status: "eligible",
  //     registrationDate: "2024-02-01",
  //   },
  //   {
  //     id: "ATT005",
  //     name: "David Nshuti",
  //     company: "Rwanda Mining Corporation",
  //     email: "david.nshuti@rmc.rw",
  //     phone: "+250792567890",
  //     status: "eligible",
  //     registrationDate: "2024-02-05",
  //   },
  // ];

  useEffect(() => {
    loadAttendees();
  }, []);

  useEffect(() => {
    filterAttendees();
  }, [searchQuery, attendees]);

  const loadAttendees = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/api/attendees`);
      const data = await response.json();
      setAttendees(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading attendees:", error);
      setIsLoading(false);
    }
  };

  const filterAttendees = () => {
    if (!searchQuery.trim()) {
      setFilteredAttendees(attendees);
      return;
    }

    const filtered = attendees.filter(
      (attendee) =>
        attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        attendee.id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredAttendees(filtered);
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    loadAttendees().finally(() => setRefreshing(false));
  }, []);

  const renderAttendee = ({ item }) => (
    <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
      <View className="flex-row items-center justify-between mb-2">
        <View className="flex-row items-center">
          <Ionicons name="person" size={20} color="#1a5f3c" />
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
          <Ionicons name="calendar" size={14} color="#666" />
          <Text className="text-sm text-gray-500 ml-1">
            {new Date(item.registrationDate).toLocaleDateString()}
          </Text>
        </View>
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
          <Text className="text-xl font-bold text-gray-800">Attendees</Text>
          <View className="w-10" />
        </View>
      </View>

      {/* Search Bar */}
      <View className="px-6 py-4">
        <View className="bg-white rounded-xl flex-row items-center px-4 py-3 shadow-sm">
          <Ionicons name="search" size={20} color="#666" />
          <TextInput
            className="flex-1 ml-3 text-gray-800"
            placeholder="Search attendees..."
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
            <View className="w-12 h-12 border-4 border-rwanda-green border-t-transparent rounded-full animate-spin mb-4"></View>
            <Text className="text-gray-600">Loading attendees...</Text>
          </View>
        ) : (
          <>
            {/* Summary */}
            <View className="bg-white rounded-xl p-4 mb-4 shadow-sm">
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
                  Total Attendees
                </Text>
                <Text className="text-2xl font-bold text-rwanda-green">
                  {attendees.length}
                </Text>
              </View>
              <Text className="text-sm text-gray-600 mt-1">
                {filteredAttendees.length} showing
                {searchQuery && ` for "${searchQuery}"`}
              </Text>
            </View>

            {/* Attendees List */}
            <FlatList
              data={filteredAttendees}
              renderItem={renderAttendee}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              ListEmptyComponent={
                <View className="items-center py-8">
                  <Ionicons name="people" size={48} color="#ccc" />
                  <Text className="text-gray-500 mt-2">No attendees found</Text>
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

export default AttendeesScreen; 