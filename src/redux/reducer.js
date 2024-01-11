import {
    SET_FORM_AUX,
    SET_DATA_USER,
    GET_DATA_DEVICE,
    GET_DATA_PRODUCTS
} from "./actions";

const initialState =  {
    dataProducts:[],
    userData: null,
    dataDevice: {},
    formAux: {}
}

const rootReducer = (state = initialState, {type, payload}) => {
    switch(type){  
        case SET_FORM_AUX:
            return{...state, formAux: payload} 
        case SET_DATA_USER:
            return{...state, userData: payload};
        case GET_DATA_DEVICE:
            return{...state, dataDevice: payload};
        case GET_DATA_PRODUCTS:
            return{...state, dataProducts: payload};
        default: 
            return{ ...state }
    }
}

export default rootReducer;