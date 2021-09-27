import { combineReducers } from 'redux';
import authUser from './auth/reducer';
import newsFeed from './newsFeed/reducer';
import articleDetails from './articleDetails/reducer';
import articleListFeed from './articleListFeed/reducer';

const reducers = combineReducers({
    authUser,
    newsFeed,
    articleDetails,
    articleListFeed
});

export default reducers;