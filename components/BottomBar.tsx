import { View, StyleSheet, Text } from "react-native";

export function BottomBar() {
    return (
        <View style={styles.constainer}>
            <View style={styles.box}><Text>This is bottom bar</Text></View>
        </View>)
    
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "white",
        padding: 10
    },
    box: {
        backgroundColor: "brown",
        padding: 10
    }
}
)
