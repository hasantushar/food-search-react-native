import React from "react";
import { TouchableOpacity, Text, View, Button, Dimensions } from "react-native";
import styles from "../../styles/styles";
import articleStyles from "./articleStyles";
import moment from "moment";
import ScaledImage from "../../components/uiControls/ScaledImage";
class Article extends React.Component {
  render() {
    return (
      <View>
        <View style={articleStyles.articleContainer}>
          <View style={styles.dFlex}>
            <View>
              <Text style={articleStyles.centralLetter}>C</Text>
            </View>
            <View style={[styles.pt1, styles.flexGrow1]}>
              <View>
                <Text style={styles.fontBold}>Central</Text>
              </View>
              <View>
                <Text style={styles.small}>Article</Text>
              </View>
              <View>
                <Text style={styles.small}>
                  {moment(
                    new Date(this.props.news.createdDate).getTime()
                  ).format("MM/DD/YYYY")}
                </Text>
              </View>
            </View>
            <View>
              <Button
                title="View"
                onPress={() =>
                  this.props.navigation.navigate("ArticleDetails", {
                    articleId: this.props.news.contentId,
                  })
                }
              />
            </View>
          </View>
          <View id={this.props.news.contentId}>
            <View className="">
              <Text style={styles.fontBold}>{this.props.news.title}</Text>
              <Text numberOfLines={2} ellipsizeMode="tail">
                {this.props.news.bodyHTMLText}
              </Text>
            </View>
          </View>
        </View>
        <View>
          {this.props.news.url ? (
            <ScaledImage
              style={{ marginBottom: 14 }}
              width={Dimensions.get("window").width}
              imageUri={this.props.news.url}
            />
          ) : null}
        </View>
        <View style={articleStyles.articleBottomContainer}>
          <View style={styles.hr}></View>
        </View>
      </View>
    );
  }
}

export default Article;
