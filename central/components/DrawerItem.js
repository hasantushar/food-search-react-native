import React from "react";
import { StyleSheet, TouchableOpacity, Linking } from "react-native";
import { Block, Text, theme } from "galio-framework";

import { connect } from "react-redux";
import { revokeToken } from "../app/redux/auth/actions";

import Icon from "./Icon";
import nowTheme from "../constants/Theme";

class DrawerItem extends React.Component {
  renderIcon = () => {
    const { title, focused } = this.props;

    switch (title) {
      case "Home":
        return (
          <Icon
            name="app2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Components":
        return (
          <Icon
            name="atom2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Articles":
        return (
          <Icon
            name="paper"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Profile":
        return (
          <Icon
            name="profile-circle"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Account":
        return (
          <Icon
            name="badge2x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Settings":
        return (
          <Icon
            name="settings-gear-642x"
            family="NowExtra"
            size={18}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            style={{ opacity: 0.5 }}
          />
        );
      case "Examples":
        return (
          <Icon
            name="album"
            family="NowExtra"
            size={14}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "GETTING STARTED":
        return (
          <Icon
            name="spaceship2x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "LOGOUT":
        return (
          <Icon
            name="share"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      case "Change Organization":
        return (
          <Icon
            name="briefcase-242x"
            family="NowExtra"
            size={18}
            style={{ borderColor: "rgba(0,0,0,0.5)", opacity: 0.5 }}
            color={focused ? nowTheme.COLORS.PRIMARY : "white"}
          />
        );
      default:
        return null;
    }
  };

  logoutUser = () => {
    this.props.revokeToken();
  }

  render() {
    const { focused, title, navigation } = this.props;

    const containerStyles = [
      styles.defaultStyle,
      focused ? [styles.activeStyle, styles.shadow] : null
    ];

    return (
      <TouchableOpacity
        style={{ height: 60 }}
        onPress={() =>
          title == "GETTING STARTED"
            ? Linking.openURL(
                "https://demos.creative-tim.com/now-ui-pro-react-native/docs/"
              ).catch(err => console.error("An error occurred", err))
            : title == 'LOGOUT' ? this.logoutUser()
            : navigation.navigate(title)
        }
      >
        <Block flex row style={containerStyles}>
          <Block middle flex={0.1} style={{ marginRight: 5 }}>
            {this.renderIcon()}
          </Block>
          <Block row center flex={0.9}>
            <Text
              style={{
                fontFamily: "montserrat-regular",
                textTransform: "uppercase",
                fontWeight: "300"
              }}
              size={12}
              bold={focused ? true : false}
              color={focused ? nowTheme.COLORS.PRIMARY : "white"}
            >
              {title}
            </Text>
          </Block>
        </Block>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 15,
    paddingHorizontal: 14,
    color: "white"
  },
  activeStyle: {
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 30,
    color: "white"
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.1
  }
});

const mapActionToProps = { revokeToken };

export default connect(null, mapActionToProps)(DrawerItem);