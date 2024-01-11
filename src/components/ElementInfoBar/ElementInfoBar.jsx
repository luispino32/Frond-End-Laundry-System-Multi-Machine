import style from "./ElementInforBar.module.css";

export default function ElementInfoBar({elements}){

    return(
        <div className={style.mainDiv}>
            {elements.map((element, index) => {
                return(
                    <div key={`${element.key}_${index}`}> 
                        {element.text && <span style={{color: `${element.color}`}}>{element.text}</span>}
                        {element.icon && <span>{element.icon}</span>}
                    </div>
                )
            })}
        </div>
    );
}