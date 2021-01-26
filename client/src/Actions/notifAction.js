import {
    ADD_NOTIFICATION
} from '../Type/notifType'

const addNotif = (newMsg,newLvl) => (dispatch) =>{
    dispatch({type:ADD_NOTIFICATION,message:newMsg,level:newLvl});
} 

export {addNotif}