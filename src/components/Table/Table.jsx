import style from "./Table.module.css";

export default function Table({dataTable, keyTable, rowTable}){
    const headersTable = [];
    for(let property in dataTable[0]) headersTable.push(property);

    return(
        <>  {headersTable.length > 0 ?
            <table className={style.table}>
                <thead>
                    <tr>
                        {headersTable.map((header, index) => {
                            return (
                                <td key={`H${keyTable}_${index}`}>{header.replace('_', ' ')}</td>
                            );
                        })}
                    </tr>
                </thead>

                <tbody>
                    {dataTable.map((data, index) => {
                        return(
                            <tr onClick={rowTable && rowTable.handlerCLick}
                                key={`${keyTable}_${index}`}
                                style={rowTable && rowTable.style[index]}
                                id={index} >

                                {headersTable.map((property, indexProp) => {
                                    return(
                                        Array.isArray(data[property]) ?
                                            <td key={`${keyTable}${index}_D${indexProp}`}>
                                                {data[property].map((items, indexItem) => 
                                                    <div key={`${keyTable}${index}_D${indexProp}_${indexItem}`}>
                                                        {items}
                                                    </div>)
                                                }
                                            </td> : 
                                            <td key={`${keyTable}${index}_D${indexProp}`}>{data[property]}</td>)
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            : <div>Sin Formulas Creadas</div>}
        </>
    );
}