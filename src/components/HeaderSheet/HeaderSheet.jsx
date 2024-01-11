import style from "./HeaderSheet.module.css";
import {IconContext} from "react-icons";

export default function HeaderSheet({icons, nameKey}){

    return(
        <div className={style.mainDiv}>   
            {icons.map((icon, index) => {
                return(
                    <IconContext.Provider value={{ size: "1.2em"}}  key={`${nameKey}_${index}`}>
                        <div className={style.contentDiv} onClick={icon.handler && icon.handler}>

                            <div className={style.iconDiv}>{icon.icon}</div>
                            <div className={style.textDiv}>{icon.text}</div>
                        </div>
                    </IconContext.Provider>
                )
            })}
        </div>
    );
}