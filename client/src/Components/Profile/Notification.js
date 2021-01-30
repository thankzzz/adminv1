import React,{useState} from 'react'

function Notification({content}) {
    const [notif,setNotif] = useState({
        setting1:false,
        setting2:false,
        setting3:false,
        setting4:false,
    })
    const handleNotif = (e) =>{
        e.preventDefault()
        console.log(e.target.name)
    }
    return (
        <div className={`tab-pane ${content === "menu2"?"active":"fade"}`}>
            <div className="flex flex-column pd-top">
                <div className="heading2 pb-2">Notification Setting</div>
                <div className="subheading3 pb-4">You will only get notification what have enabled</div>
                <div className="heading-title-profile my-2">SECURITY ALERT</div>
                <div className="flex flex-column pl-4 pt-2">
                    <div className="subheading3-sm mb-4">You will get only those email notification what you want.</div> 
                    <div className="flex">
                        <div className="w-auto ">
                            <input className="checkbox-switch hidden" type="checkbox" id="setting1"/>
                            <label className='switch-btn' for="setting1"></label>    
                        </div>               
                        <div className="subheading3-sm pl-4">Email me whenever encounter unusual activity</div> 
                    </div> 
                    <div className="flex">
                        <div className="w-auto ">
                            <input className="checkbox-switch hidden" type="checkbox" id="setting2"/>
                            <label className='switch-btn' for="setting2"></label>    
                        </div>                              
                        <div className="subheading3-sm pl-4">Email me if new browser is used to sign in</div> 
                    </div> 
                </div>
                <div className="heading-title-profile my-2">NEWS</div>
                <div className="flex flex-column pl-4 pt-2">
                    <div className="subheading3-sm mb-4">You will get only those email notification what you want.</div> 

                    <div className="flex">
                        <div className="w-auto">
                            <input className="checkbox-switch hidden" type="checkbox" id="setting3"/>
                            <label className='switch-btn' for="setting3"></label>    
                        </div>                             
                        <div className="subheading3-sm pl-4">Notify me by email about sales and latest news</div> 
                    </div> 

                    <div className="flex">
                    <div className="w-auto ">
                            <input className="checkbox-switch hidden" type="checkbox" id="setting4"/>
                            <label className='switch-btn' for="setting4"></label>    
                        </div>                                 
                        <div className="subheading3-sm pl-4">Email me about new features and updates</div> 
                    </div> 

                    <div className="flex">
                    <div className="w-auto">
                            <input className="checkbox-switch hidden" type="checkbox" id="setting5"/>
                            <label className='switch-btn' for="setting5"></label>    
                        </div>                             
                        <div className="subheading3-sm pl-4">Email me about tips on using account</div> 
                    </div> 
                </div>   
                                     
             
            </div>
        </div>
    )
}

export default Notification
