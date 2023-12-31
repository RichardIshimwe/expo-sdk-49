import { View, Text, StyleSheet, Pressable } from "react-native";

export function HomeNav() {
return (
<View style={styles.constainer}>
    <View><Text style={styles.homeText}>Home</Text></View>
    <View>
        <Pressable style={styles.button}><Text style={styles.btnText}>Login</Text></Pressable>
    </View>
</View>)
}

const styles = StyleSheet.create({
    constainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "brown",
        padding: 10
    },
    homeText: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    btnText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center",
        color: "white"
    },
    button: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 6, 
        paddingHorizontal: 18, 
        borderRadius: 4, 
        elevation: 3,
        backgroundColor: "black"
    }
}
)
