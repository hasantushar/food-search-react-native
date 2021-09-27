import {all, call, fork, put, takeEvery , select} from 'redux-saga/effects';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {authorize, revoke} from 'react-native-app-auth';
import {
  AUTHORIZE_CONFIG,
  REACT_APP_API_BASE_URL,
  REACT_APP_IDN_BASE_URL,
} from '../../../global';
import AsyncStorageService from '../../services/storage/AsyncStorageService';
import {
  AUTHORIZE_TOKEN,
  REVOKE_TOKEN,
  GET_USER_NAME,
  GET_USER_INFO,
} from '../actions';
const asyncStorageService = AsyncStorageService.getService();
import PushNotification from '../../services/pushNotifications/pushNotifications';

import jwt_decode from "jwt-decode";

import {
  authorizeTokenSuccess,
  authorizeTokenError,
  revokeTokenSuccess,
  revokeTokenError,
  getUserNameSuccess,
  getUserNameError,
  getUserInfoSuccess,
  getUserInfoError,
  setTenantPrefix
} from './actions';

import { cleanNewsfeed } from '../newsFeed/actions'
const LOGIN_ERROR = 'Failed to authorize user.';

export function* watchAuthorizeToken() {
  yield takeEvery(AUTHORIZE_TOKEN, authorizeToken);
}

export function* watchRevokeToken() {
  yield takeEvery(REVOKE_TOKEN, revokeToken);
}

export function* watchGetUserName() {
  yield takeEvery(GET_USER_NAME, getUserName);
}

export function* watchGetUserInfo() {
  yield takeEvery(GET_USER_INFO, getUserInfo);
}
const delay = time => new Promise(resolve => setTimeout(resolve, time));

const authorizeTokenAsync = async () => {
  let isAuthorizeTokenFailed = false;
  try {
    const newAuthState = await authorize(AUTHORIZE_CONFIG);
    console.log(newAuthState);
    const parsedData = await jwt_decode(newAuthState.accessToken);
    console.log(parsedData.Tenants);
    return {
      authState: {...newAuthState, tenantList: JSON.parse(parsedData.Tenants) },
      message: null,
    };
  } catch (error) {
    console.log(error);
    if (!isAuthorizeTokenFailed) {
      isAuthorizeTokenFailed = true;
      try {
        await delay(1000);
        const authState = await authorize(AUTHORIZE_CONFIG);
        console.log(authState);
        const parsedData = await jwt_decode(authState.accessToken);
        console.log(parsedData.Tenants);
        return {
          authState: {...authState, tenantList: JSON.parse(parsedData.Tenants) },
          message: null,
        };
      } catch (errorMessage) {
        console.log(errorMessage);
        return {
          message: LOGIN_ERROR,
        };
      }
    } else {
      return {
        message: LOGIN_ERROR,
      };
    }
  }
};

async function storeCredentials(data) {
  await AsyncStorage.setItem('id_token', data.authState.idToken);
  await AsyncStorage.setItem('access_token', data.authState.accessToken);
  await AsyncStorage.setItem('refresh_token', data.authState.refreshToken);
  await AsyncStorage.setItem(
    'access_token_expiry',
    data.authState.accessTokenExpirationDate,
  );
}

function* authorizeToken({payload}) {
  try {
    const dataReturned = yield call(authorizeTokenAsync);
    if (!dataReturned.message) {
      storeCredentials(dataReturned);
      (Object.keys(dataReturned.authState.tenantList.TenantRelations).length == 1) 
      ? yield put(setTenantPrefix(dataReturned.authState.tenantList.TenantRelations[0].TenantName)) 
      : null;
      yield put(authorizeTokenSuccess(dataReturned.authState));
    } else {
      yield put(authorizeTokenError(dataReturned.message));
    }
  } catch (error) {
    yield put(authorizeTokenError(error));
  }
}

const revokeTokenAsync = async refreshToken => {
  try {
    const newAuthState = await revoke(AUTHORIZE_CONFIG, {
      tokenToRevoke: refreshToken,
      includeBasicAuth: true,
      sendClientId: true,
    });
    return {
      authState: {...newAuthState},
      message: null,
    };
  } catch (error) {
    return {
      message: 'Failed to revoke token',
    };
  }
};

function* revokeToken() {
  let refreshToken = yield select(state => state.authUser.refreshToken);
  try {
    const dataReturned = yield call(revokeTokenAsync, refreshToken);
    if (!dataReturned.message) {
      clearStorage();
      yield put(cleanNewsfeed());
      yield put(revokeTokenSuccess(dataReturned));
    } else {
      yield put(revokeTokenError(dataReturned.message));
    }
  } catch (error) {
    console.log(error);
    yield put(revokeTokenError(error));
  }
}

async function clearStorage() {
  await AsyncStorage.removeItem('id_token');
  await AsyncStorage.removeItem('access_token');
  await AsyncStorage.removeItem('refresh_token');
  await AsyncStorage.removeItem('access_token_expiry');
}

const getUserNameAsync = async (token, tokenFromService) => {
  try {
    // let tokenFromService = asyncStorageService.getAccessToken();
    // let token = await AsyncStorage.getItem('access_token');
    if (token || tokenFromService) {
      let requestUrl = REACT_APP_IDN_BASE_URL + '/connect/userinfo';
      let dataReturned = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + (token ? token : tokenFromService),
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          return {
            identityUser: resJson,
            message: null,
          };
        })
        .catch(error => {
          return {
            message: 'Failed to get user name.',
          };
        });
      return dataReturned;
    }
  } catch (error) {
    return {
      message: 'Failed to get user name.',
    };
  }
};

function* getUserName({payload}) {
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, 'access_token');
  try {
    const dataReturned = yield call(getUserNameAsync, token, tokenFromService);
    if (!dataReturned.message) {
      yield put(getUserNameSuccess(dataReturned.identityUser));
    } else {
      yield put(getUserNameError(dataReturned.message));
    }
  } catch (error) {
    yield put(getUserNameError(error));
  }
}

const getUserInfoAsync = async (userId, token, tokenFromService, tenantPrefix) => {
  try {
    // let tokenFromService = asyncStorageService.getAccessToken();
    // let token = await AsyncStorage.getItem('access_token');
    if (token || tokenFromService) {
      let requestUrl =
      "http://" + tenantPrefix + REACT_APP_API_BASE_URL + '/Contacts/user?user_name=&user_id=' + userId;
      let dataReturned = await fetch(requestUrl, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + (token ? token : tokenFromService),
          'Content-Type': 'application/json',
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          return {
            user: resJson,
            message: null,
          };
        })
        .catch(error => {
          return {
            message: 'Failed to get user info.',
          };
        });
      return dataReturned;
    }
  } catch (error) {
    return {
      message: 'Failed to get user info.',
    };
  }
};

function* getUserInfo({payload}) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, 'access_token');
  try {
    const dataReturned = yield call(
      getUserInfoAsync,
      payload.userId,
      token,
      tokenFromService,
      tenantPrefix
    );
    if (!dataReturned.message) {
      yield put(getUserInfoSuccess(dataReturned.user));
      // Init Push Notification Service
      PushNotification(dataReturned.user.contact_id);
      // Might throw exception if OneSignal has not been configured properly on respective platform
    } else {
      yield put(getUserInfoError(dataReturned.message));
    }
  } catch (error) {
    yield put(getUserInfoError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchAuthorizeToken),
    fork(watchRevokeToken),
    fork(watchGetUserName),
    fork(watchGetUserInfo),
  ]);
}
