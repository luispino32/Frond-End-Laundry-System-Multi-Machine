import { useState } from "react";
import Modal from "../Modal/Modal";
import ViewLav from "../ViewLav/ViewLav";
import style from "./LavadoraSheet.module.css";
import CreateLav from "../CreateLav/CreateLav";
import { putDataDevice } from "../../redux/actions";
import HeaderSheet from "../HeaderSheet/HeaderSheet";
import { useSelector, useDispatch } from "react-redux";
import NavigationBar from "../NavigationBar/NavigationBar";

import {MdOutlineCreateNewFolder} from "react-icons/md";
import {RiSave3Fill} from "react-icons/ri";
import {GrClose} from "react-icons/gr";

export default function LavadoraSheet(){
    const header = [];
    const itemsNavigationBar = [];

    const [clickIcon , setClickIcon] = useState('');

    const formData = useSelector((state) => state.formAux);
    const userData = useSelector((state) => state.userData);
    const idDevice = useSelector((state) => state.dataDevice._id);
    const dataMachines = useSelector((state) => state.dataDevice.Machines);
    const dataFormulas = useSelector((state) => state.dataDevice.Formulas);

    const dispatch = useDispatch();

    if(dataMachines.amount > 0)
        for(let i=0; i<dataMachines.amount; i++)
            itemsNavigationBar.push(`Lavadora ${i+1} - ${dataMachines.kg[i]}Kg`);

    const [itemsNav, setItemsNav] = useState(itemsNavigationBar[0]);
    const handlerChangeNav = (event) => setItemsNav(`${event.target.textContent}`);

    if(userData.mode === 'SuperUser' && dataMachines.amount < 10) 
        header.push({icon:<MdOutlineCreateNewFolder/>, handler: () => setClickIcon('Crear'), text:'Crear'});

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formData);

        if(formData.capacidadLav <= 0){
            alert('La capacidad de la lavadora debe ser mayor a 0 Kg');
        }else if(formData.flushTime <= 0){
            alert('El tiempo de flush debe ser mayor a 0 seg');
        }else{
            const Machines = {...dataMachines};
            Machines.amount = formData.indexLav + 1;
            Machines.kg[formData.indexLav] = formData.capacidadLav;
            Machines.timeFlush[formData.indexLav] = formData.flushTime;
            Machines.state[formData.indexLav] = formData.stateLav;
            dispatch(putDataDevice({deviceId:idDevice,
                                    values:{Machines:{...Machines}}}));
        }
    }

    const headerModalCreate = ['CREAR LAVADORA', 
        <div className={style.cerrarModal} >
            <div onClick={() => setClickIcon('')}>
                <GrClose size= "1.6em"/><span>Cerrar</span>
            </div>
            <div onClick={handleFormSubmit}>
                <RiSave3Fill size= "1.6em"/>
                <span>Guardar</span>
            </div>
        </div>
    ];
    
    const lavIndexSelect = dataMachines.amount ? parseInt(itemsNav.substring(9,11).trim()) - 1 : 0;

    //console.log("machine:  ...");
    const machine = dataMachines.amount ? {
        formulas: dataMachines.formulas[lavIndexSelect],
        kg: dataMachines.kg[lavIndexSelect],
        state: dataMachines.state[lavIndexSelect],
        timeFlush: dataMachines.timeFlush[lavIndexSelect],
        index: lavIndexSelect
     } : {};

    return(
        <div className={style.mainDiv}>
            <HeaderSheet icons={header} nameKey={'lavadoraH'}/>
            <div style={{padding:dataMachines.amount ? '' : '2% 1.5%'}}>
                {dataMachines.amount ? 
                    <NavigationBar menus={itemsNavigationBar} 
                            nameKey={'navLavs'} 
                            select={{itemsNav: itemsNav, handlerChangeNav: handlerChangeNav}}/> :
                'Sin Lavadoras Creadas'}
            </div>
            {dataMachines.amount && <ViewLav formulas={dataFormulas} 
                                             enabled={false}
                                             machine={machine}/>
            }
            
            
            {(clickIcon === 'Crear' && dataMachines.amount < 10) && 
                <Modal header={headerModalCreate}>
                    <CreateLav formulas={dataFormulas} machines={dataMachines}/> 
                </Modal>
            }
        </div>
    );
}