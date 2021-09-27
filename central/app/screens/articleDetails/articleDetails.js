import React from "react";
import { Text, Image, View } from "react-native";
import articleDetailsStyles from "./articleDetailsStyles";
import { connect } from "react-redux";
import styles from "../../styles/styles";
import Reply from "./reply";
import {
  getArticle,
  addReply,
  clearData,
} from "../../redux/articleDetails/actions";
import { DateUtils } from "../../utils";

class ArticleDetails extends React.Component {
  postReply = (newReply) => {
    this.props.addReply(
      this.props.article.contentId,
      newReply,
      this.props.replies ? this.props.replies : []
    );
  };

  componentDidMount = () => {
    this.props.getArticle(this.props.route.params.articleId);
  };

  componentWillUnmount = () => {
    this.props.clearData();
  };

  render() {
    let hasArticleImage = this.props.article && this.props.article.url;
    return (
      <View>
        {this.props.article ? (
          <View>
            {hasArticleImage ? (
              <Image
                style={articleDetailsStyles.articleImage}
                source={{
                  uri: this.props.article.url,
                }}
              />
            ) : null}
            <View style={articleDetailsStyles.articleDetailsContainer}>
              <Text style={articleDetailsStyles.titleText}>
                {this.props.article.title}
              </Text>
              <Text style={[styles.pt2, styles.fontSize12]}>
                {DateUtils.GetDateTimeFormatted(this.props.article.createdDate)}
              </Text>
              <View style={styles.hr} />
              <Text style={styles.lineHeight20}>
                {this.props.article.bodyHTMLText}
              </Text>
              {this.props.article ? (
                <View>
                  {this.props.replies ? (
                    <View style={styles.pt3}>
                      <Text style={styles.fontBold}>
                        {this.props.replies.length} comments
                      </Text>
                      <View style={[styles.px3, styles.pt2]}>
                        {this.props.replies.map((reply, index) => (
                          <Reply key={index} reply={reply} />
                        ))}
                      </View>
                    </View>
                  ) : (
                    <Text style={styles.pt3}>No reply.</Text>
                  )}
                </View>
              ) : null}
            </View>
          </View>
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = ({ articleDetails }) => {
  const { article, replies, loading, error, replyError } = articleDetails;
  return { article, replies, loading, error, replyError };
};

const mapActionToProps = { getArticle, addReply, clearData };

export default connect(mapStateToProps, mapActionToProps)(ArticleDetails);
