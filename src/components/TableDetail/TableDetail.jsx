import {RiArrowDropDownLine} from "react-icons/ri";
import {SlArrowUp} from "react-icons/sl";
import style from "./TableDetail.module.css";
import Table from "../Table/Table";

import { useState } from "react";

export default function TableDetail({dataTable, title, keyTable}){
    const [buttomState, setButtomState] = useState(false);

    const dataDetail = dataTable.detail;

    const propertyData = [];
    for(let property in dataTable){
        if(property !== "detail")
            propertyData.push({property:property, data:dataTable[property]});
    }

    return(
        <div className={style.divMain} style={{'paddingTop':title ? '0' : '1%'}}>
            {title && <h4>{title}</h4>}
            <div className={style.table_1}>
                {propertyData.map((data, index) => {
                    return(
                        <div className={style.divDataTable_1} key={`${keyTable}_${index}`}>
                            <>
                                <p className={style.p_property}>{data.property.replace('_', ' ')}</p>
                                <p className={style.p_data}>{data.data}</p>
                            </>
                        </div>
                    );
                })}
            </div>
            
            {buttomState &&
            <div className={style.divDataTable_2}>
                <Table dataTable={dataDetail} keyTable={`${keyTable}_D`}/>
            </div>}

            <div className={style.buttomDetail}>
                <span onClick={() => setButtomState(!buttomState)}>
                    {buttomState ? <SlArrowUp/> : <RiArrowDropDownLine/>}
                </span>
            </div>
        </div>
    );
}