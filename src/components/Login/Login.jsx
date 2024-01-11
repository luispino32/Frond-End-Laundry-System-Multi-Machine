import { LoginBox,  Loginform, InputBox, IconDiv, Forgot, Error} from "./loginStyle";
import { useState, useEffect } from "react";
import { RxUpdate } from "react-icons/rx";

export default function Login({ login, message, setMessage }){
    const [form, setForm] = useState({
        email: "",
        password: "",
        submit: 'Login'
    });

    useEffect(() => {
        message !== '' && setForm({...form, submit: 'Login'});
    }, [message]);

    const handlerChange = (event) => {
        const property = event.target.name;
        const value = event.target.value;

        setMessage('');
        setForm({...form, [property]: value});
    }

    const handlerSubmit = (event) => {
        event.preventDefault();
        setForm({...form, submit: <IconDiv><RxUpdate/></IconDiv>});
        setMessage('');
        login(form);
    }

    return(
        <LoginBox>
            <h1>Login</h1>
            <Loginform>
                <InputBox required>
                    <input name="email" value={form.username} onChange={handlerChange} type="text" required/>
                    <span></span>
                    <label htmlFor="email">Email: </label>
                </InputBox>

                <InputBox>
                    <input name="password" value={form.password} onChange={handlerChange} type="password" required/>
                    <span></span>
                    <label htmlFor="password">Password: </label>
                </InputBox>   

                <Forgot>Forgot Password?</Forgot>

                {message !== '' && <Error>{message}</Error>}
                <button type="submit" onClick={handlerSubmit}>{form.submit}</button>
            </Loginform>
        </LoginBox>
    );
}
