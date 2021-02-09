// import Axios from "axios";
import moment from 'moment'
import {errorNotification} from '../UI/Toast/NotificationSetting'
import {store} from 'react-notifications-component'
import Cookie from 'js-cookie';
import Axios from '../Api'

import {
  ACCOUNT_SIGNIN_REQUEST, 
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNIN_FAIL,  
  ACCOUNT_SIGNOUT, 
  USERINFO_FETCH_REQUEST,
  USERINFO_FETCH_SUCCESS,
  USERINFO_FETCH_FAIL
} from "../Type/usertype";
import axios from "axios";

const forceSignout = ()=>{
  Cookie.remove("userInfo")
  store.addNotification({
    ...errorNotification,
    message:"You need to login first"
  })
}

const signin = (loginData) => async (dispatch) =>{
  dispatch({type:ACCOUNT_SIGNIN_REQUEST})
  let getLocation = await Axios.get(`https://ipapi.co/json/`)
  let dataLocation = getLocation.data
 
  try{
    let dataPost ={
      email : loginData.email,
      password:loginData.password,
      last_login: moment().format('YYYY/MM/DD h:mm:ss'),
      last_ip: dataLocation.ip,
      last_country:dataLocation.country_name,
      last_city:dataLocation.city
    }  
      const {data} = await Axios.post('http://localhost:8080/api/account/signin',dataPost) 
      if(data.status === "success"){
        var expireTimeToken= new Date(new Date().getTime() + 15 * 1000);
        var expireTimeReToken= new Date(new Date().getTime() + 8 *60 * 60 * 1000);
        Cookie.set('accessToken',data.accessToken)
        Cookie.set('refreshToken',data.refreshToken)
        Cookie.set('userInfo',data.user)
        dispatch({type:ACCOUNT_SIGNIN_SUCCESS,payload:data.user})   
      }else{ 
        dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:data.message})
      }
           
  }catch(err){
    console.log(err.message)
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:err.message})
  }
}
const signout = () => (dispatch,getState)=>{
  Cookie.remove("userInfo");
  Cookie.remove("accessToken")
  Cookie.remove("refreshToken")
  const {userSignin:{userInfo}} = getState()
  
  Axios.put(`http://localhost:8080/api/user/agent/login-session/update/${userInfo.id}`)
  dispatch({ type: ACCOUNT_SIGNOUT })
} 
const getInfoUser = () => async(dispatch) =>{
  dispatch({type:USERINFO_FETCH_REQUEST})
  try{
    var {data} = await axios.get(`http://localhost:8080/api/user/`)  
    dispatch({type:USERINFO_FETCH_SUCCESS,payload:data.info})
  }catch(err){
    if(err.response.status === 401 || err.response.status === 403 ){
      // forceSignout()
      dispatch({type:USERINFO_FETCH_FAIL})  
    }else {
      store.addNotification({
        ...errorNotification,
        message:err.message
      })
      dispatch({type:USERINFO_FETCH_FAIL})
    }
    
  }
}

export {signin,signout,getInfoUser,forceSignout}

