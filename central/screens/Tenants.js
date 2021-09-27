import React from 'react';
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {
  Block,
  Checkbox,
  Text,
  Button as GaButton,
  theme,
} from 'galio-framework';

import {Button, Input, Icon} from '../components';
import {Images, nowTheme} from '../constants';

import {useSelector, useDispatch} from 'react-redux';
import {v4 as uuid_v4} from 'uuid';
import {setTenantPrefix} from '../app/redux/auth/actions';
import { cleanNewsfeed } from '../app/redux/newsFeed/actions';

import {useNavigation} from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const Tenants = props => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const tenantList = useSelector(state => {
    return state.authUser.tenantList;
  });

  return (
    <DismissKeyboard>
      <Block flex middle>
        <ImageBackground
          source={Images.RegisterBackground}
          style={styles.imageBackgroundContainer}
          imageStyle={styles.imageBackground}>
          <Block flex middle>
            <Block style={styles.registerContainer}>
              <Block flex space="evenly">
                <Block flex={0.4} middle style={styles.socialConnect}>
                  <Block flex={0.5} middle>
                    <Text style={styles.headerText} color="#333" size={24}>
                      Your Organizations
                    </Text>
                  </Block>
                </Block>
                <Block flex={1} middle space="between">
                  <Block center flex={0.9}>
                    <Block flex space="between">
                      <Block center>
                        {tenantList.TenantRelations.map(t => (
                          <Button
                            key={uuid_v4()}
                            color="primary"
                            round
                            style={styles.createButton}
                            onPress={() => {
                              navigation.push('App');
                              dispatch(setTenantPrefix(t.TenantName));
                              dispatch(cleanNewsfeed());
                            }}>
                            <Text
                              style={{fontFamily: 'montserrat-bold'}}
                              size={14}
                              color={nowTheme.COLORS.WHITE}>
                              {t.TenantName}
                            </Text>
                          </Button>
                        ))}
                      </Block>
                    </Block>
                  </Block>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  imageBackgroundContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  imageBackground: {
    width: width,
    height: height,
  },
  registerContainer: {
    marginTop: 55,
    width: width * 0.9,
    height: height < 812 ? height * 0.8 : height * 0.8,
    backgroundColor: nowTheme.COLORS.WHITE,
    borderRadius: 4,
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: 'hidden',
  },
  socialConnect: {
    backgroundColor: nowTheme.COLORS.WHITE,
    // borderBottomWidth: StyleSheet.hairlineWidth,
    // borderColor: "rgba(136, 152, 170, 0.3)"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: '#fff',
    shadowColor: nowTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: nowTheme.COLORS.PRIMARY,
    fontWeight: '800',
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
    color: nowTheme.COLORS.ICON_INPUT,
  },
  inputs: {
    borderWidth: 1,
    borderColor: '#E3E3E3',
    borderRadius: 21.5,
  },
  passwordCheck: {
    paddingLeft: 2,
    paddingTop: 6,
    paddingBottom: 15,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 10,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  headerText: {
    fontFamily: 'montserrat-regular',
    textAlign: 'center',
    width: '100%',
  },
});

export default Tenants;
