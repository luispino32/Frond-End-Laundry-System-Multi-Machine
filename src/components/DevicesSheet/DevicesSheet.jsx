import NavigationBar from "../NavigationBar/NavigationBar";
import LavadoraSheet from "../LavadoraSheet/LavadoraSheet";
import FormulaSheet from "../FormulaSheet/FormulaSheet";
import style from "./DevicesSheet.module.css";
import { useState } from "react";


const itemsNavigationBar = ['Tiempo Real', 'Formulas', 'Lavadoras', 'Productos', 'Notificaciones'];

export default function DevicesSheet(){
    const [itemsNav, setItemsNav] = useState(itemsNavigationBar[0]);

    const handlerChangeNav = (event) => setItemsNav(`${event.target.textContent}`);
    
    return (
        <div className={style.mainDiv}>
            <NavigationBar menus={itemsNavigationBar} 
                           nameKey={'navDevices'} 
                           select={{itemsNav: itemsNav, handlerChangeNav: handlerChangeNav}}/>

            {itemsNav === itemsNavigationBar[1] && <FormulaSheet/>}
            {itemsNav === itemsNavigationBar[2] && <LavadoraSheet/>}
        </div>
    );
}