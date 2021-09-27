import {
    GET_NEWS_ITEMS,
    GET_NEWS_ITEMS_SUCCESS,
    GET_NEWS_ITEMS_ERROR,
    GET_NEWS_ITEMS_COMMENTS,
    GET_NEWS_ITEMS_COMMENTS_SUCCESS,
    GET_NEWS_ITEMS_COMMENTS_ERROR,    
    POST_NEWS_ITEMS_COMMENTS,
    POST_NEWS_ITEMS_COMMENTS_SUCCESS,
    POST_NEWS_ITEMS_COMMENTS_ERROR,
    POST_NEWS_ITEMS_LIKES,
    POST_NEWS_ITEMS_LIKES_SUCCESS,
    POST_NEWS_ITEMS_LIKES_ERROR,    
    GET_NEWS_ITEMS_CONTACT_LIKES,
    GET_NEWS_ITEMS_CONTACT_LIKES_SUCCESS,
    GET_NEWS_ITEMS_CONTACT_LIKES_ERROR,
    GET_NEWS_ITEMS_LIKES,
    GET_NEWS_ITEMS_LIKES_SUCCESS,
    GET_NEWS_ITEMS_LIKES_ERROR,
    GET_GA_RECORDS,
    GET_GA_RECORDS_SUCCESS,
    GET_GA_RECORDS_ERROR,
    CLEAN_NEWSFEED,
    REFRESH_NEWSFEED
} from '../actions';

const INIT_STATE = {
    pageNumber : 1,
    newsItems: null,
    newsItemComments : null,
    selectedNewsItem: null,
    updatedNewsItem: null,
    loading: false,
    isLiked: null,
    isDelete: false,
    comment: null,
    list : null,
    postId: null,
    contactId: null,
    likedPostIds: [],
    likeCountOfPosts: [],
    postCreateRequest : {},
    error: '',
    contactlikes : [],
    newsItemLikes : null,
    recordGAList: {
        gaRecords: [],
        pagination: {
            pageNumber: 1,
            pageSize: 5,
            startIndex: 1,
            totalItemCount: 0,
            totalPages: 0,
        },
        selectedRecords: {},
        responseTime: null
  }
};

export default (state = INIT_STATE, action) => {
    switch (action.type) {
    case GET_GA_RECORDS:
      return {
        ...state,
        loading: true,
        error: "",
        recordGAList: null,
        pageNumber: action.payload.pageNumber,
      };
    case GET_GA_RECORDS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: "",
        recordGAList: action.payload,
      };
    case GET_GA_RECORDS_ERROR:
      let recordGAList = { ...state.recordGAList, records: [] };
      recordGAList.pagination = {
        ...recordGAList.pagination,
        totalItemCount: 0,
        totalPages: 0,
      };
      return {
        ...state,
        loading: false,
        error: action.payload.message,
        recordGAList: recordGAList,
      };

        case GET_NEWS_ITEMS:
            return { ...state, loading: true, error: '', pageNumber : action.payload.pageNumber};
        case GET_NEWS_ITEMS_SUCCESS:
            return { ...state, loading: false, error: '', newsItems: action.payload.newsItems };
        case GET_NEWS_ITEMS_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case GET_NEWS_ITEMS_COMMENTS:
            return { ...state, loading: true, error: '', postId : action.payload.postId};
        case GET_NEWS_ITEMS_COMMENTS_SUCCESS:
            return { ...state, loading: false, error: '', newsItemComments: action.payload.newsItemComments };
        case GET_NEWS_ITEMS_COMMENTS_ERROR:
            return { ...state, loading: false, error: action.payload.message }; 
        case GET_NEWS_ITEMS_CONTACT_LIKES:
            return { ...state, loading: true, error: '', contactId : action.payload.contactId};
        case GET_NEWS_ITEMS_CONTACT_LIKES_SUCCESS:
            return { ...state, loading: false, error: '', contactlikes: action.payload.contactlikes };
        case GET_NEWS_ITEMS_CONTACT_LIKES_ERROR:
            return { ...state, loading: false, error: action.payload.message };
        case GET_NEWS_ITEMS_LIKES:
            return { ...state, loading: true, error: '', postId : action.payload.postId};
        case GET_NEWS_ITEMS_LIKES_SUCCESS:
            return { ...state, loading: false, error: '', newsItemLikes: action.payload.newsItemLikes };
        case GET_NEWS_ITEMS_LIKES_ERROR:
            return { ...state, loading: false, error: action.payload.message };  

        case POST_NEWS_ITEMS_COMMENTS:
            return { ...state, loading: true, error: '', postId : action.payload.postId , postCreateRequest : action.payload.postCreateRequest};
        case POST_NEWS_ITEMS_COMMENTS_SUCCESS:
            return { ...state, loading: false, error: '', postId : action.payload.postId  };
        case POST_NEWS_ITEMS_COMMENTS_ERROR:
            return { ...state, loading: false, error: action.payload.message }; 
        case POST_NEWS_ITEMS_LIKES:
            return { ...state, loading: true, error: '', postId : action.payload.postId , contactId : action.payload.contactId, isLiked : action.payload.isLiked};
        case POST_NEWS_ITEMS_LIKES_SUCCESS:
            return { ...state, loading: false, error: '', postId : action.payload.postId  };
        case POST_NEWS_ITEMS_LIKES_ERROR:
            return { ...state, loading: false, error: action.payload.message };                        
        case CLEAN_NEWSFEED:
            return { ...INIT_STATE }
        case REFRESH_NEWSFEED:
            return { ...state, newsItems: null }
        default: return { ...state };
    }
}