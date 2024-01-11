import {Link,  useLocation} from "react-router-dom";
import style from "./DropStyle.module.css";
import { useState } from "react";

export default function DropDown({list, Style, iconSelect, 
                                  hidden, value, setValue}){

    const [state, setState] = useState(false);
    const location = useLocation();

    const handlerClick = (item = undefined) => {
        if(item === undefined ) setState(!state)
        else if(item.hasOwnProperty('route')) setValue && setValue(item.text)
        else setState(!state);
    }

    const styleAll = Style !== undefined ? Style.hasOwnProperty('all') ? Style.all : '' : '';
    const stylelistClick = Style !== undefined ? Style.hasOwnProperty('listClick') ? Style.listClick : '' : '';
    const styleClick = Style !== undefined ? Style.hasOwnProperty('click') && state ? Style.click : '' : '';

    return(
        <ul className={`${style.dropUl} ${styleClick} ${styleAll}`}>
            {list.map((item, index) => {
                if(index === 0){
                    return(
                        <li onClick={() => handlerClick()}
                            key={`${item.text}_${index}`} 
                            className={style.liHeader} >
                            
                            <div>
                                {item.icon && <span>{item.icon}</span>}
                                {!hidden && <span>{value ? value : item.text}</span>}
                            </div>
                            
                            {(!hidden && iconSelect) && 
                            <span className={state ? style.spanIconOpen: style.spanIconClose}>
                                {iconSelect}
                            </span>}
                        </li>
                    );
                } 

                return(
                    value ?
                        state &&
                            <li className={`${style.liBody} ${stylelistClick}`} 
                                onClick={() => handlerClick(item)}
                                key={`${item.text}_${index}`} >

                                {item.icon && <span>{item.icon}</span>}
                                {!hidden && <span>{item.text}</span>}
                            </li>     
                        :
                        <Link to={item.route} key={`${item.text}_${index}`}>
                            {state &&
                            <li className={`${style.liBody} ${location.pathname === item.route ? stylelistClick : ''}`} 
                                onClick={() => handlerClick(item)}>

                                {item.icon && <span>{item.icon}</span>}
                                {!hidden && <span>{item.text}</span>}
                            </li>}
                        </Link>   
                );
            })}
        </ul>
    );
}