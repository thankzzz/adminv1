import {createStore,combineReducers,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import Cookie from 'js-cookie'
import{
    userSigninReducer,
    userUpdateReducer ,
    userSignupReducer,
    userProfileReducer
} from './Reducer/userReducer'
import {notifReducer} from './Reducer/notifReducer'

const userInfo = Cookie.getJSON('userInfo') || null

const initialState = {
    userSignin :{ userInfo }
}
const reducer  = combineReducers({
    userSignin : userSigninReducer,
    userSignup : userSignupReducer,
    userUpdate : userUpdateReducer,
    notifInfo : notifReducer,
    userInfo : userProfileReducer
})
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    reducer,
    initialState,
    composeEnhancer(applyMiddleware(thunk))
)

export default store