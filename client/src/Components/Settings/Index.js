import React from 'react'
import {Link} from 'react-router-dom'
function Index() {
    return (
        <React.Fragment>
        <div className="breadcrumb-side">
            <span><i className="fas fa-home"></i></span>
           <span><Link to="/apps">Home</Link></span>
            <span><i className="fas fa-chevron-right"></i></span>
             <span className="activetext">Setting</span>
         </div>
         
         </React.Fragment>
    )
}

export default Index
