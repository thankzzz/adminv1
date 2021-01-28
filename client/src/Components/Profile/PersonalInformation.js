import React from 'react'

function PersonalInformation({content}) {
    return (
        <div  className={`tab-pane ${content === "menu1"?"active":"fade"}`}>
             <div  className="flex flex-column">
                        <div className="heading2 pb-2">Personal Information</div>
                        <div className="subheading3 pb-4">Basic info, like your name and address, that you use on your website</div>
                        <div className="heading-title-profile mb-2">Basic</div>
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Full name</span>
                                <span className="subheading3 font-medium py-2">Administrator</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div>        
                       
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Display name</span>
                                <span className="subheading3 font-medium py-2">Administrator</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> 
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Email</span>
                                <span className="subheading3 font-medium py-2">Administrator@gmail.com</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> 
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Address</span>
                                <span className="subheading3 font-medium py-2">Administrator@gmail.com</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> 
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Phone Number</span>
                                <span className="subheading3 font-medium py-2">12345678</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> 
                        <div className="form-item-profile cursor-pointer">
                            <div className="flex flex-column">
                                <span className="heading3 py-2">Date Of Birth</span>
                                <span className="subheading3 font-medium py-2">15 Feb 1996</span>
                            </div>
                            <div className="ml-auto">
                                     <i class="fas fa-chevron-right"></i>
                            </div>
                        </div> 
                        
                    </div>
        </div>
    )
}

export default PersonalInformation
