import React from "react";
import {
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Linking
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { useSafeArea } from "react-native-safe-area-context";
import Images from "../constants/Images";
import { DrawerItem as DrawerCustomItem, Icon } from "../components";

import { useSelector, shallowEqual } from "react-redux";

import nowTheme from "../constants/Theme";

const { width } = Dimensions.get("screen");

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {

  const tenantList = useSelector(
    state => state.authUser.tenantList,
    shallowEqual,
  );

  let tenants;
  if (tenantList) {
    tenants = Object.keys(tenantList.TenantRelations).length;
  }

  const insets = useSafeArea();
  const screens = [
    "Home",
    "Profile",
  ];
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block style={styles.header}>
        <Image style={styles.logo} source={Images.Logo} />
        <Block right style={styles.headerIcon}>
          <Icon
            name="align-left-22x"
            family="NowExtra"
            size={15}
            color={"white"}
          />
        </Block>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          {tenants > 1 ? 
            <DrawerCustomItem
              title={"Change Organization"}
              navigation={navigation}
            /> : null }
          <Block flex style={{ marginTop: 24, marginVertical: 8, paddingHorizontal: 8 }}>
          <Block
            style={{ borderColor: 'white', width: '93%', borderWidth: StyleSheet.hairlineWidth, marginHorizontal: 10}}
          />
        </Block>
        <DrawerCustomItem title="LOGOUT" navigation={navigation}/>
        </ScrollView>
      </Block>
    </Block>
  );
}

/*
<TouchableOpacity onPress={() => props.navigation.navigate('Onboarding')}
          style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
        >
          <DrawerItem {...props} title="GETTING STARTED" />
        </TouchableOpacity>

<TouchableOpacity onPress={() => props.navigation.navigate('Onboarding')}
      style={{ marginLeft: 10, fontFamily: 'montserrat-regular' }}
    >
      <DrawerItem {...props} title="LOGOUT" navigation={navigation} />
    </TouchableOpacity>
*/

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center"
  },
  headerIcon: {
    marginTop: -20
  },
  logo: {
    height: 40,
    width: 37
  }
});

export default CustomDrawerContent;