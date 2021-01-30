import React,{useState,useEffect} from 'react'
import {Link} from 'react-router-dom'
import Notification from './Notification'
import PersonalInformation from './PersonalInformation'
import SecuritySetting from './SecuritySetting'
import jwt_decode from 'jwt-decode'
import Cookie from 'js-cookie'
import Axios from 'axios'
import moment from 'moment'
function ProfileConfig() {
    const [content,setContent] = useState("menu1")
    const handleContent = (e,content) =>{
        e.preventDefault()
        setContent(content)
    }
    const [userAgent,setUserAgent] = useState({
        last_login:'',
        last_ip:''
    })
    
    const token = Cookie.get('userInfo')
    const decode = jwt_decode(token)
    const getUserAgent = async () =>{
        let {data} =  await Axios.get(`http://localhost:8080/api/user/agent/${decode.id}`)
        let checkOnline = data.info.online?<span style={{color:'#00af91',fontWeight:'bold'}}>Online <i class="fas fa-circle"></i> </span>:moment(data.info.last_login).format("DD MMMM YYYY HH:MM:SS")
        setUserAgent({...userAgent,last_login:checkOnline,last_ip:data.info.last_ip})
    }
    
    useEffect(()=>{
        getUserAgent()
        
    },[])
    return (
        <React.Fragment>
        <div className="breadcrumb-side">
            <span><i class="fas fa-home"></i></span>
           <span><Link to="/apps">Home</Link></span>
            <span><i class="fas fa-chevron-right"></i></span>
             <span className="activetext">Profile </span>
         </div>
        <div className="content-container">
            <div className="content-aside">
                <div className="aside-left">
                    <div className="aside-column-item ">
                        <div className="flex align-center">
                            <div className="user-image-circle">
                                <img src={process.env.PUBLIC_URL + '/assets/img/logo/dummy-profile.png'}/>
                            </div>
                            <div className="flex flex-column p-2">
                                <span className="heading2-sm">Administrator</span>
                                <span className="subheading2-sm">Administrator@gmail.com</span>
                            </div>
                            <div className="ml-auto pr-2 cursor-pointer text-2xl">
                                     <i class="fas fa-ellipsis-v fa-"></i>
                            </div>
                        </div>
                    </div>
                    <div className="aside-column-item ">
                        <div className="flex flex-column pl-2">
                                <div className="flex flex-column ">
                                    <span className="heading3 pb-4">Last Login</span>
                                    <span className="subheading3">{userAgent.last_login}</span>
                                    <span className="heading3 pt-4 pb-4">Last IP</span>
                                    <span className="subheading3">{userAgent.last_ip}</span>
                                </div>
                        </div>
                    </div>
                    <div className="aside-column-item">
                        <div className="flex flex-column pl-2">
                                <div className="flex align-center text-xl py-2 option-profile cursor-pointer" onClick={(e)=>handleContent(e,"menu1")}> 
                                    <span className="w-8"><i class="fas fa-user-tie fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Personal Information</span>
                                    <span className="ml-auto pr-8"><i class="fas fa-chevron-right"></i></span>
                                </div>
                                <div className="flex align-center text-xl py-2 option-profile cursor-pointer" onClick={(e)=>handleContent(e,"menu2")}> 
                                    <span className="w-8"><i class="fas fa-bell fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Notification</span>
                                    <span className="ml-auto pr-8"><i class="fas fa-chevron-right"></i></span>
                                </div>
                                <div className="flex align-center text-xl py-2 option-profile cursor-pointer" onClick={(e)=>handleContent(e,"menu3")}> 
                                    <span className="w-8"><i class="fas fa-user-shield fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Security Setting</span>
                                    <span className="ml-auto pr-8"><i class="fas fa-chevron-right"></i></span>
                                </div>                              
                        </div>
                    </div>
                </div>
                <div className="aside-right px-4 py-2 tab-content ">
                   <PersonalInformation content={content} decode={decode}/>
                   <Notification content={content} decode={decode}/>
                   <SecuritySetting content={content} decode={decode}/>
                </div>
            </div>
        </div>

         </React.Fragment>
    )
}

export default ProfileConfig
