import {Link, useLocation} from "react-router-dom";
import style from "./ItemNav.module.css";

export default function ItemNav({item, hidden, styleClick}){
    const location = useLocation();

    const style_Click = styleClick !== undefined ? styleClick : '';
    return(
        <Link to={item.route}>
            <li className={`${style.liItem} ${location.pathname === item.route ? style_Click : ''}`}>
                <span>{item.icon}</span>
                {!hidden && <span>{item.text}</span>}
            </li>
        </Link>
    );
}