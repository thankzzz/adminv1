import Axios from "axios";

import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, 
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, 
  USER_SIGNUP_REQUEST,
  USER_SIGNUP_SUCCESS, 
  USER_SIGNUP_FAIL, 
  USER_SIGNOUT, 
} from "../Type/usertype";
const signup = (formik,notificationSystem) => async (dispatch) =>{
  dispatch({type:USER_SIGNUP_REQUEST})
  if(formik.values.password !== formik.values.confirmPassword){
    dispatch({type:USER_SIGNUP_FAIL,payload:'Password and confirm password does not match'})
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
        dispatch({type:USER_SIGNUP_SUCCESS,payload:data})
          notificationSystem.addNotification({
          message:'Register user berhasil, silahkan hubungi admin untuk aktivasi account',
          level:'success'
        })
      }else{
        dispatch({type:USER_SIGNUP_FAIL,payload:data.message})
          notificationSystem.addNotification({
          message:data.message,
          level:'error'
      })
        formik.resetForm()
      }
      
    }catch(err){
      dispatch({type:USER_SIGNUP_FAIL,payload:err.message})
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
  dispatch({type:USER_SIGNIN_REQUEST})
  try{
    let dataPost ={
      email : loginData.email,
      password:loginData.password

    }
    const {data} = await Axios.post('http://localhost:8080/api/account/signin',dataPost)
    if(data.status === "success"){
      console.log('success')
      dispatch({type:USER_SIGNIN_SUCCESS,payload:data})
      Cookie.set('userInfo',data.token)
    }else{
      console.log('failed')
      dispatch({type:USER_SIGNIN_FAIL,payload:data.message})
    }  
  }catch(err){
    
    dispatch({type:USER_SIGNIN_FAIL,payload:err.message})
  }
}
const signout = () => async(dispatch)=>{
  Cookie.remove("userInfo");
  dispatch({ type: USER_SIGNOUT })
}
export {signup,signin,signout}