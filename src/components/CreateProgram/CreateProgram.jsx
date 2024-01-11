import { setFormAux } from "../../redux/actions";
import style from "./CreateProgram.module.css";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function CreateProgram({ lavRef, formulas, machines }){
    const initState = () => {
        let initObject = {
            nombrePrograma: '',
            nombreProgramaDevice: '',
            numeroPrograma: '',
            stateFormula: true
        }

        formulas.find((formula, index) => {
            if(formula.steps.length === 0) initObject.numeroPrograma = `Formula ${index+1}`;
            return formula.steps.length === 0;
        });

        machines.state.forEach((lav, index) => {if(lav) initObject[`Lavadora_${index+1}`] = true;});

        return({...initObject});
    }

    const [form, setForm] = useState(initState());
    const dispatch = useDispatch();

    const handlerFormChange = (event) => {
        const property = event.target.name;
        const value = property.indexOf('Lavadora_') >= 0 || property === 'stateFormula' ? 
            event.target.checked: event.target.value;

        setForm({...form, [property]: value});
    }

    useEffect(() => {
        if(typeof form.numeroPrograma !== 'number') dispatch(setFormAux(form));
    }, [form]);

    return(
        <form className={style.formSyle} ref={lavRef}>
            <div className={style.nameProgramDiv}>
                <label htmlFor="nombrePrograma">Nombre del Programa</label>
                <input name="nombrePrograma" type="text" 
                       value={form.nombrePrograma}
                       onChange={handlerFormChange}/>
            </div>
            <div className={style.nameProgramDeviceDiv}>
                <label htmlFor="nombreProgramaDevice">Nombre del Programa en el dispositivo</label>
                <input name="nombreProgramaDevice" type="text" 
                       value={form.nombreProgramaDevice}
                       onChange={handlerFormChange}/>
            </div>
            <div className={style.numberProgramDiv}>
                <label htmlFor="numeroPrograma">Numero del Programa</label>
                <select name="numeroPrograma" value={form.numeroPrograma} onChange={handlerFormChange}>
                    {formulas.map((formula, index) => {
                        return(
                            formula.steps.length === 0 ?
                            <option key={`create_${index}`} 
                                    value={`Formula ${index+1}`}>
                                {`Formula ${index+1}`}
                            </option>
                            : ''
                        );
                    })}
                </select>
            </div>
            <div className={style.lavDiv}>
                <label>Lavadoras en uso</label>
                {machines.amount > 0 ?
                    machines.state.map((lav, index) => {
                        return(
                            <>
                                {lav ?
                                <div key={`createP_${index}`}>
                                    <input 
                                        type='checkbox'
                                        name={`Lavadora_${index+1}`}
                                        value={index}
                                        checked={form[`Lavadora_${index+1}`]}
                                        onChange={handlerFormChange}
                                    />
                                    <label htmlFor={`Lavadora_${index+1}`}>
                                        {`Lavadora ${index+1} - ${machines.kg[index]}Kg`}
                                    </label>
                                </div>
                                : ''}
                            </>
                        );
                    })
                : "No hay lavadoras disponibles"}
            </div>
            <div className={style.stateFormDiv}>
                <label>Estado de la formula</label>
                <div>
                    <input
                        type="checkbox"
                        name="stateFormula"
                        checked={form.stateFormula}
                        onChange={handlerFormChange}
                    />
                    <label htmlFor="stateFormula">Formula activa</label>
                </div>
            </div>
        </form>
    )
}