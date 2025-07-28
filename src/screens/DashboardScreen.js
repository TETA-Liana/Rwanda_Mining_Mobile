import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-svg-charts";
import useScanStore from "../store/scanStore";

const DashboardScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const scannedPeople = useScanStore((state) => state.scannedPeople);
  const getStats = useScanStore((state) => state.getStats);
  const clearData = useScanStore((state) => state.clearData);

  const stats = getStats();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const chartData = [
    {
      key: 1,
      amount: stats.attendees,
      svg: { fill: "#1a5f3c" },
      arc: { cornerRadius: 5 },
    },
    {
      key: 2,
      amount: stats.sponsors,
      svg: { fill: "#f4c430" },
      arc: { cornerRadius: 5 },
    },
    {
      key: 3,
      amount: stats.exhibitors,
      svg: { fill: "#0066cc" },
      arc: { cornerRadius: 5 },
    },
  ].filter((item) => item.amount > 0);

  const renderRecentScan = ({ item }) => {
    const getRoleColor = () => {
      switch (item.role) {
        case "Attendee":
          return "bg-green-100 text-rwanda-green";
        case "Sponsor":
          return "bg-yellow-100 text-rwanda-gold";
        case "Exhibitor":
          return "bg-blue-100 text-rwanda-blue";
        default:
          return "bg-gray-100 text-gray-600";
      }
    };

    const getStatusIcon = () => {
      return item.status === "eligible" ? "checkmark-circle" : "close-circle";
    };

    const getStatusColor = () => {
      return item.status === "eligible" ? "#10b981" : "#ef4444";
    };

    return (
      <View className="bg-white rounded-xl p-4 mb-3 shadow-sm">
        <View className="flex-row items-center justify-between">
          <View className="flex-1">
            <View className="flex-row items-center mb-2">
              <Ionicons
                name={getStatusIcon()}
                size={16}
                color={getStatusColor()}
              />
              <Text className="text-sm font-semibold text-gray-600 ml-2">
                {new Date(item.scannedAt).toLocaleTimeString()}
              </Text>
            </View>
            <Text className="text-lg font-bold text-gray-800 mb-1">
              {item.name}
            </Text>
            <Text className="text-gray-600 mb-2">{item.company}</Text>
            <View className="flex-row items-center">
              <View className={`px-2 py-1 rounded-full ${getRoleColor()}`}>
                <Text className="text-xs font-semibold">{item.role}</Text>
              </View>
              <Text className="text-xs text-gray-500 ml-2">ID: {item.id}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView
        className="flex-1 px-6"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Header */}
        <View className="mt-6 mb-6">
          <Text className="text-2xl font-bold text-gray-800 mb-2">
            Admin Dashboard
          </Text>
          <Text className="text-gray-600">
            Real-time scanning statistics and analytics
          </Text>
        </View>

        {/* Main Stats Cards */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-white rounded-xl p-4 flex-1 mr-2 shadow-sm">
            <View className="items-center">
              <Ionicons name="qr-code" size={24} color="#1a5f3c" />
              <Text className="text-sm text-gray-600 mt-1">Total Scanned</Text>
              <Text className="text-2xl font-bold text-rwanda-green">
                {stats.total}
              </Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 flex-1 mx-1 shadow-sm">
            <View className="items-center">
              <Ionicons name="checkmark-circle" size={24} color="#10b981" />
              <Text className="text-sm text-gray-600 mt-1">Valid</Text>
              <Text className="text-2xl font-bold text-green-600">
                {stats.valid}
              </Text>
            </View>
          </View>

          <View className="bg-white rounded-xl p-4 flex-1 ml-2 shadow-sm">
            <View className="items-center">
              <Ionicons name="close-circle" size={24} color="#ef4444" />
              <Text className="text-sm text-gray-600 mt-1">Invalid</Text>
              <Text className="text-2xl font-bold text-red-600">
                {stats.invalid}
              </Text>
            </View>
          </View>
        </View>

        {/* Eligibility Percentage */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Eligibility Rate
          </Text>
          <View className="items-center">
            <View className="w-32 h-32 items-center justify-center">
              <Text className="text-4xl font-bold text-rwanda-green">
                {stats.eligibilityPercentage}%
              </Text>
            </View>
            <Text className="text-gray-600 text-center mt-2">
              {stats.valid} out of {stats.total} scans are valid
            </Text>
          </View>
        </View>

        {/* Role Breakdown */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Breakdown by Role
          </Text>

          {chartData.length > 0 ? (
            <View className="items-center mb-4">
              <PieChart
                style={{ height: 200, width: 200 }}
                data={chartData}
                innerRadius={40}
                padAngle={0.02}
              />
            </View>
          ) : (
            <View className="items-center py-8">
              <Ionicons name="pie-chart" size={48} color="#ccc" />
              <Text className="text-gray-500 mt-2">No data to display</Text>
            </View>
          )}

          <View className="flex-row justify-between">
            <View className="items-center flex-1">
              <View className="w-4 h-4 bg-rwanda-green rounded-full mb-1"></View>
              <Text className="text-sm text-gray-600">Attendees</Text>
              <Text className="text-lg font-bold text-rwanda-green">
                {stats.attendees}
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="w-4 h-4 bg-rwanda-gold rounded-full mb-1"></View>
              <Text className="text-sm text-gray-600">Sponsors</Text>
              <Text className="text-lg font-bold text-rwanda-gold">
                {stats.sponsors}
              </Text>
            </View>

            <View className="items-center flex-1">
              <View className="w-4 h-4 bg-rwanda-blue rounded-full mb-1"></View>
              <Text className="text-sm text-gray-600">Exhibitors</Text>
              <Text className="text-lg font-bold text-rwanda-blue">
                {stats.exhibitors}
              </Text>
            </View>
          </View>
        </View>

        {/* Recent Scans */}
        <View className="bg-white rounded-2xl p-6 mb-6 shadow-lg">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-xl font-bold text-gray-800">
              Recent Scans
            </Text>
            <TouchableOpacity
              onPress={clearData}
              className="bg-red-100 px-3 py-1 rounded-lg"
            >
              <Text className="text-red-600 text-sm font-semibold">
                Clear All
              </Text>
            </TouchableOpacity>
          </View>

          {scannedPeople.length > 0 ? (
            <FlatList
              data={scannedPeople.slice(0, 10)}
              renderItem={renderRecentScan}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="items-center py-8">
              <Ionicons name="list" size={48} color="#ccc" />
              <Text className="text-gray-500 mt-2">No scans yet</Text>
              <Text className="text-gray-400 text-sm text-center mt-1">
                Start scanning to see results here
              </Text>
            </View>
          )}
        </View>

        {/* Quick Actions */}
        <View className="bg-white rounded-2xl p-6 mb-8 shadow-lg">
          <Text className="text-xl font-bold text-gray-800 mb-4">
            Quick Actions
          </Text>

          <View className="flex-row justify-between">
            <TouchableOpacity className="bg-rwanda-green px-4 py-3 rounded-xl flex-1 mr-2">
              <View className="items-center">
                <Ionicons name="qr-code" size={24} color="white" />
                <Text className="text-white font-semibold mt-1">
                  Start Scan
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity className="bg-gray-200 px-4 py-3 rounded-xl flex-1 ml-2">
              <View className="items-center">
                <Ionicons name="download" size={24} color="#666" />
                <Text className="text-gray-600 font-semibold mt-1">
                  Export Data
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashboardScreen;
