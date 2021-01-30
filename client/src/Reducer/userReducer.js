import { 
  ACCOUNT_SIGNIN_REQUEST,
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNIN_FAIL, 
  ACCOUNT_SIGNUP_REQUEST, 
  ACCOUNT_SIGNUP_SUCCESS, 
  ACCOUNT_SIGNUP_FAIL, 
  ACCOUNT_SIGNOUT, 
  ACCOUNT_UPDATE_REQUEST, 
  ACCOUNT_UPDATE_SUCCESS, 
  ACCOUNT_UPDATE_FAIL,
  USERINFO_FETCH_REQUEST,
  USERINFO_FETCH_SUCCESS,
  USERINFO_FETCH_FAIL
   } from "../Type/usertype";


const userSigninReducer = (state = {},action) =>{
    switch(action.type){
        case ACCOUNT_SIGNIN_REQUEST:
            return { loading: true };
          case ACCOUNT_SIGNIN_SUCCESS:
            return { loading: false, userInfo: action.payload };
          case ACCOUNT_SIGNIN_FAIL:
            return { loading: false, error: action.payload };
          case ACCOUNT_SIGNOUT:
            return {};
          default: return state;
    }
}

const userUpdateReducer = (state={},action) => {
    switch (action.type) {
        case ACCOUNT_UPDATE_REQUEST:
          return { loading: true };
        case ACCOUNT_UPDATE_SUCCESS:
          return { loading: false, userInfo: action.payload };
        case ACCOUNT_UPDATE_FAIL:
          return { loading: false, error: action.payload };
        default: return state;
    }
}

const userSignupReducer = (state = {}, action) => {
    switch (action.type) {
      case ACCOUNT_SIGNUP_REQUEST:
        return { loading: true };
      case ACCOUNT_SIGNUP_SUCCESS:
        return { loading: false, userInfo: action.payload };
      case ACCOUNT_SIGNUP_FAIL:
        return { loading: false, error: action.payload };
      default: return state;
    }
  }

const userProfileReducer = (state={userInfo:[]},action)=>{
    switch(action.type){
      case USERINFO_FETCH_REQUEST:
        return {loading:true,userInfo:[]};
      case USERINFO_FETCH_SUCCESS:
        return {loading:false,userInfo:action.payload};
      case USERINFO_FETCH_FAIL:
        return {loading:false,error:action.payload}
      default:return state;
    }
}
export {userSigninReducer,userUpdateReducer,userSignupReducer,userProfileReducer}