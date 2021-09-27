import { Dimensions, StyleSheet } from "react-native";
const rem = 14;
const styles = StyleSheet.create({
  dFlex: {
    flex: 1,
    flexDirection: "row"
  },
  flexGrow1: {
    flexGrow: 1,
  },
  pt1: {
    paddingTop: rem / 4,
  },
  pt2: {
    paddingTop: rem / 2,
  },
  pt3: {
    paddingTop: rem,
  },
  pt4: {
    paddingTop: rem * 1.5,
  },
  pt5: {
    paddingTop: rem * 3,
  },
  pl2: {
    paddingLeft: rem / 2,
  },
  px3: {
    paddingLeft: rem,
    paddingRight: rem
  },
  py1: {
    paddingTop: rem / 4,
    paddingBottom: rem / 4
  },
  my2: {
    marginTop: rem / 2,
    marginBottom: rem / 2
  },
  colorAAA: {
    color: "#AAA"
  },
  color007bff: {
    color: "#007bff"
  },  
  lineHeight20:{
      lineHeight: 20
  },
  hr: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10
  },
  fontSize12: {
    fontSize: 12
  },
  fontSize11: {
    fontSize: 11
  },
  fontBold: {
    fontWeight: "bold"
  },
  small: {
    fontSize: rem * 0.8
  },
  contentContainer: {
    paddingTop: 20,
    paddingRight: 20,
    paddingBottom: 15,
    paddingLeft: 20,
    backgroundColor: "#fff",
    marginTop: 20,
    fontSize: 14,
    width: Dimensions.get("window").width - rem * 2 - 16
  },
  textCenter:{
    textAlign: "center",
    alignSelf: "center"
  }
});

export default styles;