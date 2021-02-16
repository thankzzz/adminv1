import React, { useState, useEffect } from "react";
import { errorNotification, successNotification } from '../../UI/Toast/NotificationSetting'
import Axios from "../../Api";
import { Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import FormikControl from "../../Formik/formikControl";
import TextError from "../../Formik/textError";
import moment from "moment";
import { useSelector } from "react-redux";

import { store } from 'react-notifications-component'
import { forcelogout } from "../GlobalAction";
const initialValues = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const validationSchema = Yup.object({
  oldPassword: Yup.string().required("Required"),
  newPassword: Yup.string()
    .min(8, "Password must be at least 8 character")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Required"),
});

function SecuritySetting() {
  const [settings, setSettings] = useState({
    store_activity: false,
  });
  const userSignin = useSelector(state => state.userSignin)
  const { userInfo } = userSignin
  const [loading, setLoading] = useState(false);
  const getSetting = async () => {
    try {
      let { data } = await Axios.get(
        `http://localhost:8080/api/user/setting`
      );
      if (data.status === "success") {
        setSettings({ ...settings, store_activity: data.info.store_activity });
      } else {
        store.addNotification({
          ...errorNotification,
          message: 'Data tidak ditemukan 404'
        });
      }
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        forcelogout()
      }
      store.addNotification({
        ...errorNotification,
        message: err.message
      });
    }
  };

  const handleSubmitData = async (e, formik) => {
    e.preventDefault();
    setLoading(true);
    let updateData = {
      oldPassword: formik.values.oldPassword,
      newPassword: formik.values.newPassword,
    };
    try {
      let { data } = await Axios.put('http://localhost:8080/api/user/change/password', updateData)
      if (data.status === "success") {
        store.addNotification({
          ...successNotification,
          message: 'Password has been changed successfully',
        });
        
      } else {
        store.addNotification({
          ...errorNotification,
          message: data.message,
        });
        
      }
      setLoading(false);
      formik.resetForm();
    } catch (err) {
      if (err.status === 401 || err.status === 403) {
        forcelogout()
      } else {
        store.addNotification({
          ...errorNotification,
          message: err.message,
        });
      }
      setLoading(false);
      formik.resetForm();
    }

  };

  const handleChangeSetting = (e) => {
    setSettings({ ...settings, store_activity: !settings.store_activity });
    const updateActivity_setting = e.target.checked;
    Axios.put('http://localhost:8080/api/user/setting/update/', { store_activity: updateActivity_setting })
      .then(() => {
        store.addNotification({
          ...successNotification,
          message: "Setting has been changed successfully",
        })
      }).catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          forcelogout()
        } else {
          store.addNotification({
            errorNotification,
            message: err.message,
          });
        }
      })
  };

  const handleCancel = (e, formik) => {
    e.preventDefault();
    formik.resetForm();
  };
  useEffect(() => {
    getSetting();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  const lastChangePassword = moment(userInfo.updatedAt).format("DD MMMM YYYY");
  return (
    <React.Fragment>


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
                checked={settings.store_activity}
                onChange={(e) => handleChangeSetting(e)}
              />
              <label className="switch-btn" htmlFor="setting8"></label>
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
              <span className="subheading2-sm pr-2">
                Last changed: {lastChangePassword}
              </span>
              <button
                className="btn btn-primary"
                data-toggle="modal"
                data-target="#modalchangepassword"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* modal change password */}
      <Formik initialValues={initialValues} validationSchema={validationSchema}>
        {(formik) => {
          return (
            <div
              className="modal fade"
              tabIndex="-1"
              id="modalchangepassword"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-sm rounded-sm" role="document">
                <div className="modal-content ">
                  <div className="heading-title-profile flex rounded-t-sm align-center">
                    Change password
                    <span className="ml-auto ">
                      {" "}
                      <a
                        href="!#"
                        className="close text-white"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <i className="fas fa-times "></i>
                      </a>
                    </span>
                  </div>

                  <div className="modal-body">
                    <div className="row">
                      <div className="col-sm-12 col-lg-12  ">
                        <form>
                          <div className="form-group">
                            <label className="form-label" htmlFor="oldPassword">
                              Old Password
                            </label>
                            <div className="form-control-wrap">
                              <FormikControl
                                control="input"
                                type="password"
                                name="oldPassword"
                                className="form-control mb-6 input-login"
                                placeholder="Input old password"
                                autoComplete="off"
                              />
                            </div>
                            <ErrorMessage
                              component={TextError}
                              name="oldPassword"
                            />
                          </div>

                          <div className="form-group">
                            <label className="form-label" htmlFor="newPassword">
                              New Password
                            </label>
                            <div className="form-control-wrap">
                              <FormikControl
                                control="input"
                                type="password"
                                name="newPassword"
                                className="form-control mb-6 input-login"
                                placeholder="Input new password"
                                autoComplete="off"
                              />
                            </div>
                            <ErrorMessage
                              component={TextError}
                              name="newPassword"
                            />
                          </div>
                          <div className="form-group">
                            <label
                              className="form-label"
                              htmlFor="confirmPassword"
                            >
                              Confirm New Password
                            </label>
                            <div className="form-control-wrap">
                              <FormikControl
                                control="input"
                                type="password"
                                name="confirmPassword"
                                className="form-control mb-6 input-login"
                                placeholder="Input confirm password"
                                autoComplete="off"
                              />
                              <ErrorMessage
                                component={TextError}
                                name="confirmPassword"
                              />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="row mt-2">
                      <div className="col-lg-12 col-sm-12">
                        <button
                          className="btn btn-primary mr-2 "
                          disabled={
                            !formik.isValid ||
                            formik.isSubmitting ||
                            !formik.dirty ||
                            loading
                          }
                          onClick={(e) => handleSubmitData(e, formik)}
                        >
                          {loading ? (
                            <span>
                              <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                              ></span>
                            </span>
                          ) : (
                              "Change"
                            )}
                        </button>
                        <button
                          className="btn btn-dim btn-light"
                          data-dismiss="modal"
                          aria-label="Close"
                          onClick={(e) => handleCancel(e, formik)}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Formik>
    </React.Fragment>
  );
}

export default SecuritySetting;
