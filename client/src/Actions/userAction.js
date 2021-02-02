import Axios from "axios";
import moment from 'moment'
import publicIp from 'public-ip'
import Cookie from 'js-cookie';
import jwt_decode from "jwt-decode";

import {
  ACCOUNT_SIGNIN_REQUEST, 
  ACCOUNT_SIGNIN_SUCCESS,
  ACCOUNT_SIGNIN_FAIL, 
  ACCOUNT_SIGNUP_REQUEST,
  ACCOUNT_SIGNUP_SUCCESS, 
  ACCOUNT_SIGNUP_FAIL, 
  ACCOUNT_SIGNOUT, 
  USERINFO_FETCH_REQUEST,
  USERINFO_FETCH_SUCCESS,
  USERINFO_FETCH_FAIL
} from "../Type/usertype";
import axios from "axios";
const signup = (formik,notificationSystem) => async (dispatch) =>{
  dispatch({type:ACCOUNT_SIGNUP_REQUEST})
  if(formik.values.password !== formik.values.confirmPassword){
    dispatch({type:ACCOUNT_SIGNUP_FAIL,payload:'Password and confirm password does not match'})
  }else{  
    try{
      let dataPost = {
        username:formik.values.username,
        email:formik.values.email,
        password:formik.values.password
      }
      const {data} = await Axios.post('http://localhost:8080/api/account/create',dataPost)
      if(data.status === "success"){
        formik.resetForm()
        dispatch({type:ACCOUNT_SIGNUP_SUCCESS,payload:data})
          notificationSystem.addNotification({
          message:'Register user berhasil, silahkan hubungi admin untuk aktivasi account',
          level:'success'
        })
      }else{
        dispatch({type:ACCOUNT_SIGNUP_FAIL,payload:data.message})
          notificationSystem.addNotification({
          message:data.message,
          level:'error'
      })
        formik.resetForm()
      }
      
    }catch(err){
      dispatch({type:ACCOUNT_SIGNUP_FAIL,payload:err.message})
        notificationSystem.addNotification({
        message:err.message,
        level:'error'
      })
      console.log(formik)
      formik.resetForm()
    }
  }
}

const signin = (loginData) => async (dispatch) =>{
  dispatch({type:ACCOUNT_SIGNIN_REQUEST})
  let getIp = await publicIp.v4()
  let getLocation = await Axios.get(`https://geolocation-db.com/json/85249190-4601-11eb-9067-21b51bc8dee3/${getIp}`)
  let locationInfo = getLocation.data
  try{
    let dataPost ={
      email : loginData.email,
      password:loginData.password,
      last_login: moment().format('YYYY/MM/DD h:mm:ss'),
      last_ip: getIp,
      last_country:locationInfo.country_name,
      last_city:locationInfo.city
    }  
    const {data} = await Axios.post('http://localhost:8080/api/account/signin',dataPost)
    if(data.status === "success"){
      Cookie.set('userInfo',data.token)
      dispatch({type:ACCOUNT_SIGNIN_SUCCESS,payload:data.token})
      
    }else{
     
      dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:data.message})
    }  
  }catch(err){
    dispatch({type:ACCOUNT_SIGNIN_FAIL,payload:err.message})
  }
}
const signout = () => async(dispatch)=>{
  Cookie.remove("userInfo");
  dispatch({ type: ACCOUNT_SIGNOUT })
}
const getInfoUser = () => async(dispatch) =>{
  dispatch({type:USERINFO_FETCH_REQUEST})
  try{
    let token = Cookie.getJSON('userInfo')
    let decode = await jwt_decode(token)
    
    var {data} = await axios.get(`http://localhost:8080/api/user/data/${decode.id}`)
    let tmpData = {
      fullname:data.info.fullname,
      address:data.info.address,
      phone:data.info.phone,
      dateofbirth: moment(data.info.dateofbirth).format("DD/MM/YYYY HH:MM:SS")
      
    }
    
    dispatch({type:USERINFO_FETCH_SUCCESS,payload:tmpData})
  }catch(err){
    dispatch({type:USERINFO_FETCH_FAIL,payload:'terjadi keslahan'})
  }
}
export {signup,signin,signout,getInfoUser}

