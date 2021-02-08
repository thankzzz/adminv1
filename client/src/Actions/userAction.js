import Axios from "axios";
import moment from 'moment'
import {errorNotification} from '../UI/Toast/NotificationSetting'
import {store} from 'react-notifications-component'
import Cookie from 'js-cookie';


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
        Cookie.set('userInfo',data.token,{secure:false})
        dispatch({type:ACCOUNT_SIGNIN_SUCCESS,payload:data.token})   
      }else{
        dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:data.message})
      }
           
  }catch(err){
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:err.message})
  }
}
const signout = () => (dispatch,getState)=>{
  Cookie.remove("userInfo");
  const {userSignin:{userInfo}} = getState()
  
  Axios.put(`http://localhost:8080/api/user/agent/login-session/update/${userInfo.id}`)
  dispatch({ type: ACCOUNT_SIGNOUT })
} 
const getInfoUser = () => async(dispatch,getState) =>{
  dispatch({type:USERINFO_FETCH_REQUEST})
  const {userSignin:{userInfo}} = getState()
  try{
    var {data} = await axios.get(`http://localhost:8080/api/user/${userInfo.id}`,{
      headers:{
          Authorization:'Bearer'+ userInfo.token
      }
    })  
    dispatch({type:USERINFO_FETCH_SUCCESS,payload:data.info})
  }catch(err){
    if(err.response.status === 401 || err.response.status === 403 ){
      forceSignout()
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

