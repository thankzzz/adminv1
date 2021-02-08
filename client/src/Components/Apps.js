import React,{useEffect} from 'react'
import Header  from '../Layout/Header'
import Sidebar from '../Layout/Sidebar'
import Content from './Content'





function Apps() {
  
   
    useEffect(() => {     
        const storeHistoryUser = () => {
           
               
          }       
          window.addEventListener('beforeunload', storeHistoryUser);
        
          return () => {
            window.removeEventListener('beforeunload', storeHistoryUser);
          }
      }, [])// eslint-disable-line react-hooks/exhaustive-deps
    
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
