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

export const getGARecords = (pageNumber) => {
  return {
    type: GET_GA_RECORDS,
    payload: { pageNumber},
  };
};

export const getGARecordsSuccess = (recordGAList) => ({
  type: GET_GA_RECORDS_SUCCESS,
  payload: recordGAList,
});

export const getGARecordsError = (message) => ({
  type: GET_GA_RECORDS_ERROR,
  payload: { message },
});


export const getNewsItems = (pageNumber) => ({
  type: GET_NEWS_ITEMS,
  payload: { pageNumber }
});

export const getNewsItemsSuccess = (newsItems) => ({
  type: GET_NEWS_ITEMS_SUCCESS,
  payload: {newsItems}
});

export const getNewsItemsError = (message) => ({
  type: GET_NEWS_ITEMS_ERROR,
  payload: { message }
});

export const getNewsItemComments = (postId) => ({
  type: GET_NEWS_ITEMS_COMMENTS,
  payload: { postId }
});

export const getNewsItemCommentsSuccess = (newsItemComments) => ({
  type: GET_NEWS_ITEMS_COMMENTS_SUCCESS,
  payload: {newsItemComments}
});

export const getNewsItemCommentsError = (message) => ({
  type: GET_NEWS_ITEMS_COMMENTS_ERROR,
  payload: { message }
});

export const getNewsItemLikes = (postId) => ({
  type: GET_NEWS_ITEMS_LIKES,
  payload: { postId }
});

export const getNewsItemLikesSuccess = (newsItemLikes) => ({
  type: GET_NEWS_ITEMS_LIKES_SUCCESS,
  payload: {newsItemLikes}
});

export const getNewsItemLikesError = (message) => ({
  type: GET_NEWS_ITEMS_LIKES_ERROR,
  payload: { message }
});

export const getContactLikes = (contactId) => ({
  type: GET_NEWS_ITEMS_CONTACT_LIKES,
  payload: { contactId }
});

export const getContactLikesSuccess = (contactlikes) => ({
  type: GET_NEWS_ITEMS_CONTACT_LIKES_SUCCESS,
  payload: {contactlikes}
});

export const getContactLikesError = (message) => ({
  type: GET_NEWS_ITEMS_CONTACT_LIKES_ERROR,
  payload: { message }
});

export const postNewsItemComments = (postId, postCreateRequest) => ({
  type: POST_NEWS_ITEMS_COMMENTS,
  payload: { postId, postCreateRequest }
});

export const postNewsItemCommentsSuccess = (postId) => ({
  type: POST_NEWS_ITEMS_COMMENTS_SUCCESS,
  payload: { postId }
});

export const postNewsItemCommentsError = (message) => ({
  type: POST_NEWS_ITEMS_COMMENTS_ERROR,
  payload: { message }
});

export const postNewsItemLikes = (postId, contactId, isLiked) => ({
  type: POST_NEWS_ITEMS_LIKES,
  payload: { postId, contactId, isLiked }
});

export const postNewsItemLikesSuccess = (postId) => ({
  type: POST_NEWS_ITEMS_LIKES_SUCCESS,
  payload: { postId }
});

export const postNewsItemLikesError = (message) => ({
  type: POST_NEWS_ITEMS_LIKES_ERROR,
  payload: { message }
});

export const cleanNewsfeed = () => ({
  type: CLEAN_NEWSFEED,
  payload: {}
})

export const refreshNewsfeed = () => ({
  type: REFRESH_NEWSFEED,
  payload: {}
})