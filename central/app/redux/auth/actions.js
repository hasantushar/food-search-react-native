import {
  AUTHORIZE_TOKEN,
  AUTHORIZE_TOKEN_SUCCESS,
  AUTHORIZE_TOKEN_ERROR,
  REVOKE_TOKEN,
  REVOKE_TOKEN_SUCCESS,
  REVOKE_TOKEN_ERROR,
  GET_USER_INFO,
  GET_USER_INFO_SUCCESS,
  GET_USER_INFO_ERROR,
  GET_USER_NAME,
  GET_USER_NAME_SUCCESS,
  GET_USER_NAME_ERROR,
  SET_TENANT_PREFIX
} from '../actions';

export const authorizeToken = () => ({
  type: AUTHORIZE_TOKEN,
  payload: {}
});
export const authorizeTokenSuccess = (authState) => ({
  type: AUTHORIZE_TOKEN_SUCCESS,
  payload: authState
});
export const authorizeTokenError = (message) => ({
  type: AUTHORIZE_TOKEN_ERROR,
  payload: { message }
});
export const revokeToken = (refreshToken) => ({
  type: REVOKE_TOKEN,
  payload: { refreshToken }
});
export const revokeTokenSuccess = () => ({
  type: REVOKE_TOKEN_SUCCESS,
  payload: { }
});
export const revokeTokenError = (message) => ({
  type: REVOKE_TOKEN_ERROR,
  payload: { message }
});
export const getUserName = () => ({
  type: GET_USER_NAME,
  payload: { }
});
export const getUserNameSuccess = (identityUser) => ({
  type: GET_USER_NAME_SUCCESS,
  payload: { identityUser }
});
export const getUserNameError = (message) => ({
  type: GET_USER_NAME_ERROR,
  payload: { message }
});
export const getUserInfo = (userId) => ({
  type: GET_USER_INFO,
  payload: { userId }
});
export const getUserInfoSuccess = (user) => ({
  type: GET_USER_INFO_SUCCESS,
  payload: { user }
});
export const getUserInfoError = (message) => ({
  type: GET_USER_INFO_ERROR,
  payload: { message }
});

export const setTenantPrefix = (prefix) => ({
  type: SET_TENANT_PREFIX,
  payload: prefix
})