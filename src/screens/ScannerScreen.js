import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Ionicons } from "@expo/vector-icons";
import { lookupPerson } from "../services/dataService";
import useScanStore from "../store/scanStore";

const ScannerScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const addScannedPerson = useScanStore((state) => state.addScannedPerson);

  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getBarCodeScannerPermissions();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    if (scanned) return;

    setScanned(true);
    setIsLoading(true);

    try {
      const result = await lookupPerson(data);
      addScannedPerson(result.data);

      navigation.navigate("Result", {
        person: result.data,
        success: result.success,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to process scan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleMockScan = async () => {
    setIsLoading(true);

    // Simulate scanning with a random ID from our mock data
    const mockIds = [
      "ATT001",
      "SPO001",
      "EXH001",
      "ATT002",
      "SPO002",
      "EXH002",
      "INVALID001",
    ];
    const randomId = mockIds[Math.floor(Math.random() * mockIds.length)];

    try {
      const result = await lookupPerson(randomId);
      addScannedPerson(result.data);

      navigation.navigate("Result", {
        person: result.data,
        success: result.success,
      });
    } catch (error) {
      Alert.alert("Error", "Failed to process scan. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetScanner = () => {
    setScanned(false);
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center">
        <Text className="text-lg text-gray-600">
          Requesting camera permission...
        </Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView className="flex-1 bg-gray-50 justify-center items-center px-6">
        <View className="items-center">
          <Ionicons name="camera-off" size={64} color="#666" />
          <Text className="text-xl font-semibold text-gray-700 mt-4 mb-2">
            Camera Access Required
          </Text>
          <Text className="text-gray-600 text-center mb-6">
            This app needs camera access to scan QR codes. Please enable camera
            permissions in your device settings.
          </Text>
          <TouchableOpacity
            className="bg-rwanda-green px-6 py-3 rounded-xl"
            onPress={handleMockScan}
          >
            <Text className="text-white font-semibold">Use Mock Scanner</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-black">
      {!scanned && !isLoading && (
        <View className="flex-1">
          <BarCodeScanner
            onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
            style={{ flex: 1 }}
          />

          {/* Overlay */}
          <View className="absolute inset-0 justify-center items-center">
            <View className="w-64 h-64 border-2 border-white rounded-2xl">
              <View className="absolute top-0 left-0 w-8 h-8 border-l-4 border-t-4 border-rwanda-gold rounded-tl-lg"></View>
              <View className="absolute top-0 right-0 w-8 h-8 border-r-4 border-t-4 border-rwanda-gold rounded-tr-lg"></View>
              <View className="absolute bottom-0 left-0 w-8 h-8 border-l-4 border-b-4 border-rwanda-gold rounded-bl-lg"></View>
              <View className="absolute bottom-0 right-0 w-8 h-8 border-r-4 border-b-4 border-rwanda-gold rounded-br-lg"></View>
            </View>
          </View>

          {/* Instructions */}
          <View className="absolute bottom-20 left-0 right-0 items-center">
            <Text className="text-white text-lg font-semibold mb-2">
              Position QR code within frame
            </Text>
            <Text className="text-white text-center px-8 opacity-80">
              The scanner will automatically detect and process the QR code
            </Text>
          </View>

          {/* Mock Scan Button */}
          <View className="absolute top-20 right-4">
            <TouchableOpacity
              className="bg-rwanda-green px-4 py-2 rounded-xl"
              onPress={handleMockScan}
            >
              <Text className="text-white font-semibold">Mock Scan</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {isLoading && (
        <View className="flex-1 justify-center items-center bg-black">
          <View className="bg-white rounded-2xl p-8 items-center">
            <View className="w-12 h-12 border-4 border-rwanda-green border-t-transparent rounded-full animate-spin mb-4"></View>
            <Text className="text-lg font-semibold text-gray-700">
              Processing Scan...
            </Text>
            <Text className="text-gray-500 text-center mt-2">
              Looking up attendee information
            </Text>
          </View>
        </View>
      )}

      {scanned && !isLoading && (
        <View className="flex-1 justify-center items-center bg-black">
          <View className="bg-white rounded-2xl p-8 items-center mx-6">
            <Ionicons name="checkmark-circle" size={64} color="#1a5f3c" />
            <Text className="text-xl font-bold text-gray-700 mt-4 mb-2">
              Scan Complete!
            </Text>
            <Text className="text-gray-600 text-center mb-6">
              Processing your scan results...
            </Text>
            <TouchableOpacity
              className="bg-rwanda-green px-6 py-3 rounded-xl"
              onPress={resetScanner}
            >
              <Text className="text-white font-semibold">Scan Again</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ScannerScreen;
