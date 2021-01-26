import { ADD_NOTIFICATION } from "../Type/notifType";

const notifReducer = (state = {}, action) => {
    switch (action.type) {
      case ADD_NOTIFICATION:
        return { message: action.message,level:action.level };
      default: return state;
    }
  }

  export {notifReducer}