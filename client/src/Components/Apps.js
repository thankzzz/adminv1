import React from 'react'
import Header  from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import Content from './Content'

function Apps() {
    
    
    return (
        <div className="apps">
            <div className="middleside">
                <div className="leftcomponent">  
                    <Sidebar />
                </div>
                <div className="rightcomponent">
                    <Header/>
                    <Content/>
                </div>
                    
               
            </div>
        </div>
    )
}

export default Apps
