import Cookie from 'js-cookie'
import {errorNotification} from '../UI/Toast/NotificationSetting'
import {store} from 'react-notifications-component'



const forcelogout = (props) =>{
    
    Cookie.remove("userInfo")
    Cookie.remove("refreshToken")
    Cookie.remove("accessToken")
    store.addNotification({
        ...errorNotification,
        message:'You need to login first'
    })
    setTimeout(()=>{
        window.location.replace("/login");
    },3000)
    
}

export { forcelogout }