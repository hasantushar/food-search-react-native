import React from "react";
import {
  ImageBackground,
  Image,
  StyleSheet,
  StatusBar,
  Dimensions,
  Text,
  Platform
} from "react-native";
import { Block, theme } from "galio-framework";
import { Button } from '../components';
const { height, width } = Dimensions.get("screen");

import nowTheme from "../constants/Theme";
import Images from "../constants/Images";

import { authorizeToken, revokeToken } from "../app/redux/auth/actions";
import { connect } from "react-redux";

import {prefetchConfiguration} from 'react-native-app-auth';
import {AUTHORIZE_CONFIG} from '../global';

import {getBuildNumber} from 'react-native-device-info';
import GoogleAnalyticList from './../app/components/tracking/ga';
import { Chase } from 'react-native-animated-spinkit';


class Pro extends React.PureComponent {
  state = {
    postId : 0,
    gaTextData : "/mobile/screen/getStarted",
    spinner: false
  };

  componentDidMount(){
    prefetchConfiguration({
      warmAndPrefetchChrome: true,
      ...AUTHORIZE_CONFIG
    });
  }

  componentDidUpdate(){
  if (this.props.error) {
      console.log("Stopping the spinner...");
      this.setState(
        {
          ...this.state,
          spinner: false
        }
      );
    }  
  }

  handleSpinner=()=>{
    this.setState(
      {
        ...this.state,
        spinner: true
      }
    );
  }

  render() {
    return (
      <Block flex style={styles.container}>
        <StatusBar hidden />
        <Block flex center>
          <ImageBackground
            source={Images.Pro}
            style={{ height, width, zIndex: 1 }}
          />
        </Block>

        <Block flex space="between" style={styles.padded}>

          <Block middle row style={{ marginTop: -50, marginBottom: 30}}>
            <Text
              style={{ color: '#fff'  }}
            >
              Created by
            </Text>
            <Image
              source={Images.CreativeTimLogo}
              style={{
                height: 29,
                width: 129,
                marginLeft: theme.SIZES.BASE
              }}
            />
          </Block>

          <Block middle flex space="around" style={{ zIndex: 2 }}>
            <Block center style={styles.title}>
              <Block>
                <Text color="white" size={60} style={styles.font}>
                  CENTRAL
                </Text>
              </Block>
              <Block row>
                <Text middle color="white" size={34} style={styles.font}>
                  Version
                </Text>
                <Block middle style={styles.pro}>
                  <Text size={14} color="white" style={styles.font14}>
                  {Platform.OS === 'ios' ? getBuildNumber() : 1.0}
                </Text>
                </Block>
              </Block>
            </Block>

            <Block center>
            <Chase size={48} color="#fff" style={{opacity: (!this.state.spinner)?0:1}}/>
             <Button
              textStyle={{ fontSize: 12 }}
              color="neutral"
              style={styles.button}
              onPress={() => {
                this.handleSpinner();
                this.props.authorizeToken();
              }}
            >
             GET STARTED
            </Button>
            </Block>
            
          </Block>
        </Block>
        {/* <Block><GoogleAnalyticList gatext={this.state.gaTextData} /></Block> */}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.COLORS.BLACK
  },
  padded: {
    top: 250,
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'absolute',
    bottom: theme.SIZES.BASE,
    zIndex: 2
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    marginTop: 20,
  },
  title: {
    marginTop: "-5%"
  },
  subTitle: {
    marginTop: 20
  },
  pro: {
    backgroundColor: nowTheme.COLORS.BLACK,
    paddingHorizontal: 8,
    marginLeft: 3,
    borderRadius: 4,
    height: 22,
    marginTop: 0
  },
  font: {
    fontSize: 50,
    color: '#fff',
    
  },
  font14: {
    fontSize: 14,
    color: '#fff',
  },
  spinnerTextStyle: {
    color: '#FFF'
  },
});

const mapStateToProps = ({ authUser }) => {
    const { error } = authUser;
    return { error };
};

const mapActionToProps = { authorizeToken, revokeToken };
  
export default connect(mapStateToProps, mapActionToProps)(Pro);