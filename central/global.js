//Todo: This file will be moved to .env file
export const REACT_APP_API_CLIENT_ID = "reactnative.code";
export const REACT_APP_API_CLIENT_SECRET = "Central@2020";
export const REACT_APP_IDN_BASE_URL = "http://www.amsoftonline.net:5010/mayrelease2021/";
export const REACT_APP_API_BASE_URL = ".amsoftonline.net:5009/mayrelease2021/CentralApi/api";
export const AUTHORIZE_CONFIG = {
  issuer: "http://www.amsoftonline.net:5010/mayrelease2021",
  clientId: "reactnative.code",
  clientSecret: "Central@2020",
  redirectUrl: "com.central:/oauthredirect",
  scopes: ["openid", "profile", "offline_access", "CentralAPI"],
  dangerouslyAllowInsecureHttpRequests: true,
};
