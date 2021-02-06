import Axios from "axios";
import moment from 'moment'

import Cookie from 'js-cookie';
import jwt_decode from "jwt-decode";
import { Redirect } from "react-router-dom";
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
const getInfoUser = () => async(dispatch,getState) =>{
  dispatch({type:USERINFO_FETCH_REQUEST})
 
  const {userSignin:{userInfo}} = getState()
  console.log(userInfo)
  try{
    let decode = await jwt_decode(userInfo)
    var {data} = await axios.get(`http://localhost:8080/api/user/${decode.id}`,{
      headers:{
          Authorization:'Bearer'+ userInfo
      }
  })
    // let tmpData = {
    //   fullname:data.info.fullname || null, 
    //   address:data.info.address || null,
    //   phone:data.info.phone || null,
    //   image_file:data.info.image_file || null,
    //   dateofbirth: moment(data.info.dateofbirth).format("DD/MM/YYYY")
      
    // }
    // console.log(tmpData)
    dispatch({type:USERINFO_FETCH_SUCCESS,payload:data.info})
  }catch(err){
    Cookie.remove("userInfo");
    window.location.href = "http://localhost:3000/login";
    dispatch({type:USERINFO_FETCH_FAIL,payload:err.message})
  }
}
export {signin,signout,getInfoUser}

