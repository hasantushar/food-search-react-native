import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { AppRegistry, StyleSheet, Text, View, Platform } from 'react-native';
import ReactNativeFusionCharts from 'react-native-fusioncharts'; 

import Comment from '../feed/Comment'

class ChartNewsFeed extends React.Component {
  constructor(props) {
    super(props);
    //STEP 2 - Chart Data
    const chartData = [
      { label: "Venezuela", value: "250" },
      { label: "Saudi", value: "260" },
      { label: "Canada", value: "180" },
      { label: "Iran", value: "140" },
      { label: "Russia", value: "115" },
      { label: "UAE", value: "100" },
      { label: "US", value: "30" },
      { label: "China", value: "30" },
    ];
    //STEP 3 - Chart Configurations
    const chartConfig = {
      type: this.props.item.NewsData.ChartType == 3 ? "Line" : "column2d",
      width: "100%",
      height: "400",
      dataFormat: "json",
      dataSource: JSON.parse(this.props.item.NewsData.ItemData)
    };

    this.state = {
      chartConfig
    };
  }



  render() {
    return (
      <View style={styles.container}>
          {this.props.item.NewsData.NewsItemSource == 30 ? (<Text></Text>) : (<View style={styles.chartContainer}><ReactNativeFusionCharts  chartConfig={this.state.chartConfig} /></View>)}    
        <Comment navigation={this.props.navigation} likedPostIds={this.props.likedPostIds} updateLike={this.props.updateLike} about_record_id={this.props.about_record_id} for_record_id={this.props.for_record_id} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  heading: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10
  },
  chartContainer: {
    height: 400
  }
});


export default withNavigation(ChartNewsFeed);