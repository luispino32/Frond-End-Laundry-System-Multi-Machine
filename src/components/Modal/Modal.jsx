import { useEffect } from "react";
import style from "./Modal.module.css";

export default function Modal({header, children}){
    useEffect(() => {
        document.body.style.overflow = 'hidden';
    
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    return(
        <div className={style.divModal}>
            <div className={style.divGeneralModal}>
                <div className={style.headerModal}>
                    {header.map((comp, index) => <div className={style.divHeader} key={`modal_${index}`}>{comp}</div>)}
                </div>

                <div className={style.divContentModal}>
                    {children}
                </div>
            </div>
        </div>
    );
}