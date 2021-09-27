import React from 'react';
import { withNavigation } from '@react-navigation/compat';
import { StyleSheet, Image, TouchableWithoutFeedback, View } from 'react-native';
import { Button, Block, NavBar, Text, theme, Button as GaButton  } from 'galio-framework';

import {  nowTheme } from '../../constants';
import Comment from '../feed/Comment'

class ImageNewsFeed extends React.Component {
  render() {
            const {
      item,
    } = this.props;
    
    return (<View>
    {item.NewsData.NewsItemType == null ? <Text></Text> : <Image source={{uri: item.NewsData.ItemUrl}} style={{ height: 200}} />}
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


export default withNavigation(ImageNewsFeed);
