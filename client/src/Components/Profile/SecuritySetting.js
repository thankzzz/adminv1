import React,{useState,useRef} from "react";
import NotificationSystem from "react-notification-system";
import Axios from 'axios'
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../Formik/formikControl";
import TextError from '../../Formik/textError' 
import moment from 'moment'
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'

const initialValues = {
  oldPassword:"",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string().min(8,'Password must be at least 8 character').required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("newPassword"), null],
    "Passwords must match"
  ).required("Required"),
});
function SecuritySetting() {
  const userState = useSelector(state=>state.userSignin)
    const {userInfo} = userState
    const decode = jwt_decode(userInfo)
  const notificationSystem = useRef(null)
  const [loading,setLoading] = useState(false)
  const handleSubmitData = async (e,formik)=>{
    e.preventDefault() 
    let updateData = {
      oldPassword:formik.values.oldPassword,
      newPassword:formik.values.newPassword
    }
    let {data} = await Axios.put(`http://localhost:8080/api/account/change/password/${decode.id}`,updateData)
    if(data.status === "success"){
      formik.resetForm()
      notificationSystem.current.addNotification({
        message:'Password has been changed successfully',
        level:'success'
      })
    }else{
      formik.resetForm()
      notificationSystem.current.addNotification({
        message:'Password cannot be changed at this time',
        level: 'error'
      })
    }
  }
  const handleCancel = (e,formik) =>{
    e.preventDefault()
    formik.resetForm()
  }
  const lastChangePassword = moment(decode.updatedAt).format("DD MMMM YYYY")
  return (
    <React.Fragment>
      <NotificationSystem ref={notificationSystem}/>     
    
      <div className="flex flex-column pd-top">
        <div className="heading2 pb-2">Security Setting</div>
        <div className="subheading3 mb-1">
          These settings are helps you keep your account secure
        </div>
        <div className="form-item-profile">
          <div className="flex flex-column">
            <span className="heading3 py-2">Save My Activity Logs</span>
            <span className="subheading3-sm font-medium py-2">
              You can save your all activity logs including unusual activity
              detected.
            </span>
          </div>
          <div className="ml-auto">
            <div className="w-auto">
              <input
                className="checkbox-switch hidden"
                type="checkbox"
                id="setting8"
              />
              <label className="switch-btn" for="setting8"></label>
            </div>
          </div>
        </div>
        <div className="form-item-profile">
          <div className="flex flex-column">
            <span className="heading3 py-2">Change Password</span>
            <span className="subheading3-sm font-medium py-2">
                Set a unique password to protect your account.
            </span>
            <div className="flex align-center">
                <span className="subheading2-sm pr-2">Last changed: {lastChangePassword}</span>
                <button className="btn btn-primary" data-toggle="modal" data-target="#modalchangepassword">Change Password</button>
            </div>
          </div>
          
        </div>
      </div>
  

    {/* modal change password */}
    <Formik initialValues={initialValues} validationSchema={validationSchema}>
      {(formik)=>{return(
          <div class="modal fade" tabindex="-1"id="modalchangepassword" aria-hidden="true">
                <div class="modal-dialog modal-sm rounded-sm" role="document">
                    <div class="modal-content ">
                        <div class="heading-title-profile flex rounded-t-sm align-center">
                            Change password
                            <span className="ml-auto "> <a href="#" class="close text-white" data-dismiss="modal" aria-label="Close">
                                <i class="fas fa-times "></i>
                            </a>
                            </span> 
                        </div>


                        <div class="modal-body">
                            <div className="row">
                                <div className="col-sm-12 col-lg-12  " >
                                    <div class="form-group">
                                        <label class="form-label" for="oldPassword">Old Password</label>
                                        <div class="form-control-wrap">
                                        <FormikControl control="input" type="password"  
                                        name="oldPassword" className="form-control mb-6 input-login" 
                                        placeholder="Input old password"/>
                                        </div>
                                        <ErrorMessage component={TextError} name='oldPassword'/>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label class="form-label" for="newPassword">New Password</label>
                                        <div class="form-control-wrap">
                                        <FormikControl control="input" type="password"  
                                        name="newPassword" className="form-control mb-6 input-login" 
                                        placeholder="Input new password"/>
                                        </div>
                                        <ErrorMessage component={TextError} name='newPassword'/>
                                    </div>
                                    <div class="form-group">
                                        <label class="form-label" for="confirmPassword">Confirm New Password</label>
                                        <div class="form-control-wrap">
                                        <FormikControl control="input" type="password"  
                                        name="confirmPassword" className="form-control mb-6 input-login" 
                                        placeholder="Input confirm password"/>                                       
                                        <ErrorMessage component={TextError} name='confirmPassword'/>
                                        </div>
                                    </div>
                                </div>
                                


                            </div>
                            <div className="row mt-2">
                                <div className="col-lg-12 col-sm-12">
                                    <button className="btn btn-primary mr-2 "disabled={!formik.isValid || formik.isSubmitting || !formik.dirty || loading}  onClick={(e)=>handleSubmitData(e,formik)}>{loading?<span><span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span></span>  :'Change'}</button>
                                    <button className="btn btn-dim btn-light" data-dismiss="modal" aria-label="Close" onClick={(e)=>handleCancel(e,formik)}>Cancel</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
          )}}
            </Formik>
    </React.Fragment>
  );
}

export default SecuritySetting;
