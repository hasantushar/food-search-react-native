import React from "react";
import articleDetailsStyles from "./articleDetailsStyles";
import styles from "../../styles/styles";
import { DateUtils } from "../../utils";
import { Text, Image, View } from "react-native";
const Reply = (props) => {
  return (
    <View style={articleDetailsStyles.replyContainer}>
      <View style={styles.dFlex}>
        <View>
          <Image
            style={articleDetailsStyles.replyBy}
            source={require("../../assets/images/default-avatar-48x48.png")}
          />
        </View>
        <View style={styles.pl2}>
          <View>
            <Text style={styles.fontBold}>{props.reply.createdByName}</Text>
          </View>
          <Text style={[styles.colorAAA, styles.fontSize11, styles.py1]}>
            {DateUtils.GetDateTimeFormatted(props.reply.createdDate)}
          </Text>
          <View>
            <Text style={styles.lineHeight20}>{props.reply.body}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Reply;
