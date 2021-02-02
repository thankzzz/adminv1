import React,{useRef} from "react";
import { Formik, ErrorMessage } from "formik";
import {useDispatch,useSelector} from 'react-redux'
import * as Yup from "yup";
import FormikControl from "../Formik/formikControl";
import TextError from '../Formik/textError'
import {signup} from '../Actions/userAction'
import NotificationSystem from 'react-notification-system';

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
   const userSignup = useSelector(state=>state.userSignup)
   const notificationSystem = useRef(null)
   const {loading} = userSignup
   const dispatch = useDispatch()
   const handleSignup = (e,formik) =>{
      e.preventDefault()
      dispatch(signup(formik,notificationSystem.current))
   }
  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(formik) => {
        return (
          <div className="wrapper">
            <div className="login-container">
              <NotificationSystem ref={notificationSystem}/>
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
