import React, { useState, useEffect, useRef, useCallback } from 'react'

import Notification from './Notification'
import { Link, Route, useRouteMatch, Redirect, NavLink } from 'react-router-dom'
import PersonalInformation from './PersonalInformation'
import SecuritySetting from './SecuritySetting'
import { errorNotification, successNotification } from '../../UI/Toast/NotificationSetting'
import { store } from 'react-notifications-component'
import Axios from '../../Api'
import moment from 'moment'
import History from './history'
import {useSelector} from 'react-redux'
import { forcelogout } from '../GlobalAction'

function ProfileConfig() {
    const { url, path } = useRouteMatch()
    const [dropMenuProfile, setDropMenuProfile] = useState(false)
    const [profileImg, setProfileImg] = useState(null)
    const [userAgent, setUserAgent] = useState({
        last_login: '',
        last_ip: ''
    })
    const userSignin = useSelector(state=>state.userSignin)
    const {userInfo} = userSignin
    const inputFile = useRef(null)
    
    const getUserProfileImage = useCallback(async () => {
        try {
            let { data } = await Axios.get('http://localhost:8080/api/user/profile/image')
            if (data.status === "success") {
                setProfileImg(data.info.image_file)
            } else {
                store.addNotification({
                    ...errorNotification,
                    message: data.message
                })
            }
        } catch (err) {
            if (err.response.status === 403 || err.response.status === 401) {
                forcelogout()
            } else {
                store.addNotification({
                    ...errorNotification,
                    message: err.message
                })
            }
        }
    }, []);// eslint-disable-line react-hooks/exhaustive-deps

    const getUserAgent = async () => {
        try {
            let { data } = await Axios.get(`http://localhost:8080/api/user/agent/`)
            if (!data.info) {
                store.addNotification({
                    ...errorNotification,
                    message: 'Data tidak ditemukan'
                })
            } else {
                let checkOnline = data.info.online ? <span style={{ color: '#00af91', fontWeight: 'bold' }}>Online <i className="fas fa-circle"></i> </span> : moment(data.info.last_login).format("DD MMMM YYYY HH:MM:SS")
                setUserAgent({ ...userAgent, last_login: checkOnline, last_ip: data.info.last_ip })

            }
        } catch (err) {
            if (err.response.status === 403 || err.response.status === 401) {
                forcelogout()
            } else {
                store.addNotification({
                    ...errorNotification,
                    message: err.message
                })
            }
        }
    }
    const toggleDropdown = (e) => {
        e.preventDefault()
        setDropMenuProfile(!dropMenuProfile)
    }

    const handleChangeImage = async (e) => {
        let target = e.target.files[0]
        if (!target) {
            return;
        } else if (target.size >= 1024 * 1024) {
            store.addNotification({
                ...errorNotification,
                message: 'Gambar tidak boleh melebihi 2 mb'
            })
        } else {
            let formData = new FormData()
            formData.append("user_image", target)
            Axios.put(`http://localhost:8080/api/user/upload/profile/image`, formData, { headers: { 'Content-Type': 'multipart/form-data'}})
                .then(result => {
                    let data = result.data
                    if(data.status === "success"){
                        store.addNotification({
                            ...successNotification,
                            message: 'Profile image berhasil diubah'
                        })
                        getUserProfileImage()
                    }else{
                        store.addNotification({
                            ...errorNotification,
                            message: data.message
                        })
                    }
                    
                }).catch(err => {
                    store.addNotification({
                        ...errorNotification,
                        message: err.message
                    })
                })
        }
    }
    const profileImage = profileImg ? 'data:image/png;base64,' + new Buffer(profileImg, 'binary').toString('base64') : process.env.PUBLIC_URL + '/assets/img/logo/hansonlogob.png'
    useEffect(() => {
        getUserAgent()
        getUserProfileImage()
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
                <div className="content-profile">
                    <div className="aside-left">
                        <div className="aside-column-item ">
                            <div className="flex align-center">
                                <div className="user-image-circle" >
                                    <img src={profileImage} alt="user-profile" />
                                </div>
                                <div className="flex flex-column p-2" >
                                    <span className="heading2-sm font-bold">{userInfo.username}</span>
                                    <span className="subheading2-sm ">{userInfo.email}</span>
                                </div>
                                <div className='dropmenu-container'>
                                    <div className="block cursor-pointer" onClick={(e) => toggleDropdown(e)}>
                                        <i className="fas fa-ellipsis-v fa-lg" ></i>
                                    </div>
                                    <div className={`dropdown-menu-profile ${dropMenuProfile ? "" : "hidden"}`} >
                                        <input type="file" ref={inputFile} className="hidden" onChange={(e) => handleChangeImage(e)} />
                                        <div className="dropdown-menu-item" onClick={() => inputFile.current.click()} style={{ borderBottom: '1px solid #DBDFEA' }}>
                                            <span className="pr-2"><i className="fas fa-image"></i></span>
                                            <span>Change Photo  </span>
                                        </div>
                                        {/* <div className="dropdown-menu-item" onClick={() => inputFile.current.click()} style={{ borderBottom: '1px solid #DBDFEA' }}>
                                            <span className="pr-2"><i className="fas fa-image"></i></span>
                                            <span>Make offline </span>
                                        </div> */}
                                    </div>

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
                                <NavLink to={`${url}/notification`} activeClassName="active-link"><div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
                                    <span className="w-8"><i className="fas fa-bell fa-2x"></i></span>
                                    <span className="pl-2 subheading3">Notification</span>
                                    <span className="ml-auto pr-2"><i className="fas fa-chevron-right"></i></span>
                                </div>
                                </NavLink>
                                <NavLink to={`${url}/history`} activeClassName="active-link"><div className="flex align-center text-xl py-2 option-profile cursor-pointer" >
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
                        <Route exact path={`${path}/`}><Redirect to={`${path}/personal-information`} /></Route>
                        <Route exact path={`${path}/security-setting`} component={SecuritySetting} />
                        <Route exact path={`${path}/personal-information`} component={PersonalInformation} />
                        <Route exact path={`${path}/notification`} component={Notification} />
                        <Route exact path={`${path}/history`} component={History} />


                    </div>
                </div>
            </div>

        </React.Fragment>
    )
}

export default ProfileConfig
