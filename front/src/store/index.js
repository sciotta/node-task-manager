import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import { Reducers } from '../reducers';
import sagas from '../sagas';

const configureStore = () => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const store = createStore(
        Reducers,
        composeEnhancers(applyMiddleware(sagaMiddleware))
    );

    sagaMiddleware.run(sagas);
    return store;
};

export default configureStore;