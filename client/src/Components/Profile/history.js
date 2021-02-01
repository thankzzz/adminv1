import React,{useEffect} from 'react'
import {useRouteMatch} from 'react-router-dom'
function History({content}) {
    return (
        <React.Fragment>
                <div className="flex flex-column pd-top">
                <div className="heading2 pb-2">User History</div>
                    <div className="subheading3 pb-4">
                        Total history 10
                    </div>
                    <div className="listhistory-item">
                            <span className="pr-4">#127337321</span>
                            <span className="history-content pr-2">You change profile setting</span>
                            <span className="ml-auto ">23 March 2021</span>
                    </div>                   
                </div>
           
        </React.Fragment>
    )
}

export default History
