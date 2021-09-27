import {
  GET_ARTICLE_LIST,
  GET_ARTICLE_LIST_SUCCESS,
  GET_ARTICLE_LIST_ERROR
} from '../actions';

export const getArticleList = (amsNodeTypeId, pageNumber) => ({
  type: GET_ARTICLE_LIST,
  payload: { amsNodeTypeId, pageNumber }
});

export const getArticleListSuccess = (articleList) => ({
  type: GET_ARTICLE_LIST_SUCCESS,
  payload: {articleList}
});

export const getArticleListError = (message) => ({
  type: GET_ARTICLE_LIST_ERROR,
  payload: { message }
});