import { all } from 'redux-saga/effects';
import authSagas from './auth/saga';
import newsFeedSagas from './newsFeed/saga';
import articleDetailsSagas from './articleDetails/saga';
import articleListFeedSagas from './articleListFeed/saga';

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    newsFeedSagas(),
    articleDetailsSagas(),
    articleListFeedSagas()
  ]);
}
