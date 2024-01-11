//import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom"

import { FaArrowLeft } from "react-icons/fa";

import { setDataUser, getDataDevice, getDataProducts } from "./redux/actions";

import style from "./App.module.css";
import Home from "./components/Home/Home";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Landing from './components/Landing/Landing';
import Updating from "./components/Updating/Updating";
import ReportForm from "./components/ReportForm/ReportForm";
import ReportDetail from './components/ReportDetail/ReportDetail';
import ReportAmount from './components/ReportAmount/ReportAmount';
import DevicesSheet from './components/DevicesSheet/DevicesSheet';

import {itemsNavBar, getItemForm} from "./appConfig";

const initAxiosInterceptors = () => {
  axios.interceptors.request.use(function(config){
    const localInfo = localStorage.getItem('auth');

    if(localInfo) config.headers.Authorization = `bearer ${localInfo}`;
    return config;
  })
};

initAxiosInterceptors();

function App() {
  const fechaActual = new Date().toISOString().split('T')[0];
  const [stateForm, setStateForm] = useState({Finicial:fechaActual.substring(0, 8) + '01', Flimite:fechaActual, client:''});
  const [messageLogin, setMessageLogin] = useState('');
  const [navHidden, setNavHidden] = useState(false);
  const [access, setAccess] = useState(false);

  const userData = useSelector((state) => state.userData);
  const dispatch = useDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    (async function(){
      try{
        const { data } = await axios.get('http://localhost:3001/User');
        dispatch(setDataUser(data.user));
        console.log(data.user);
      }catch(error){
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(() => {
    if(userData){
      if(Object.keys(userData).length > 0){
        if(!access) setAccess(true);
        if(location.pathname === "/" || location.pathname === "/Login") navigate("/Home");
        if(stateForm.client === ''){
          setStateForm({...stateForm, client:userData.devices[0].idDevice.deviceId});
          dispatch(getDataDevice(userData.devices[0].idDevice.deviceId));
          dispatch(getDataProducts());
        } 
      }else if(location.pathname !== "/Login"){
        if(access) setAccess(false);
        navigate('/Login');
      } 
    }else if(location.pathname !== "/") navigate('/');
  }, [userData, location.pathname]);

  const login = async (userData) => {
    try{
      const { data } = await axios.post('http://localhost:3001/Login', userData);

      localStorage.setItem('auth', JSON.stringify({token: data.token}));
      dispatch(setDataUser(data.user));
      initAxiosInterceptors();
    }catch(error){
      const status = error.status || error.response.status || error.response.request.status;
      if(status === 401) setMessageLogin(error.response.data.error)
      else window.alert(error.message);
    }
  }

  const iconRowHiddenNavbar = 
    <div className={navHidden ? style.ArrowHiddenNavbar : style.ArrowShowNavbar} 
          onClick={() => setNavHidden(!navHidden)}>
      <FaArrowLeft/>
    </div>;

  const styleRoutes = access ? 
                      `${style.routesDiv} ${navHidden ? style.routesHiddenNavBar : style.routesShowNavBar}`
                      : `${style.loginDiv}`;

  const handlerChangeForm = (event) => {
    setStateForm({...stateForm, [`${event.target.name}`]:event.target.value});
    if(event.target.name === 'client') dispatch(getDataDevice(event.target.value));
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();

    try{
      const { data } = await 
        axios.get(`http://localhost:3001/DeviceInfo?deviceId=${stateForm.client}&dateStart=${stateForm.Finicial}&dateEnd=${stateForm.Flimite}`);
    
      console.log(data);
    }catch(error){
        console.log(error.message);
    }
  }

  return (
    <div className="App">
      {access && <>
        <Header styleHeader={style.styleHeader} name={userData.name}/>                    
        <NavBar hidden={navHidden}
          itemsNavBar={itemsNavBar} 
          iconHeader={iconRowHiddenNavbar}
          styleNav={navHidden ? style.navHidden : style.navShow}/> 
      </>}
                        
      <div className={styleRoutes}>
        {(location.pathname.includes('/Report') || location.pathname.includes('/Devices')) && 
          <ReportForm keyItem={"report"} 
                      handlerSubmit={handlerSubmit}
                      items={getItemForm(userData, stateForm, location, handlerChangeForm)}/>}

        <Routes>
          <Route path="/" element={<Updating/>} />
          <Route path="/Login" element={userData ? <Landing login={login} 
                                                            message={messageLogin}
                                                            setMessage={setMessageLogin}/> : <Updating/>} />
          <Route path="/Home" element={userData ? <Home/> : <Updating/>}/> 

          <Route path="/Devices" element={userData ? <DevicesSheet /> : <Updating/>} />
          
          <Route path="/Report/Detail" element={userData ? <ReportDetail/> : <Updating/>}/>
          <Route path="/Report/Amount" element={userData ? <ReportAmount/> : <Updating/>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
