import style from "./InformationBar.module.css";

export default function InformationBar({elements}){

    return(
        <div className={style.mainDiv}>
            {elements.map(element => {
                
            })}
        </div>
    );
}