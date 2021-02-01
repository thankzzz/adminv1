import React, { useEffect, useState, useCallback, useRef } from "react";
import Axios from "axios";
import moment from "moment";
import NotificationSystem from 'react-notification-system';
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
function PersonalInformation() {
    const [userData, setUserInfo] = useState({
        fullname: "",
        address: "",
        phone: "",
        dateofbirth: "",
    });
    const userState = useSelector(state=>state.userSignin)
    const {userInfo} = userState
    const decode = jwt_decode(userInfo)
    const notificationSystem = useRef(null)
    const [editInfo, setEditInfo] = useState({
        fullname: "",
        address: "",
        phone: "",
        dateofbirth: "",
    })

    const getDataUser = useCallback(async () => {
        let { data } = await Axios(
            `http://localhost:8080/api/user/data/${decode.id}`
        );
        setUserInfo({
            ...userData,
            fullname: data.info.fullname,
            address: data.info.address,
            phone: data.info.phone,
            dateofbirth: moment(data.info.dateofbirth).format("YYYY-MM-DD"),
        });
    }, []);
    const handleEditInfo = () => {
        setEditInfo({ ...editInfo, fullname: userData.fullname, address: userData.address, phone: userData.phone, dateofbirth: userData.dateofbirth })
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
        let { data } = await Axios.put(`http://localhost:8080/api/user/update/${decode.id}`, updateData)
        if (data.status === "success") {
            getDataUser()
            notificationSystem.current.addNotification({
                message: 'Information has been updated successfully ',
                level: 'success'
            })
        } else {
            notificationSystem.current.addNotification({
                message: data.message,
                level: 'error'
            })
        }
    }
    useEffect(() => {
        getDataUser();
    }, []);
    return (
        <React.Fragment>
            <NotificationSystem ref={notificationSystem} />
           
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
                                {userData.fullname}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>

                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Display name</span>
                            <span className="subheading3 font-medium py-2">
                                {decode.name}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Email</span>
                            <span className="subheading3 font-medium py-2">
                                {decode.email}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Address</span>
                            <span className="subheading3 font-medium py-2">
                                {userData.address}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Phone Number</span>
                            <span className="subheading3 font-medium py-2">
                                {userData.phone}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                    <div className="form-item-profile cursor-pointer" data-toggle="modal" data-target="#modaluserinfo" onClick={() => handleEditInfo()}>
                        <div className="flex flex-column">
                            <span className="heading3 py-2">Date Of Birth</span>
                            <span className="subheading3 font-medium py-2">
                                {userData.dateofbirth}
                            </span>
                        </div>
                        <div className="ml-auto">
                            <i class="fas fa-chevron-right"></i>
                        </div>
                    </div>
                </div>
           
            {/* Modal Edit user information */}
            <div
                class="modal fade"
                tabindex="-1"
                id="modaluserinfo"
                aria-hidden="true"
            >
                <div class="modal-dialog modal-lg rounded-sm" role="document">
                    <div class="modal-content ">
                        <div class="heading-title-profile flex rounded-t-sm align-center">
                            Update Personal Information
                            <span className="ml-auto "> <a href="#" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <i class="fas fa-times "></i>
                            </a>
                            </span>
                        </div>


                        <div class="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-lg-6 border-right-modal" >
                                    <div class="form-group">
                                        <label class="form-label" for="fullname">Fullname</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" id="fullname" placeholder="Input Fullname" value={editInfo.fullname} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="displayname">Display Name</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" id="displayname" placeholder="Input Display Name" disabled value={decode.name} />
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="phone">Phone Number</label>
                                        <div class="form-control-wrap">
                                            <input type="number" class="form-control" id="phone" placeholder="Input phone" value={editInfo.phone} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="w-auto ">
                                            <input className="checkbox-switch hidden" type="checkbox" id="settingname" />
                                            <label className='switch-btn' for="settingname"></label>
                                        </div>
                                        <div className="subheading3-sm pl-2" style={{ fontWeight: '500' }}>Use fullname to display</div>
                                    </div>
                                </div>
                                <div className="col-sm-12 col-lg-6">
                                    <div class="form-group">
                                        <label class="form-label" for="address">Address</label>
                                        <div class="form-control-wrap">
                                            <input type="text" class="form-control" id="address" placeholder="Input Address" value={editInfo.address} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>

                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="dateofbirth">Date of birth</label>
                                        <div class="form-control-wrap">
                                            <input type="date" class="form-control" id="dateofbirth" placeholder="Input Date of birth" value={editInfo.dateofbirth} onChange={(e) => handleChangeEditInfo(e)} />
                                        </div>

                                    </div>
                                </div>


                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-12 col-sm-12">
                                    <button className="btn btn-primary mr-2 " onClick={(e) => handleUpdateInfo(e)}>Update</button>
                                    <button className="btn btn-dim btn-light">Cancel</button>
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
