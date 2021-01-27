import React from 'react'
import {Link} from 'react-router-dom'
function ProfileConfig() {
    
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
                    <div className="aside-left-item">
                        <div className="flex align-center">
                            <div className="user-image-circle">
                            <img alt="admin-logo" src={process.env.PUBLIC_URL + `assets/img/logo/logo.png`} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="aside-right">
                    
                </div>
            </div>
        </div>

         </React.Fragment>
    )
}

export default ProfileConfig
