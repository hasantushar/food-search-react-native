import {
  GET_ARTICLE,
  GET_ARTICLE_SUCCESS,
  GET_ARTICLE_ERROR,
  ADD_REPLY,
  ADD_REPLY_SUCCESS,
  ADD_REPLY_ERROR,
  ARTICLE_DETAILS_CLEAR_DATA
} from '../actions';

export const getArticle = (articleId) => ({
  type: GET_ARTICLE,
  payload: { articleId }
});

export const getArticleSuccess = ({article, replies}) => ({
  type: GET_ARTICLE_SUCCESS,
  payload: {article, replies}
});

export const getArticleError = (message) => ({
  type: GET_ARTICLE_ERROR,
  payload: { message }
});

export const addReply = (articleId, newReply, replies) => ({
  type: ADD_REPLY,
  payload: { articleId, newReply, replies }
});

export const addReplySuccess = (replies) => ({
  type: ADD_REPLY_SUCCESS,
  payload: { replies }
});

export const addReplyError = (message) => ({
  type: ADD_REPLY_ERROR,
  payload: { message }
});

export const clearData = () => ({
  type: ARTICLE_DETAILS_CLEAR_DATA,
  payload: { }
});