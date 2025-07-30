import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

// Import screens
import HomeScreen from "./src/screens/HomeScreen";
import ScannerScreen from "./src/screens/ScannerScreen";
import ResultScreen from "./src/screens/ResultScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import AttendeesScreen from "./src/screens/AttendeesScreen";
import SponsorsScreen from "./src/screens/SponsorsScreen";
import ExhibitorsScreen from "./src/screens/ExhibitorsScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Main Stack Navigator
function MainStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1a5f3c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ title: "Rwanda Mining Week" }}
      />
      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
        options={{ title: "Scan QR Code" }}
      />
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{ title: "Scan Result" }}
      />
      <Stack.Screen
        name="Attendees"
        component={AttendeesScreen}
        options={{ title: "Attendees", headerShown: false }}
      />
      <Stack.Screen
        name="Sponsors"
        component={SponsorsScreen}
        options={{ title: "Sponsors", headerShown: false }}
      />
      <Stack.Screen
        name="Exhibitors"
        component={ExhibitorsScreen}
        options={{ title: "Exhibitors", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Scan") {
            iconName = focused ? "qr-code" : "qr-code-outline";
          } else if (route.name === "Dashboard") {
            iconName = focused ? "analytics" : "analytics-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1a5f3c",
        tabBarInactiveTintColor: "gray",
        headerStyle: {
          backgroundColor: "#1a5f3c",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen
        name="Scan"
        component={MainStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{ title: "Admin Dashboard" }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <TabNavigator />
    </NavigationContainer>
  );
}
