import { Dimensions, StyleSheet } from "react-native";
const rem = 14;
const articleStyles = StyleSheet.create({
  articleContainer:{
    marginTop: rem,
    backgroundColor: "#ffffff",
    padding: rem
  },
  articleBottomContainer:{
    backgroundColor: "#ffffff",
    padding: rem
  },
  newsHeader: {
    fontWeight: '700',
    color: '#ff7f50',
    marginBottom: rem / 2
  },
  articleImage:{
    marginRight: rem,
    width: Dimensions.get("window").width,
    height: 100,    
    resizeMode: "center"
  },
  centralLetter: {
    height: 58,
    flex: 1, 
    fontFamily: 'Arial',
    fontWeight: "700",
    fontSize: 50,
    color: '#1C2260',
    marginRight: 15
  }
});

export default articleStyles;