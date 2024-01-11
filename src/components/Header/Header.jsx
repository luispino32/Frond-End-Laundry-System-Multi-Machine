import style from "./Header.module.css";
import { useDispatch } from "react-redux";
import DropDown from "../DropDown/DropDown";
import { IoIosArrowDown } from "react-icons/io";
import { setDataUser } from "../../redux/actions";
import {Link, useNavigate} from "react-router-dom";


const headerDrop = [
    {text:""},
    {text:"Perfil", route:""},    
    {text:"Cerrar Sesion",  route:""}, 
];

export default function Header({styleHeader, name}){

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handlerCLickDrop = (item) => {
        if(item !== 'Cerrar Sesion') return;
        localStorage.removeItem('auth');
        dispatch(setDataUser({}));
        navigate('/Login');
    }

    headerDrop[0].text = name ? name : 'Undefined';
    const style_Header = `${style.divHeader} ${styleHeader === undefined ? '' : styleHeader}`;

    return(
        <div className={style_Header}>
            <div className={style.homeDiv}>
                <Link to="/Home"><span>HOME</span></Link>
            </div>
            <div className={style.dropDiv}>
                <DropDown list={headerDrop} 
                          setValue={handlerCLickDrop}
                          iconSelect={<div style={{'transform':'translateY(3px)'}}><IoIosArrowDown/></div>}/>
            </div>
        </div>
    );
}