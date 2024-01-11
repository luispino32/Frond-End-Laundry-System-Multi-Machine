import DropDown from "../DropDown/DropDown";
import ItemNav  from "../ItemNav/ItemNav";
import style from "./NavBar.module.css";
import {Link} from "react-router-dom";

export default function NavBar({itemsNavBar, styleNav, iconHeader, hidden}){
    const styleNavBar = `${style.navStyle} ${styleNav ? styleNav : ''}`;

    return(
        <nav className={styleNavBar}>
            <header className={style.headerStyle}>
                {!hidden && <Link to="/Home"><span>HOME</span></Link>}
                <span>{iconHeader}</span>
            </header>

            <ul className={style.ulStyle}>
                {itemsNavBar.map((item, index) => {
                    if(Array.isArray(item)) 
                        return <DropDown list={item} 
                                         hidden={hidden}
                                         key={`NavD_${index}`}
                                         Style={{click:style.dropClickStyle, 
                                                 listClick: style.dropClickStyleBody}}
                                         />;
                    
                    return <ItemNav item={item} 
                                    hidden={hidden} 
                                    key={`NavI_${index}`}
                                    styleClick={style.dropClickStyleBody}/>
                })}
            </ul>
        </nav>
    );
}