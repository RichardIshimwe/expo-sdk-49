import { View, Text, StyleSheet } from "react-native";
import { TopNavigationImageTitleShowcase } from "../../components/TopNavigation";
import { Stack } from "expo-router";
import DashboardContainer from "./dashboardContainer";


export default function Home() {
    return (
        <View style={styles.constainer}>
            <Stack.Screen options={{headerShown: false, title: "Dashboard"}} />
            <TopNavigationImageTitleShowcase title="ObstacleSwap"/>
            <DashboardContainer />
        </View>
    )
};

const styles = StyleSheet.create({
    constainer: {
        flex: 1, 
    }
});
