import { 
  ACCOUNT_SIGNIN_REQUEST,
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNIN_FAIL, 
  ACCOUNT_SIGNOUT, 
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

const userProfileReducer = (state={userProfile:[]},action)=>{
    switch(action.type){
      case USERINFO_FETCH_REQUEST:
        return {loading:true,userProfile:[]};
      case USERINFO_FETCH_SUCCESS:
        return {loading:false,userProfile:action.payload};
      case USERINFO_FETCH_FAIL:
        return {loading:false,userProfile:[]}
      default:return state;
    }
}
export {userSigninReducer,userProfileReducer}