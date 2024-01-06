import { View, Text, StyleSheet, Image } from "react-native";
import { Post } from "../app/(tabs)/allPosts";


export default function BoxContainer({ item } : {item : Post}) {

    return (
        <View style={styles.container}>
        <View style={styles.box}>
          <View style={styles.image}>
            <Image style={styles.myImage} source={{uri: item.image}} />
          </View>
          <View style={styles.content}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description.length > 80 ? `${item.description.slice(0, 80)}.....` : item.description}</Text>
            <Text style={styles.bySection}>
                <Text>By {item.author}</Text>
                <View style={{width: 20}}/>
                <Text>{`${new Date(item.createdAt).toISOString().split('T')[0]}`}</Text>
            </Text>
          </View>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center", 
        alighItems: "center",
        backgroundColor: '#FFF',
        borderRadius: 5,
        margin: 5,
        marginBottom: 10,
        shadowColor: '#999',
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    box : {
        width: "95%",
        flexDirection: "row",
        height: 125,
        padding: 10,
    },
    image: {
        width: "40%",
        height: "100%"
    },
    myImage: {
        width: "100%",
        height: "100%",
        borderRadius: 8
    },
    content:{
        width: "60%",
        height: "100%",
        padding: 5
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        color: "black"
    },
    bySection: {
    },
    description: {
        textAlign: "left",
        color: "black"
    }
})


