import React from 'react'

function Header() {
    
    
    return (
        
            <div className="navbar-side">
                <div className="flex w-full h-full align-center">                   
                        <div className="title-navbar">
                            Dashboard
                        </div>                 
                    <div className="flex align-center  px-4 ml-auto text-white">
                        <span className="navbar-item"><i className="fas fa-bell fa-2x"></i></span>
                        <span className="navbar-item"><i className="fas fa-envelope fa-2x"></i></span>
                        <span className="navbar-item"><i className="fas fa-user-circle fa-2x"></i></span>
                    </div>
                </div> 
            </div> 
            
            // <div className="breadcrumb-side">
            //     <span><i class="fas fa-home"></i></span>
            //     <span>Home</span>
            //     <span><i class="fas fa-chevron-right"></i></span>
            //     <span>Profile</span>
            // </div>
        
    )
}

export default Header
