//import { useState } from "react";
import style from "./ReportDetail.module.css";
import TableDetail from "../TableDetail/TableDetail";

const dataReportDetail = [
    {Caso:"Completado", Lavadora:"Lavadora 2", Capacidad:"20 kg", Formula:"TOALLAS", 
     Hora_inicio:"15:22:10", Hora_fin:"15:52:45", Duracion:"30min 35s", 
     detail: [{Producto:"BUSTER 40", Cantidad:"100 ml", Flujo:"1500.6 ml/min", Tiempo_Bomba:"15s", Ticks:"832 rv"},
              {Producto:"SUPERCLEAN 90", Cantidad:"200 ml", Flujo:"1340.1 ml/min", Tiempo_Bomba:"12s", Ticks:"600 rv"},
              {Producto:"PROCIGEN 60", Cantidad:"250 ml", Flujo:"1600.6 ml/min", Tiempo_Bomba:"14s", Ticks:"1200 rv"},
              {Producto:"SUAVIFLEX", Cantidad:"200 ml", Flujo:"1300 ml/min", Tiempo_Bomba:"16s", Ticks:"532 rv"} ]},

     {Caso:"Completado", Lavadora:"Lavadora 3", Capacidad:"20 kg", Formula:"SABANAS", 
     Hora_inicio:"15:22:10", Hora_fin:"15:52:45", Duracion:"30min 35s", 
     detail: [{Producto:"BUSTER 40", Cantidad:"100 ml", Flujo:"1500.6 ml/min", Tiempo_Bomba:"15s", Ticks:"832 rv"},
              {Producto:"SUPERCLEAN 90", Cantidad:"200 ml", Flujo:"1340.1 ml/min", Tiempo_Bomba:"12s", Ticks:"600 rv"},
              {Producto:"PROCIGEN 60", Cantidad:"250 ml", Flujo:"1600.6 ml/min", Tiempo_Bomba:"14s", Ticks:"1200 rv"},
              {Producto:"SUAVIFLEX", Cantidad:"200 ml", Flujo:"1300 ml/min", Tiempo_Bomba:"16s", Ticks:"532 rv"} ]},

     {Caso:"Completado", Lavadora:"Lavadora 1", Capacidad:"20 kg", Formula:"COBIJAS", 
     Hora_inicio:"15:22:10", Hora_fin:"15:52:45", Duracion:"30min 35s", 
     detail: [{Producto:"BUSTER 40", Cantidad:"100 ml", Flujo:"1500.6 ml/min", Tiempo_Bomba:"15s", Ticks:"832 rv"},
              {Producto:"SUPERCLEAN 90", Cantidad:"200 ml", Flujo:"1340.1 ml/min", Tiempo_Bomba:"12s", Ticks:"600 rv"},
              {Producto:"PROCIGEN 60", Cantidad:"250 ml", Flujo:"1600.6 ml/min", Tiempo_Bomba:"14s", Ticks:"1200 rv"},
              {Producto:"SUAVIFLEX", Cantidad:"200 ml", Flujo:"1300 ml/min", Tiempo_Bomba:"16s", Ticks:"532 rv"} ]}
];

export default function ReportDetail(){

    return(
        <div className={style.divMain}>
            {dataReportDetail.map((data, index) => {
                return(
                    <TableDetail dataTable={data} keyTable={`dTable_${index}`} key={`Dtables_${index}`}/>
                );
            })}
        </div>
    );
}