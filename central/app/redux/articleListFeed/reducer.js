import {
    GET_ARTICLE_LIST,
    GET_ARTICLE_LIST_SUCCESS,
    GET_ARTICLE_LIST_ERROR
} from '../actions';

const INIT_STATE = {
    amsNodeTypeId: null,
    pageNumber : 1,
    articleList: null,
    loading: false,
    error: ''
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case GET_ARTICLE_LIST:
            return { ...state, loading: true, error: '',  amsNodeTypeId: action.payload.amsNodeTypeId , pageNumber : action.payload.pageNumber};
        case GET_ARTICLE_LIST_SUCCESS:
            return { ...state, loading: false, error: '', articleList: action.payload.articleList };
        case GET_ARTICLE_LIST_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        default: return { ...state };
    }
}