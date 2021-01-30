import React from "react";

function SecuritySetting({ content }) {
  return (
    <div className={`tab-pane ${content === "menu3" ? "active" : "fade"}`}>
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
                Set a unique password to protecy your account.
            </span>
            <div className="flex align-center">
                <span className="subheading2-sm pr-2">Last changed: 2 Oct 2019</span>
                <button className="btn btn-primary">Change Password</button>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}

export default SecuritySetting;
