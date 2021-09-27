import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";
import Article from "./article";
import Salutation from "./salutaion";
import WelcomeBanner from "./welcomeBanner";
import { getArticleList } from "../../redux/articleListFeed/actions";
import { connect } from "react-redux";
import homeStyles from "./homeStyles";
import styles from "../../styles/styles";

class HomeScreen extends React.Component {
  componentDidMount = () => {
    this.props.getArticleList(5002, 1);
  };

  renderItem = ({ item }) => (
    <Article news={item} navigation={this.props.navigation} />
  );

  render() {
    return (
      <SafeAreaView style={styles.px3}>
        <Salutation />
        <WelcomeBanner />
        <FlatList
          data={this.props.articleList}
          renderItem={this.renderItem}
          keyExtractor={(item) => item.contentId.toString()}
          extraData={this.props.articleList}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({ articleListFeed }) => {
  const { articleList, loading, error } = articleListFeed;
  return { articleList, loading, error };
};

const mapActionToProps = { getArticleList };

export default connect(mapStateToProps, mapActionToProps)(HomeScreen);
