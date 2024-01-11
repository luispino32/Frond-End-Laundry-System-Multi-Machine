import style from "./NavigationBar.module.css";

export default function NavigationBar({menus, nameKey, select}){


    return(
        <div className={style.mainDiv}>
            {menus.map((item, index) => {
                return (
                    <div className={select.itemsNav === item ? style.seled : ""} key={`${nameKey}_${index}`}>
                        <span onClick={select.handlerChangeNav} key={`${nameKey}_${index}` }>{item}</span>
                    </div>
                );
            })}
        </div>
    );
}