import React, {useState,useCallback,useEffect} from "react";
import Axios from "../../Api"
import {errorNotification,successNotification} from '../../UI/Toast/NotificationSetting'
import {store} from 'react-notifications-component'
import {useSelector} from 'react-redux'
import moment from 'moment'
import { forcelogout } from "../GlobalAction";


function PersonalInformation() {
    const userLogin = useSelector(state=>state.userSignin)
    const {userInfo} = userLogin
    const [userProfile,setUserProfile] = useState({
        fullname:"",
        address:"",
        phone:"",
        dateofbirth:""
    })
    const getUserInfo = useCallback(async()=>{
        try{
            let {data} = await Axios.get('http://localhost:8080/api/user/')  
            let user = data.info
            if(!user){
                return;
            }else{
                
                setUserProfile({...userProfile,fullname: user.fullname, address: user.address, phone: user.phone,dateofbirth:user.dateofbirth })
            }  
        }catch(err){
            if (err.status === 403 || err.status === 401) {
               forcelogout()
            } else {
                store.addNotification({
                    ...errorNotification,
                    message: err.message
                })
            }
        }
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    const [editInfo, setEditInfo] = useState({
        fullname: "",
        address: "",
        phone: "",
        dateofbirth: ""
    })  
    const isDataChanged =  userProfile.fullname === editInfo.fullname &&  userProfile.address === editInfo.address && userProfile.phone === editInfo.phone && userProfile.dateofbirth === editInfo.dateofbirth? true : false
    
    const handleEditInfo = () => {
        setEditInfo({ ...editInfo, fullname: userProfile.fullname, address: userProfile.address, phone: userProfile.phone,dateofbirth:moment(userProfile.dateofbirth).format("YYYY-MM-DD")})
    }
    const handleChangeEditInfo = (e) => {
        e.preventDefault()
        setEditInfo({ ...editInfo, [e.target.id]: e.target.value })
    }
    const handleUpdateInfo = async (e) => {
        e.preventDefault()
        let updateData = {
            fullname: editInfo.fullname,
            address: editInfo.address,
            phone: editInfo.phone,
            dateofbirth: editInfo.dateofbirth
        }   
        Axios.put(`http://localhost:8080/api/user/update/`,updateData).then(()=>{
                getUserInfo()
                store.addNotification({
                    ...successNotification,
                    message: 'Information has been updated successfully'  ,
                });
            }).catch(err=>{  
                if(err.status === 401 || err.status === 403){
                   forcelogout()                  
                }else{
                    store.addNotification({
                        ...errorNotification,
                        message: err.message  ,
                    });
                }                                         
            })
       
    }
    useEffect(()=>{
        getUserInfo()
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    
    return (
        <React.Fragment>                   
                <div className="flex flex-column pd-top">
               
                    <div className="heading2 pb-2">Personal Information</div>
                    <div className="subheading3 pb-4">
                        Basic info, like your name and address, that you use on your website
                    </div>
                    <div className="heading-title-profile mb-2">Basic</div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Full name</span>
                            <span className="subheading3 font-medium py-2">
                                {userProfile.fullname?userProfile.fullname:"Tidak ada data"}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>

                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Display name</span>
                            <span className="subheading3 font-medium py-2">
                                {userInfo.username}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Email</span>
                            <span className="subheading3 font-medium py-2">
                                {userInfo.email}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Address</span>
                            <span className="subheading3 font-medium py-2">
                                {userProfile.address?userProfile.address:"Tidak ada data"}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Phone Number</span>
                            <span className="subheading3 font-medium py-2">
                                {userProfile.phone?userProfile.phone:"Tidak ada data"}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Date Of Birth</span>
                            <span className="subheading3 font-medium py-2">
                                {userProfile.dateofbirth?moment(userProfile.dateofbirth).format("DD MMMM YYYY"):'Tidak ada data'}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i className="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
           
            {/* Modal Edit user information */}
            <div
                className="modal fade"
                tabIndex="-1"
                id="modaluserinfo"
                aria-hidden="true"
            >
                <div className="modal-dialog modal-lg rounded-sm" role="document">
                    <div className="modal-content ">
                        <div className="heading-title-profile flex rounded-t-sm align-center">
                            Update Personal Information
                            <span className="ml-auto "> <a href="!#" className="close text-white" data-dismiss="modal" aria-label="Close">
                                <i className="fas fa-times "></i>
                            </a>
                            </span>
                        </div>


                        <div className="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-lg-6 border-right-modal" >
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="fullname">Fullname</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="fullname" placeholder="Input Fullname" value={editInfo.fullname === null?"":editInfo.fullname} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="displayname">Display Name</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="displayname" placeholder="Input Display Name" disabled value={userInfo.username} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="phone">Phone Number</label>
                                        <div className="form-control-wrap">
                                            <input type="number" className="form-control" id="phone" placeholder="Input phone" value={editInfo.phone === null?"":editInfo.phone} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>
                                    </div>
                                    
                                </div>
                                <div className="col-sm-12 col-lg-6">
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="address">Address</label>
                                        <div className="form-control-wrap">
                                            <input type="text" className="form-control" id="address" placeholder="Input Address" value={editInfo.address?editInfo.address:""} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>

                                    </div>
                                    <div className="form-group">
                                        <label className="form-label" htmlFor="dateofbirth">Date of birth</label>
                                        <div className="form-control-wrap">
                                            <input type="date" className="form-control" id="dateofbirth" placeholder="Input Date of birth" value={editInfo.dateofbirth?editInfo.dateofbirth:" "} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>

                                    </div>
                                </div>


                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-12 col-sm-12">
                                    <button className="btn btn-primary mr-2 " disabled={isDataChanged} data-dismiss="modal" aria-label="Close" onClick={(e) => handleUpdateInfo(e)}>Update</button>
                                    <button className="btn btn-dim btn-light" data-dismiss="modal" aria-label="Close">Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default PersonalInformation;
