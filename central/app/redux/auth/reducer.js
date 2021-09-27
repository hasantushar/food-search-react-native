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
    SET_TENANT_PREFIX,
    CLEAN_NEWSFEED
} from '../actions';

const INIT_STATE = {
    hasLoggedInOnce: false,
    accessToken: '',
    accessTokenExpirationDate: '',
    refreshToken: '',
    isSignOut: false,
    identityUser: null,
    loading: false,
    error: '',
    tenantList: '',
    currentTenant: 'onsite'
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case AUTHORIZE_TOKEN:
            return { ...state, loading: true, error: '', isSignOut: false };
        case AUTHORIZE_TOKEN_SUCCESS:
            return { ...state, loading: false, hasLoggedInOnce: true, accessToken: action.payload.accessToken, accessTokenExpirationDate: action.payload.accessTokenExpirationDate, refreshToken: action.payload.refreshToken, error: '', tenantList: action.payload.tenantList };
        case AUTHORIZE_TOKEN_ERROR:
            return { ...state, loading: false, identityUser: null, error: action.payload.message };
        case REVOKE_TOKEN:
            return { ...state, loading: true, error: '', isSignOut: true };
        case REVOKE_TOKEN_SUCCESS:
            return { ...state, loading: false, identityUser: null, hasLoggedInOnce: false, accessToken: null, accessTokenExpirationDate: null, refreshToken: null, error: '', tenantList: null};
        case REVOKE_TOKEN_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case GET_USER_NAME:
            return { ...state, loading: true, error: '' };
        case GET_USER_NAME_SUCCESS:
            return { ...state, loading: false, identityUser: action.payload.identityUser, error: '' };
        case GET_USER_NAME_ERROR:
            return { ...state, loading: false, error: action.payload.message }; 
        case GET_USER_INFO:
            return { ...state, loading: true, error: '' };
        case GET_USER_INFO_SUCCESS:
            return { ...state, loading: true, user: action.payload.user, error: '' };
        case GET_USER_INFO_ERROR:
            return { ...state, loading: true, error: action.payload.message };
        case SET_TENANT_PREFIX:
            return { ...state, currentTenant: action.payload }
        case CLEAN_NEWSFEED:
            return { ...state, identityUser: null, user: null }
        default: return { ...state };
    }
}