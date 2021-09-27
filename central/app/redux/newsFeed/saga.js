import { all, call, fork, put, takeEvery, select } from "redux-saga/effects";
import { 
  GET_NEWS_ITEMS, 
  GET_NEWS_ITEMS_COMMENTS, 
  POST_NEWS_ITEMS_COMMENTS,
  POST_NEWS_ITEMS_LIKES,
  GET_NEWS_ITEMS_CONTACT_LIKES,
  GET_NEWS_ITEMS_LIKES,
  GET_RECORDS, 
  GET_GA_RECORDS 
 } from "../actions";

 import {
  getNewsItemsSuccess,
  getNewsItemsError,
  getNewsItemCommentsSuccess,
  getNewsItemCommentsError,
  postNewsItemCommentsSuccess,
  postNewsItemCommentsError,
  postNewsItemLikesSuccess,
  postNewsItemLikesError,
  getContactLikesSuccess,
  getContactLikesError,
  getNewsItemLikesSuccess,
  getNewsItemLikesError,
  getGARecordsSuccess,
  getGARecordsError
} from "./actions";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { REACT_APP_API_BASE_URL } from "../../../global";
import AsyncStorageService from "../../services/storage/AsyncStorageService";
const asyncStorageService = AsyncStorageService.getService();

const GET_NEWS_ITEMS_ERROR = "Show news items failed.";
const GET_NEWS_ITEMS_COMMENTS_ERROR = "Show news items comments failed.";
const POST_NEWS_ITEMS_COMMENTS_ERROR = "Create news items comments failed.";
const POST_NEWS_ITEMS_LIKES_ERROR = "Create news items like failed.";
const GET_NEWS_ITEMS_CONTACT_LIKES_ERROR = "Get news items likes";
const GET_NEWS_ITEMS_LIKES_ERROR = "Show news items likes error.";

export function* watchGetNewsItems() {
  yield takeEvery(GET_NEWS_ITEMS, getNewsItems);
}

export function* watchGetGARecords() {
  yield takeEvery(GET_GA_RECORDS, getGARecordList);
}

export function* watchGetNewsItemComments() {
  yield takeEvery(GET_NEWS_ITEMS_COMMENTS, getNewsItemComments);
}

export function* watchPostNewsItemComments() {
  yield takeEvery(POST_NEWS_ITEMS_COMMENTS, postNewsItemComments);
}

export function* watchPostNewsItemLikes() {
  yield takeEvery(POST_NEWS_ITEMS_LIKES, postNewsItemLikes);
}

export function* watchGetNewsItemContactLikes() {
  yield takeEvery(GET_NEWS_ITEMS_CONTACT_LIKES, getNewsItemContactLikes);
}

export function* watchGetNewsItemLikes() {
  yield takeEvery(GET_NEWS_ITEMS_LIKES, getNewsItemLikes);
}

const getGARecordListAsync = async (pageNumber, token, tokenFromService, tenantPrefix) => {
  var sendDate = new Date().getTime();
  var receiveDate = new Date().getTime();
  let pageSize = 100;

  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/settings"+ "?trashed=false&search_text=&pageSize="+ pageSize+"&pageNumber=1";
      console.log(requestUrl);

      let dataReturned = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          return {
            recordGAList: resJson,
            message: null,
            responseTime: ((receiveDate - sendDate) / 1000).toFixed(1),
          };
        })
        .catch((error) => {
          return {
            message: "Failed to get news.",
          };
        });

      return dataReturned;
    }
  } catch (error) {
    return {
      message: "Failed to get news.",
    };
  }
};

function* getGARecordList({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(getGARecordListAsync, payload, token, tokenFromService, tenantPrefix);
    if (!resultReturned.message) {
      let recordGAListParam = {
        gaRecords: resultReturned.recordGAList,
        pagination: {
          pageNumber: 1,
          pageSize: 100,
          totalItemCount: 0
        },
      };
      
      yield put(getGARecordsSuccess(recordGAListParam));
    } else {
      yield put(getGARecordsError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getGARecordsError(GET_NEWS_ITEMS_CONTACT_LIKES_ERROR));
  }
}

const getNewsItemsAsync = async (pageNumber, token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/news_items?trashed=false&pageNumber=" + pageNumber + "&pageSize=5";
      console.log(requestUrl);
      let dataReturned = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          return {
            newsItems: resJson,
            message: null,
          };
        })
        .catch((error) => {
          return {
            message: "Failed to get news.",
          };
        });
      return dataReturned;
    }
  } catch (error) {
    return {
      message: "Failed to get news.",
    };
  }
};

const postNewsItemCommentsAsync = async (postId, postCreateRequest, token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/posts/" + postId + "/comments";
      console.log(requestUrl);

      let dataReturned = await fetch(requestUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postCreateRequest),
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          return {
            message: null,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: "Failed to post new comment.",
          };
        });

      return dataReturned;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to get news comment.",
    };
  }
};

const postNewsItemLikeAsync = async (postId, contactId, isLiked,token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/posts/"+postId+ "/likes/"+ contactId + "/"+ isLiked;
      console.log(requestUrl);

      let dataReturned = await fetch(requestUrl, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        }
      })
        .then(function (response) {
         
        })
        .then(function (resJson) {
          return {
            message: null,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: "Failed to post a like.",
          };
        });
      return dataReturned;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to post a like.",
    };
  }
};

const getNewsItemCommentsAsync = async (postId, token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/posts/" + postId + "/comments";
      console.log(requestUrl);
      let dataReturned = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {

          if (resJson.post_comments != null)
          {
              resJson.post_comments.map((item, indexOption) => {
                item.key = indexOption;
                item.id = indexOption;
              });
          }

          return {
            newsItemComments: resJson,
            message: null,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: "Failed to get new comment.",
          };
        });
      return dataReturned;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to get news comment.",
    };
  }
};

const getNewsItemLikesAsync = async (postId, token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/posts/" + postId + "/likes";
      console.log(requestUrl);
      
      let dataReturned = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          {
            
          }

          var json = {
              post_id: postId,
              count : resJson
            }

          return {
            newsItemLikes: json,
            message: null,
          };
        })
        .catch((error) => {
          console.log(error);
          return {
            message: "Failed to get new likes.",
          };
        });
      return dataReturned;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to get news comment.",
    };
  }
};

const getNewsItemContactLikesAsync = async (contact_id, token, tokenFromService, tenantPrefix) => {
  try {
    if (token || tokenFromService) {
      let requestUrl = "http://" + tenantPrefix + REACT_APP_API_BASE_URL + "/contacts/" + contact_id + "/liked";
      console.log(requestUrl);
      let dataReturned = await fetch(requestUrl, {
        method: "GET",
        headers: {
          Authorization: "Bearer " + (token ? token : tokenFromService),
          "Content-Type": "application/json",
        },
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (resJson) {
          {

          }

          return {
            contactlikes: resJson,
            message: null,
          };
        })
        .catch((error) => {
          //console.log(error);
          return {
            message: "Failed to get new comment.",
          };
        });
      return dataReturned;
    }
  } catch (error) {
    console.log(error);
    return {
      message: "Failed to get news comment.",
    };
  }
};

function* getNewsItems({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(getNewsItemsAsync, payload.pageNumber, token, tokenFromService, tenantPrefix);
    if (!resultReturned.message) {
      yield put(getNewsItemsSuccess(resultReturned.newsItems));
    } else {
      yield put(getNewsItemsError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getNewsItemsError(GET_NEWS_ITEMS_ERROR));
  }
}

function* getNewsItemComments({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(getNewsItemCommentsAsync, payload.postId, token, tokenFromService, tenantPrefix);
    if (!resultReturned.message) {
      yield put(getNewsItemCommentsSuccess(resultReturned.newsItemComments));
    } else {
      yield put(getNewsItemCommentsError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getNewsItemCommentsError(GET_NEWS_ITEMS_CONTACT_LIKES_ERROR));
  }
}

function* getNewsItemLikes({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(getNewsItemLikesAsync, payload.postId, token, tokenFromService, tenantPrefix);
    if (!resultReturned.message) {
      yield put(getNewsItemLikesSuccess(resultReturned.newsItemLikes));
    } else {
      yield put(getNewsItemLikesError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getNewsItemLikesError(GET_NEWS_ITEMS_LIKES_ERROR));
  }
}

function* getNewsItemContactLikes({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(getNewsItemContactLikesAsync, payload.contactId, token, tokenFromService, tenantPrefix);
    if (!resultReturned.message) {
      yield put(getContactLikesSuccess(resultReturned.contactlikes));
    } else {
      yield put(getContactLikesError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(getContactLikesError(GET_NEWS_ITEMS_COMMENTS_ERROR));
  }
}

function* postNewsItemComments({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(postNewsItemCommentsAsync, payload.postId, payload.postCreateRequest, token, tokenFromService, tenantPrefix);

    if (!resultReturned.message) {
      yield put(postNewsItemCommentsSuccess(payload.postId));
    } else {
      yield put(postNewsItemCommentsError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(postNewsItemCommentsError(POST_NEWS_ITEMS_COMMENTS_ERROR));
  }
}

function* postNewsItemLikes({ payload }) {
  let tenantPrefix = yield select(state => state.authUser.currentTenant);
  let tokenFromService = yield call(asyncStorageService.getAccessToken);
  let token = yield call(AsyncStorage.getItem, "access_token");
  try {
    const resultReturned = yield call(postNewsItemLikeAsync, payload.postId, payload.contactId,payload.isLiked, token, tokenFromService, tenantPrefix);

    if (!resultReturned.message) {
      yield put(postNewsItemLikesSuccess(payload.postId));
    } else {
      yield put(postNewsItemLikesError(resultReturned.message));
    }
  } catch (errorExp) {
    yield put(postNewsItemLikesError(POST_NEWS_ITEMS_LIKES_ERROR));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchGetNewsItems), 
    fork(watchGetNewsItemComments), 
    fork(watchGetNewsItemContactLikes),
    fork(watchGetNewsItemLikes),
    fork(watchPostNewsItemComments),
    fork(watchGetGARecords),
    fork(watchPostNewsItemLikes)]);
}
