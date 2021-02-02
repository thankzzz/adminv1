
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux'
import jwt_decode from 'jwt-decode'
import moment from 'moment'
function History({content}) {
    const [details,setDetails] = useState([])
    const userState = useSelector(state=>state.userSignin)
    const {userInfo} = userState
    const decode = jwt_decode(userInfo)
   
    const getHistoryData = async()=>{
         let {data} = await Axios.get(`http://localhost:8080/api/user/history/${decode.id}`)
         setDetails(data.info)
       
    }
    useEffect(()=>{
            getHistoryData()
            
    },[])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Fragment>
                <div className="flex flex-column pd-top">
                <div className="heading2 pb-2">User History</div>
                    <div className="subheading3 pb-4">
                        Total history {details.length}
                    </div>
                    {details.length <= 0 && <div className="listhistory-item justify-center">Tidak ada data history</div>}
                    {
                        details.map(item=>{
                            let timeMoment = moment(item.createdAt).format("DD MMMM YYYY HH:MM:SS")
                            return(
                            <div key={item.id} className="listhistory-item">
                            <span className="pr-4">#{item.id}</span>
                            <span className="history-content pr-2">{item.history}</span>
                            <span className="ml-auto ">{timeMoment}</span>
                             </div>  
                            )
                             
                        })
                    }
                                    
                </div>
           
        </React.Fragment>
    )
}

export default History
