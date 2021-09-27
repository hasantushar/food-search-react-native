import React from "react";
import {
  View,
  Image,
  StyleSheet,
  FlatList,
  KeyboardAvoidingView,
  PlatformColor,
  Platform,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";

import { Block, Text, theme } from "galio-framework";
import { getNewsItemComments, postNewsItemComments } from "../app/redux/newsFeed/actions";
import { Icon, Input } from "../components/";
import uuid from 'react-native-uuid';

import Images from "../constants/Images";
import nowTheme from "../constants/Theme";
import moment from 'moment'
import { connect } from "react-redux";
import GoogleAnalyticList from './../app/components/tracking/ga';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

class Chat extends React.Component {
  state = {
    messages: [],
    isLoaded: false,
    height: 0,
    display_name : "",
    contact_id : "",
    postId : 0,
  };

  async componentDidMount()
  {
    const { postId } = this.props.route.params.params;
    this.props.getNewsItemComments(postId);
    this.setState({
      isLoaded : false, 
      postId : postId});
  };

  async componentDidUpdate()
  {
      const {postId, contact_id, display_name } = this.props.route.params.params;
      
      if (this.props.newsItemComments && this.props.newsItemComments.post_id == postId && this.state.isLoaded == false)
      {

                {this.props.newsItemComments.post_comments.map((item, indexOption) => {
                  item.key = uuid.v4();
                  item.id = uuid.v4();
                  })}
        
        this.setState({messages: this.props.newsItemComments.post_comments,
              isLoaded:true,
              contact_id : contact_id,
              display_name : display_name
              });  
      }
  };

  messagesScroll = React.createRef();

  itemLayout = (data, index) => ({
    length: this.state.messages.length - 1,
    offset: 32 * index,
    index
  });

  handleScroll = () => {
    // const totalIndex = this.state.messages.length - 1;
    // const insetBottom = this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    setTimeout(() => {
      this.messagesScroll.current.scrollToOffset({ offset: this.state.height });
    }, 1);
  };

  onContentSizeChange = (width, height) => {
    this.setState({
      height
    });
  };

  renderMessage = msg => {
    if (msg.avatar) {
      return (
        <Block key={msg.id}>
          <Block row space={null}>
            <Image
              source={{ uri: msg.avatar }}
              style={[styles.avatar, styles.shadow]}
            />
            <Block style={styles.messageCardWrapper}>
              <Block style={[styles.messageCard, styles.shadow]}>
                <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.TEXT}>{msg.body}</Text>
              </Block>
              <Block right>
                <Text style={styles.time}>{msg.time}</Text>
              </Block>
            </Block>
          </Block>
        </Block>
      );
    }

    
    return (
      <Block key={msg.id} right>
        <Block row>
          <Block style={styles.messageCardWrapper}>
            <Block style={[styles.messageCardPersonal, styles.shadow]}>
              <Text style={{ fontFamily: 'montserrat-regular' }} color={nowTheme.COLORS.WHITE}>{msg.body}</Text>
            </Block>
            <Block right>
              <Text style={[styles.time, { marginRight: 8 }]}>{moment(msg.created_date).format("YYYY-MM-DD")}</Text>
            </Block>
          </Block>
          <Image
            source={Images.ProfilePicture }
            style={[styles.avatar, styles.shadow]}
          />
        </Block>
        
      </Block>
    );
  };

  renderMessages = () => {
    var gatext = "/mobile/screen/comment?postid="+this.state.postId;
    const insetBottom =
      this.state.messages.length * (theme.SIZES.BASE * 6.5) + 64; // total messages x message height
    return (<Block>
            {this.state.postId > 0 ? <GoogleAnalyticList gatext={gatext} /> : null }
            <FlatList
              ref={this.messagesScroll}
              data={this.state.messages}
              keyExtractor={item => `${item.id}`}
              showsVerticalScrollIndicator={false}
              getItemLayout={this.itemLayout}
              contentContainerStyle={[styles.messagesWrapper]}
              renderItem={({ item }) => this.renderMessage(item)}
              onContentSizeChange={this.onContentSizeChange}
            />
        </Block>
    );
  };

  handleMessageChange = (type, text) => {
    this.setState({ message: text });
  };

  handleMessage() {

    const { messages, message } = this.state;
    const { postId, contact_id, display_name } = this.props.route.params.params;
    var date = new Date();
    if (postId > 0)
    {
      var uidGuid = uuid.v4();
      var postCreateRequest = {};
      postCreateRequest.comment_guid = uidGuid;
      postCreateRequest.body = message;
      postCreateRequest.commented_by = contact_id;
      postCreateRequest.commented_by_display_name = display_name;
      postCreateRequest.created_date = date;
      this.props.postNewsItemComments(postId, postCreateRequest);
    }

    messages.push({
      comment_guid:uidGuid,
      body:message,
      commented_by:contact_id,
      commented_by_display_name: display_name,
      created_date: moment(date).format("YYYY-MM-DD"),
      key : uuid.v4(),
      id : uuid.v4()
    });

    this.setState({ messages, message: "" });
    this.handleScroll();
  };

  messageForm = () => {
    return (
      <View style={styles.messageFormContainer}>
        <Block>
        <Input
            placeholder="Message"
            shadowless
            defaultValue={this.state.message}
            onSubmitEditing={this.handleMessage.bind(this)}
            onChangeText={text => this.handleMessageChange("message", text)}
            iconContent={
                <Icon
                size={11}
                style={{ marginRight: 10 }}
                color={nowTheme.COLORS.ICON}
                name="image2x"
                family="NowExtra"
                />
            }
          />
        </Block>
      </View>
    );
  };

  iosMessenger=()=>{
    return(
      <Block flex space="between">
        
        <KeyboardAvoidingView 
        style={styles.messageFormContainer}
        behavior="padding"
        keyboardVerticalOffset={150}
        enabled>
          <View style={styles.topView}>
            {this.renderMessages()}
          </View>
          <View  style={{flex: 1 }}>
            <View style={styles.bottomView}> 
            
              {this.messageForm()}
            </View> 
          </View>

        </KeyboardAvoidingView>
       
      </Block>
    );
  }

  androidMessenger=()=>{
    return(
      <Block flex space="between">
        <View style={styles.topView}>
          {this.renderMessages()}
        </View> 
        <KeyboardAwareScrollView style={styles.bottomView}>
            {this.messageForm()}
        </KeyboardAwareScrollView>
      </Block>
    );
  }

  render() {
    this.handleScroll();
    return (
      Platform.OS === 'ios' ? this.iosMessenger() : this.androidMessenger()
      
    );
  }
}

const styles = StyleSheet.create({
  messageFormContainer: {
    height: "100%",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  input: {
    height: theme.SIZES.BASE * 3,
    backgroundColor: theme.COLORS.WHITE
  },
  iconButton: {
    width: 40,
    height: 40,
    backgroundColor: "transparent"
  },
  messagesWrapper: {
    flexGrow: 1,
    top: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingVertical: 16,
    paddingBottom: 56
  },
  messageCardWrapper: {
    maxWidth: "85%",
    marginLeft: 8,
    marginBottom: 32
  },
  messageCard: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 3,
    backgroundColor: nowTheme.COLORS.WHITE
  },
  messageCardPersonal: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 3,
    marginRight: 8,
    backgroundColor: nowTheme.COLORS.PRIMARY
  },
  shadow: {
    shadowColor: "rgba(0, 5, 15, 0.1)",
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    shadowOpacity: 1
  },
  time: {
    fontFamily: 'montserrat-regular',
    fontSize: 11,
    fontWeight: "400",
    color: nowTheme.COLORS.TIME,
    marginTop: 8
  },
  avatar: {
    height: 40,
    width: 40,
    borderRadius: 20,
    marginBottom: theme.SIZES.BASE
  },
  topView:{
    height: "80%",
  },
  bottomView:{
    height: "20%",
  },

});

const mapStateToProps = ({ newsFeed }) => {
  const { newsItemComments, loading, error } = newsFeed;
  return { newsItemComments, loading, error };
};

const mapActionToProps = { getNewsItemComments, postNewsItemComments};

export default connect(mapStateToProps, mapActionToProps)(Chat);
