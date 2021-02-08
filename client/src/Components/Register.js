import React,{useState} from "react";
import { Formik, ErrorMessage } from "formik";
import Axios from "axios"
import * as Yup from "yup";
import FormikControl from "../Formik/formikControl";
import TextError from '../Formik/textError'
import {errorNotification,successNotification} from '../UI/Toast/NotificationSetting'
import {store} from 'react-notifications-component'


const initialValues = {
  username:'',
  email:'',
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  username: Yup.string().min(5,'Username must be at least 5 character').required('Required'),
  email: Yup.string().email("Invalid email format").required("Required"),
  password: Yup.string().min(8,'Password must be at least 8 character').required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ).required("Required"),
});
function Register() {
  
  
   const [loading,setLoading] = useState(false)
   
   const handleSignup = async (e,formik) =>{
      e.preventDefault()
      setLoading(true)
      if(formik.values.password !== formik.values.confirmPassword){
        store.addNotification({
          errorNotification,
          message:"Password and confirm password does not match"
        })
      }else{  
        let dataPost = {
          username:formik.values.username,
          email:formik.values.email,
          password:formik.values.password
        }
        Axios.post('http://localhost:8080/api/account/create',dataPost).then(()=>{
          formik.resetForm()
            store.addNotification({
                ...successNotification,
                message:'Register user berhasil, silahkan hubungi admin untuk aktivasi account'
              })
              setLoading(false)
        })
        .catch(err=>{
          store.addNotification({
            ...errorNotification,
            message:err.message
          })
          setLoading(false)
        formik.resetForm()
        })
        
      }
   }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(formik) => {
        return (
          <div className="wrapper">
            <div className="login-container">
             
              <div className="login-wrapper">
                <div className="login-header">
                  {/* <img className="mb-2" alt="icon-company" src={process.env.PUBLIC_URL + `assets/img/Logo/hansonlogoc.png`} style={{width:'140px',height:'100px'}}/> */}
                  <span>SIGN UP</span>
                </div>
                <div className="login-body">
                  <form>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <i className="far fa-user"></i>
                    </div>
                    <FormikControl                   
                      control="input"
                      type="text"
                      name="username"
                      className="form-control mb-6 input-login"
                      placeholder="Username"
                      autoComplete="off"
                    />
                  </div>
                  <ErrorMessage component={TextError} name='username'/>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <i className="fas fa-envelope"></i>
                    </div>
                    <FormikControl
                      control="input"
                      type="text"
                      name="email"
                      className="form-control mb-6 input-login"
                      placeholder="Email"
                      autoComplete="off"
                      
                    />
                  </div>
                  <ErrorMessage component={TextError} name='email'/>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <i className="fas fa-lock"></i>
                    </div>
                    <FormikControl
                      control="input"
                      type="password"
                      name="password"
                      className="form-control mb-6 input-login"
                      placeholder="Password" 
                      autoComplete="off"                                          
                    />
                  </div>
                  <ErrorMessage component={TextError} name='password'/>
                  <div className="form-control-wrap">
                    <div className="form-icon form-icon-left">
                      <i className="fas fa-lock"></i>
                    </div>
                    <FormikControl
                     control="input"
                      type="password"
                      name="confirmPassword"
                      className="form-control mb-6 input-login"
                      placeholder="Confirm Password" 
                      autoComplete="off"                    
                    />
                  </div>
                  <ErrorMessage component={TextError} name='confirmPassword'/>
                  <div className="flex align-center justify-center mb-2">
                    <button className="btn btn-primary" disabled={!formik.isValid || formik.isSubmitting || !formik.dirty || loading}  onClick={(e)=>handleSignup(e,formik)}>{loading?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>  :'Sign up'}</button>
                  </div>
                
                  <div className="flex align-center justify-center mt-2">
                    Already have an account ?
                    <a
                      href="/login"
                      className="text-green-500 ml-1 font-semibold"
                    >
                      Sign In
                    </a>
                  </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Formik>
  );
}

export default Register;
