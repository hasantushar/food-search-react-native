import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from "redux-saga";
import reducers from './reducers';
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];
let sagaRunner;
export function configureStore(initialState) {

    const store = createStore(
        reducers,
        initialState,
        applyMiddleware(...middlewares)
    );

    if (__DEV__ && module.hot && sagaRunner) {
        sagaRunner.cancel();
    }

    sagaRunner = sagaMiddleware.run(sagas);

    if (module.hot) {
        module.hot.accept('./reducers', () => {
            const nextRootReducer = require('./reducers');
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}
