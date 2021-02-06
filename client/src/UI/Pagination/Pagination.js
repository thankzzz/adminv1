import React from 'react'

function Pagination({ currentPage,decrementPage,incrementPage,itemPerPage,totalItems }) {
   
   
   
    var totalPage = Math.ceil(totalItems / itemPerPage)
    var startPage, endPage;
    if (totalPage > 7) {
        totalPage = 7    
    }
    if(totalPage <= 3){
        startPage = 1
        endPage = totalPage
    }else if(currentPage + 3 >= totalPage){
        startPage = currentPage -2
        endPage = startPage + 2
    }else{
        startPage = 1
        endPage = totalPage - 4
    }
    const handleDecrement = (e)=>{
        e.preventDefault()
        if(currentPage <= 1){
            return;
        }else{
            decrementPage()
        }
    }
    const handleIncrement = (e)=>{
        e.preventDefault()
        if(currentPage === totalPage){
            return;
        }else{
            incrementPage()
        }
    
    }
    var pages = [...new Array((endPage + 1) - startPage).keys()].map(i => startPage + i);
    return (
        <div>
            <nav >
                <ul className="pagination cursor-pointer">
                    <li className={`page-item  ${currentPage === 1?'disabled':''}`}>
                        <span className="page-link" tabIndex="-1" onClick={(e)=>{handleDecrement(e)}}>Previous</span>
                    </li>
                    
                    {pages.map((item,index)=>(
                        <li key={index} className={`page-item ${currentPage === item?"active":""}`}><span className="page-link " href="#">{item}</span></li>
                    ))}
                    
                   
                    <li className={`page-item  ${currentPage === totalPage?'disabled':''}`} onClick={(e)=>{handleIncrement(e)}}>
                        <span className="page-link">Next</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination
