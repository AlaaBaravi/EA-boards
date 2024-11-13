import React, { useState } from "react";
import { Tabs } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabBar from "@/components/ui/TabBar";

export default function Layout() {
    const [activeTab, setActiveTab] = useState("index");

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tabs
                sceneContainerStyle={{
                    backgroundColor: "white",
                }}
                screenOptions={{
                    headerShown: false,
                }}
                tabBar={(props) => (
                    <CustomTabBar
                        {...props}
                        activeTab={activeTab}
                        setActiveTab={setActiveTab}
                    />
                )}
            />
        </SafeAreaView>
    );
}
