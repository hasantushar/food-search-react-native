import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "../../axios/centralApiAxios";
import { GET_ARTICLE, ADD_REPLY } from "../actions";
import { getArticleSuccess, getArticleError, addReplySuccess, addReplyError } from "./actions";
import AsyncStorageService from '../../services/storage/AsyncStorageService'
const asyncStorageService = AsyncStorageService.getService();
const GET_ARTICLE_ERROR = "Load article failed.";
const ADD_REPLY_ERROR = "Add comment failed.";

export function* watchGetArticle() {
  yield takeEvery(GET_ARTICLE, getArticle);
}

const getArticleAsync = async (articleId) => {
  try {
    const responseObject = await axios.get("contentfulltexts/" + articleId);
    if (responseObject.data) {
      let replies = [];
      try{
        const getReplies = await axios.get("posts/0?nodeId=" + articleId);
        if (getReplies.data) {
          replies = JSON.parse(getReplies.data.jsonMetadata);
        }
      } catch (getReplyError) {
      }
      return {
        article: responseObject.data,
        replies: replies,
        message: null,
      };
    }
  } catch (err) {
    return {
      message: GET_ARTICLE_ERROR,
    };
  }
};

function* getArticle({ payload }) {
  try {
    const resultReturned = yield call(getArticleAsync, payload.articleId);
    if (!resultReturned.message) {
      yield put(getArticleSuccess(resultReturned));
    } else {
      yield put(getArticleError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getArticleError(GET_ARTICLE_ERROR));
  }
}

export function* watchAddReply() {
  yield takeEvery(ADD_REPLY, addReply);
}

const addReplyAsync = async (payload) => {
  let { articleId, newReply, replies } = payload;


  try {
    let newComment = {
      createdBy: asyncStorageService.getUserInfo("user_contactId"),
      createdByName: asyncStorageService.getUserInfo("user_displayName"),
      createdDate: (new Date()).toISOString(),
      body: newReply,
    };
    let newReplyList = [...replies, newComment];
    const responseObject = await axios.post("posts/", { parentNodeId: articleId, newReply: newReply, replies: newReplyList });
    if (responseObject.data) {        
      return {
        replies: [...replies, newComment],
        message: null
      };
    }else{
      return {
        message: ADD_REPLY_ERROR,
      };
    }
  } catch (err) {
    return {
      message: ADD_REPLY_ERROR,
    };
  }
};

function* addReply({ payload }) {
  try {
    const resultReturned = yield call(addReplyAsync, payload);
    if (!resultReturned.message) {
      yield put(addReplySuccess(resultReturned.replies));
    } else {
      yield put(addReplyError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(addReplyError(ADD_REPLY_ERROR));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetArticle),
    fork(watchAddReply)
  ]);
}
