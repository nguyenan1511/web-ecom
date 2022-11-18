import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "./authReducer";
import cartReducer, { getCartAction } from "./cartReducer";
import pageReducer from "./pageReducer";
import userReducer, { getUserInfoAction } from "./userReducer";

const reducer = combineReducers({
    page: pageReducer,
    auth: authReducer,
    user: userReducer,
    cart: cartReducer,
})

const composeEnhancers = typeof window === 'object' && window[ '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' ] ?
    window[ '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__' ]({}) : compose;

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
const store = createStore(reducer, applyMiddleware(thunk))
store.dispatch(getUserInfoAction())
store.dispatch(getCartAction())

export default store