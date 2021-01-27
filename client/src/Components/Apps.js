import React,{useState} from 'react'
import Header  from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import Content from './Content'

function Apps() {
    const [sidebarCollapse,setSidebarCollapse] = useState(false)
    const handleSidebar = (e) =>{
        e.preventDefault()
        setSidebarCollapse(!sidebarCollapse)
    }
    return (
        <div className="apps">
            <div className="middleside">
                <div className="leftcomponent">  
                    <Sidebar sidebarCollapse={sidebarCollapse}/>
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
