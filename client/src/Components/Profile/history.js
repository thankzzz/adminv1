
import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import {useSelector} from 'react-redux'

import moment from 'moment'
import Pagination from '../../UI/Pagination/Pagination'
function History({content}) {
    const [details,setDetails] = useState([])
    const [totalHistory,setTotalHistory] = useState(0)
    const [currentPage,setCurrentPage] = useState(1)
    const userState = useSelector(state=>state.userSignin)
    const {userInfo} = userState
    
    const incrementPage = ()=>{
        setCurrentPage(prevState => prevState + 1)
    }
    const decrementPage = () => {
        setCurrentPage(prevState => prevState - 1)
    }
    const itemPerPage = 15;
    
    const getHistoryData = async()=>{
         let {data} = await Axios({
             method : "GET",
             url: 'http://localhost:8080/api/user/history/' + userInfo.id,
            params:{page:currentPage}
         })
        
            setDetails(data.info)
            // setDetails(prevState =>{ return [...new Set([...prevState,...tmpData])]})
            setTotalHistory(data.total)
    }
    const checkCurrentPaget = () =>{
      
        if(currentPage > 7){
            setCurrentPage(7)
        }
    }
    useEffect(()=>{
            getHistoryData()
            checkCurrentPaget()
    },[currentPage])// eslint-disable-line react-hooks/exhaustive-deps
    return (
        <React.Fragment>
                <div className="flex flex-column pd-top">
                    <div className="heading2 pb-2">User History</div>
                    <div className="subheading3 pb-4">
                        Total history result : {totalHistory} 
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
                    {totalHistory > itemPerPage? <div className="flex align-center justify-center my-4 ">
                        
                        <Pagination
                        currentPage={currentPage}
                        itemPerPage={itemPerPage}
                        incrementPage ={incrementPage}
                        decrementPage ={decrementPage}
                        totalItems = {totalHistory}
                        /> 
                       
                  </div>:''}
                   
                            
                </div>
           
        </React.Fragment>
    )
}

export default History
