import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import { BrowserRouter } from "react-router-dom";
import { Provider} from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import ingredientReducer from "./store/reducers/ingredient-reducer";
import orderReducer from "./store/reducers/order-reducer";
import thunk from "redux-thunk";
import authReducer from "./store/reducers/auth-reducer";
import createSagaMiddleware from 'redux-saga';
import { watchAuth } from './sagas/index'

const composeEnhancers = (process.env.NODE_ENV === 'development' ?  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null) || compose;
const reducer = combineReducers({
    ingredient: ingredientReducer,
    order: orderReducer,
    auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();
const store = createStore(reducer, composeEnhancers(
    applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);

const app = (
    <Provider store={store}>
        <BrowserRouter><App/></BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
registerServiceWorker();
