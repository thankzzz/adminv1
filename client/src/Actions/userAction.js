//  
import moment from 'moment'
import {errorNotification, successNotification} from '../UI/Toast/NotificationSetting'
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




const signin = (loginData) => async (dispatch) =>{
  dispatch({type:ACCOUNT_SIGNIN_REQUEST})
  let getLocation = await Axios.get(`https://ipapi.co/json/`)
  let dataLocation = getLocation.data
  if(!loginData.email){
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:"Email cannot be empty "})
  }else if(!loginData.password){
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:"Password cannot be empty "})
  }else{
  try{
    console.log('dasdas')
    let dataPost ={
      email : loginData.email,
      password:loginData.password,
      last_login: moment().format('YYYY/MM/DD h:mm:ss'),
      last_ip: dataLocation.ip,
      last_country:dataLocation.country_name,
      last_city:dataLocation.city
    }  
      const {data} = await Axios.post('http://localhost:8080/api/user/signin',dataPost) 
      if(data.status === "success"){
        
        var expireTimeToken= new Date(new Date().getTime() + 8 *60 * 60 * 1000);
        Cookie.set('accessToken',data.accessToken,{expires:expireTimeToken})
        Cookie.set('refreshToken',data.refreshToken,{expires:expireTimeToken})
        Cookie.set('userInfo',data.user,{expires:expireTimeToken})
        dispatch({type:ACCOUNT_SIGNIN_SUCCESS,payload:data.user})   
      }else{ 
        dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:data.message})
      }
           
  }catch(err){
    console.log(err.message)
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:err.message})
  }
}
}
const signout = (e) => async(dispatch,getState)=>{
  e.preventDefault()
  Cookie.remove("userInfo");
  Cookie.remove("accessToken")
  const token = await Cookie.get("refreshToken")
  console.log(token)
  const last_login = moment().format('YYYY/MM/DD h:mm:ss')
  let {data} = await Axios.post('http://localhost:8080/api/user/signout',{last_login:last_login,refreshToken:token})
  if(data.status ==='success'){
    Cookie.remove("refreshToken")
    store.addNotification({
      ...successNotification,
      message:"User has been logged out"
    })
  }else{
    store.addNotification({
      ...errorNotification,
      message:data.message
    })
  }
  
  dispatch({ type: ACCOUNT_SIGNOUT })
} 
const getInfoUser = () => async(dispatch) =>{
  dispatch({type:USERINFO_FETCH_REQUEST})
  try{
    var {data} = await Axios.get('http://localhost:8080/api/user/data')  
    dispatch({type:USERINFO_FETCH_SUCCESS,payload:data.info})
  }catch(err){
    console.log(err.message)
    // if(err.response.status === 401 || err.response.status === 403 ){
    //   // forceSignout()
    //   dispatch({type:USERINFO_FETCH_FAIL})  
    // }else {
    //   store.addNotification({
    //     ...errorNotification,
    //     message:err.message
    //   })
    //   dispatch({type:USERINFO_FETCH_FAIL})
    // }
    
  }
}

export {signin,signout,getInfoUser}

