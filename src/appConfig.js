import {VscGraph} from "react-icons/vsc";
import {FaIndustry} from "react-icons/fa";
import {TbListDetails} from "react-icons/tb";
import {RiDashboardFill} from "react-icons/ri";
import {BsFillDeviceSsdFill} from "react-icons/bs";
import {GiDrinkMe, GiMovementSensor} from "react-icons/gi";
import {BiSolidReport, BiSolidMessageAltError} from "react-icons/bi"; 

const itemsNavBar = [
    {text:"Panel", icon:<RiDashboardFill/>, route:""},
    {text:"Clientes", icon:<FaIndustry/>, route:""},
    {text:"Dispositivos", icon:<BsFillDeviceSsdFill/>, route:"/Devices"},
    [
        {text:"Informes", icon:<BiSolidReport/>},
        {text:"Detallado", icon:<TbListDetails/>, route:"/Report/Detail"},    
        {text:"Consumo", icon:<GiDrinkMe/>, route:"/Report/Amount"}, 
        {text:"Graficos", icon:<VscGraph/>, route:""}, 
        {text:"Errores", icon:<BiSolidMessageAltError/>, route:""}, 
        {text:"Flujos", icon:<GiMovementSensor/>, route:""},
    ]
];

function getItemForm(userData, stateForm, location, handlerChange){
    const dataItmeSelect = [
        {component: <select name="client" id="client" value={stateForm.client} onChange={handlerChange}>
                        {userData?.devices.map((item, key) => {
                          const {name, location/*, zone*/} = item.idDevice.customer;
                          return <option key={`Rform_${key}`} value={`${item.idDevice.deviceId}`}>
                                    {`${name.toUpperCase()}/${location}`}
                                </option>
                        })}
                    </select>, 
                    title:"Cliente:"}
      ];

    if(location.pathname.includes('/Report')){
        dataItmeSelect.push({component: <input type="date" id="inicial" name="Finicial" value={stateForm.Finicial} onChange={handlerChange}/>, title:"Fecha inicial:"});
        dataItmeSelect.push({component: <input type="date" id="limite" name="Flimite" value={stateForm.Flimite} onChange={handlerChange}/>, title:"Fecha limite:"});
        dataItmeSelect.push({component: <button type="submit">Consular</button>});
    }
      
    return dataItmeSelect;
}

export {
    itemsNavBar,
    getItemForm
}
