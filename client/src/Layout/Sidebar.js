import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {signout} from '../Actions/userAction'
function Sidebar() {
    const [sidebarCollapse,setSidebarCollapse] = useState(true)
    const collapse = sidebarCollapse?"sidebar-collapse":"sidebar-show"
    const handleSidebar = (e) =>{
        e.preventDefault()
        setSidebarCollapse(!sidebarCollapse)
    }
    const dispatch = useDispatch()
    return (
        <div className={`${collapse}`}>
        <div className={`leftside-container`}>
            <div className="w-full h-full flex ">
                    <div className="sidebar-app ">
                    <div className ="flex align-center pt-2">
                        <span className="icon-bar" onClick={(e)=>handleSidebar(e)}><i className="fas fa-bars fa-2x"></i></span>  
                        <span className='navbar-logo'><img alt="admin-logo" src={process.env.PUBLIC_URL + '/assets/img/logo/logo.png'} /></span> 
                    </div>
                        <ul className="vertical-menu panel-group" id="accordion">
                            
                            <li className="menu-header">Website Application</li>
                            <li>
                                <Link to="/" className="menu-item">
                                <i className="fas fa-tachometer-alt fa-2x menu-icon"></i>
                                   <span className="menu-text"> Dashboard </span>                            
                                </Link>
                            </li>
                            <li >
                                <a  className="menu-item " data-toggle="collapse" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                <i className="fas fa-box menu-icon fa-2x"></i>
                                <span className="menu-text"> Product</span>
                                    <i className="fas fa-chevron-left  menu-icon-rightside"></i>
                                </a>
                                    
                                    <ul className="submenu-container collapse" id="collapseOne" aria-labelledby="headingOne" data-parent="#accordion">
                                        <li>
                                            <a href="/#"className="submenu-item">
                                            <i className="fas fa-dot-circle submenu-icon"></i>
                                            <span className="submenu-text"> Create Product</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/#" className="submenu-item">
                                            <i className="fas fa-dot-circle submenu-icon"></i>
                                            <span className="submenu-text"> Category</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/#" className="submenu-item">
                                            <i className="fas fa-dot-circle submenu-icon"></i>
                                            <span className="submenu-text"> Brand</span>
                                            </a>
                                        </li>
                                        <li>
                                            <a href="/#" className="submenu-item">
                                            <i className="fas fa-dot-circle submenu-icon"></i>
                                            <span className="submenu-text"> Setting</span>
                                            </a>
                                        </li>
                                    </ul>
                            </li>
                            
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-images menu-icon fa-2x"></i>
                                    <span className="menu-text"> Gallery   </span>                            
                                </a>
                            </li>
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-address-book menu-icon fa-2x"></i>
                                <span className="menu-text">Download List  </span>                          
                                </a>
                            </li>
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-envelope menu-icon fa-2x"></i>
                                <span className="menu-text">Messages      </span>                     
                                </a>
                            </li>
                            <li>
                                <Link to="/apps/setting" className="menu-item">
                                <i className="fas fa-cog menu-icon fa-2x"></i>
                                <span className="menu-text"> Setting   </span>                        
                                </Link>
                            </li>
                            <li>
                                <Link to="/apps/profile" className="menu-item">
                                <i className="fas fa-id-card menu-icon fa-2x"></i>
                                <span className="menu-text">Profile   </span>                        
                                </Link>
                            </li>                          
                            <li onClick={()=>dispatch(signout())}>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-sign-out-alt menu-icon fa-2x"></i>
                                <span className="menu-text">Sign Out   </span>                        
                                </a>
                            </li>
                            <li className="menu-header">Custom Application</li>
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-plus-square menu-icon fa-2x"></i>
                                <span className="menu-text"> Example Menu 1  </span>                       
                                </a>
                            </li>
                            
                           
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-plus-square menu-icon fa-2x"></i>
                                <span className="menu-text"> Example Menu 2   </span>                    
                                </a>
                            </li>
                            <li>
                                <a href="/#" className="menu-item">
                                <i className="fas fa-plus-square menu-icon fa-2x"></i>
                                   <span className="menu-text"> Example Menu 3   </span>                        
                                </a>
                            </li>
                           
                        </ul>
                    </div>
            </div>
        </div>
        </div>
    )
}

export default Sidebar
