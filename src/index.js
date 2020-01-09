import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import { createStore} from "redux";
import ingredientReducer from "./store/reducers/ingredient-reducer";


const store = createStore(ingredientReducer);

const app = (
    <Provider store={store} >
        <BrowserRouter><App/></BrowserRouter>
    </Provider>
);
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
