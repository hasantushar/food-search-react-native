import {
    GET_ARTICLE,
    GET_ARTICLE_SUCCESS,
    GET_ARTICLE_ERROR,
    ADD_REPLY,
    ADD_REPLY_SUCCESS,
    ADD_REPLY_ERROR,
    ARTICLE_DETAILS_CLEAR_DATA
} from '../actions';

const INIT_STATE = {
    articleId: null,
    article: null,
    newReply: null,
    replies: null,
    loading: false,
    error: '',
    replyError: ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ARTICLE:
            return { ...state, loading: true, error: '',  articleId: action.payload.articleId };
        case GET_ARTICLE_SUCCESS:
            return { ...state, loading: false, error: '', article: action.payload.article, replies: action.payload.replies };
        case GET_ARTICLE_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case ADD_REPLY:
            return { ...state, loading: true, replyError: '', articleId: action.payload.articleId, newReply: action.payload.newReply, replies: action.payload.replies };
        case ADD_REPLY_SUCCESS:
            return { ...state, loading: false, replyError: '', replies: action.payload.replies };
        case ADD_REPLY_ERROR:
            return { ...state, loading: false, replyError: action.payload.message };   
        case ARTICLE_DETAILS_CLEAR_DATA:
            return INIT_STATE;                
        default: return { ...state };
    }
}
