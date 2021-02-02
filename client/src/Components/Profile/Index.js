import React, { useState, useEffect } from 'react'

import Notification from './Notification'
import { Link, Route, useRouteMatch,Redirect,NavLink } from 'react-router-dom'
import PersonalInformation from './PersonalInformation'
import SecuritySetting from './SecuritySetting'
import jwt_decode from 'jwt-decode'

import Axios from 'axios'
import moment from 'moment'
import History from './history'
import {useSelector} from 'react-redux'
function ProfileConfig() {
    const { url, path } = useRouteMatch()

    const userState = useSelector(state=>state.userSignin)
    const {userInfo} = userState
    const [userAgent, setUserAgent] = useState({
        last_login: '',
        last_ip: ''
    })
    
    
    const decode = jwt_decode(userInfo)
    const getUserAgent = async () => {
        try{
            let { data } = await Axios.get(`http://localhost:8080/api/user/agent/${decode.id}`)
         
            if(!data.info){
                console.log('disconect')
            }else{
                let checkOnline = data.info.online ? <span style={{ color: '#00af91', fontWeight: 'bold' }}>Online <i className="fas fa-circle"></i> </span> : moment(data.info.last_login).format("DD MMMM YYYY HH:MM:SS")
                setUserAgent({ ...userAgent, last_login: checkOnline, last_ip: data.info.last_ip })
                
            }   
        }catch(err){
            console.log(err.message)
        }
        
    }

    useEffect(() => {
        getUserAgent()

    }, [])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Fragment>
            <div className="breadcrumb-side">
                <span><i className="fas fa-home"></i></span>
                <span><Link to="/apps">Home</Link></span>
                <span><i className="fas fa-chevron-right"></i></span>
                <span className="activetext">{path} </span>
            </div>
            <div className="content-container">
                <div className="content-aside">
                    <div className="aside-left">
                        <div className="aside-column-item ">
                            <div className="flex align-center">
                                <div className="user-image-circle" >
                                    <img src={process.env.PUBLIC_URL + '/assets/img/logo/dummy-profile.jpg  '} alt="user-profile"/>
                                </div>
                                <div className="flex flex-column p-2">
                                    <span className="heading2-sm font-bold">{decode.name}</span>
                                    <span className="subheading2-sm ">{decode.email}</span>
                                   
                                </div>
                                <div className="ml-auto pr-2 cursor-pointer text-2xl">
                                    <i className="fas fa-ellipsis-v fa-"></i>
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
                                <NavLink to={`${url}/personal-information`} activeClassName="active-link"> <div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
                                    <span className="w-8"><i className="fas fa-user-tie fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Personal Information</span>
                                    <span className="ml-auto pr-2"><i className="fas fa-chevron-right"></i></span>
                                </div>
                                </NavLink>
                                <NavLink to={`${url}/notification`}  activeClassName="active-link"><div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
                                    <span className="w-8"><i className="fas fa-bell fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Notification</span>
                                    <span className="ml-auto pr-2"><i className="fas fa-chevron-right"></i></span>
                                </div>
                                </NavLink>
                                <NavLink to={`${url}/history`}  activeClassName="active-link"><div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
                                    <span className="w-8"><i className="fas fa-history fa-2x"></i></span>
                                    <span className="pl-2 subheading3">User History</span>
                                    <span className="ml-auto pr-2"><i className="fas fa-chevron-right"></i></span>
                                </div>
                                </NavLink>
                                <NavLink to={`${url}/security-setting`} activeClassName="active-link"><div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
                                    <span className="w-8"><i className="fas fa-user-shield fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Security Setting</span>
                                    <span className="ml-auto pr-2"><i className="fas fa-chevron-right"></i></span>
                                </div>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className="aside-right px-4 py-2 tab-content ">
                        <Route exact path={`${path}/`}><Redirect to={`${path}/personal-information`}/></Route>
                        <Route exact path={`${path}/security-setting`} component={SecuritySetting}/>
                        <Route exact path={`${path}/personal-information`} component={PersonalInformation}/>
                        <Route exact path={`${path}/notification`} component={Notification}/>
                        <Route exact path={`${path}/history`} component={History}/>
                        
                      
                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default ProfileConfig
