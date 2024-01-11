import style from "./ViewLav.module.css";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";

import { setFormAux } from "../../redux/actions";

export default function ViewLav({ formulas, machine, enabled }){
    const initState = () => {
        const initObject = {
            indexLav: machine.index,
            capacidadLav: machine.kg,
            stateLav: machine.state,
            flushTime: machine.timeFlush,
        }

        formulas.forEach((form, index) => {
            if(form.state) initObject[`Formula_${index+1}`] = machine.formulas[index]; });

        return({...initObject});
    }

    const [form, setForm] = useState(initState());
    const dispatch = useDispatch();

    console.log("form state:");
    console.log(form);

    const handlerFormChange = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        });

        dispatch({
            ...form, 
            [event.target.name]: event.target.value
        });
    }

    useEffect(() => {
        setForm(initState());
    }, [machine]);

    return(
        <form className={style.formSyle}>
            <div className={style.capacidadLav}>
                <label htmlFor="capacidadLav">Capacidad de Lavadora, kg</label>
                <input name="capacidadLav" type="number" max={200} min={0}
                       value={form.capacidadLav}
                       onChange={handlerFormChange}
                       disabled={!enabled}/>
            </div>
            <div className={style.flushLav}>
                <label htmlFor="flushTime">Tiempo de Flush, seg</label>
                <input name="flushTime" type="number" max={120} min={0}
                       value={form.flushTime}
                       onChange={handlerFormChange}
                       disabled={!enabled}/>
            </div>
            <div className={style.stateLav}>
                <label>Estado Lavadora</label>
                <div>
                    <input type='checkbox' name="stateLav"
                        checked={form.formulasLav} onChange={handlerFormChange}
                        disabled={!enabled}/>
                    <label htmlFor="stateLav">Lavadora activa</label>
                </div>
            </div>
            <div className={style.forms}>
                <label>Formulas Activas</label>
                    {formulas.map((formula, index) => {
                        return(
                            <>
                                {formula.state ? 
                                <div key={`viewL_${index}`}>
                                    <input 
                                        type='checkbox'
                                        name={`Formula_${index+1}`}
                                        value={index}
                                        checked={form[`Formula_${index+1}`]}
                                        onChange={handlerFormChange}
                                        disabled={!enabled}
                                    />
                                    <label htmlFor={`Formula_${index+1}`}>
                                        {`${formula.nameWeb.toUpperCase()}`}
                                    </label>
                                </div>: ''}
                            </>
                        );
                    })}
            </div>
        </form>
    );
}