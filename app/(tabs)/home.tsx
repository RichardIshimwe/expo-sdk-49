import { View, Text, StyleSheet } from "react-native";
import { TopNavigationImageTitleShowcase } from "../../components/TopNavigation";
import { Stack } from "expo-router";
import AllPosts from "./allPosts";

export default function Home() {
    return (
        <View style={styles.constainer}>
            <Stack.Screen options={{headerShown: false, title: "Home"}} />
            <TopNavigationImageTitleShowcase title="ObstacleSwap"/>
            <AllPosts />
        </View>
    )
};

const styles = StyleSheet.create({
    constainer: {
        flex: 1, 
    }
});
