import CreateProgram  from "../CreateProgram/CreateProgram";
import { useSelector, useDispatch } from "react-redux";
import HeaderSheet from "../HeaderSheet/HeaderSheet";
import { putDataDevice } from "../../redux/actions";
import style from "./FormulaSheet.module.css";
import Modal from "../Modal/Modal";
import Table from "../Table/Table";
import { useState } from "react";

import {MdOutlineCreateNewFolder} from "react-icons/md";
import {RiDeleteBin6Line, RiNumbersFill} from "react-icons/ri";
import {RiSave3Fill} from "react-icons/ri";
import {SlArrowDown} from "react-icons/sl";
import {FaRegEdit} from "react-icons/fa";
import {GiCancel} from "react-icons/gi";
import {GrClose} from "react-icons/gr";

export default function FormulaSheet(){
    const [selectRowTable, setSelectRowTable] = useState([-1, -1]);
    const [clickIcon , setClickIcon] = useState('');

    const dispatch = useDispatch();

    const dataProducts = useSelector((state) => state.dataProducts);
    const dataDevice = useSelector((state) => state.dataDevice);
    const userData = useSelector((state) => state.userData);
    const formData = useSelector((state) => state.formAux);

    const [dateForm, setDateForm] = useState(dataDevice.Formulas.map(formula => {
        return formula.steps.length > 0 ? {
            nameWeb: formula.nameWeb.toUpperCase(),
            stateForm: formula.state
        } : {};
    }).filter(formula => Object.keys(formula).length > 0));

    const handlerFormChange = (event) => {
        const index = event.target.name.indexOf('_');
        const indexArray = parseInt(event.target.name.substring(index+1));

        const property = event.target.name.substring(0, index);
        const value = property.indexOf('stateForm') >= 0 ? 
            event.target.checked: event.target.value;

        setDateForm(dateForm.map((state, index2) => 
            (indexArray === index2 ? {...state, [`${property}`]: value} : state)));
    }

    let countForm = -1;
    const datosFormulas = dataDevice.Formulas.map((formula, index) => { 
        const lavsEnable = formula.steps.length > 0 ?
            dataDevice.Machines.formulas
            .reduce((value, element, index2) => {
                return element[index] ? value + `Lavadora ${index2+1}` : value + ''
            }, '') : '';

        if(formula.steps.length > 0) countForm++;

        return formula.steps.length > 0 ? {
            Nombre_Formula: <div>
                <span>{`${index+1} - `}</span>
                <input className={clickIcon === "Editar" ? style.inputFormEdit : style.inputForm} 
                       type="text" 
                       onChange={handlerFormChange}
                       name={`nameWeb_${countForm}`}
                       value={dateForm[countForm].nameWeb} 
                       disabled={clickIcon !== "Editar"}/>
            </div>,
            Ciclos: `${formula.steps.filter(step => Object.keys(step).length > 0).length}`,
            Estado: formula.state,
            Lavadoras: lavsEnable === '' ? 'Sin Lavadoras asignadas' : lavsEnable
        } : {};
    }).filter(formula => Object.keys(formula).length > 0);

    let formulaNumer = 0;
    datosFormulas.forEach((data, index) => {
        if(Object.keys(data).length > 0){
            formulaNumer++;
            data.Estado = <input type="checkbox" 
                                 name={`stateForm_${index}`}
                                 onChange={handlerFormChange}
                                 checked={dateForm[index].stateForm} 
                                 disabled={clickIcon !== "Editar"}/>
        } 
    });

    const header = [];
    /*{icon:<RiSave3Fill/>, text:'Guardar'},
    {icon:<GiCancel/>, text:'Cancelar'},
    {icon:<FaRegEdit/>, text:'Editar'},*/
    if(userData.mode === 'SuperUser' && clickIcon !== "Editar") 
        header.push({icon:<MdOutlineCreateNewFolder/>, handler: () => setClickIcon('Crear'), text:'Crear'});

    if(formulaNumer > 0 && selectRowTable[0] < 0) 
        header.push({icon:clickIcon === "Editar" ? <RiSave3Fill/> : <FaRegEdit/>, 
                     text:clickIcon === "Editar" ? 'Actualizar' : 'Editar', 
                     handler: () => {
                        if(clickIcon === "Editar"){
                            setClickIcon('');
                        }else{
                            setClickIcon('Editar');
                        }
                     }
        });

    if(clickIcon === "Editar")
        header.push({icon:<GrClose/>, handler: () => setClickIcon(''), text:'Cancelar'});

    const handleFormSubmit = event => {
        event.preventDefault();
        console.log(formData);

        if(Object.keys(formData).length === 0) return;

        if(formData.nombrePrograma.length <= 0){
            alert('El nombre del programa es obligatorio');
        }else if(formData.nombreProgramaDevice.length <= 0){
            alert('El nombre del programa del dispositivo es obligatorio');
        }else if(formData.nombreProgramaDevice.length > 10){
            alert('El nombre del programa del dispositivo debe tener maximo 10 caracteres');
        }else{
            const indexForm = parseInt((formData.numeroPrograma).substring(8)) - 1;
            const Formulas = [...dataDevice.Formulas];
            Formulas[indexForm].nameDevice = formData.nombreProgramaDevice;
            Formulas[indexForm].nameWeb = formData.nombrePrograma;
            Formulas[indexForm].state = formData.stateFormula;
            Formulas[indexForm].steps.push({
                step: 'Pre-Lavado',
                products:[{
                    product: 1,
                    amount: 1,
                    extraAmount: 0
                }]
            });

            const Machines = {...dataDevice.Machines};
            Object.keys(formData).forEach(property => {
                if(property.indexOf('Lavadora_') >= 0)
                    (Machines.formulas[parseInt(property.substring(9))-1])[indexForm] = formData[property];
            });

            dispatch(putDataDevice({deviceId:dataDevice._id,
                                    values:{Formulas:[...Formulas], Machines:{...Machines}}}));
        }
    }

    const headerModalCreate = ['CREAR PROGRAMA', 
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

    const datosDetalleFormula = [];
    if(selectRowTable[0] >= 0){
        //{Paso_Lavado:'1 - Pre-Lavado', Producto:'Bomba 1 / Buster', Cantidad: '2.00 ml/kg', Dosificacion:'100 ml'},
  
        const pasoLavado = dataDevice.Formulas[selectRowTable[0]].steps;

        pasoLavado.forEach((paso, index) => {
            if(Object.keys(paso).length > 0){
                datosDetalleFormula.push({
                    Paso_Lavado:`${index+1} - ${paso.step}`,
                    Producto:paso.products.map(quim => `Bomba ${quim.product} / ${
                        dataProducts.find(quim2 => 
                            quim2._id === (dataDevice.Products[quim.product-1]).product).nameWeb
                    }`),
                    Cantidad:paso.products.map(product => `${product.amount} ml/kg`),
                    Dosificacion_ml:paso.products.map(product => {
                        const dosisMachines = dataDevice.Machines.formulas.map((state,index) => 
                            state[selectRowTable[0]] ? `Lv${index+1}:${product.amount*dataDevice.Machines.kg[index]}` : '')
                            .filter(dosis => dosis !== '');

                        return dosisMachines? dosisMachines.reduce((total, dosis) => {
                            return total + ' ' + dosis;
                        }, '').trim() : '';
                    })
                });
            }
        });
    }

    const headerModalEditStep = [(selectRowTable[0] >= 0 && selectRowTable[1] >= 0) ? `${datosFormulas[selectRowTable[0]].Nombre_Formula} / ${datosDetalleFormula[selectRowTable[1]].Paso_Lavado}` : '', 
        <div className={style.cerrarModal} >
            <div onClick={() => setSelectRowTable([selectRowTable[0], -1])}>
                <GrClose size= "1.6em"/><span>Cerrar</span>
            </div>
            <div><RiSave3Fill size= "1.6em"/><span>Actualizar</span></div>
            <div><RiDeleteBin6Line size= "1.6em"/><span>Borrar</span></div>
        </div>
    ];

    const handlerCLickRow = (event) => 
        setSelectRowTable([
            clickIcon === "Editar" ? selectRowTable[1] : Number(event.currentTarget.id), 
            selectRowTable[1]
        ]);
    const handlerCLickRowDetail = (event) => setSelectRowTable([selectRowTable[0], Number(event.currentTarget.id)]);
    
    const styleRowTable = datosFormulas.map((data, index) => ({
            display: selectRowTable[0] >= 0 ? selectRowTable[0] === index? '' : 'none' : '',
            backgroundColor: selectRowTable[0] === index? 'rgb(248, 247, 247)' : ''}));

    const styleRowTableDetail = datosDetalleFormula.map((data, index) => ({
            backgroundColor: selectRowTable[1] === index? 'rgb(248, 247, 247)' : ''}));

    return(
        <form>
            <div className={style.mainDiv}> 
                <HeaderSheet icons={header} nameKey={'formulaH'}/>
                <div className={style.tableFormula} style={{paddingBottom:selectRowTable[0]>=0?'0.4%':''}}> 
                    <Table dataTable={datosFormulas} keyTable={`FormSheet`} 
                           rowTable={{handlerCLick: handlerCLickRow, style: styleRowTable}}/>

                    {selectRowTable[0] >= 0 && 
                        <div className={style.arrowDiv} onClick={() => setSelectRowTable([-1, selectRowTable[1]])}>
                                <SlArrowDown size="1.4em"/>
                        </div>}
                </div>
            </div>

            {selectRowTable[0] >= 0 && <div className={`${style.tableFormula} ${style.tableDetail}`}>
                <Table dataTable={datosDetalleFormula} keyTable={`FormDetail`} 
                       rowTable={{handlerCLick:handlerCLickRowDetail, style: styleRowTableDetail}}/>
            </div>}

            {selectRowTable[1] >= 0 && <Modal header={headerModalEditStep}/>}
            {clickIcon === 'Crear' && <Modal header={headerModalCreate}>
                <CreateProgram formulas={dataDevice.Formulas} machines={dataDevice.Machines}/> 
            </Modal>}
        </form>
    );
}