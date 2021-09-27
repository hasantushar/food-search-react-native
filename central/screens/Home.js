import React from "react";
import { Platform, StyleSheet, Dimensions, ScrollView, Text, View, RefreshControl } from "react-native";
import { Block, theme } from "galio-framework";
import { getNewsItems, getContactLikes, refreshNewsfeed } from "../app/redux/newsFeed/actions";
import { ChartNewsFeed, VideoNewsFeed, ImageNewsFeed } from "../components";
import Salutaion from "../components/home/Salutation";
const { width } = Dimensions.get("screen");
import { Button } from '../components';
import nowTheme from "../constants/Theme";
import { Table, TableWrapper, Row, Rows } from 'react-native-table-component';

import { getUserInfo, getUserName } from "./../app/redux/auth/actions";
import { connect } from "react-redux";
import RenderHtml from 'react-native-render-html';
import SkeletonLoader from "../app/utils/SkeletonLoader";

import { DateUtils } from "./../app/utils/DateUtils"
import GoogleAnalyticList from './../app/components/tracking/ga';

class Home extends React.Component {
    state = {
      contactid : 0,
      likedPostIds : [],
      isLoaded : false,
      feedData: [],
      renderedNewsItems: [],
      gaTextData : "/mobile/screen/home?pageNumber=1&pageSize=5",
      widthArr: [40, 60, 450, 60, 60, 60, 60, 60, 60,60,60],
      refreshing : false
    };

  async componentDidMount(){
    this.props.getNewsItems(1);
      this.setState({
        isLoaded : false, 
        likedPostIds : [],

      });
  }

  loadMore=()=>{
    if(!this.props.loading){
      let pageSize = (this.props.pageNumber + 1);
      this.props.getNewsItems(pageSize);
      this.setState({
        gaTextData : "/mobile/screen/home?pageNumber="+pageSize+"&pageSize=5",
        refreshing: true
      });
    }
  }

  async componentDidUpdate(){
    if(this.props.newsItems && this.state.isLoaded){
      const alreadyAdded = this.state.renderedNewsItems.filter((el) => {
        return this.props.newsItems.some((f) => {
          return f.about_record_id === el.about_record_id;
        });
      });

    if(alreadyAdded.length === 0 || this.state.renderedNewsItems.length === 0){
      let newsIndex = this.state.renderedNewsItems.length - 1;
      let currentFeedData = this.props.newsItems.map((newsitem, indexOption) => {
        newsIndex = newsIndex + 1;
        newsitem.key = newsIndex;
        let jsondata = JSON.parse(newsitem.json_meta_data);
        var html = jsondata.NewsSummary;
        const source = {  html: html };

        let tbHead = jsondata.NewsData.NewsItemSource == 30 ? JSON.parse(jsondata.NewsData.TableHead) : [];
        let tbBody = jsondata.NewsData.NewsItemSource == 30 ? JSON.parse(jsondata.NewsData.TableBody) : [];
        let tbTitle = jsondata.NewsData.NewsItemSource == 30 ? jsondata.NewsData.TableTitle : [];
  const gtitle = { html: tbTitle };

        return (
          <Block key={newsIndex}>

            <View style={[styles.container, {
                  // Try setting `flexDirection` to `"row"`.
                  flexDirection: "row"
                }]}>
                  <View style={styles.flexLeft}>
                    <Text style={styles.centralLetter}>C</Text>
                  </View>
                  <View style={styles.flexRight}>
                    <Block style={styles.blockHeader}>
                      <Text style={styles.baseText}>
                        {jsondata.NewsData.NewsItemSource == 10 ? "Central" : ""}
                        {jsondata.NewsData.NewsItemSource == 20 ? "SurveyMonkey" : ""}
                        {jsondata.NewsData.NewsItemSource == 30 ? "Google Analytics" : ""}
                        {jsondata.NewsData.NewsItemSource == 40 ? "MailChimp" : ""}
                        {jsondata.NewsData.NewsItemSource == 50 ? "Zoom" : ""}
                      </Text>
                      {jsondata.NewsData.NewsItemType == 10 && jsondata.NewsData.NewsItemSource == 30 && (
                  <Text>
                    App
                  </Text>
                )}
                      <Text>
                          {jsondata.NewsData.NewsItemType == 10 && jsondata.NewsData.ItemData && (
                        <Text>
                          {jsondata.NewsData.NewsItemSourceType == 20 ? "Insights" : "App"}
                        </Text>
                          )}
                        {jsondata.NewsData.NewsItemType == 20 && jsondata.NewsData.ItemUrl && (
                        <Text>
                          Image
                        </Text>
                          )}
                          {jsondata.NewsData.NewsItemType == 30 && jsondata.NewsData.ItemUrl && (
                        <Text>
                          Video
                        </Text>
                        )}
                        {jsondata.NewsData.NewsItemSource != 30 ? (<Text style={styles.smallText}>
                          {"\n"}{new DateUtils().GetTimeDifferenceFromNow(newsitem.last_updated_date)}
                        </Text>) : (<Text style={styles.smallText}>
                          {new DateUtils().GetTimeDifferenceFromNow(newsitem.last_updated_date)}
                        </Text>)}
                      </Text>
                    </Block>
                  </View>
            </View>
                        {jsondata.NewsData.NewsItemSource == 30 ? ( <ScrollView horizontal={true}><View style={styles.container}>
                                <RenderHtml source={gtitle} contentWidth={width} ignoredDomTags={['center']}  />
              <Table borderStyle={{borderWidth: 2, borderColor: '#c0c0c0'}}>
                <Row data={tbHead} widthArr={this.state.widthArr} style={styles.head} textStyle={styles.text}/>
                <Rows data={tbBody} widthArr={this.state.widthArr} textStyle={styles.text} />
              </Table>
      </View></ScrollView>) : (<View>
              <Text>
            {"\n"}
              <RenderHtml
      source={source}
      contentWidth={width}
      ignoredDomTags={['center']}
    />
    {"\n"}
            </Text>
            </View>)}
            
            <Block>
              {jsondata.NewsData.NewsItemType == 10 ? <ChartNewsFeed item={jsondata} updateLike={this.updateLike.bind(this)} likedPostIds={this.state.likedPostIds} for_record_id={newsitem.for_record_id} about_record_id={newsitem.about_record_id} /> : null}
              {jsondata.NewsData.NewsItemType == 30 ? <VideoNewsFeed  item={jsondata} updateLike={this.updateLike.bind(this)} likedPostIds={this.state.likedPostIds} for_record_id={newsitem.for_record_id} about_record_id={newsitem.about_record_id} /> : null}
              {jsondata.NewsData.NewsItemType == 20 || jsondata.NewsData.NewsItemType == null ? <ImageNewsFeed item={jsondata} updateLike={this.updateLike.bind(this)} likedPostIds={this.state.likedPostIds} for_record_id={newsitem.for_record_id} about_record_id={newsitem.about_record_id} /> : null}
            </Block>
          </Block>)
        });
        this.setState({
          feedData : [...this.state.feedData, ...currentFeedData],
          renderedNewsItems: [...this.state.renderedNewsItems, ...this.props.newsItems],
          refreshing : false
        });
      }
    }
    if (this.props.newsItems && this.props.user && !this.state.isLoaded)
    {
      let contact_id = this.props.user.contact_id;
      this.props.getContactLikes(contact_id);

      if (this.props.contactlikes && this.props.contactlikes.contact_id > 0)
      {
        let likedPostIds = this.props.contactlikes.records_liked;

        this.setState({
          contactid : contact_id,
          likedPostIds : likedPostIds,
          isLoaded : true,
          refreshing : false
        });
      }          
    }
  };

  updateLike(contact_id)
  {
    setTimeout(() => { 
    this.props.getContactLikes(contact_id); 
      setTimeout(() => { 
      let likedPostIds = this.props.contactlikes.records_liked;
      this.setState({
        likedPostIds :likedPostIds,
        isLoaded: true,
        contact_id : contact_id,
        refreshing : false
      })
      }, 2000);
  }, 2000);
    
  }

  onRefresh() {
    this.props.refreshNewsfeed();
    this.props.getNewsItems(1);
      this.setState({
        contactid : 0,
        likedPostIds : [],
        isLoaded : false,
        feedData: [],
        renderedNewsItems: [],
        gaTextData : "/mobile/screen/home?pageNumber=1&pageSize=5",
        widthArr: [40, 60, 450, 60, 60, 60, 60, 60, 60, 60, 60],
        refreshing: true
      });
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
        refreshControl={
          <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh.bind(this)} />
        }
      >
        <Salutaion/>
        <Block flex>
            <Block><GoogleAnalyticList gatext={this.state.gaTextData} /></Block>
            {this.state.feedData && this.state.feedData.length > 0 ? <Block>{this.state.feedData}
            <Button
                  shadowless
                  style={styles.button}
                  color={nowTheme.COLORS.PRIMARY}
                  onPress={this.loadMore}
                >
                  <Text
                    style={{ fontFamily: 'montserrat-bold', fontSize: 14 }}
                    color={theme.COLORS.WHITE}
                  >View More
                  </Text>
                </Button></Block> : <Text>
                  { this.props.user && this.props.newsItems ? null : <Text> <SkeletonLoader /> <SkeletonLoader /> <SkeletonLoader /> </Text> }
              </Text>}
        </Block>
      </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  
  home: {
    width: width
  },
  centralLetter:{
    fontFamily : 'Arial',
    fontSize: 50,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: 2,
    fontFamily: 'montserrat-regular'
  },
    baseText: {
    fontWeight: 'bold'
  },
  smallText: {
    fontSize: 12,
  },
  container: {
    flex: 1
  },
  flexLeft:{
    marginRight: 20,
  },
  flexRight:{
    paddingTop: 6,
  },
});

const mapStateToProps = ({ newsFeed, authUser }) => {
  const { newsItems, contactlikes, pageNumber, loading, error } = newsFeed;
  const { identityUser, user } = authUser;
  return { newsItems, identityUser, user, loading, error, contactlikes, pageNumber };
};

const mapActionToProps = { getNewsItems, getUserInfo, getUserName, getContactLikes, refreshNewsfeed };
export default connect(mapStateToProps, mapActionToProps)(Home);