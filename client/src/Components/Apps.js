import React,{useEffect} from 'react'
import Header  from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import Content from './Content'
import Axios from 'axios'


function Apps() {
    useEffect(() => {     
        const storeHistoryUser = () => {
            Axios.put('http://localhost:8080/api/user/agent/login-session/update/:id')
          }       
          window.addEventListener('beforeunload', storeHistoryUser);
        
          return () => {
            window.removeEventListener('beforeunload', storeHistoryUser);
          }
      }, [])
    
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
