import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
const articleDetailsStyles = StyleSheet.create({
  titleText: {
    fontSize: 20,
    fontFamily: 'Arial'
  },
  descriptionText:{
    lineHeight: 20
  },
  articleImage:{
    width: Dimensions.get("window").width,
    height: 200,
    resizeMode: "cover"
  },
  articleDetailsContainer: {
    backgroundColor: "#fff",
    padding: 10,
    margin: 20,
    marginTop: -60,
    shadowOpacity: 0.25,
    shadowRadius: 5.5,
    shadowColor: "#000"
  },
  shadowOffset: {
    width: 0,
    height: -5
  },
  replyContainer: {
      marginTop: 10,
      marginBottom: 10
  },
  replyBy:{
    width: 32,
    height: 32,
    resizeMode: "cover",
    borderRadius: 16
  },
});

export default articleDetailsStyles;
