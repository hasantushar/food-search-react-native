import AsyncStorage from '@react-native-async-storage/async-storage';
const AsyncStorageService = (function () {
    var _service;
    function _getService() {
        if (!_service) {
            _service = this;
            return _service
        }
        return _service
    }
    async function _setToken(tokenObj) {
        await AsyncStorage.setItem('access_token', tokenObj.accessToken);
        await AsyncStorage.setItem('refresh_token', tokenObj.refreshToken);
    }
    async function _getAccessToken() {
        let accessToken = await AsyncStorage.getItem('access_token');
        return accessToken;
    }
    async function _getRefreshToken() {
        return await AsyncStorage.getItem('refresh_token');
    }
    async function _clearToken() {
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('refresh_token');
    }
    async function _getUserInfo(propertyName){
        return await AsyncStorage.getItem(propertyName);        
    }
    return {
        getService: _getService,
        setToken: _setToken,
        getAccessToken: _getAccessToken,
        getRefreshToken: _getRefreshToken,
        getUserInfo: _getUserInfo,
        clearToken: _clearToken
    }
})();
export default AsyncStorageService;