import React from "react";
import { Text, View, Image } from "react-native";
import homeStyles from "./homeStyles";
import styles from "../../styles/styles";
const WelcomeBanner = () => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.textCenter}>
        <Image
          style={homeStyles.welcomeImage}
          source={require("../../assets/images/welcome.png")}
        />
      </View>
      <View style={styles.textCenter}>
        <Text style={styles.my2}>
          Welcome to the new central experience designed for you.
        </Text>
      </View>
      <View style={styles.textCenter}>
        <Text style={styles.color007bff}>Learn More</Text>
      </View>
    </View>
  );
};

export default WelcomeBanner;
