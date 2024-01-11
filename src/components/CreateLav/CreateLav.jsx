import { useDispatch } from "react-redux";
import style from "./CreateLav.module.css";
import { useState, useEffect } from "react";

import { setFormAux } from "../../redux/actions";

export default function CreateLav({ formulas, machines }){
    const initState = () => {
        let initObject = {
            indexLav: machines.amount,
            capacidadLav: 0,
            stateLav: false,
            flushTime: 0,
        }

        formulas.forEach((form, index) => {if(form.state) initObject[`Formula_${index+1}`] = false;});

        return({...initObject});
    }

    const [form, setForm] = useState(initState());
    const dispatch = useDispatch();

    const handlerFormChange = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        dispatch(setFormAux(form));
    }, [form]);

    return(
        <form className={style.formSyle}>
            <div className={style.lavadora}>
                <label >Lavadora para Agregar</label>
                <label style={{color:'red'}}>{`Lavadora ${machines.amount + 1}`}</label>
            </div>
            <div className={style.capacidadLav}>
                <label htmlFor="capacidadLav">Capacidad de Lavadora, kg</label>
                <input name="capacidadLav" type="number" max={200} min={0}
                       value={form.capacidadLav}
                       onChange={handlerFormChange}/>
            </div>
            <div className={style.flushLav}>
                <label htmlFor="flushTime">Tiempo de Flush, seg</label>
                <input name="flushTime" type="number" max={120} min={0}
                       value={form.flushTime}
                       onChange={handlerFormChange}/>
            </div>
            <div className={style.stateLav}>
                <label>Estado Lavadora</label>
                <div>
                    <input type='checkbox' name="stateLav"
                        checked={form.formulasLav} onChange={handlerFormChange}/>
                    <label htmlFor="stateLav">Lavadora activa</label>
                </div>
            </div>
            <div className={style.forms}>
                <label>Formulas Activas</label>
                    {formulas.map((formula, index) => {
                        return(
                            <>
                                {formula.state ? 
                                <div key={`createL_${index}`}>
                                    <input 
                                        type='checkbox'
                                        name={`Formula_${index+1}`}
                                        value={index}
                                        checked={form[`Formula_${index+1}`]}
                                        onChange={handlerFormChange}
                                    />
                                    <label htmlFor={`Formula_${index+1}`}>
                                        {`${formula.nameWeb}`}
                                    </label>
                                </div>: ''}
                            </>
                        );
                    })}
            </div>
        </form>
    );
}