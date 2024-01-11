import axios from 'axios';

export const SET_FORM_AUX = "SET_FORM_AUX";
export const SET_DATA_USER = "SET_DATA_USER";
export const GET_DATA_DEVICE = "GET_DATA_DEVICE";
export const GET_DATA_PRODUCTS = "GET_DATA_PRODUCTS";

export const setDataUser = (data) => {
    return{
        type: SET_DATA_USER,
        payload: data
    };
};

export const setFormAux = (form) => {
    return{
        type: SET_FORM_AUX,
        payload: form
    }
}

export const getDataProducts = () => {
    return async (dispach) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/Products`);
            
            return dispach({
                type: GET_DATA_PRODUCTS,
                payload: data
            });
        }catch(error){
            window.alert(error.message);
        }
    };
};

export const getDataDevice = (deviceId) => {
    return async (dispach) => {
        try{
            const {data} = await axios.get(`http://localhost:3001/Device/${deviceId}`);
            
            return dispach({
                type: GET_DATA_DEVICE,
                payload: data
            });
        }catch(error){
            window.alert(error.message);
        }
    };
};

export const putDataDevice = (dataDevice) => {
    return async (dispach) => {
        try{
            const {data} = await axios.put(`http://localhost:3001/Device`, dataDevice);
            
            return dispach({
                type: GET_DATA_DEVICE,
                payload: data
            });
        }catch(error){
            window.alert(error.message);
        }
    };
};

