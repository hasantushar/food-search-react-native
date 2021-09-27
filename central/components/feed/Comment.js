import React from "react";
import PropTypes from 'prop-types';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import {  nowTheme } from '../../constants';

import { TouchableOpacity, StyleSheet, Platform, Dimensions, Keyboard, Image, TouchableWithoutFeedback } from 'react-native';
import { Button, Block, NavBar, Text, theme, } from 'galio-framework';

import { getUserInfo, getUserName  } from "./../../app/redux/auth/actions";
import { postNewsItemLikes, getNewsItemComments, getNewsItemLikes } from "./../../app/redux/newsFeed/actions";
import { connect } from "react-redux";

const { height, width } = Dimensions.get('window');
const iPhoneX = () =>
  Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);

class Comment extends React.Component {
      state = {
        isLike: false,
        isLikeText : "...",
        isLikeIcon : <IconFontAwesome name="thumbs-o-up" size={18} style={{ paddingRight: 1 }} color="#000"/>,
        isLikeColor : "#000",
        likeCount : "",
        likeCountText : "",
        commentCount : "",
        isLoaded : false,
        isCommentCountLoaded: false,
        isLikeCountLoaded : false,
        height: 0,
        contactid : 0,
  };

   componentWillUnmount() {
    this.willFocusSubscription();
    }

   componentDidMount(){
    this.props.getNewsItemLikes(this.props.about_record_id);
    this.props.getNewsItemComments(this.props.about_record_id);
    
    if(!this.props.identityUser){
      this.props.getUserName();
    }

    this.willFocusSubscription = this.props.navigation.addListener(
      'willFocus',
      () => {
          this.setState({
            isLoaded : false, 
            isCommentCountLoaded : false});
      }
    );

    this.setState({
      isLoaded : false, 
      isCommentCountLoaded : false, 
      isLikeCountLoaded : false});
  }
  
  componentDidUpdate(){
    let postId = this.props.about_record_id;
    
    if (this.state.isLikeCountLoaded == false){
      
      
      if (this.props.newsItemLikes && (this.props.newsItemLikes.post_id != this.props.about_record_id))
      {
          setTimeout(() => { 
            if (this.state.isLikeCountLoaded == false)
            {
              this.props.getNewsItemLikes(this.props.about_record_id);
            }
        }, 2000);
      }
      else if (this.props.newsItemLikes && (this.props.newsItemLikes.post_id == this.props.about_record_id))
      {
          let likeCount = this.props.newsItemLikes.count;

        if (this.props.user && this.state.isLoaded == false)
        {
          let likedPostIds = this.props.likedPostIds;
          let isAlreadyLiked= likedPostIds && likedPostIds.includes(this.props.about_record_id); 

          if (isAlreadyLiked && likeCount == 0){likeCount =1;}

         // console.log(this.props.about_record_id + " - " +isAlreadyLiked + " - " +likeCount);

          this.setState({
              isLike: isAlreadyLiked, 
              isLikeText : "Like",
              isLikeIcon : isAlreadyLiked == true ?  <IconFontAwesome name="thumbs-o-up" size={18} style={{ paddingRight: 1 }} color="#728FCE"/> :  <IconFontAwesome name="thumbs-o-up" size={18} style={{ paddingRight: 1 }} color="#000"/>,
              isLikeColor : isAlreadyLiked == true ? "#728FCE" : "#000",
              contactid : this.props.user.contact_id,
              isLoaded: true,
              isLikeCountLoaded : true,
              likeCount : likeCount,
              likeCountText : likeCount > 0 ? ("("+likeCount+")") : "",
          });
        }
      }
    }
    
    if (this.state.isCommentCountLoaded == false)
    {
      
      if (this.props.newsItemComments && (this.props.newsItemComments.post_id != this.props.about_record_id))
      {
       setTimeout(() => { 
         if (this.state.isCommentCountLoaded == false)
         {
            this.props.getNewsItemComments(this.props.about_record_id);
         }
        }, 2000);
      } 
      else if (this.props.newsItemComments && (this.props.newsItemComments.post_id == this.props.about_record_id))
      {
         let commentCount = this.props.newsItemComments.post_comments.length;

         this.setState({
                isCommentCountLoaded : true,
                commentCount : commentCount > 0 ? ("("+commentCount+")") : ""
          });
      }     
    }

    if(this.props.identityUser && !this.props.user && !this.props.loading){
      this.props.getUserInfo(this.props.identityUser.sub);
    }
    
    
  }


  like()
  {
    if (this.props.user)
    {
        let contact_id = this.props.user.contact_id;
        this.props.postNewsItemLikes(this.props.about_record_id,contact_id,!this.state.isLike);
        var likeCountValue = this.state.likeCount;
        this.props.updateLike(contact_id);

        if (this.state.isLike == true)
        {
            likeCountValue = parseInt(likeCountValue) -1;
        }
        else{
            likeCountValue = parseInt(likeCountValue) +1;
        }
        
        this.setState({
            isLike : !this.state.isLike,
            isLikeText : "Like",
            isLikeIcon : this.state.isLike == false ?  <IconFontAwesome name="thumbs-o-up" size={18} color="#728FCE" style={{ paddingRight: 1 }}/> :  <IconFontAwesome name="thumbs-o-up" size={18} style={{ paddingRight: 1 }} color="#000"/>,
            isLikeColor : this.state.isLike == false ? "#728FCE" : "#000",
            contactid : contact_id,
            likeCount : likeCountValue,
            likeCountText : likeCountValue > 0 ? ("("+likeCountValue+")") : "",
          })   
    }
  }

  render(){
    const {
      navigation,
      horizontal,
    } = this.props;

    const imgContainer = [
      styles.imageContainer,
      horizontal ? styles.horizontalStyles : styles.verticalStyles,
      styles.shadow
    ];
    
    return <Text>{this.props.user ? (
            <Block row={horizontal}  flex >
        <TouchableWithoutFeedback >
          <Block flex style={imgContainer}>
                  <Block row style={styles.options}>
              <Button
                shadowless
                style={[styles.tab, styles.divider]}
                onPress={this.like.bind(this)}>
                <Block row >
                  {this.state.isLikeIcon} 
                  <Text style={{ color: this.state.isLikeColor }}>{this.state.isLikeText} {this.state.likeCountText}</Text>
                </Block>
              </Button>
              <Button shadowless style={styles.tab} onPress={() => navigation.navigate('Chat',{
                screen: 'Chat',
                params: { 
                  postId : this.props.about_record_id,
                  display_name : this.props.user.display_name,
                  contact_id: this.props.user.contact_id
                 },
                })}>
                <Block row >
                <IconFontAwesome name="comment-o" size={18} style={{ paddingRight: 1 }}/>
                  <Text style={{ fontFamily: 'montserrat-regular' }} size={12} style={styles.tabTitle}>
                    {'Comments'} {this.state.commentCount}
                  </Text>
                </Block>
              </Button>
              <Button shadowless style={styles.tab} >
                <Block row >
                  <IconFontAwesome name="share-square" size={18} style={{ paddingRight: 1 }}/>
                  <Text style={{ fontFamily: 'montserrat-regular' }} size={12} style={styles.tabTitle}>
                    {'Share'}
                  </Text>
                </Block>
              </Button>              
            </Block>
          </Block>
        </TouchableWithoutFeedback>
      </Block>
    ) : ""}</Text>;
  }
}

Comment.propTypes = {
  item: PropTypes.object,
  horizontal: PropTypes.bool,
  full: PropTypes.bool,
  ctaColor: PropTypes.string,
  imageStyle: PropTypes.any,
  ctaRight: PropTypes.bool,
  titleStyle: PropTypes.any,
  textBodyStyle: PropTypes.any
};

const styles = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative'
  },
  
  horizontalImage: {
    height: 122,
    width: 'auto'
  },
  horizontalStyles: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  verticalStyles: {
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    // width: width *0.21,
    width: width / 4,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: nowTheme.COLORS.HEADER
  },
});


const mapStateToProps = ({ authUser, newsFeed }) => {
  const { identityUser, user, loading, error } = authUser;
  const { newsItemComments, newsItemLikes } = newsFeed;
  return { identityUser, user, loading, error, newsItemComments, newsItemLikes };
};

const mapActionToProps = { getUserInfo, getUserName, postNewsItemLikes, getNewsItemComments,getNewsItemLikes };

export default connect(mapStateToProps, mapActionToProps)(Comment);