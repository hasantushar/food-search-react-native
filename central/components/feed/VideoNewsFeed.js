import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Text, TouchableWithoutFeedback , View} from 'react-native';

import YoutubePlayer from 'react-native-youtube-iframe';
import Comment from '../feed/Comment'

class VideoNewsFeed extends React.Component {
  render() {
        const {
      item,
    } = this.props;

    let videoId = "";
    try{
      let js = item.NewsData.ItemUrl.replace("allowfullscreen","allowfullscreen='1'");
      if (item.NewsData.ItemUrl != "")
      {
        const { DOMParser } = require('xmldom');
        const doc = new DOMParser().parseFromString(js,'text/xml');
        videoId = doc.documentElement.attributes.getNamedItem("src").value;
        videoId = videoId.replace('https://www.youtube.com/embed/',"");
      }
    }
    catch(error)
    {
    }

    return (<View>
    {videoId != "" ? <YoutubePlayer height={200} play={false} videoId={videoId} style={styles.avatar} /> : <Text></Text>}
    <Comment navigation={this.props.navigation} likedPostIds={this.props.likedPostIds} updateLike={this.props.updateLike} about_record_id={this.props.about_record_id} for_record_id={this.props.for_record_id} />
    </View>);
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  imageContainer: {
    borderRadius: 3,
    elevation: 1,
    overflow: 'hidden'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  fullImage: {
    height: 215
  },
  shadow: {
    shadowColor: '#8898AA',
    shadowOffset: { width: 2, height: 3 },
    shadowRadius: 3,
    shadowOpacity: 0.2,
    elevation: 2
  }
});


export default withNavigation(VideoNewsFeed);