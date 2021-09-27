import { all, call, fork, put, takeEvery } from "redux-saga/effects";
import axios from "../../axios/centralApiAxios";
import { GET_ARTICLE_LIST } from "../actions";
import { getArticleListSuccess, getArticleListError } from "./actions";
const GET_ARTICLE_LIST_ERROR = 'Show article list failed.';

export function* watchGetArticleList() {
  yield takeEvery(GET_ARTICLE_LIST, getArticleList);
}

const getArticleListAsync = async (amsNodeTypeId, pageNumber) => {
  axios.defaults.headers.get['Content-Type'] = 'application/json';
  try {
    const responseObject = await axios.get("contentfulltexts?amsnodetype=" + amsNodeTypeId + "&pageNumber="+pageNumber);
    if (responseObject.data) {
      return {
        articleList: responseObject.data,
        message: null,
      };
    }
  } catch (err) {
    return {
        message: GET_ARTICLE_LIST_ERROR
    }
  }
}

function* getArticleList({ payload }) {
  try {    
    const resultReturned = yield call(getArticleListAsync, payload.amsNodeTypeId, payload.pageNumber);
    if (!resultReturned.message) {
      yield put(getArticleListSuccess(resultReturned.articleList));
    } else {
      yield put(getArticleListError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getArticleListError(GET_ARTICLE_LIST_ERROR));
  }
}

export default function* rootSaga() {
  yield all([fork(watchGetArticleList)]);
}