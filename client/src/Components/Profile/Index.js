import React from 'react'
import {Link,useRouteMatch} from 'react-router-dom'
function ProfileConfig() {
    
    return (
        <React.Fragment>
        <div className="breadcrumb-side">
            <span><i class="fas fa-home"></i></span>
           <span><Link to="/apps">Home</Link></span>
            <span><i class="fas fa-chevron-right"></i></span>
             <span className="activetext">Profile</span>
         </div>
        <div className="content-container">
            <div className="content-aside">
                <div className="aside-left">

                </div>
                <div className="aside-right">
                    
                </div>
            </div>
        </div>

         </React.Fragment>
    )
}

export default ProfileConfig
