import { View, Text, StyleSheet } from "react-native";
import { HomeNav } from "../../components/HomeNav";
import { TopNavigationImageTitleShowcase } from "../../components/TopNavigation";

export default function Home() {
    return (
        <View style={styles.constainer}>
            {/* <Text>This is the home page</Text> */}
            {/* <HomeNav /> */}
            <TopNavigationImageTitleShowcase />
            </View>
    )
};

const styles = StyleSheet.create({
    constainer: {
        flex: 1,
        // alignItems: "center",
        // justifyContent: "center"
    }
});
