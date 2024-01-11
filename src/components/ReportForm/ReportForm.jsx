import { LuFilter, LuFilterX } from "react-icons/lu";
import { useLocation } from "react-router-dom";
import style from "./ReportForm.module.css";
import { useState } from "react";

export default function ReportForm({items, handlerSubmit, keyItem}){
    const [viewFilers, setViewFilters] = useState(true);
    const [viewFilersTimeOut, setViewFilersTimeOut] = useState([true, true]);

    const location = useLocation();

    if(viewFilers !== viewFilersTimeOut[0]){
        if(viewFilersTimeOut[1]){
            setTimeout(() => setViewFilersTimeOut([false, false]), 1000);
        }else{
            setTimeout(() => {
                setViewFilersTimeOut([true, true]);
                setViewFilters(viewFilersTimeOut[0]);
            }, 10);
        }
    }
    
    const handlerViewFilter = () => {
        if(viewFilers) setViewFilters(false);
        else setViewFilersTimeOut([true, false]); 
    }

    return(
        <div className={style.divContent}>
            <div className={style.divShearch}>
                <span>{location.pathname.includes('Detail') ? 'Reporte Detallado' : 
                       location.pathname.includes('Amount') ? 'Reporte de Consumo' :
                       location.pathname.includes('Devices') ? 'Dispositivos' : ''}</span>

                <div className={style.divFilterIcon}
                    style={{backgroundColor: viewFilers ? 'rgb(230, 227, 227)': '', transition: '1s'}}
                    onClick={handlerViewFilter}>
                    {viewFilers ? <LuFilterX /> : <LuFilter />}
                </div>
            </div>
            
            {viewFilersTimeOut[0] && 
            <div className={style.divForm} style={{opacity: viewFilers ? '1': '0', transition: '1s',}}>
                <form className={style.reportForm} 
                      onSubmit={handlerSubmit}
                      style={{gridTemplateColumns:`repeat(${items.length}, 1fr)`,
                              paddingLeft: items.length > 1 ? '0' : '2%',
                              justifyContent: items.length > 1 ? 'space-around' : 'flex-start'}}>
                    {items.map((item, index) => {
                        return(
                            <div key={`${keyItem}_${index}`}>{item.component}</div>
                        );
                    })}
                </form>
            </div>}
        </div>
        
    );
}