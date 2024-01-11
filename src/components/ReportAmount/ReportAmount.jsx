//import { useState } from "react";
import style from "./ReportAmount.module.css";
import TableDetail from "../TableDetail/TableDetail";

const titles = ["NUMERO DE MAQUINADAS", "KG LAVADOS", "CONSUMO PRODUCTOS / LAVADORAS", "CONSUMO PRODUCTOS / FORMULAS"];

const kg_lavadoras = {Lavadora_1:20, Lavadora_2:20, Lavadora_3:28, Lavadora_4:28};

const dataReportDetail = [
    {Lavadora_1:230, Lavadora_2:320, Lavadora_3:410, Lavadora_4:280, TOTAL:1820,
     detail: [{Formula:"Formula 1", Lavadora_1:120, Lavadora_2:150, Lavadora_3:95, Lavadora_4:180, TOTAL:545},
              {Formula:"Formula 2", Lavadora_1:120, Lavadora_2:150, Lavadora_3:95, Lavadora_4:180, TOTAL:545},
              {Formula:"Formula 3", Lavadora_1:120, Lavadora_2:150, Lavadora_3:95, Lavadora_4:180, TOTAL:545},
              {Formula:"Formula 4", Lavadora_1:120, Lavadora_2:150, Lavadora_3:95, Lavadora_4:180, TOTAL:545},]},

    {Lavadora_1:"230 L", Lavadora_2:"320 L", Lavadora_3:"410 L", Lavadora_4:"280 L", TOTAL:"1820 L",
     detail: [{Producto:"SuperClean 90", Lavadora_1:"120 L", Lavadora_2:"150 L", Lavadora_3:"95 L", Lavadora_4:"180 L", TOTAL:"545 L"},
              {Producto:"Procigen 60", Lavadora_1:"120 L", Lavadora_2:"150 L", Lavadora_3:"95 L", Lavadora_4:"180 L", TOTAL:"545 L"},
              {Producto:"Secuestrol 100", Lavadora_1:"120 L", Lavadora_2:"150 L", Lavadora_3:"95 L", Lavadora_4:"180 L", TOTAL:"545 L"},
              {Producto:"Suaviflex", Lavadora_1:"120 L", Lavadora_2:"150 L", Lavadora_3:"95 L", Lavadora_4:"180 L", TOTAL:"545 L"},]},

    {Formula_1:"230 L", Formula_2:"320 L", Formula_3:"410 L", Formula_4:"280 L", TOTAL:"1820 L",
     detail: [{Producto:"SuperClean 90", Formula_1:"120 L", Formula_2:"150 L", Formula_3:"95 L", Formula_4:"180 L", TOTAL:"545 L"},
              {Producto:"Procigen 60", Formula_1:"120 L", Formula_2:"150 L", Formula_3:"95 L", Formula_4:"180 L", TOTAL:"545 L"},
              {Producto:"Secuestrol 100", Formula_1:"120 L", Formula_2:"150 L", Formula_3:"95 L", Formula_4:"180 L", TOTAL:"545 L"},
              {Producto:"Suaviflex", Formula_1:"120 L", Formula_2:"150 L", Formula_3:"95 L", Formula_4:"180 L", TOTAL:"545 L"},]}
];

function kg_calc(reportData){
    const kg_lav = {};
    let sumaTotal = 0;

    for(const key in reportData){
        if(Array.isArray(reportData[key])){
            kg_lav[key] = reportData[key].map(data => kg_calc(data));
        }else{
            if(key === 'TOTAL'){
                kg_lav[key] = sumaTotal + ' kg';
            }else{
                if(typeof reportData[key] === 'number'){
                    kg_lav[key] = reportData[key]*kg_lavadoras[key];
                    sumaTotal += kg_lav[key];
                    kg_lav[key] += ' kg';
                }else{
                    kg_lav[key] = reportData[key];
                }
            }
        }
    }

    return kg_lav;
}

const kg_Lavados = kg_calc(dataReportDetail[0]);
dataReportDetail.splice(1, 0, kg_Lavados);

export default function ReportAmount(){

    return(
        <div className={style.divMain}>
            {dataReportDetail.map((data, index) => {
                return(
                    <TableDetail dataTable={data} title={titles[index]} keyTable={`aTable_${index}`} key={`Atable_${index}`}/>
                );
            })}
        </div>
    );
}