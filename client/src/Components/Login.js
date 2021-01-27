import React,{useState} from "react";
import {useSelector,useDispatch} from 'react-redux'
import {signin} from '../Actions/userAction'
import publicIp from 'public-ip'
import moment from 'moment'
function Login() {
  const usersignin = useSelector(state=>state.userSignin)
  const dispatch = useDispatch()
  const {error,loading} = usersignin
  const [dataUser,setDataUser] = useState({
    email:'',
    password:'',
    last_login:moment(),
    last_ip: publicIp.v4()
  })
  const handleChangeForm = (e) =>{
    e.preventDefault()
    setDataUser({...dataUser,[e.target.name]:e.target.value})
  }
  const handleLogin = (e)=>{
    e.preventDefault()
      dispatch(signin(dataUser))
    
  }
  return (         
            <div className="wrapper">
              <div className="login-container">
                
                <div className="login-wrapper">
                  <div className="login-header">
                    <img className="mb-2" alt="icon-company" src={process.env.PUBLIC_URL + `assets/img/Logo/hansonlogoc.png`} style={{width:'140px',height:'100px'}}/>
                    <span>Login</span>
                  </div>
                  <div className="login-body">
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <i className="far fa-user"></i>
                      </div>
                      <input                                           
                        type="email"                       
                        name="email"
                        placeholder="Email"
                        className="form-control mb-6 input-login"
                        autoComplete="off"
                        onChange={(e)=>handleChangeForm(e)}
                      />
                    </div>
                  
                    <div className="form-control-wrap">
                      <div className="form-icon form-icon-left">
                        <i className="fas fa-lock"></i>
                      </div>
                      <input                       
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="form-control mb-6 input-login"
                        autoComplete="off"
                        onChange={(e)=>handleChangeForm(e)}
                      />
                    </div>                   
                    <div className="flex align-center justify-center">
                      <button className="btn btn-primary" onClick={(e)=>handleLogin(e)}>{loading?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>  :'Sign in'}</button>
                    </div>
                    <div className="flex align-center justify-center mt-2">
                      Not Registered?
                      <a href="/register" className="text-green-500 ml-1 font-semibold">
                        Created an account  
                      </a>
                      
                    </div>
                   
                  </div>
                </div>
                <div className="m-3">
                    {error && <div className="text-red-500 text-sm font-semibold">{error}</div> }   
                </div>
              </div>
             
            </div>
          
       
   
  );
}

export default Login;
