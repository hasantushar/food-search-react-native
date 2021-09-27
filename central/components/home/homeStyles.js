import { StyleSheet, Dimensions } from "react-native";
const homeStyles = StyleSheet.create({
    welcomeImage:{
        width: Dimensions.get("window").width / 2,
        height: 40,
    },
    greetings: {
        fontSize: 24,
        fontWeight: "700",
        marginTop: 10
    }
});
export default homeStyles;